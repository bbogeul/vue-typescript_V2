<template>
  <section>
    <div class="d-flex justify-content-between align-items-end mb-2">
      <h3 v-if="company" class="mb-0">{{ company.nameKr }} - 업체 정보</h3>
      <router-link to="/company" class="btn btn-secondary text-center"
        >목록으로</router-link
      >
    </div>
    <div class="row d-flex align-items-stretch">
      <div class="my-3 col-12 col-lg-6" v-if="company">
        <BaseCard title="업체 정보">
          <template v-slot:head>
            <!-- <div>
              <b-button
                variant="primary"
                @click="updateCompany()"
                v-b-modal.company-info
                >수정하기</b-button
              >
            </div> -->
          </template>
          <template v-slot:body>
            <ul>
              <li>업체명 : {{ company.nameKr }}</li>
              <li>대표 : {{ company.ceoKr }}</li>
              <li>전화번호 : {{ company.phone }}</li>
              <li v-if="company.email">이메일 : {{ company.email }}</li>
              <li v-if="company.fax">팩스 : {{ company.fax }}</li>
              <li>주소 : {{ company.address }}</li>
              <li v-if="company.createdAt">
                생성일 : {{ company.createdAt | dateTransformer }}
              </li>
            </ul>
          </template>
        </BaseCard>
      </div>
      <div class="my-3 col-12 col-lg-6" v-if="adminList">
        <BaseCard title="관리자 정보">
          <template v-slot:head>
            <div>
              <b-button
                variant="primary"
                v-b-modal.admin-list
                @click="findAdmin()"
                >수정하기</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <div v-if="company.admin">
              <ul>
                <li>
                  관리자 ID:
                  <span>
                    <b>{{ company.admin.no }}</b>
                  </span>
                </li>
                <li>
                  관리자 이름:
                  <span>
                    <b>{{ company.admin.name }}</b>
                  </span>
                </li>
                <li>
                  관리자 휴대폰번호:
                  <span>
                    <b>{{ company.admin.phone }}</b>
                  </span>
                </li>
              </ul>
            </div>
            <div v-else>관리자 없음</div>
          </template>
        </BaseCard>
      </div>
      <div class="my-3 col-12 col-lg-6" v-if="company">
        <BaseCard title="지점 정보">
          <template v-slot:head>
            <!-- <div>
              <b-button variant="primary" v-b-modal.company-district
                >추가하기</b-button
              >
            </div> -->
          </template>
          <template v-slot:body>
            <div>
              <CompanyDistrictList />
            </div>
          </template>
        </BaseCard>
      </div>
      <div class="my-3 col-12 col-lg-6" v-if="company">
        <BaseCard title="업체 사용자 정보">
          <template v-slot:head>
            <!-- <div>
              <b-button variant="primary" v-b-modal.company-user
                >추가하기</b-button
              >
            </div> -->
          </template>
          <template v-slot:body>
            <CompanyUserList />
          </template>
        </BaseCard>
      </div>
    </div>

    <b-modal
      id="company-info"
      title="업체 정보 수정"
      @cancel="cancelSelection()"
      @hide="cancelSelection()"
      @ok="updateCompany()"
    >
      <!-- <div class="form-row" v-if="CompanyUpdateDto">
        <div class="col-12 mb-3">
          <label>대표명</label>
          <input
            type="text"
            class="form-control"
            id="ceoKr"
            v-model="CompanyUpdateDto.ceoKr"
          />
        </div>
      </div> -->
    </b-modal>
    <b-modal
      id="company-district"
      title="지점 추가하기"
      @cancel="new CompanyDistrictDto()"
      @hide="new CompanyDistrictDto()"
      @ok="createCompanyDistrcit()"
    >
      <div class="form-row">
        <div class="col-12 mb-3">
          <label for="">지점명</label>
          <input type="text" class="form-control" id="" />
        </div>
        <div class="col-12 mb-3">
          <label>승인 상태</label>
          <select class="custom-select">
            <option value selected>전체</option>
            <option
              v-for="status in approvalStatusSelect"
              :key="status"
              :value="status"
              >{{ status | enumTransformer }}</option
            >
          </select>
        </div>
      </div>
    </b-modal>
    <b-modal
      id="admin-list"
      title="관리자 수정하기"
      @cancel="cancelSelection()"
      @hide="cancelSelection()"
      @ok="updateCompany()"
    >
      <table class="table table-sm tabl-bordered text-center">
        <thead>
          <tr>
            <th scope="col">NAME</th>
            <th scope="col">PHONE</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="admin in adminList" :key="admin.no">
            <td>{{ admin.name }}</td>
            <td>{{ admin.phone }}</td>
            <td class="text-center">
              <button class="btn btn-primary" @click="selectAdmin(admin)">
                선택
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="selectedAdmin.name"
        class="py-2 px-4 rounded"
        style="background-color:#f1f1f1"
      >
        선택한 관리자 :
        <b>{{ selectedAdmin.name }}</b>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="adminListCount"
        pills
        :total-rows="adminListCount"
        :per-page="pagination.limit"
        @input="paginateSearch"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </b-modal>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import { CodeManagementDto } from '../../../services/init/dto';

