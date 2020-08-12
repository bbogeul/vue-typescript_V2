<template>
  <section>
    <div class="title pb-2 mb-2">
      <h3>배달형 방문자 신청 관리</h3>
    </div>
    <div class="divider"></div>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <div class="form-row">
        <div class="col-6 col-lg-1 mb-3">
          <label for="space_id">공간 ID</label>
          <input
            type="text"
            class="form-control"
            id="space_id"
            v-model="deliveryFounderConsultSearchDto.spaceNo"
          />
        </div>
        <div class="col-6 col-lg-2 mb-3">
          <label for="user_name">사용자명</label>
          <input
            type="text"
            class="form-control"
            id="user_name"
            v-model="deliveryFounderConsultSearchDto.nanudaUserName"
          />
        </div>
        <div class="col-6 col-lg-3 mb-3">
          <label for="user_phone">휴대폰 번호</label>
          <input
            type="text"
            class="form-control"
            id="user_phone"
            v-model="deliveryFounderConsultSearchDto.phone"
          />
        </div>
        <div class="col-6 col-lg-1 mb-3">
          <label for="user_gender">성별</label>
          <select
            class="custom-select"
            id="user_gender"
            v-model="deliveryFounderConsultSearchDto.gender"
          >
            <option value selected>전체</option>
            <option
              v-for="gender in genderSelect"
              :key="gender"
              :value="gender"
              >{{ gender | enumTransformer }}</option
            >
          </select>
        </div>
        <div class="col-6 col-lg-1 mb-3">
          <label for="changup_exp_yn">창업 경험</label>
          <select
            class="custom-select"
            id="changup_exp_yn"
            v-model="deliveryFounderConsultSearchDto.changUpExpYn"
          >
            <option value selected>전체</option>
            <option v-for="yn in delYn" :key="yn" :value="yn">{{
              yn | enumTransformer
            }}</option>
          </select>
        </div>
        <div class="col-6 col-lg-2 mb-3">
          <label for="company">업체명</label>
          <select
            class="custom-select"
            id="company"
            v-model="deliveryFounderConsultSearchDto.companyNo"
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
        <div class="col-12 col-lg-2 mb-3">
          <label for="company_district">업체 지점</label>
          <input
            type="text"
            class="form-control"
            id="company_district"
            v-model="deliveryFounderConsultSearchDto.companyDistrictNameKr"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="col-lg-4 mb-3">
          <label for="space_address">지점 주소</label>
          <input
            type="text"
            class="form-control"
            id="space_address"
            v-model="deliveryFounderConsultSearchDto.address"
          />
        </div>
        <div class="col-6 col-lg-2 mb-3">
          <label for="admin_user">관리자명</label>
          <template>
            <b-form-input
              list="admin_list"
              id="admin_user"
              v-model="deliveryFounderConsultSearchDto.adminName"
            ></b-form-input>
            <datalist id="admin_list">
              <option
                v-for="admin in adminList.items"
                :key="admin.no"
                :value="admin.name"
                >{{ admin.name }}</option
              >
            </datalist>
          </template>
        </div>

        <div class="col-6 col-lg-2 mb-3">
          <label for="hope_time">희망 시간대</label>
          <select
            class="custom-select"
            id="hope_time"
            v-model="deliveryFounderConsultSearchDto.hopeTime"
          >
            <option value selected>전체</option>
            <option
              v-for="time in availableTimesSelect"
              :key="time.no"
              :value="time.key"
              >{{ time.value }}</option
            >
          </select>
        </div>
        <div class="col-6 col-lg-2 mb-3">
          <label for="status">신청 상태</label>
          <select
            class="custom-select"
            id="status"
            v-model="deliveryFounderConsultSearchDto.status"
          >
            <option value selected>전체</option>
            <option
              v-for="status in founderConsultStatusSelect"
              :key="status.no"
              :value="status.key"
              >{{ status.value }}</option
            >
          </select>
        </div>
        <div class="col-6 col-lg-2 mb-3">
          <label for="view_count">열람 유무</label>
          <select
            class="custom-select"
            id="view_count"
            v-model="deliveryFounderConsultSearchDto.viewCount"
          >
            <option value selected>전체</option>
            <option v-for="yn in delYn" :key="yn" :value="yn">{{
              yn | viewTransformer
            }}</option>
          </select>
        </div>
      </div>
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
          <strong class="text-primary">
            {{ deliveryFounderConsultListCount }}
          </strong>
        </h5>
      </div>
    </div>
    <div v-if="!dataLoading">
      <table
        class="table table-bordered table-hover table-sm table-responsive text-center"
        v-if="deliveryFounderConsultListCount"
      >
        <thead>
          <tr>
            <th scope="col">NO</th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.spaceNo,
              }"
            >
              SPACE ID
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.nanudaUserName,
              }"
            >
              USER NAME
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.phone,
              }"
            >
              USER PHONE
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.gender,
              }"
            >
              GENDER
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.address,
              }"
            >
              ADDRESS
            </th>

            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.companyNo,
              }"
            >
              COMPANY
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted:
                  deliveryFounderConsultSearchDto.companyDistrictNameKr,
              }"
            >
              DISTRICT
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.hopeTime,
              }"
            >
              AVAILABLE TIME
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.changUpExpYn,
              }"
            >
              EXPERIENCE
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.viewCount,
              }"
            >
              VIEW
            </th>
            <th scope="col">CREATED</th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.adminUserName,
              }"
            >
              ADMIN
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.status,
              }"
            >
              STATUS
            </th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="founderConsult in deliveryFounderConsultList"
            :key="founderConsult.no"
          >
            <th scope="row">
              {{ founderConsult.no }}
            </th>
            <td>
              {{ founderConsult.spaceNo }}
            </td>
            <td>{{ founderConsult.nanudaUser.name }}</td>
            <td>{{ founderConsult.nanudaUser.phone }}</td>
            <td>
              <div v-if="founderConsult.nanudaUser.genderInfo">
                {{ founderConsult.nanudaUser.genderInfo.value }}
              </div>
            </td>
            <td class="text-left">
              <div v-if="founderConsult.space">
                {{ founderConsult.space.address }}
                {{ founderConsult.space.detailAddress }}
              </div>
            </td>
            <td v-if="founderConsult.space.companyDistricts">
              <div
                v-for="company in founderConsult.space.companyDistricts"
                :key="company.no"
              >
                <div v-if="company.company.nameKr">
                  <router-link
                    :to="{
                      name: 'CompanyDetail',
                      params: {
                        id: company.company.no,
                      },
                    }"
                    >{{ company.company.nameKr }}</router-link
                  >
                </div>
              </div>
            </td>
            <td>
              <div
                v-for="company in founderConsult.space.companyDistricts"
                :key="company.no"
              >
                <div v-if="company.company.nameKr">{{ company.nameKr }}</div>
              </div>
            </td>
            <td>
              <div v-if="founderConsult.availableTime">
                {{ founderConsult.availableTime.value }}
              </div>
            </td>
            <td>
              <b-badge
                v-if="founderConsult.changUpExpYn"
                :variant="
                  founderConsult.changUpExpYn === 'Y' ? 'success' : 'danger'
                "
              >
                {{ founderConsult.changUpExpYn }}
              </b-badge>
              <div v-else>
                -
              </div>
            </td>
            <td>
              <div v-if="founderConsult.viewCount">
                <b-badge
                  :variant="
                    founderConsult.viewCount === 'Y' ? 'success' : 'danger'
                  "
                >
                  {{ founderConsult.viewCount }}
                </b-badge>
              </div>
            </td>
            <td>
              {{ founderConsult.createdAt | dateTransformer }}
            </td>
            <td>
              <div v-if="founderConsult.admin">
                {{ founderConsult.admin.name }}
              </div>
              <div v-else>
                -
              </div>
            </td>
            <td>
              <b-badge variant="warning" class="badge-pill p-2">{{
                founderConsult.codeManagement.value
              }}</b-badge>
            </td>
            <td>
              <router-link
                v-if="founderConsult.space"
                class="btn btn-sm btn-secondary text-nowrap"
                :to="{
                  name: 'FounderConsultDetail',
                  params: {
                    id: founderConsult.no,
                  },
                }"
                >상세보기</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty-data border">검색결과가 없습니다.</div>
    </div>
    <b-pagination
      v-model="pagination.page"
      v-if="deliveryFounderConsultListCount"
      pills
      :total-rows="deliveryFounderConsultListCount"
      :per-page="pagination.limit"
      @input="paginateSearch"
      class="mt-4 justify-content-center"
    ></b-pagination>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import {
  FOUNDER_CONSULT,
  CONST_FOUNDER_CONSULT,
  GENDER,
  CONST_GENDER,
} from '../../../services/shared';
import { CodeManagementDto } from '../../../services/init/dto';

