<template>
  <div>
    <div class="title">
      <h5 class="d-inline-block">사용자 수정요청</h5>
      <button type="button" class="btn btn-primary float-right">더 보기</button>
    </div>
    <table class="table table-bordered" v-if="companyUserListCount > 0">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NAME</th>
          <th scope="col">COMPANY</th>
          <th scope="col">PHONE</th>

          <th scope="col">STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="companyUser in companyUserDto" :key="companyUser.no">
          <th scope="row">{{ companyUser.no }}</th>
          <td>{{ companyUser.name }}</td>
          <td>{{ companyUser.company.nameKr }}</td>
          <td>{{ companyUser.phone }}</td>

          <td>
            <span class="badge badge-pill badge-warning">{{ companyUser.codeManagement.value }}</span>
          </td>
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

  getUserWithUpdateStatus() {
    this.pagination.limit = 5;
    this.companyUserListDto.companyUserStatus = APPROVAL_STATUS.UPDATE_APPROVAL;
    CompanyUserService.getAll(
      this.companyUserListDto,
      this.pagination,
    ).subscribe(res => {
      const data = res.data;
      this.companyUserDto = data.items;
      this.companyUserListCount = data.totalCount;
    });
  }

  mounted() {
    this.getUserWithUpdateStatus();
  }
}
</script>