import {
  AdminDto,
  AdminListDto,
  CompanyDto,
  CompanyUpdateDto,
  CompanyDistrictListDto,
  CompanyDistrictDto,
} from '../../../dto';
import { Pagination, YN, CONST_YN } from '../../../common';
import { BaseUser } from '../../../services/shared/auth';
import BaseCard from '../../_components/BaseCard.vue';
import CompanyDistrictList from './CompanyDistrictList.vue';
import CompanyUserList from './CompanyUserList.vue';

import AdminService from '../../../services/admin.service';
import CompanyService from '../../../services/company.service';
import {
  APPROVAL_STATUS,
  CONST_APPROVAL_STATUS,
} from '../../../services/shared';

@Component({
  name: 'CompanyDetail',
  components: {
    BaseCard,
    CompanyDistrictList,
    CompanyUserList,
  },
})
export default class CompanyDetail extends BaseComponent {
  private adminList: AdminDto[] = [];
  private adminListDto = new AdminListDto();
  private adminListCount = 0;
  private approvalStatusSelect: APPROVAL_STATUS[] = [...CONST_APPROVAL_STATUS];

  private company = new CompanyDto();
  private companyUpdateDto = new CompanyUpdateDto();
  private pagination = new Pagination();
  private selectedAdmin: AdminDto = new AdminDto(BaseUser);

  findOne(id) {
    // find founder consult detail
    CompanyService.findOne(id).subscribe(res => {
      console.log(res);
      this.company = res.data;
    });
  }

  // 지점 추가
  createCompanyDistrcit() {
    console.log('지점 추가');
  }

  findAdmin(isPagination: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = 5;
    AdminService.findAll(this.adminListDto, this.pagination).subscribe(res => {
      console.log(res);
      this.adminList = res.data.items;
      this.adminListCount = res.data.totalCount;
    });
  }

  updateCompany() {
    if (this.selectedAdmin) {
      this.companyUpdateDto.adminNo = this.selectedAdmin.no;
    }

    CompanyService.update(
      this.$route.params.id,
      this.companyUpdateDto,
    ).subscribe(res => {
      this.cancelSelection();
      this.companyUpdateDto = new CompanyUpdateDto();
      this.findOne(this.$route.params.id);
    });
  }

  paginateSearch() {
    this.findAdmin(true);
  }

  selectAdmin(admin: AdminDto) {
    this.selectedAdmin = admin;
  }

  cancelSelection() {
    this.selectedAdmin = new AdminDto(BaseUser);
  }

  created() {
    const companyId = this.$route.params.id;
    this.findOne(companyId);
  }
}
</script>