import AdminService from '../../../services/admin.service';
import CompanyService from '../../../services/company.service';
import CodeManagementService from '../../../services/code-management.service';
import FounderConsultService from '../../../services/founder-consult.service';
import SpaceTypeService from '../../../services/space-type.service';

import {
  AdminDto,
  DeliveryFounderConsultListDto,
  CompanyDto,
  DeliveryFounderConsultDto,
} from '../../../dto';
import {
  Pagination,
  CONST_OBJECT_BY_VALUE,
  OrderByValue,
  YN,
  CONST_YN,
} from '../../../common';

@Component({
  name: 'DeliveryFounderConsultList',
})
export default class DeliveryFounderConsult extends BaseComponent {
  private deliveryFounderConsultSearchDto = new DeliveryFounderConsultListDto();
  private deliveryFounderConsultList: DeliveryFounderConsultDto[] = [];
  private deliveryFounderConsultListCount = 0;
  private founderConsultStatusSelect: CodeManagementDto[] = [];
  private availableTimesSelect: CodeManagementDto[] = [];
  private companySelect: CompanyDto[] = [];
  private totalPage = 0;
  private delYn: YN[] = [...CONST_YN];
  private genderSelect: GENDER[] = [...CONST_GENDER];

  private pagination = new Pagination();
  private dataLoading = false;

