<template>
  <section>
    <h3>방문자 신청 관리</h3>
    <div class="divider"></div>
    <div v-on:keyup.enter="search()">
      <div class="form-row">
        <div class="col-md-2 mb-2">
          <label for="username">공간 ID</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="founderConsultSearchDto.spaceNo"
          />
        </div>
        <div class="col-md-2 mb-3">
          <label>사용자명</label>
          <input
            type="text"
            class="form-control"
            v-model="founderConsultSearchDto.nanudaUserName"
          />
        </div>
        <div class="col-md-2 mb-3">
          <label>사용자 휴대폰 번호</label>
          <input
            type="text"
            class="form-control"
            v-model="founderConsultSearchDto.phone"
          />
        </div>
        <div class="col-md-1 mb-3">
          <label>사용자 성별</label>
          <select
            class="custom-select"
            v-model="founderConsultSearchDto.gender"
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
        <div class="col-md-2 mb-3">
          <label>업체 선택</label>
          <select
            class="custom-select"
            v-model="founderConsultSearchDto.companyNo"
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
        <div class="col-md-2 mb-3">
          <label>업체 지점</label>
          <input
            type="text"
            class="form-control"
            v-model="founderConsultSearchDto.companyDistrictNameKr"
          />
        </div>
        <div class="col-md-1 mb-3">
          <label>공간 유형</label>
          <select
            class="custom-select"
            v-model="founderConsultSearchDto.spaceTypeNo"
          >
            <option value selected>전체</option>
            <option
              v-for="spaceType in spaceTypeList"
              :key="spaceType.no"
              :value="spaceType.no"
            >
              {{ spaceType.displayName }}
            </option>
          </select>
        </div>
      </div>
      <!-- second row -->
      <div class="form-row">
        <div class="col-md-4 mb-3">
          <label>공간 주소</label>
          <input
            type="text"
            class="form-control"
            v-model="founderConsultSearchDto.address"
          />
        </div>
        <div class="col-md-2 mb-3">
          <label>관리자명</label>
          <input
            type="text"
            class="form-control"
            v-model="founderConsultSearchDto.adminUserName"
          />
        </div>

        <div class="col-md-2 mb-3">
          <label>희망시간대 선택</label>
          <select
            class="custom-select"
            v-model="founderConsultSearchDto.hopeTime"
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
        <div class="col-md-2 mb-3">
          <label>신청 상태값 선택</label>
          <select
            class="custom-select"
            v-model="founderConsultSearchDto.status"
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
        <div class="col-md-1 mb-3">
          <label>창업 경험 유무</label>
          <select
            class="custom-select"
            v-model="founderConsultSearchDto.changUpExpYn"
          >
            <option value selected>전체</option>
            <option v-for="yn in delYn" :key="yn" :value="yn">
              {{ yn | enumTransformer }}
            </option>
          </select>
        </div>
        <div class="col-md-1 mb-3">
          <label>공간 소우 유무</label>
          <select
            class="custom-select"
            v-model="founderConsultSearchDto.spaceOwnYn"
          >
            <option value selected>전체</option>
            <option v-for="yn in delYn" :key="yn" :value="yn">
              {{ yn | enumTransformer }}
            </option>
          </select>
        </div>
      </div>
      <!-- <div class="form-row">
        <div class="col-md-6">
          <label>확정 날짜</label>
          <b-form-datepicker
            id="confirmDate"
            v-model="founderConsultSearchDto.confirmDate"
            placeholder="확정 날짜를 선택해주세요"
            class="mb-2"
          ></b-form-datepicker>
        </div>
        <div class="col-md-6">
          <label>희망 날짜</label>
          <b-form-datepicker
            id="hopeDate"
            v-model="founderConsultSearchDto.hopeDate"
            placeholder="희망 날짜를 선택해주세요"
            class="mb-2"
          ></b-form-datepicker>
        </div>
      </div> -->
      <div class="text-center">
        <div class="btn-group mb-4">
          <button class="btn btn-primary" @click="clearOut()">초기화</button>
          <button class="btn btn-success" @click="search()">검색</button>
        </div>
      </div>
    </div>
    <h5>
      검색 결과: <strong>{{ founderConsultListTotalCount }}</strong>
    </h5>

    <table class="table table-bordered table-hover table-sm text-center">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th
            scope="col"
            v-bind:class="{ highlighted: founderConsultSearchDto.spaceNo }"
          >
            SPACE ID
          </th>
          <th
            scope="col"
            v-bind:class="{
              highlighted: founderConsultSearchDto.nanudaUserName,
            }"
          >
            USER NAME
          </th>
          <th
            scope="col"
            v-bind:class="{ highlighted: founderConsultSearchDto.phone }"
          >
            USER PHONE
          </th>
          <th
            scope="col"
            v-bind:class="{ highlighted: founderConsultSearchDto.gender }"
          >
            GENDER
          </th>
          <th
            scope="col"
            v-bind:class="{ highlighted: founderConsultSearchDto.address }"
          >
            ADDRESS
          </th>

          <th
            scope="col"
            v-bind:class="{ highlighted: founderConsultSearchDto.companyNo }"
          >
            COMPANY
          </th>
          <th
            scope="col"
            v-bind:class="{ highlighted: founderConsultSearchDto.hopeTime }"
          >
            AVAILABLE TIME
          </th>
          <th scope="col">CREATED</th>
          <th
            scope="col"
            v-bind:class="{
              highlighted: founderConsultSearchDto.adminUserName,
            }"
          >
            ADMIN
          </th>
          <th
            scope="col"
            v-bind:class="{ highlighted: founderConsultSearchDto.status }"
          >
            STATUS
          </th>
          <th scope="col">VIEW</th>
        </tr>
      </thead>

      <tbody v-if="founderConsultListTotalCount">
        <tr
          v-for="founderConsult in founderConsultList"
          :key="founderConsult.no"
        >
          <td class="align-middle">
            {{ founderConsult.no }}
          </td>
          <td class="align-middle">{{ founderConsult.spaceNo }}</td>
          <td class="align-middle">{{ founderConsult.nanudaUser.name }}</td>
          <td class="align-middle">{{ founderConsult.nanudaUser.phone }}</td>
          <td class="align-middle">
            <div v-if="founderConsult.nanudaUser.genderInfo">
              {{ founderConsult.nanudaUser.genderInfo.value }}
            </div>
          </td>
          <td class="align-middle text-left">
            {{ founderConsult.space.address }}
            {{ founderConsult.space.detailAddress }}
          </td>
          <td class="align-middle" v-if="founderConsult.space.companyDistricts">
            <div
              v-for="company in founderConsult.space.companyDistricts"
              :key="company.no"
            >
              <div v-if="company.company.nameKr">
                {{ company.company.nameKr }}
              </div>
            </div>
          </td>
          <td class="align-middle">
            <div v-if="founderConsult.availableTime">
              {{ founderConsult.availableTime.value }}
            </div>
          </td>
          <td class="align-middle">
            {{ founderConsult.createdAt | dateTransformer }}
          </td>
          <td class="align-middle" v-if="founderConsult.admin">
            {{ founderConsult.admin.name }}
          </td>
          <td class="align-middle" v-else>No manager</td>
          <td class="align-middle">
            <span class="badge badge-pill badge-warning p-2">
              {{ founderConsult.codeManagement.value }}
            </span>
          </td>
          <td class="align-middle">
            <router-link
              v-if="founderConsult.space"
              class="btn btn-sm btn-secondary"
              :to="{
                name: 'FounderConsultDetail',
                params: {
                  id: founderConsult.no,
                },
              }"
            >
              상세보기
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <b-pagination
      v-model="pagination.page"
      v-if="founderConsultListTotalCount"
      pills
      :total-rows="founderConsultListTotalCount"
      :per-page="pagination.limit"
      @input="paginateSearch"
      class="mt-4 justify-content-center"
    ></b-pagination>
    <div v-else>Nothing here</div>
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
import FounderConsultService from '../../../services/founder-consult.service';
import CodeManagementService from '../../../services/code-management.service';
import SpaceTypeService from '../../../services/space-type.service';
import {
  FounderConsultListDto,
  CompanyDto,
  FounderConsultDto,
  SpaceTypeDto,
} from '../../../dto';
import {
  Pagination,
  CONST_OBJECT_BY_VALUE,
  OrderByValue,
  YN,
  CONST_YN,
} from '../../../common';
import CompanyService from '../../../services/company.service';

