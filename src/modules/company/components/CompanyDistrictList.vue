import BaseComponent from '@/core/base.component';

<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>
            NO
          </th>
          <th>
            NAME
          </th>
          <th>
            ADDRESS
          </th>
          <th>
            STATUS
          </th>
        </tr>
      </thead>
      <tbody v-if="true">
        <tr v-for="company in companyDistrictList" :key="company.no">
          <td>{{ company.no }}</td>
          <td>{{ company.nameKr }}</td>
          <td>{{ company.address }}</td>
          <td>
            <span class="badge badge-pill badge-warning p-2">
              {{ company.companyDistrictStatus | enumTransformer }}
            </span>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="4" class="empty-data">
            <p>지점을 등록해주세요</p>
          </td>
        </tr>
      </tbody>
    </table>
    <b-pagination
      v-model="pagination.page"
      v-if="companyDistrictListCount"
      pills
      :total-rows="companyDistrictListCount"
      :per-page="pagination.limit"
      @input="paginateSearch"
      class="mt-4 justify-content-center"
    ></b-pagination>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import { CompanyDistrictListDto, CompanyDistrictDto } from '../../../dto';
import CompanyDistrictService from '../../../services/company-district.service';
import { Pagination } from '@/common';

@Component({
  name: 'CompanyDistrictList',
})
export default class CompanyDistrictList extends BaseComponent {
  private pagination = new Pagination();
  private companyDistrictListDto = new CompanyDistrictListDto();
  private companyDistrictList: CompanyDistrictDto[] = [];
  private companyDistrictListCount = 0;

  findDistrict(isPagination: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = 5;

    this.companyDistrictListDto.companyNo = parseInt(this.$route.params.id);
    CompanyDistrictService.findAll(
      this.companyDistrictListDto,
      this.pagination,
    ).subscribe(res => {
      console.log(res);
      this.companyDistrictList = res.data.items;
      this.companyDistrictListCount = res.data.totalCount;
    });
  }

  paginateSearch() {
    this.findDistrict(true);
  }

  created() {
    this.findDistrict(true);
  }
}
</script>
