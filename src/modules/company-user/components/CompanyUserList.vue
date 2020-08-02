<template>
  <section>
    <div class="title pb-2 mb-2">
      <h3>업체 사용자 관리</h3>
    </div>
    <div class="divider"></div>
    <div class="serach-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="6" md="2" class="mb-2">
          <label for="username">사용자 ID</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="companyUserSearchDto.no"
          />
        </b-col>
        <b-col cols="6" md="2" class="mb-3">
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
        </b-col>
        <b-col cols="6" md="2" class="mb-3">
          <label>사용자명</label>
          <input
            type="text"
            class="form-control"
            v-model="companyUserSearchDto.name"
          />
        </b-col>
        <b-col cols="6" md="3" class="mb-3">
          <label>사용자 전화번호</label>
          <input
            type="text"
            class="form-control"
            v-model="companyUserSearchDto.phone"
          />
        </b-col>
        <b-col cols="6" md="3" class="mb-3">
          <label>사용자 이메일</label>
          <input
            type="text"
            class="form-control"
            v-model="companyUserSearchDto.email"
          />
        </b-col>
        <b-col cols="6" md="2" class="mb-3">
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
        </b-col>
      </b-form-row>
      <div class="text-center">
        <div class="btn-group mb-4">
          <button class="btn btn-primary" @click="clearOut()">초기화</button>
          <button class="btn btn-success" @click="search()">검색</button>
        </div>
      </div>
    </div>
    <div class="table-top">
      <div class="total-count">
        <h5>
          <span>TOTAL</span>
          <strong class="text-primary">{{ companyUserListTotalCount }}</strong>
        </h5>
      </div>
      <b-button
        variant="primary"
        v-b-modal.add_company_user
        @click="clearOutCompanyUserDto()"
        >업체 사용자 추가</b-button
      >
    </div>
    <table
      class="table table-bordered table-hover table-sm text-center"
      v-if="!dataLoading"
    >
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
              highlighted: companyUserSearchDto.companyNo,
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
            v-bind:class="{
              highlighted: companyUserSearchDto.companyUserStatus,
            }"
          >
            STATUS
          </th>
          <th scope="col"></th>
        </tr>
      </thead>

      <tbody v-if="companyUserListTotalCount">
        <tr v-for="companyUser in companyUserListDto" :key="companyUser.no">
          <th scope="row">{{ companyUser.no }}</th>
          <td>{{ companyUser.company.nameKr }}</td>
          <td>
            <strong
              class="text-danger"
              v-if="companyUser.authCode === companyUserAdminRole[0]"
              >M</strong
            >
            {{ companyUser.name }}
          </td>
          <td>{{ companyUser.phone }}</td>
          <td>{{ companyUser.email }}</td>
          <td>
            {{ companyUser.createdAt | dateTransformer }}
          </td>
          <td>
            <span class="badge badge-pill badge-warning p-2">{{
              companyUser.codeManagement.value
            }}</span>
          </td>
          <td>
            <router-link
              v-if="companyUser.no"
              class="btn btn-sm btn-secondary"
              :to="{
                name: 'CompanyUserDetail',
                params: {
                  id: companyUser.no,
                },
              }"
              >상세보기</router-link
            >
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="8" class="empty-data">검색결과가 없습니다.</td>
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
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
    <b-modal
      id="add_company_user"
      title="업체 사용자 추가하기"
      size="xl"
      @ok="createCompanyUser()"
    >
      <div class="form-row">
        <div class="col-12 col-md-6">
          <label>사용자 이름</label>
          <input
            type="text"
            v-model="companyUserCreateDto.name"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6">
          <label>사용자 전회번호</label>
          <input
            type="text"
            v-model="companyUserCreateDto.phone"
            class="form-control"
          />
        </div>
      </div>
      <div class="form-row mt-3">
        <div class="col-12 col-md-6">
          <label for="password">비밀번호</label>
          <input
            type="password"
            class="form-control"
            v-model="companyUserCreateDto.password"
          />
        </div>
        <div class="col-12 col-md-6">
          <label for="password">비밀번호 확인</label>
          <input
            type="password"
            class="form-control"
            v-model="companyUserCreateDto.passwordConfirm"
          />
        </div>
      </div>
      <div class="form-row mt-3">
        <div class="col-12 col-md-6">
          <label>이메일</label>
          <input
            type="text"
            v-model="companyUserCreateDto.email"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6">
          <label for></label>
          <label>업체 선택</label>
          <select
            class="custom-select"
            v-model="companyUserCreateDto.companyNo"
          >
            <option
              v-for="company in companySelect"
              :key="company.no"
              :value="company.no"
              >{{ company.nameKr }}</option
            >
          </select>
        </div>
      </div>
      <div class="form-row mt-3">
        <div class="col-12 col-md-6">
          <label>사용자 승인 상태</label>
          <select
            class="custom-select"
            v-model="companyUserCreateDto.companyUserStatus"
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
        <div class="col-12 col-md-6">
          <label>관리자 등급</label>
          <select class="custom-select" v-model="companyUserCreateDto.authCode">
            <option
              v-for="role in companyUserAdminRole"
              :key="role"
              :value="role"
              >{{ role | enumTransformer }}</option
            >
          </select>
        </div>
      </div>
    </b-modal>
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
  COMPANY_USER,
  CONST_COMPANY_USER,
} from '../../../services/shared';
import { BaseUser } from '../../../services/shared/auth';

@Component({
  name: 'CompanyList',
})
export default class Company extends BaseComponent {
  private companyUserSearchDto = new CompanyUserListDto();
  private companyUserListDto: CompanyUserDto[] = Array<CompanyUserDto>();
  private companyUserListTotalCount = null;
  private companySelect: CompanyDto[] = [];
  private companyUserCreateDto = new CompanyUserDto(BaseUser);
  private pagination = new Pagination();
  private approvalStatus: APPROVAL_STATUS[] = [...CONST_APPROVAL_STATUS];
  private companyUserAdminRole: COMPANY_USER[] = [...CONST_COMPANY_USER];
  private totalPage = null;
  private dataLoading = false;

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

  clearOutCompanyUserDto() {
    this.companyUserCreateDto = new CompanyUserDto(BaseUser);
  }

  search(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    CompanyUserService.findAll(
      this.companyUserSearchDto,
      this.pagination,
    ).subscribe(res => {
      this.dataLoading = false;
      this.companyUserListDto = res.data.items;
      this.companyUserListTotalCount = res.data.totalCount;
      this.totalPage = Math.ceil(
        this.companyUserListTotalCount / this.pagination.limit,
      );
    });
  }

  // 사용자 생성
  createCompanyUser() {
    CompanyUserService.createCompanyUser(this.companyUserCreateDto).subscribe(
      res => {
        this.search();
        this.getCompanies();
      },
    );
  }

  created() {
    this.search();
    this.getCompanies();
  }
}
</script>
