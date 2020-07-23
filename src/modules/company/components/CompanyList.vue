<template>
  <section>
    <h3>업체 관리</h3>
    <div class="divider"></div>
    <div v-on:keyup.enter="search()">
      <div class="form-row">
        <div class="col-md-2 mb-2">
          <label for="username">업체 ID</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="companySearchDto.no"
          />
        </div>
        <div class="col-md-2 mb-3">
          <label>업체 대표명</label>
          <input
            type="text"
            class="form-control"
            v-model="companySearchDto.ceoKr"
          />
        </div>
        <div class="col-md-2 mb-3">
          <label>업체명</label>
          <input
            type="text"
            class="form-control"
            v-model="companySearchDto.nameKr"
          />
        </div>
        <div class="col-md-2 mb-3">
          <label>업체 전화번호</label>
          <input
            type="text"
            class="form-control"
            v-model="companySearchDto.phone"
          />
        </div>
        <div class="col-md-4 mb-3">
          <label>업체 주소</label>
          <input
            type="text"
            class="form-control"
            v-model="companySearchDto.address"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-3 mb-3">
          <label>업체 이메일</label>
          <input
            type="text"
            class="form-control"
            v-model="companySearchDto.email"
          />
        </div>
        <div class="col-md-2 mb-3">
          <label>업체 팩스번호</label>
          <input
            type="text"
            class="form-control"
            v-model="companySearchDto.fax"
          />
        </div>
        <div class="col-md-2 mb-3">
          <label>업체 승인 상태</label>
          <select
            class="custom-select"
            v-model="companySearchDto.companyStatus"
          >
            <option value>전체</option>
            <option
              v-for="status in approvalStatus"
              :key="status"
              :value="status"
              >{{ status | enumTransformer }}</option
            >
          </select>
        </div>
      </div>
      <!-- second row -->
      <div class="form-row"></div>
      <div class="text-center">
        <div class="btn-group mb-4">
          <button class="btn btn-primary" @click="clearOut()">초기화</button>
          <button class="btn btn-success" @click="search()">검색</button>
        </div>
      </div>
    </div>
    <h5>
      검색 결과:
      <strong class="text-primary">{{ companyListTotalCount }}</strong>
    </h5>
    <table class="table table-bordered table-hover table-sm text-center">
      <thead>
        <tr>
          <th scope="col" v-bind:class="{ highlighted: companySearchDto.no }">
            ID
          </th>
          <th
            scope="col"
            v-bind:class="{
              highlighted: companySearchDto.nameKr,
            }"
          >
            COMPANY
          </th>
          <th
            scope="col"
            v-bind:class="{ highlighted: companySearchDto.ceoKr }"
          >
            CEO
          </th>
          <th
            scope="col"
            v-bind:class="{ highlighted: companySearchDto.phone }"
          >
            PHONE
          </th>
          <th
            scope="col"
            v-bind:class="{ highlighted: companySearchDto.email }"
          >
            EMAIL
          </th>
          <th scope="col" v-bind:class="{ highlighted: companySearchDto.fax }">
            FAX
          </th>
          <th
            scope="col"
            v-bind:class="{ highlighted: companySearchDto.address }"
          >
            ADDRESS
          </th>
          <th scope="col">CREATED</th>
          <th
            scope="col"
            v-bind:class="{ highlighted: companySearchDto.status }"
          >
            STATUS
          </th>
          <th scope="col">VIEW</th>
        </tr>
      </thead>

      <tbody v-if="companyListTotalCount">
        <tr v-for="companyList in companyListDto" :key="companyList.no">
          <td class="align-middle">
            {{ companyList.no }}
          </td>
          <td class="align-middle">
            {{ companyList.nameKr }}
          </td>
          <td class="align-middle">
            {{ companyList.ceoKr }}
          </td>
          <td class="align-middle">
            {{ companyList.phone }}
          </td>
          <td class="align-middle">
            {{ companyList.email }}
          </td>
          <td class="align-middle">
            {{ companyList.fax }}
          </td>
          <td class="align-middle text-left">
            {{ companyList.address }}
          </td>
          <td class="align-middle">
            {{ companyList.createdAt | dateTransformer }}
          </td>
          <td class="align-middle">
            <span class="badge badge-pill badge-warning p-2">
              {{ companyList.codeManagement.value }}
            </span>
          </td>
          <td class="align-middle">
            <router-link
              v-if="companyList.no"
              class="btn btn-sm btn-secondary"
              :to="{
                name: 'CompanyDetail',
                params: {
                  id: companyList.no,
                },
              }"
            >
              상세보기
            </router-link>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <td colspan="10" class="py-4">
          검색결과가 없습니다.
        </td>
      </tbody>
    </table>
    <b-pagination
      v-model="pagination.page"
      v-if="companyListTotalCount"
      pills
      :total-rows="companyListTotalCount"
      :per-page="pagination.limit"
      @input="paginateSearch"
      class="mt-4 justify-content-center"
    ></b-pagination>
  </section>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import { CompanyListDto, CompanyDto } from '../../../dto';
import { Pagination } from '../../../common';
import CompanyService from '../../../services/company.service';
import {
  CONST_APPROVAL_STATUS,
  APPROVAL_STATUS,
} from '../../../services/shared';

@Component({
  name: 'CompanyList',
})
export default class Company extends BaseComponent {
  private companySearchDto = new CompanyListDto();
  //   or you can set this value to an empty erray. either or
  //     private companyListDto: CompanyDto[] = [];
  private companyListDto: CompanyDto[] = Array<CompanyDto>();
  private companyListTotalCount = 0;
  private pagination = new Pagination();
  private approvalStatus: APPROVAL_STATUS[] = [...CONST_APPROVAL_STATUS];
  private totalPage = 0;

  paginateSearch() {
    this.search(true);
  }

  clearOut() {
    this.pagination = new Pagination();
    this.companySearchDto = new CompanyListDto();
    this.search();
  }

  search(isPagination?: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    CompanyService.findAll(this.companySearchDto, this.pagination).subscribe(
      res => {
        this.companyListDto = res.data.items;
        this.companyListTotalCount = res.data.totalCount;
        this.totalPage = Math.ceil(
          this.companyListTotalCount / this.pagination.limit,
        );
      },
    );
  }

  created() {
    this.search();
    console.log(this.companyListDto);
  }
}
</script>
