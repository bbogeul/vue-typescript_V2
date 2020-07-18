<template>
  <section>
    <h4>방문자 신청 관리</h4>
    <div class="divider"></div>
    <div v-on:keyup.enter="search()">
      <div class="form-row">
        <div class="col-md-2 mb-3">
          <label for="username">공간 ID</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="founderConsultListDto.spaceNo"
          />
        </div>
        <div class="col-md-2 mb-3">
          <label for="validationTooltip04">업체 선택</label>
          <select
            class="custom-select"
            id="validationTooltip04"
            v-model="founderConsultListDto.companyNo"
          >
            <option value="" selected>전체</option>
            <option
              v-for="company in companySelect"
              :key="company.no"
              :value="company.no"
              >{{ company.nameKr }}</option
            >
          </select>
        </div>
        <div class="col-md-2 mb-3">
          <label for="validationTooltip02">업체 지점</label>
          <input
            type="text"
            class="form-control"
            id="validationTooltip02"
            v-model="founderConsultListDto.companyDistrictNameKr"
          />
        </div>
        <div class="col-md-2 mb-3">
          <label>나누다 사용자명</label>
          <input
            type="text"
            class="form-control"
            v-model="founderConsultListDto.nanudaUserName"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-2 mb-3">
          <label for="validationTooltip04">희망시간대 선택</label>
          <select
            class="custom-select"
            id="validationTooltip04"
            v-model="founderConsultListDto.hopeTime"
          >
            <option value="" selected>전체</option>
            <option
              v-for="time in availableTimesSelect"
              :key="time.no"
              :value="time.key"
              >{{ time.value }}</option
            >
          </select>
        </div>
        <div class="col-md-2 mb-3">
          <label for="validationTooltip04">신청 상태값 선택</label>
          <select
            class="custom-select"
            id="validationTooltip04"
            v-model="founderConsultListDto.status"
          >
            <option value="" selected>전체</option>
            <option
              v-for="status in founderConsultStatusSelect"
              :key="status.no"
              :value="status.key"
              >{{ status.value }}</option
            >
          </select>
        </div>
      </div>
      <div class="btn-group float-right" role="group">
        <button class="btn btn-success" @click="search()">검색</button>
        <button class="btn btn-primary" @click="clearOut()">초기화</button>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../core/base.component';
import { FOUNDER_CONSULT, CONST_FOUNDER_CONSULT } from '../../services/shared';
import { CodeManagementDto } from '../../services/init/dto';
import FounderConsultService from '../../services/founder-consult.service';
import CodeManagementService from '../../services/code-management.service';
import { FounderConsultListDto, CompanyDto } from '../../dto';
import { Pagination } from '../../common';
import CompanyService from '../../services/company.service';

@Component({
  name: 'FounderConsult',
})
export default class FounderConsult extends BaseComponent {
  private founderConsultStatusSelect: CodeManagementDto[] = [];
  private availableTimesSelect: CodeManagementDto[] = [];
  private companySelect: CompanyDto[] = [];
  founderConsultListDto = new FounderConsultListDto();
  pagination = new Pagination();

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

  // 검색하기
  search() {
    FounderConsultService.findAll(
      this.founderConsultListDto,
      this.pagination,
    ).subscribe(res => {
      console.log(res.data);
    });
  }

  // 초기화
  clearOut() {
    this.founderConsultListDto = new FounderConsultListDto();
  }

  mounted() {
    this.getAvailableTimes();
    this.getCompanies();
    this.getFounderConsultCodes();
  }
}
</script>
