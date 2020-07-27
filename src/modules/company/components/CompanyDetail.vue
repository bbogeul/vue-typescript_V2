<template>
  <section>
    <div class="d-flex justify-content-between align-items-end mb-2">
      <h3 v-if="company" class="mb-0">{{ company.nameKr }} - 업체 정보</h3>
      <router-link to="/company" class="btn btn-secondary text-center">목록으로</router-link>
    </div>
    <div class="row d-flex align-items-stretch">
      <div class="my-3 col-12 col-lg-6" v-if="company">
        <BaseCard title="업체 정보">
          <template v-slot:head>
            <!-- <div>
              <b-button variant="primary" v-b-modal.company-info
                >수정하기</b-button
              >
            </div>-->
          </template>
          <template v-slot:body>
            <div>
              <div>
                <ul>
                  <li>업체명 : {{ company.nameKr }}</li>
                  <li>대표 : {{ company.ceoKr }}</li>
                  <li>전화번호 : {{ company.phone }}</li>
                  <li v-if="company.email">이메일 : {{ company.email }}</li>
                  <li v-if="company.fax">팩스 : {{ company.fax }}</li>
                  <li>주소 : {{ company.address }}</li>
                  <li v-if="company.createdAt">생성일 : {{ company.createdAt | dateTransformer }}</li>
                  <li v-if="company.createdAt">
                    승인상태 :
                    <span
                      class="badge badge-pill badge-warning p-2"
                    >{{ company.companyStatus | enumTransformer }}</span>
                  </li>
                </ul>
              </div>
              <div
                v-if="company.companyStatus !== 'APPROVAL'"
                class="border rounded bg-light p-3 mt-4"
              >
                <div>
                  <h5 class="text-danger" style="font-size:14px; font-weight:bold;">승인 상태 변경</h5>
                </div>
                <div
                  v-if="company.companyUpdateHistories"
                  class="py-2 mt-3 border-top border-bottom"
                >
                  <ul>
                    <li
                      v-for="(value, name, index) in company
                        .companyUpdateHistories[0]"
                      :key="index"
                    >{{ name | stringTransformer }} : {{ value }}</li>
                  </ul>
                </div>
                <div class="mt-2 text-right">
                  <b-button variant="primary" class="mx-1" @click="updateApproval()">승인</b-button>
                  <b-button variant="secondary" v-b-modal.refusal-info class="mx-1">거절</b-button>
                </div>
              </div>
            </div>
          </template>
        </BaseCard>
      </div>
      <div class="my-3 col-12 col-lg-6" v-if="adminList">
        <BaseCard title="관리자 정보">
          <template v-slot:head>
            <div>
              <b-button variant="primary" v-b-modal.admin-list @click="findAdmin()">수정하기</b-button>
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
            <div v-else class="empty-data">
              <p>관리자 없음</p>
            </div>
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
            </div>-->
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
            </div>-->
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
    ></b-modal>
    <b-modal
      id="refusal-info"
      title="승인 거절 사유"
      @cancel="cancelSelection()"
      @hide="cancelSelection()"
      @ok="updateRefusal()"
    >
      <div>
        <div v-if="company.companyUpdateHistories" class="form-check">
          <input
            type="checkbox"
            v-model="companyUpdateRefusalReaseonDto.ceoKr"
            v-if="company.companyUpdateHistories[0].ceoKr"
            class="form-check-input"
            id="ceoKr"
          />
          <label
            v-for="(value, name, index) in company.companyUpdateHistories[0]"
            :key="index"
          >{{ name | stringTransformer }}</label>
        </div>
        <div>
          <label for="refusalDesc" class="d-block">거절이유</label>
          <textarea
            name="refusalDesc"
            id="refusalDesc"
            v-model="companyUpdateRefusalDto.refusalDesc"
            style="width:100%; height:100px;"
          ></textarea>
        </div>
      </div>
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
          <label for>지점명</label>
          <input type="text" class="form-control" id />
        </div>
        <div class="col-12 mb-3">
          <label>승인 상태</label>
          <select class="custom-select">
            <option value selected>전체</option>
            <option
              v-for="status in approvalStatusSelect"
              :key="status"
              :value="status"
            >{{ status | enumTransformer }}</option>
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
              <button class="btn btn-primary" @click="selectAdmin(admin)">선택</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="selectedAdmin.name" class="py-2 px-4 rounded" style="background-color:#f1f1f1">
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
  CompanyUpdateRefusalDto,
  CompanyDistrictListDto,
  CompanyDistrictDto,
  CompanyUpdateRefusalReasonDto,
  CompanyUserUpdateRefusalReasonDto,
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
import toast from '../../../../resources/assets/js/services/toast.js';

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
  private companyUpdateRefusalDto = new CompanyUpdateRefusalDto();
  private companyUpdateRefusalReaseonDto = (this.companyUpdateRefusalDto.refusalReasons = new CompanyUserUpdateRefusalReasonDto());
  private pagination = new Pagination();
  private selectedAdmin: AdminDto = new AdminDto(BaseUser);

  findOne(id) {
    // find founder consult detail
    CompanyService.findOne(id).subscribe(res => {
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
      this.adminList = res.data.items;
      this.adminListCount = res.data.totalCount;
    });
  }

  updateCompany() {
    if (this.selectedAdmin) {
      this.companyUpdateDto.managerNo = this.selectedAdmin.no;
    }

    CompanyService.update(
      this.$route.params.id,
      this.companyUpdateDto,
    ).subscribe(res => {
      this.cancelSelection();
      this.companyUpdateDto = new CompanyUpdateDto();
      this.findOne(this.$route.params.id);
      toast.success('수정완료');
    });
  }

  // 승인
  updateApproval() {
    CompanyService.updateCompanyStatus(
      this.$route.params.id,
      'approve-update',
    ).subscribe(res => {
      this.findOne(this.$route.params.id);
      toast.success('승인완료');
    });
  }
  // 거절
  updateRefusal() {
    CompanyService.updateCompanyStatus(
      this.$route.params.id,
      'refuse-update',
      this.companyUpdateRefusalDto,
    ).subscribe(res => {
      this.findOne(this.$route.params.id);
      toast.success('승인거절');
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