@Component({
  name: 'FounderConsultList',
})
export default class FounderConsult extends BaseComponent {
  private founderConsultSearchDto = new FounderConsultListDto();
  private founderConsultList: FounderConsultDto[] = [];
  private founderConsultListTotalCount = 0;
  private founderConsultStatusSelect: CodeManagementDto[] = [];
  private availableTimesSelect: CodeManagementDto[] = [];
  private companySelect: CompanyDto[] = [];
  private totalPage = 0;
  private delYn: YN[] = [...CONST_YN];
  private genderSelect: GENDER[] = [...CONST_GENDER];
  private spaceTypeList: SpaceTypeDto[] = [];
  private pagination = new Pagination();

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

  getSpaceType() {
    SpaceTypeService.getAll().subscribe(res => {
      this.spaceTypeList = res.data;
    });
  }

  paginateSearch() {
    this.search(true);
  }

  // 검색하기
  search(isPagination?: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    FounderConsultService.findAll(
      this.founderConsultSearchDto,
      this.pagination,
    ).subscribe(res => {
      this.founderConsultList = res.data.items;
      this.founderConsultListTotalCount = res.data.totalCount;
      this.totalPage = Math.ceil(
        this.founderConsultListTotalCount / this.pagination.limit,
      );
    });
    window.scrollTo(0, 0);
  }

  // 초기화
  clearOut() {
    this.pagination.page = 1;
    this.founderConsultSearchDto = new FounderConsultListDto();
    this.search();
  }

  created() {
    this.pagination.page = 1;
    this.getAvailableTimes();
    this.getCompanies();
    this.getFounderConsultCodes();
    this.getSpaceType();
    this.search();
  }
}
</script>
<style lang="scss" scoped></style>
