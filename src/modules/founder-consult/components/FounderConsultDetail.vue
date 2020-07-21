<template>
  <section>
    <div class="d-flex justify-content-between align-items-end mb-2">
      <h3 v-if="founderConsult.space" class="mb-0">
        {{ founderConsult.space.name }} - 방문 신청
      </h3>
      <router-link to="/founder-consult" class="btn btn-secondary text-center">
        목록으로
      </router-link>
    </div>
    <div class="row d-flex align-items-stretch">
      <div class="my-2 col-md-4" v-if="founderConsult.nanudaUser">
        <BaseCard title="사용자 정보">
          <template v-slot:head>
            <b-button variant="primary" v-b-modal.message-user
              >문자전송</b-button
            >
          </template>
          <template v-slot:body>
            <div v-if="founderConsult.nanudaUser">
              <ul>
                <li>
                  <p>
                    사용자 ID:
                    <span
                      ><b>{{ founderConsult.nanudaUser.no }}</b></span
                    >
                  </p>
                </li>
                <li>
                  <p>
                    사용자명:
                    <span
                      ><b>{{ founderConsult.nanudaUser.name }}</b></span
                    >
                  </p>
                </li>
                <li>
                  <p>
                    전화번호: <b>{{ founderConsult.nanudaUser.phone }}</b>
                  </p>
                </li>
                <li v-if="founderConsult.nanudaUser.genderInfo">
                  <p>{{ founderConsult.nanudaUser.genderInfo.desc }}</p>
                </li>
                <li v-if="founderConsult.nanudaUser.lastLoginAt">
                  <p>
                    마지막 로그인 날짜:
                    <b>{{
                      founderConsult.nanudaUser.lastLoginAt | dateTransformer
                    }}</b>
                  </p>
                </li>
              </ul>
            </div>
            <div v-else>
              사용자 없음
            </div>
          </template>
        </BaseCard>
      </div>
      <div class="my-2 col-md-4">
        <BaseCard title="관리자 정보">
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
                  <p>
                    관리자 ID:
                    <span
                      ><b>{{ founderConsult.admin.no }}</b></span
                    >
                  </p>
                </li>
                <li>
                  <p>
                    관리자명:
                    <span
                      ><b>{{ founderConsult.admin.name }}</b></span
                    >
                  </p>
                </li>
                <li>
                  <p>
                    전화번호: <b>{{ founderConsult.admin.phone }}</b>
                  </p>
                </li>
                <li>
                  <p>
                    생성 날짜:
                    <b>{{
                      founderConsult.admin.createdAt | dateTransformer
                    }}</b>
                  </p>
                </li>
              </ul>
            </div>
            <div v-else>
              관리자 없음
            </div>
          </template>
        </BaseCard>
      </div>
      <div class="my-2 col-md-4">
        <BaseCard title="업체 정보">
          <template v-slot:body>
            <div>
              <div v-if="founderConsult.space.companyDistricts[0]">
                <div>
                  <ul>
                    <li>
                      <p>
                        업체명:
                        <b>{{
                          founderConsult.space.companyDistricts[0].company
                            .nameKr
                        }}</b>
                      </p>
                    </li>
                    <li>
                      <p>
                        대표:
                        <b>{{
                          founderConsult.space.companyDistricts[0].company.ceoKr
                        }}</b>
                      </p>
                    </li>
                    <li>
                      <p>
                        업체 상태:
                        <b>{{
                          founderConsult.space.companyDistricts[0].company
                            .codeManagement.value
                        }}</b>
                      </p>
                    </li>
                    <li>
                      <p>
                        웹주소:
                        <b>{{
                          founderConsult.space.companyDistricts[0].company
                            .website
                        }}</b>
                      </p>
                    </li>
                    <li>
                      <p>
                        전화번호:
                        <b>{{
                          founderConsult.space.companyDistricts[0].company.phone
                        }}</b>
                      </p>
                    </li>
                    <li>
                      <p>
                        사업 등록번호:
                        <b>{{
                          founderConsult.space.companyDistricts[0].company
                            .businessNo
                        }}</b>
                      </p>
                    </li>
                    <li>
                      <p>
                        지점명:
                        <b>{{
                          founderConsult.space.companyDistricts[0].nameKr
                        }}</b>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div v-else>
                <p>업체 정보 없음</p>
              </div>
            </div>
          </template>
        </BaseCard>
      </div>
      <div class="my-2 col-md-4">
        <BaseCard title="공간 정보">
          <template v-slot:body>
            <div>
              <ul>
                <li>
                  <p>
                    공간번호 : <b>{{ founderConsult.space.no }}</b>
                  </p>
                </li>
                <li>
                  <p>
                    공간이름 : <b>{{ founderConsult.space.name }}</b>
                  </p>
                </li>
                <li>
                  <p>
                    공간주소 : <b>{{ founderConsult.space.address }}</b>
                  </p>
                </li>
                <li v-if="founderConsult.space.amenities.length > 0">
                  <p>
                    공용시설:
                    <b
                      v-for="amenity in founderConsult.space.amenities"
                      :key="amenity.no"
                      >{{ amenity.amenityName }}
                    </b>
                  </p>
                </li>
                <li v-if="founderConsult.space.deliverySpaceOptions.length > 0">
                  <p>
                    공간옵션 :
                    <b
                      v-for="option in founderConsult.space
                        .deliverySpaceOptions"
                      :key="option.no"
                    >
                      {{ option.deliverySpaceOptionName }}
                    </b>
                  </p>
                </li>
              </ul>
            </div>
          </template>
        </BaseCard>
      </div>
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
      <div
        v-if="selectedAdmin.name"
        class="py-2 px-4 rounded"
        style="background-color:#f1f1f1"
      >
        선택한 관리자 : <b>{{ selectedAdmin.name }}</b>
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
import BaseCard from '@/modules/_components/BaseCard.vue';

@Component({
  name: 'FounderConsultDetail',
  components: {
    BaseCard,
  },
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
<style lang="scss">
.page-content {
  background-color: #f1f1f1;
  padding: 10px 0 40px;
}
</style>
