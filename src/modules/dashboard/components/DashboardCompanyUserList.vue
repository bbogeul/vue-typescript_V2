<template>
  <div>
    <div class="title">
      <h4 class="d-inline-block">사용자 수정요청</h4>
      <router-link
        to="/company/company-user"
        class="btn btn-primary float-right"
      >
        더 보기
      </router-link>
    </div>
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NAME</th>
          <th scope="col">COMPANY</th>
          <th scope="col">PHONE</th>
          <th scope="col">STATUS</th>
          <th scope="col">VIEW</th>
        </tr>
      </thead>
      <tbody v-if="companyUserListCount > 0">
        <tr v-for="companyUser in companyUserDto" :key="companyUser.no">
          <th scope="row">
            <router-link
              :to="{
                name: 'CompanyUserDetail',
                params: { id: companyUser.no },
              }"
              class="text-primary"
            >
              {{ companyUser.no }}
            </router-link>
          </th>
          <td>
            <router-link
              :to="{
                name: 'CompanyUserDetail',
                params: { id: companyUser.no },
              }"
            >
              {{ companyUser.name }}
            </router-link>
          </td>
          <td>
            <router-link
              :to="{
                name: 'CompanyDetail',
                params: { id: companyUser.company.no },
              }"
            >
              {{ companyUser.company.nameKr }}
            </router-link>
          </td>
          <td>{{ companyUser.phone | phoneTransformer }}</td>

          <td>
            <router-link
              :to="{
                name: 'CompanyUserDetail',
                params: { id: companyUser.no },
              }"
            >
              <span class="badge badge-pill badge-warning p-2">{{
                companyUser.codeManagement.value
              }}</span>
            </router-link>
          </td>
          <td>
            <router-link
              class="btn btn-sm btn-secondary"
              :to="{
                name: 'CompanyUserDetail',
                params: { id: companyUser.no },
              }"
              >상세보기</router-link
            >
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="6" class="empty-data">승인 수정 요청 내역 없음</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import CompanyUserService from '../../../services/company-user.service';
import CompanyService from '../../../services/company.service';
import {
  CompanyUserListDto,
  CompanyUserDto,
  CompanyDto,
  CompanyListDto,
} from '../../../dto';
import { Pagination } from '../../../common';
import { APPROVAL_STATUS } from '../../../services/shared';

@Component({
  name: 'DashboardCompanyUserList',
})
export default class DashboardCompanyUserList extends BaseComponent {
  private companyUserDto: CompanyUserDto[] = [];
  private pagination = new Pagination();
  private companyUserListDto = new CompanyUserListDto();
  private companyUserListCount = null;

  // TODO: 등록 승인 요청, 수정 승인 요청 건 둘다 노출 필요
  getUserWithUpdateStatus() {
    this.pagination.limit = 2;
    this.companyUserListDto.companyUserStatus = APPROVAL_STATUS.UPDATE_APPROVAL;
    CompanyUserService.findAll(
      this.companyUserListDto,
      this.pagination,
    ).subscribe(res => {
      const data = res.data;
      this.companyUserDto = data.items;
      this.companyUserListCount = data.totalCount;
    });
  }

  created() {
    this.getUserWithUpdateStatus();
  }
}
</script>
