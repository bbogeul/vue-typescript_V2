<template>
  <section>
    <div class="title pb-2 mb-2">
      <h3>업체 관리</h3>
    </div>
    <div class="divider"></div>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <div class="col-md-2 mb-3">
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
      </b-form-row>
      <b-form-row>
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
      </b-form-row>
      <!-- second row -->
      <b-row align-h="center">
        <b-btn-group>
          <b-button variant="primary" @click="clearOut()">초기화</b-button>
          <b-button variant="success" @click="search()">검색</b-button>
        </b-btn-group>
      </b-row>
    </div>
    <div class="table-top">
      <div class="total-count">
        <h5>
          <span>TOTAL</span>
          <strong class="text-primary">{{ companyListTotalCount }}</strong>
        </h5>
      </div>
      <b-button
        variant="primary"
        v-b-modal.add_company
        @click="clearOutCompanyDto()"
        >업체 추가</b-button
      >
    </div>
    <table
      class="table table-bordered table-hover table-sm table-responsive-md text-center"
      v-if="!dataLoading"
    >
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
            TEL
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
            v-bind:class="{ highlighted: companySearchDto.companyStatus }"
          >
            STATUS
          </th>
          <th scope="col">VIEW</th>
        </tr>
      </thead>
      <tbody v-if="companyListTotalCount">
        <tr v-for="companyList in companyListDto" :key="companyList.no">
          <th scope="row">
            {{ companyList.no }}
          </th>
          <td class="text-nowrap">
            {{ companyList.nameKr }}
          </td>
          <td class="text-nowrap">
            {{ companyList.ceoKr }}
          </td>
          <td>
            {{ companyList.phone }}
          </td>
          <td>
            {{ companyList.email }}
          </td>
          <td>
            {{ companyList.fax }}
          </td>
          <td class="text-left">
            {{ companyList.address }}
          </td>
          <td>
            {{ companyList.createdAt | dateTransformer }}
          </td>
          <td>
            <span class="badge badge-pill badge-warning p-2">
              {{ companyList.codeManagement.value }}
            </span>
          </td>
          <td>
            <router-link
              v-if="companyList.no"
              class="btn btn-sm btn-secondary text-nowrap"
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
        <tr>
          <td colspan="10" class="empty-data">
            검색결과가 없습니다.
          </td>
        </tr>
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
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>

    <b-modal
      id="add_company"
      title="업체 추가하기"
      size="xl"
      @ok="createCompany()"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <div class="form-row">
          <div class="col-12 col-md-6 mt-2">
            <label>업체명</label>
            <input
              type="text"
              v-model="companyCreateDto.nameKr"
              class="form-control"
            />
          </div>
          <div class="col-12 col-md-6 mt-2">
            <label>업체명(영문)</label>
            <input
              type="text"
              v-model="companyCreateDto.nameEng"
              class="form-control"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col-12 col-md-6 mt-2">
            <label>전회번호</label>
            <input
              type="text"
              v-model="companyCreateDto.phone"
              class="form-control"
            />
          </div>
          <div class="col-12 col-md-6 mt-2">
            <label>이메일</label>
            <input
              type="text"
              v-model="companyCreateDto.email"
              class="form-control"
            />
          </div>
          <div class="col-12 col-md-6 mt-2">
            <label>FAX</label>
            <input
              type="text"
              v-model="companyCreateDto.fax"
              class="form-control"
            />
          </div>
          <div class="col-12 col-md-6 mt-2">
            <label>주소</label>
            <input
              type="text"
              v-model="companyCreateDto.address"
              class="form-control"
            />
          </div>
          <div class="col-12 col-md-6 mt-2">
            <label>대표명</label>
            <input
              type="text"
              v-model="companyCreateDto.ceoKr"
              class="form-control"
            />
          </div>
          <div class="col-12 col-md-6 mt-2">
            <label>대표명(영문)</label>
            <input
              type="text"
              v-model="companyCreateDto.ceoEng"
              class="form-control"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col-12 col-md-6 mt-2">
            <label>웹사이트</label>
            <input
              type="text"
              v-model="companyCreateDto.website"
              class="form-control"
            />
          </div>
          <div class="col-12 col-md-6 mt-2">
            <label>사업자번호</label>
            <input
              type="text"
              v-model="companyCreateDto.businessNo"
              class="form-control"
            />
          </div>
          <div class="col-12 col-md-6 mt-2">
            <label>업체 승인 상태</label>
            <select
              class="custom-select"
              v-model="companyCreateDto.companyStatus"
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
      </form>
    </b-modal>
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
  private companyCreateDto = new CompanyDto();
  private pagination = new Pagination();
  private approvalStatus: APPROVAL_STATUS[] = [...CONST_APPROVAL_STATUS];
  private totalPage = 0;
  private dataLoading = false;

  paginateSearch() {
    this.search(true);
  }

  clearOut() {
    this.pagination = new Pagination();
    this.companySearchDto = new CompanyListDto();
    this.search();
  }

  search(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    CompanyService.findAll(this.companySearchDto, this.pagination).subscribe(
      res => {
        this.dataLoading = false;
        this.companyListDto = res.data.items;
        this.companyListTotalCount = res.data.totalCount;
        this.totalPage = Math.ceil(
          this.companyListTotalCount / this.pagination.limit,
        );
      },
    );
  }

  // 업체 생성
  createCompany() {
    CompanyService.createCompany(this.companyCreateDto).subscribe(res => {
      if (res) {
        this.search();
      }
    });
  }

  // 업체 생성 초기화
  clearOutCompanyDto() {
    this.companyCreateDto = new CompanyDto();
  }

  created() {
    this.search();
    console.log(this.companyListDto);
  }
}
</script>
