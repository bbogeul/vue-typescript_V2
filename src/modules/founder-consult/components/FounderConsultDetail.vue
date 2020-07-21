<template>
  <section>
    <h3 v-if="founderConsult.space">
      {{ founderConsult.space.name }} - 방문 신청
    </h3>
    <div class="divider"></div>
    <div class="row">
      <div class="col-md-3">
        <!-- user information -->
        <h4>사용자 정보</h4>
        <div class="card">
          <div class="card-body" v-if="founderConsult.nanudaUser">
            <div>
              <p>
                사용자 ID:
                <span
                  ><b>{{ founderConsult.nanudaUser.no }}</b></span
                >
              </p>
            </div>
            <div>
              <p>
                사용자명:
                <span
                  ><b>{{ founderConsult.nanudaUser.name }}</b></span
                >
              </p>
            </div>
            <div>
              <p>
                전화번호: <b>{{ founderConsult.nanudaUser.phone }}</b>
              </p>
            </div>
            <div>
              <p>
                마지막 로그인 날짜:
                <b>{{
                  founderConsult.nanudaUser.lastLoginAt | dateTransformer
                }}</b>
              </p>
            </div>
            <div>
              <b-button variant="primary" v-b-modal.message-user
                >문자하기</b-button
              >
            </div>
          </div>
          <div class="card-body" v-else><b>관리자 없음</b></div>
        </div>
      </div>
      <div class="col-md-3">
        <h4>관리자 정보</h4>
        <div class="card">
          <div class="card-body" v-if="founderConsult.admin">
            <div>
              <p>
                관리자 ID:
                <span
                  ><b>{{ founderConsult.admin.no }}</b></span
                >
              </p>
            </div>
            <div>
              <p>
                관리자명:
                <span
                  ><b>{{ founderConsult.admin.name }}</b></span
                >
              </p>
            </div>
            <div>
              <p>
                전화번호: <b>{{ founderConsult.admin.phone }}</b>
              </p>
            </div>
            <div>
              <p>
                생성 날짜:
                <b>{{ founderConsult.admin.createdAt | dateTransformer }}</b>
              </p>
            </div>
            <div>
              <b-button
                variant="primary"
                @click="findAdmin()"
                v-b-modal.admin-list
                >관리자 수정하기</b-button
              >
            </div>
          </div>
          <div class="card-body" v-else>
            <b>관리자 없음</b><br />
            <div>
              <b-button
                variant="primary"
                @click="findAdmin()"
                v-b-modal.admin-list
                >관리자 정하기</b-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6" v-if="founderConsult.space.companyDistricts[0]">
        <h4>
          업체 정보
        </h4>
        <div class="card">
          <div
            class="card-body"
            v-if="founderConsult.space.companyDistricts.length > 0"
          >
            <h5>Company information</h5>
            <div class="row">
              <div class="col-md-6">
                업체명:
                <b>{{
                  founderConsult.space.companyDistricts[0].company.nameKr
                }}</b>
              </div>
              <div class="col-md-6">
                대표:
                <b>{{
                  founderConsult.space.companyDistricts[0].company.ceoKr
                }}</b>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 ">
                업체 상태:
                <b>{{
                  founderConsult.space.companyDistricts[0].company
                    .codeManagement.value
                }}</b>
              </div>
              <div class="col-md-6 ">
                웹주소:
                <b>{{
                  founderConsult.space.companyDistricts[0].company.website
                }}</b>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                전화번호:
                <b>{{
                  founderConsult.space.companyDistricts[0].company.phone
                }}</b>
              </div>
              <div class="col-md-6 ">
                사업 등록번호:
                <b>{{
                  founderConsult.space.companyDistricts[0].company.businessNo
                }}</b>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                지점명:
                <b>{{ founderConsult.space.companyDistricts[0].nameKr }}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6" v-else>
        업체 정보 없음
      </div>
    </div>
    <div class="row" style="margin-top:10px;">
      <router-link to="/founder-consult">
        <button class="btn btn-primary text-center">
          목록으로 다시 가기
        </button></router-link
      >
    </div>
    <!-- for the text message -->
    <b-modal id="message-user" title="나누다 사용자에게 문자하기">
      <p class="my-4">
        <b v-if="founderConsult.nanudaUser">{{
          founderConsult.nanudaUser.name
        }}</b
        >에게 문자하기
      </p>
    </b-modal>
    <b-modal
      id="admin-list"
      title="관리자 정하기"
      @cancel="cancelSelection()"
      @hide="cancelSelection()"
      @ok="updateFounderConsult()"
    >
      <table class="table tabl-bordered">
        <thead>
          <tr>
            <th scope="col">NAME</th>
            <th scope="col">PHONE</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="admin in adminList" :key="admin.no">
            <td>
              {{ admin.name }}
            </td>
            <td>
              {{ admin.phone }}
            </td>
            <td class="text-center">
              <button class="btn btn-primary" @click="selectAdmin(admin)">
                선택
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="selectedAdmin.name">
        선택하신 관리자로 하시겠습니까? <br />
        <b>{{ selectedAdmin.name }}</b>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="adminListCount"
        pills
        :total-rows="adminListCount"
        :per-page="pagination.limit"
        @input="paginateSearch"
        class="mt-4"
      ></b-pagination>
    </b-modal>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import FounderConsultService from '../../../services/founder-consult.service';
import AdminService from '../../../services/admin.service';
import {
  FounderConsultDto,
  AdminDto,
  AdminListDto,
  FounderConsultUpdateDto,
} from '../../../dto';
import { Pagination } from '../../../common';
import { BaseUser } from '../../../services/shared/auth';

@Component({
  name: 'FounderConsultDetail',
})
export default class FounderConsultDetail extends BaseComponent {
  /* global kakao */

  private founderConsult = new FounderConsultDto();
  private adminListDto = new AdminListDto();
  private pagination = new Pagination();
  private adminList: AdminDto[] = [];
  private adminListCount = 0;
  private selectedAdmin: AdminDto = new AdminDto(BaseUser);
  private founderConsultUpdateDto = new FounderConsultUpdateDto();
  private googleMap = '';

  findOne(id) {
    // find founder consult detail
    FounderConsultService.findOne(id).subscribe(res => {
      this.founderConsult = res.data;
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

  updateFounderConsult() {
    if (this.selectedAdmin) {
      this.founderConsultUpdateDto.spaceConsultManager = this.selectedAdmin.no;
    }
    FounderConsultService.update(
      this.$route.params.id,
      this.founderConsultUpdateDto,
    ).subscribe(res => {
      this.cancelSelection();
      this.founderConsultUpdateDto = new FounderConsultUpdateDto();
      this.findOne(this.$route.params.id);
    });
  }

  mounted() {
    const founderConsultId = this.$route.params.id;
    this.findOne(founderConsultId);
  }
}
</script>
