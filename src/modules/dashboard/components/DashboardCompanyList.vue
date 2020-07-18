<template>
  <div>
    <div class="title">
      <h5 class="d-inline-block">업체 수정요청</h5>
      <button type="button" class="btn btn-primary float-right">더 보기</button>
    </div>
    <table class="table table-bordered" v-if="companyListCount > 0">
      <thead class="thead-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NAME</th>
          <th scope="col">CEO</th>
          <th scope="col">PHONE</th>

          <th scope="col">STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="company in companyListDto" :key="company.no">
          <th scope="row">{{ company.no }}</th>
          <td>{{ company.nameKr }}</td>
          <td>{{ company.ceoKr }}</td>
          <td>{{ company.phone }}</td>
          <td>
            <span
              class="badge badge-pill badge-warning"
              v-if="company.codeManagement"
            >
              {{ company.codeManagement.value }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
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

  getCompanyUpdateStatusList() {
    this.pagination.limit = 5;
    this.companyListDto.companyStatus = APPROVAL_STATUS.UPDATE_APPROVAL;
    CompanyService.getAll(this.companyListDto, this.pagination).subscribe(
      res => {
        const data = res.data;
        this.companyListDto = data.items;
        this.companyListCount = data.totalCount;
      },
    );
  }

  mounted() {
    this.getCompanyUpdateStatusList();
  }
}
</script>
