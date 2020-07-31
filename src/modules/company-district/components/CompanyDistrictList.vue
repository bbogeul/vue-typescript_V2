<template>
  <div>
    <div class="title d-flex justify-content-between align-items-end mb-2">
      <h3>업체 지점 관리</h3>
    </div>
    <div class="divider"></div>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col sm="12" lg="1" class="mb-3">
          <label>지점 ID</label>
          <b-form-input
            type="text"
            v-model="companyDistrictSearchDto.no"
          ></b-form-input>
        </b-col>
        <b-col>
          <label>업체명</label>
          <select
            class="custom-select"
            v-model="companyDistrictSearchDto.companyNo"
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
        <b-col sm="12" lg="3" class="mb-3">
          <label>지점명</label>
          <b-form-input
            type="text"
            v-model="companyDistrictSearchDto.nameKr"
          ></b-form-input>
        </b-col>
        <b-col sm="12" lg="3" class="mb-3">
          <label>주소</label>
          <b-form-input
            type="text"
            v-model="companyDistrictSearchDto.address"
          ></b-form-input>
        </b-col>
        <b-col sm="12" lg="3" class="mb-3">
          <label>지점 승인 상태</label>
          <b-form-select
            v-model="companyDistrictSearchDto.companyDistrictStatus"
          >
            <b-select-option value>전체</b-select-option>
            <b-form-select-option
              v-for="status in approvalStatus"
              :key="status"
              :value="status"
              >{{ status | enumTransformer }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
      </b-form-row>
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
          <strong class="text-primary">{{ companyDistrictListCount }}</strong>
        </h5>
      </div>
      <b-button
        variant="primary"
        v-b-modal.add_company_district
        @click="clearOutCompanyDistrctDto()"
        >업체 지점 추가</b-button
      >
    </div>
    <table class="table table-sm table-hover table-bordered table-border">
      <thead>
        <tr>
          <th
            scope="col"
            v-bind:class="{
              highlighted: companyDistrictSearchDto.no,
            }"
          >
            ID
          </th>
          <th
            scope="col"
            v-bind:class="{
              highlighted: companyDistrictSearchDto.companyNo,
            }"
          >
            COMPANY
          </th>
          <th
            scope="col"
            v-bind:class="{
              highlighted: companyDistrictSearchDto.nameKr,
            }"
          >
            NAME
          </th>
          <th
            scope="col"
            v-bind:class="{
              highlighted: companyDistrictSearchDto.address,
            }"
          >
            ADDRESS
          </th>
          <th
            scope="col"
            v-bind:class="{
              highlighted: companyDistrictSearchDto.createdAt,
            }"
          >
            CREATED
          </th>
          <th
            scope="col"
            v-bind:class="{
              highlighted: companyDistrictSearchDto.companyDistrictStatus,
            }"
          >
            STATUS
          </th>
          <th scope="col">
            VIEW
          </th>
        </tr>
      </thead>
      <tbody v-if="companyDistrictListCount > 0">
        <tr v-for="district in companyDistrictList" :key="district.no">
          <td>{{ district.no }}</td>
          <td>{{ district.company.nameKr }}</td>
          <td>{{ district.nameKr }}</td>
          <td>{{ district.address }}</td>
          <td>
            {{ district.createdAt | dateTransformer }}
            <!-- <br />
            <span class="text-primary"
              >수정일 : {{ district.updatedAt | dateTransformer }}</span
            > -->
          </td>
          <td>
            <span class="badge badge-pill badge-warning p-2">
              {{ district.companyDistrictStatus | enumTransformer }}
              {{ companyDistrictList.no }}
            </span>
          </td>
          <td>
            <router-link
              class="btn btn-sm btn-secondary"
              :to="{
                name: 'CompanyDistrictDetail',
                params: {
                  id: district.no,
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
          <td colspan="7" class="empty-data">
            검색결과가 없습니다.
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
    <b-modal
      id="add_company_district"
      title="업체 지점 추가하기"
      size="xl"
      @ok="createCompanyDidstrict()"
    >
      <div class="form-row">
        <div class="col-12 col-md-6 mt-2">
          <label>업체 지점명</label>
          <input
            type="text"
            v-model="companyDistrictCreateDto.nameKr"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label>업체 지점명(영문)</label>
          <input
            type="text"
            v-model="companyDistrictCreateDto.nameEng"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label>주소</label>
          <input
            type="text"
            v-model="companyDistrictCreateDto.address"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label>업체 지점 승인 상태</label>
          <select
            class="custom-select"
            v-model="companyDistrictCreateDto.companyStatus"
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
        <div class="col-12 col-md-6 mt-2">
          <label for></label>
          <label>업체 선택</label>
          <select
            class="custom-select"
            v-model="companyDistrictCreateDto.companyNo"
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
    </b-modal>
  </div>
</template>
<script lang="ts">
import BaseComponent from '../../../core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import {
  CompanyDto,
  CompanyDistrictDto,
  CompanyDistrictListDto,
} from '../../../dto';
import CompanyService from '../../../services/company.service';
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
  private companyDistrictSearchDto = new CompanyDistrictListDto();
  private pagination = new Pagination();
  private approvalStatus: APPROVAL_STATUS[] = [...CONST_APPROVAL_STATUS];
  private companyDistrictCreateDto = new CompanyDistrictDto();
  private companySelect: CompanyDto[] = [];

  getCompanies() {
    CompanyService.findForSelect().subscribe(res => {
      this.companySelect = res.data;
    });
  }

  search(isPagination?: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    CompanyDistrictService.findAll(
      this.companyDistrictSearchDto,
      this.pagination,
    ).subscribe(res => {
      this.companyDistrictList = res.data.items;
      this.companyDistrictListCount = res.data.totalCount;
    });
  }

  clearOut() {
    this.pagination = new Pagination();
    this.companyDistrictSearchDto = new CompanyDistrictListDto();
    this.search();
  }

  createCompanyDidstrict() {
    CompanyDistrictService.createCompanyDistrict(
      this.companyDistrictCreateDto,
    ).subscribe(res => {
      this.search();
      this.getCompanies();
    });
  }

  clearOutCompanyDistrctDto() {
    this.companyDistrictCreateDto = new CompanyDistrictDto();
  }

  created() {
    this.search();
    this.getCompanies();
  }
}
</script>
