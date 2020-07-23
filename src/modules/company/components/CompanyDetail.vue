<template>
  <section>
    <!-- <div class="d-flex justify-content-between align-items-end mb-2">
      <h3 v-if="company" class="mb-0">{{ company.nameKr }} - 업체 정보</h3>
      <router-link to="/company" class="btn btn-secondary text-center"
        >목록으로</router-link
      >
    </div>
    <div class="row d-flex align-items-stretch">
      <div class="my-3 col-12 col-lg-6" v-if="company">
        <BaseCard title="업체 정보">
          <template v-slot:head>
            <div></div>
          </template>
          <template v-slot:body>
            <ul>
              <li>업체명 : {{ company.nameKr }}</li>
              <li>대표 : {{ company.ceoKr }}</li>
              <li>전화번호 : {{ company.phone }}</li>
              <li>이메일 : {{ company.email }}</li>
              <li>팩스 : {{ company.fax }}</li>
              <li>주소 : {{ company.address }}</li>
              <li>생성일 : {{ company.createdAt | dateTransformer }}</li>
            </ul>
          </template>
        </BaseCard>
      </div>
      <div class="my-3 col-12 col-lg-6" v-if="company">
        <BaseCard title="업체 담당 관리자">
          <template v-slot:head>
            <div>
              <b-button
                variant="primary"
                @click="findAdmin()"
                v-b-modal.admin-list
                >수정하기</b-button
              >
            </div>
          </template>
          <template v-slot:body>
              <div v-if="founderConsult.admin">
              <ul>
                <li>
                  관리자 ID:
                  <span>
                    <b>{{ founderConsult.admin.no }}</b>
                  </span>
                </li>
                <li>
                  관리자명:
                  <span>
                    <b>{{ founderConsult.admin.name }}</b>
                  </span>
                </li>
                <li>
                  전화번호:
                  <b>{{ founderConsult.admin.phone }}</b>
                </li>
                <li>
                  생성 날짜:
                  <b>
                    {{ founderConsult.admin.createdAt | dateTransformer }}
                  </b>
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
            <div>
              <b-button variant="primary" v-b-modal.company-district
                >추가하기</b-button
              >
            </div>
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
            <div>
              <b-button variant="primary" v-b-modal.company-user
                >추가하기</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <table class="table">
              <thead>
                <tr>
                  <th>
                    USER NAME
                  </th>
                  <th>
                    USER PHONE
                  </th>
                  <th>
                    USER EMAIL
                  </th>
                  <th>
                    USER STATUS
                  </th>
                </tr>
              </thead>
              <tbody v-if="company.companyUsers">
                <tr v-for="user in company.companyUsers" :key="user.no">
                  <td>{{ user.name }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.name }}</td>
                  <td>
                    {{ user.authCode }}
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="4" class="empty-data">
                    <p>사용자를 등록해주세요</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </BaseCard>
      </div>
      
    </div>
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
      title="관리자 수정"
      @cancel="new CompanyDistrictDto()"
      @hide="new CompanyDistrictDto()"
      @ok="createCompanyDistrcit()"
    >
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
</b-modal> -->
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
  CompanyDistrictListDto,
  CompanyDistrictDto,
} from '../../../dto';
import { Pagination, YN, CONST_YN } from '../../../common';
import { BaseUser } from '../../../services/shared/auth';
import BaseCard from '../../_components/BaseCard.vue';
import CompanyDistrictList from './CompanyDistrictList.vue';

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
  },
})
export default class CompanyDetail extends BaseComponent {
  private company = new CompanyDto();
  private pagination = new Pagination();
  private approvalStatusSelect: APPROVAL_STATUS[] = [...CONST_APPROVAL_STATUS];

  findOne(id) {
    // find founder consult detail
    CompanyService.findOne(id).subscribe(res => {
      console.log(res);
      this.company = res.data;
    });
  }

  // 지점 추가
  createCompanyDistrcit() {
    alert('지점 추가하기');
  }

  created() {
    const companyId = this.$route.params.id;
    this.findOne(companyId);
  }
}
</script>
