<template>
  <div v-if="!dataLoading">
    <table class="table table-hover" v-if="companyListCount">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NAME</th>
          <th scope="col">CEO</th>
          <th scope="col">PHONE</th>
          <th scope="col">STATUS</th>
          <th scope="col">VIEW</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="company in companyDto" :key="company.no">
          <th scope="row">
            <router-link
              :to="{
                name: 'CompanyDetail',
                params: { id: company.no },
              }"
              class="text-primary"
            >
              {{ company.no }}
            </router-link>
          </th>
          <td>
            <router-link
              :to="{
                name: 'CompanyDetail',
                params: { id: company.no },
              }"
            >
              {{ company.nameKr }}
            </router-link>
          </td>
          <td>{{ company.ceoKr }}</td>
          <td>{{ company.phone | phoneTransformer }}</td>
          <td>
            <span
              class="badge badge-pill badge-warning p-2"
              v-if="company.codeManagement"
              >{{ company.codeManagement.value }}</span
            >
          </td>
          <td>
            <router-link
              class="btn btn-sm btn-secondary"
              :to="{
                name: 'CompanyDetail',
                params: { id: company.no },
              }"
            >
              상세보기
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="empty-data" v-else>승인 수정 요청 내역 없음</div>
  </div>
  <div class="half-circle-spinner my-5" v-else>
    <div class="circle circle-1"></div>
    <div class="circle circle-2"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import CompanyService from '../../../services/company.service';
import { CompanyDto, CompanyListDto } from '../../../dto';
import { Pagination } from '../../../common';
import { APPROVAL_STATUS } from '../../../services/shared';

@Component({
  name: 'DashboardCompanyList',
})
export default class DashboardCompanyList extends BaseComponent {
  private pagination = new Pagination();
  private companyListDto = new CompanyListDto();
  private companyListCount = null;
  private companyDto: CompanyDto[] = [];
  private dataLoading = false;

  getCompanyUpdateStatusList() {
    this.dataLoading = true;
    this.pagination.limit = 2;
    this.companyListDto.companyStatus = APPROVAL_STATUS.UPDATE_APPROVAL;
    CompanyService.findAll(this.companyListDto, this.pagination).subscribe(
      res => {
        this.dataLoading = false;
        this.companyDto = res.data.items;
        this.companyListCount = res.data.totalCount;
      },
    );
  }

  mounted() {
    this.getCompanyUpdateStatusList();
  }
}
</script>
