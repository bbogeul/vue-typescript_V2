<template>
  <div v-if="companyDistrictListCount > 0">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">
            NO
          </th>
          <th scope="col">
            NAME
          </th>
          <th scope="col">
            ADDRESS
          </th>
          <th scope="col">
            STATUS
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="district in companyDistrictList" :key="district.no">
          <th scope="row">
            <router-link
              :to="{
                name: 'CompanyDistrictDetail',
                params: {
                  id: district.no,
                },
              }"
              class="text-primary"
            >
              {{ district.no }}
            </router-link>
          </th>
          <td>
            <router-link
              :to="{
                name: 'CompanyDistrictDetail',
                params: {
                  id: district.no,
                },
              }"
            >
              {{ district.nameKr }}
            </router-link>
          </td>
          <td>{{ district.address }}</td>
          <td>
            <router-link
              :to="{
                name: 'CompanyDistrictDetail',
                params: {
                  id: district.no,
                },
              }"
              class="text-primary"
            >
              <span class="badge badge-pill badge-warning p-2">
                {{ district.companyDistrictStatus | enumTransformer }}
              </span>
            </router-link>
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
  <div v-else class="empty-data">
    지점 없음
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
