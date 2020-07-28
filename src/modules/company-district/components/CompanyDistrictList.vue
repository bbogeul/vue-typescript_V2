<template>
  <div>
    <div class="title d-flex justify-content-between align-items-end mb-2">
      <h3>업체 지점 관리</h3>
      <div>
        <!-- <b-button variant="primary" @click="createCompanyDistrict()"
          >등록하기</b-button
        >-->
      </div>
    </div>
    <div class="divider"></div>
    <div class="search-box my-4">
      <b-form-row v-on:keyup.enter="search()">
        <b-col sm="12" lg="3">
          <label>지점 ID</label>
          <b-form-input type="text" v-model="companyDistrictListDto.no"></b-form-input>
        </b-col>
        <b-col sm="12" lg="3">
          <label>지점명</label>
          <b-form-input type="text" v-model="companyDistrictListDto.nameKr"></b-form-input>
        </b-col>
        <b-col sm="12" lg="3">
          <label>주소</label>
          <b-form-input type="text" v-model="companyDistrictListDto.address"></b-form-input>
        </b-col>
        <b-col sm="12" lg="3">
          <label>지점 승인 상태</label>
          <b-form-select v-model="companyDistrictListDto.companyDistrictStatus">
            <b-select-option value>전체</b-select-option>
            <b-form-select-option
              v-for="status in approvalStatus"
              :key="status"
              :value="status"
            >{{ status | enumTransformer }}</b-form-select-option>
          </b-form-select>
        </b-col>
      </b-form-row>
      <b-row align-h="center" class="mt-4">
        <b-button variant="primary" @click="clearOut()">초기화</b-button>
        <b-button variant="success" @click="search()">검색</b-button>
      </b-row>
    </div>
    <table class="table table-hover border-top border-secondary table-border">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NAME</th>
          <th scope="col">ADDRESS</th>
          <th scope="col">DATE</th>
          <th scope="col">STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="district in companyDistrictList" :key="district.no">
          <td>{{ district.no }}</td>
          <td>{{ district.nameKr }}</td>
          <td>{{ district.address }}</td>
          <td>
            등록일 : {{ district.createdAt | dateTransformer }}
            <br />
            <span class="text-primary">수정일 : {{ district.updatedAt | dateTransformer }}</span>
          </td>
          <td>
            <span class="badge badge-pill badge-warning p-2">
              {{
              district.companyDistrictStatus | enumTransformer
              }}
            </span>
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
      @input="search(true)"
      class="mt-4 justify-content-center"
    ></b-pagination>
  </div>
</template>
<script lang="ts">
import BaseComponent from '../../../core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import { CompanyDistrictDto, CompanyDistrictListDto } from '../../../dto';
import CompanyDistrictService from '../../../services/company-district.service';
import { Pagination } from '../../../common';
import { CodeManagementDto } from '../../../services/init/dto';
import {
  APPROVAL_STATUS,
  CONST_APPROVAL_STATUS,
} from '../../../services/shared';

@Component({
  name: 'CompanyDistrictList',
})
export default class CompanyDistrictList extends BaseComponent {
  private companyDistrictList: CompanyDistrictDto[] = Array<
    CompanyDistrictDto
  >();
  private companyDistrictListCount = 0;
  private companyDistrictListDto = new CompanyDistrictListDto();
  private pagination = new Pagination();
  private approvalStatus: APPROVAL_STATUS[] = [...CONST_APPROVAL_STATUS];

  search(isPagination?: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    CompanyDistrictService.findAll(
      this.companyDistrictListDto,
      this.pagination,
    ).subscribe(res => {
      this.companyDistrictList = res.data.items;
      this.companyDistrictListCount = res.data.totalCount;
    });
  }

  clearOut() {
    console.log('초기화');
  }

  created() {
    this.search();
  }
}
</script>
