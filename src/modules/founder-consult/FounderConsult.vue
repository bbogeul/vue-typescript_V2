<template>
  <section>
    <h4>방문자 신청 관리</h4>
    <div class="divider"></div>
    <div v-on:keyup.enter="search()">
      <div class="form-row">
        <div class="col-md-2 mb-2">
          <label for="username">공간 ID</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="founderConsultListDto.spaceNo"
          />
        </div>
        <div class="col-md-2 mb-3">
          <label>사용자명</label>
          <input
            type="text"
            class="form-control"
            v-model="founderConsultListDto.nanudaUserName"
          />
        </div>
        <div class="col-md-3 mb-3">
          <label>나누다 사용자 휴대폰 번호</label>
          <input
            type="text"
            class="form-control"
            v-model="founderConsultListDto.phone"
          />
        </div>
        <div class="col-md-2 mb-3">
          <label>업체 선택</label>
          <select
            class="custom-select"
            v-model="founderConsultListDto.companyNo"
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
            v-model="founderConsultListDto.companyDistrictNameKr"
          />
        </div>
      </div>
      <!-- second row -->
      <div class="form-row">
        <div class="col-md-3 mb-3">
          <label>공간 주소</label>
          <input
            type="text"
            class="form-control"
            v-model="founderConsultListDto.address"
          />
        </div>
        <div class="col-md-2 mb-3">
          <label>관리자명</label>
          <input
            type="text"
            class="form-control"
            v-model="founderConsultListDto.adminUserName"
          />
        </div>

        <div class="col-md-2 mb-3">
          <label>희망시간대 선택</label>
          <select
            class="custom-select"
            v-model="founderConsultListDto.hopeTime"
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
          <select class="custom-select" v-model="founderConsultListDto.status">
            <option value selected>전체</option>
            <option
              v-for="status in founderConsultStatusSelect"
              :key="status.no"
              :value="status.key"
              >{{ status.value }}</option
            >
          </select>
        </div>
      </div>
      <div class="btn-group" style="margin-bottom: 20px">
        <button class="btn btn-success" @click="search()">검색</button>
        <button class="btn btn-primary" @click="clearOut()">초기화</button>
      </div>
    </div>
    <h5>검색 결과: {{ founderConsultsCount }}</h5>

    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th
            scope="col"
            v-bind:class="{ highlighted: founderConsultListDto.spaceNo }"
          >
            SPACE ID
          </th>
          <th
            scope="col"
            v-bind:class="{ highlighted: founderConsultListDto.nanudaUserName }"
          >
            USER NAME
          </th>
          <th
            scope="col"
            v-bind:class="{ highlighted: founderConsultListDto.phone }"
          >
            USER PHONE
          </th>

          <th
            scope="col"
            v-bind:class="{ highlighted: founderConsultListDto.address }"
          >
            ADDRESS
          </th>

          <th
            scope="col"
            v-bind:class="{ highlighted: founderConsultListDto.companyNo }"
          >
            COMPANY
          </th>
          <th
            scope="col"
            v-bind:class="{ highlighted: founderConsultListDto.hopeTime }"
          >
            AVAILABLE TIME
          </th>
          <th scope="col">CREATED</th>
          <th
            scope="col"
            v-bind:class="{ highlighted: founderConsultListDto.adminUserName }"
          >
            ADMIN
          </th>
          <th
            scope="col"
            v-bind:class="{ highlighted: founderConsultListDto.status }"
          >
            STATUS
          </th>
        </tr>
      </thead>

      <tbody v-if="founderConsultsCount">
        <tr v-for="founderConsult in founderConsults" :key="founderConsult.no">
          <td>
            <router-link
              v-if="founderConsult.space"
              :to="{
                name: 'FounderConsultDetail',
                params: {
                  id: founderConsult.no,
                },
              }"
              >{{ founderConsult.no }}</router-link
            >
          </td>
          <td>{{ founderConsult.spaceNo }}</td>
          <td>{{ founderConsult.nanudaUser.name }}</td>
          <td>{{ founderConsult.nanudaUser.phone }}</td>
          <td>
            {{ founderConsult.space.address }}
            {{ founderConsult.space.detailAddress }}
          </td>
          <td v-if="founderConsult.space.companyDistricts">
            <div
              v-for="company in founderConsult.space.companyDistricts"
              :key="company.no"
            >
              <div v-if="company.company.nameKr">
                {{ company.company.nameKr }}
              </div>
            </div>
          </td>
          <td v-if="founderConsult.availableTime">
            {{ founderConsult.availableTime.value }}
          </td>
          <td>{{ founderConsult.createdAt | dateFilter }}</td>
          <td v-if="founderConsult.admin">{{ founderConsult.admin.name }}</td>
          <td v-else>No manager</td>
          <td>
            <span class="badge badge-pill badge-warning">
              {{ founderConsult.codeManagement.value }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <b-pagination
      v-model="pagination.page"
      v-if="founderConsultsCount"
      pills
      :total-rows="founderConsultsCount"
      :per-page="pagination.limit"
      @input="paginateSearch"
      class="mt-4"
    ></b-pagination>
    <div v-else>Nothing here</div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../core/base.component';
import { FOUNDER_CONSULT, CONST_FOUNDER_CONSULT } from '../../services/shared';
import { CodeManagementDto } from '../../services/init/dto';
import FounderConsultService from '../../services/founder-consult.service';
import CodeManagementService from '../../services/code-management.service';
import {
  FounderConsultListDto,
  CompanyDto,
  FounderConsultDto,
} from '../../dto';
import { Pagination } from '../../common';
import CompanyService from '../../services/company.service';

@Component({
  name: 'FounderConsult',
})
export default class FounderConsult extends BaseComponent {
  private founderConsults: FounderConsultDto[] = [];
  private founderConsultsCount = 0;
  private founderConsultStatusSelect: CodeManagementDto[] = [];
  private availableTimesSelect: CodeManagementDto[] = [];
  private companySelect: CompanyDto[] = [];
  founderConsultListDto = new FounderConsultListDto();
  pagination = new Pagination();
  private totalPage = 0;

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
    if (!isPagination) {
      this.pagination.page = 1;
    }
    FounderConsultService.findAll(
      this.founderConsultListDto,
      this.pagination,
    ).subscribe(res => {
      this.founderConsults = res.data.items;
      this.founderConsultsCount = res.data.totalCount;
      this.totalPage = Math.ceil(
        this.founderConsultsCount / this.pagination.limit,
      );
    });
    window.scrollTo(0, 0);
  }

  // 초기화
  clearOut() {
    this.pagination.page = 1;
    this.founderConsultListDto = new FounderConsultListDto();
    this.search();
  }

  created() {
    this.pagination.page = 1;
    this.getAvailableTimes();
    this.getCompanies();
    this.getFounderConsultCodes();
    this.search();
  }
}
</script>
<style lang="scss" scoped></style>