  private adminList: AdminDto[] = [];

  findAdmin() {
    AdminService.findForSelect().subscribe(res => {
      if (res) {
        this.adminList = res.data;
      }
    });
  }

  // 상태값
  getFounderConsultCodes() {
    CodeManagementService.findCodesFounderConsult().subscribe(res => {
      this.founderConsultStatusSelect = res.data;
    });
  }

  // 희망시간대
  getAvailableTimes() {
    CodeManagementService.findAvailableTimes().subscribe(res => {
      this.availableTimesSelect = res.data;
    });
  }

  // TODO: Create autocomplete box
  getCompanies() {
    CompanyService.findForSelect().subscribe(res => {
      this.companySelect = res.data;
    });
  }

  paginateSearch() {
    this.search(true);
  }

  // 검색하기
  search(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    // DeliveryFounderConsultService.findAll(
    //   this.deliveryFounderConsultSearchDto,
    //   this.pagination,
    // ).subscribe(res => {
    //   this.dataLoading = false;
    //   this.deliveryFounderConsultList = res.data.items;
    //   this.deliveryFounderConsultListCount = res.data.totalCount;
    // });
    window.scrollTo(0, 0);
  }

  // 초기화
  clearOut() {
    this.pagination.page = 1;
    this.deliveryFounderConsultSearchDto = new DeliveryFounderConsultListDto();
    this.search();
  }

  created() {
    this.pagination.page = 1;
    this.getAvailableTimes();
    this.getCompanies();
    this.getFounderConsultCodes();
    this.findAdmin();
    this.search();
  }
}
</script>
