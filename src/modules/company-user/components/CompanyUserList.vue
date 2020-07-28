<template>
  <section>
    <div class="title d-flex justify-content-between align-items-end mb-2">
      <h3>업체 사용자 관리</h3>
      <!-- <div>
        <b-button
          variant="primary"
          @click="createCompany()"
          >업체 등록</b-button
        >
      </div> -->
    </div>
    <div class="divider"></div>
    <div v-on:keyup.enter="search()">
      <div class="form-row">
        <div class="col-md-2 mb-2">
          <label for="username">사용자 ID</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="companyUserSearchDto.no"
          />
        </div>
        <div class="col-md-2 mb-3">
          <label>업체 선택</label>
          <select
            class="custom-select"
            v-model="companyUserSearchDto.companyNo"
          >
            <option value selected>전체</option>
            <option
              v-for="company in companySelect"
              :key="company.no"
              :value="company.no"
              >{{ company.nameKr }}</option
            >
          </select>
        </div>
        <div class="col-md-2 mb-3">
          <label>사용자명</label>
          <input
            type="text"
            class="form-control"
            v-model="companyUserSearchDto.name"
          />
        </div>
        <div class="col-md-3 mb-3">
          <label>사용자 전화번호</label>
          <input
            type="text"
            class="form-control"
            v-model="companyUserSearchDto.phone"
          />
        </div>
        <div class="col-md-3 mb-3">
          <label>사용자 이메일</label>
          <input
            type="text"
            class="form-control"
            v-model="companyUserSearchDto.email"
          />
        </div>
        <div class="col-md-2 mb-3">
          <label>사용자 승인 상태</label>
          <select
            class="custom-select"
            v-model="companyUserSearchDto.companyUserStatus"
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
      <strong class="text-primary">{{ companyUserListTotalCount }}</strong>
    </h5>
    <table class="table table-bordered table-hover table-sm text-center">
      <thead>
        <tr>
          <th
            scope="col"
            v-bind:class="{ highlighted: companyUserSearchDto.no }"
          >
            ID
          </th>
          <th
            scope="col"
            v-bind:class="{
              highlighted: companyUserSearchDto.company,
            }"
          >
            COMPANY
          </th>
          <th
            scope="col"
            v-bind:class="{
              highlighted: companyUserSearchDto.name,
            }"
          >
            NAME
          </th>
          <th
            scope="col"
            v-bind:class="{ highlighted: companyUserSearchDto.phone }"
          >
            PHONE
          </th>
          <th
            scope="col"
            v-bind:class="{ highlighted: companyUserSearchDto.email }"
          >
            EMAIL
          </th>
          <th scope="col">CREATED</th>
          <th
            scope="col"
            v-bind:class="{ highlighted: companyUserSearchDto.status }"
          >
            STATUS
          </th>
          <th scope="col">VIEW</th>
        </tr>
      </thead>

      <tbody v-if="companyUserListTotalCount">
        <tr v-for="companyUser in companyUserListDto" :key="companyUser.no">
          <td class="align-middle">
            {{ companyUser.no }}
          </td>
          <td class="align-middle">
            {{ companyUser.company.nameKr }}
          </td>
          <td class="align-middle">
            {{ companyUser.name }}
          </td>
          <td class="align-middle">
            {{ companyUser.phone }}
          </td>
          <td class="align-middle">
            {{ companyUser.email }}
          </td>
          <td class="align-middle">
            {{ companyUser.createdAt | dateTransformer }}
          </td>
          <td class="align-middle">
            <span class="badge badge-pill badge-warning p-2">
              {{ companyUser.codeManagement.value }}
            </span>
          </td>
          <td class="align-middle">
            <router-link
              v-if="companyUser.no"
              class="btn btn-sm btn-secondary"
              :to="{
                name: 'CompanyUserDetail',
                params: {
                  id: companyUser.no,
                },
              }"
            >
              상세보기
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <b-pagination
      v-model="pagination.page"
      v-if="companyUserListTotalCount"
      pills
      :total-rows="companyUserListTotalCount"
      :per-page="pagination.limit"
      @input="paginateSearch"
      class="mt-4 justify-content-center"
    ></b-pagination>
    <div class="half-circle-spinner mt-5" v-else>
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import { CompanyUserListDto, CompanyUserDto, CompanyDto } from '../../../dto';
import { Pagination } from '../../../common';
import CompanyUserService from '../../../services/company-user.service';
import CompanyService from '../../../services/company.service';
import {
  CONST_APPROVAL_STATUS,
  APPROVAL_STATUS,
} from '../../../services/shared';

@Component({
  name: 'CompanyList',
})
export default class Company extends BaseComponent {
  private companyUserSearchDto = new CompanyUserListDto();
  private companyUserListDto: CompanyUserDto[] = Array<CompanyUserDto>();
  private companyUserListTotalCount = 0;
  private companySelect: CompanyDto[] = [];
  private pagination = new Pagination();
  private approvalStatus: APPROVAL_STATUS[] = [...CONST_APPROVAL_STATUS];
  private totalPage = 0;

  // TODO: Create autocomplete box
  getCompanies() {
    CompanyService.findForSelect().subscribe(res => {
      this.companySelect = res.data;
    });
  }

  paginateSearch() {
    this.search(true);
  }

  clearOut() {
    this.pagination = new Pagination();
    this.companyUserSearchDto = new CompanyUserListDto();
    this.search();
  }

  search(isPagination?: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    CompanyUserService.findAll(
      this.companyUserSearchDto,
      this.pagination,
    ).subscribe(res => {
      this.companyUserListDto = res.data.items;
      this.companyUserListTotalCount = res.data.totalCount;
      this.totalPage = Math.ceil(
        this.companyUserListTotalCount / this.pagination.limit,
      );
    });
  }

  created() {
    this.search();
    this.getCompanies();
  }
}
</script>
