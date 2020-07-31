<template>
  <section>
    <div class="d-flex justify-content-between align-items-end mb-2">
      <h3>
        <span v-if="founderConsult.space" class="mb-0">
          {{ founderConsult.space.name }} - 방문 신청</span
        >
      </h3>
      <router-link to="/founder-consult" class="btn btn-secondary text-center"
        >목록으로</router-link
      >
    </div>
    <div class="row d-flex align-items-stretch">
      <div class="my-3 col-md-4" v-if="founderConsult.nanudaUser">
        <BaseCard title="사용자 정보">
          <template v-slot:head>
            <div v-if="founderConsult.status !== 'F_DIST_COMPLETE'">
              <b-button
                variant="primary"
                @click="updateNanudaUser()"
                v-b-modal.nanuda-user
                >수정하기</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <div v-if="founderConsult.nanudaUser">
              <ul>
                <li>
                  사용자 ID:
                  <span>
                    <b>{{ founderConsult.nanudaUser.no }}</b>
                  </span>
                </li>
                <li>
                  사용자명:
                  <span>
                    <b>{{ founderConsult.nanudaUser.name }}</b>
                  </span>
                </li>
                <li>
                  <span>
                    전화번호:
                    <b>{{ founderConsult.nanudaUser.phone }}</b>
                  </span>
                  <span class="mx-2">
                    <b-button
                      size="sm"
                      variant="info"
                      pill
                      v-b-modal.message-user
                    >
                      <b-icon icon="envelope"></b-icon>
                      <span class="d-none">문자전송</span>
                    </b-button>
                  </span>
                </li>
                <li v-if="founderConsult.nanudaUser.genderInfo">
                  성별:
                  <b>{{ founderConsult.nanudaUser.genderInfo.value }}</b>
                </li>
                <!-- <li>
                  
                    공간 소유 유무 : <b>{{ founderConsult.spaceOwnYn }}</b>
                  
                </li>-->
                <li v-if="founderConsult.nanudaUser.lastLoginAt">
                  마지막 로그인 날짜:
                  <b>
                    {{
                      founderConsult.nanudaUser.lastLoginAt | dateTransformer
                    }}
                  </b>
                </li>
              </ul>
            </div>
            <div v-else>사용자 없음</div>
            <b-alert
              show
              variant="danger"
              v-if="!founderConsult.nanudaUser.genderInfo"
              class="mt-3"
              >성별 미입력 상태</b-alert
            >
          </template>
        </BaseCard>
      </div>
      <div class="my-3 col-md-4">
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
                  <b>{{ founderConsult.admin.createdAt | dateTransformer }}</b>
                </li>
              </ul>
            </div>
            <div v-else class="empty-data">관리자 없음</div>
          </template>
        </BaseCard>
      </div>
      <div
        class="my-3 col-md-4"
        v-if="founderConsult.space && founderConsult.space.companyDistricts[0]"
      >
        <BaseCard title="업체 정보">
          <template v-slot:head>
            <div></div>
          </template>
          <template v-slot:body>
            <div v-if="founderConsult.space">
              <ul>
                <li>
                  업체명:
                  <router-link
                    :to="{
                      name: 'CompanyDetail',
                      params: {
                        id: founderConsult.space.companyDistricts[0].company.no,
                      },
                    }"
                  >
                    <b>
                      {{
                        founderConsult.space.companyDistricts[0].company.nameKr
                      }}
                    </b>
                  </router-link>
                </li>
                <li
                  v-if="founderConsult.space.companyDistricts[0].company.ceoKr"
                >
                  대표:
                  <b>
                    {{ founderConsult.space.companyDistricts[0].company.ceoKr }}
                  </b>
                </li>
                <li
                  v-if="
                    founderConsult.space.companyDistricts[0].company.website
                  "
                >
                  웹사이트:
                  <a
                    :href="
                      founderConsult.space.companyDistricts[0].company.website
                    "
                    target="_blank"
                  >
                    <b>
                      {{
                        founderConsult.space.companyDistricts[0].company.website
                      }}
                    </b>
                  </a>
                </li>
                <li
                  v-if="founderConsult.space.companyDistricts[0].company.phone"
                >
                  전화번호:
                  <b>
                    {{ founderConsult.space.companyDistricts[0].company.phone }}
                  </b>
                </li>
                <li>
                  사업 등록번호:
                  <b>
                    {{
                      founderConsult.space.companyDistricts[0].company
                        .businessNo
                    }}
                  </b>
                </li>
                <li>
                  지점명:
                  <b>{{ founderConsult.space.companyDistricts[0].nameKr }}</b>
                </li>
                <li>
                  승인 상태:
                  <span class="badge badge-pill badge-warning p-2 mr-2">
                    {{
                      founderConsult.space.companyDistricts[0].company
                        .codeManagement.value
                    }}
                  </span>
                </li>
              </ul>
            </div>
            <div v-else class="empty-data">
              업체 정보 없음
            </div>
          </template>
        </BaseCard>
      </div>
      <div class="my-3 col-md-4">
        <BaseCard title="공간 정보">
          <template v-slot:body>
            <div v-if="founderConsult.space">
              <ul>
                <li>
                  공간번호 :
                  <b>{{ founderConsult.space.no }}</b>
                </li>
                <li>
                  공간 타입 :
                  <b>{{ founderConsult.space.spaceType.displayName }}</b>
                </li>
                <li v-if="founderConsult.space.name">
                  공간이름 :
                  <b>{{ founderConsult.space.name }}</b>
                </li>
                <li v-if="founderConsult.space.address">
                  공간주소 :
                  <b>{{ founderConsult.space.address }}</b>
                </li>
                <li v-if="founderConsult.space.deposit">
                  보증금 :
                  <b>{{ founderConsult.space.deposit }} 만원</b>
                </li>
                <li v-if="founderConsult.space.rentalFee">
                  월 임대료 :
                  <b>{{ founderConsult.space.rentalFee }} 만원</b>
                </li>
                <li v-if="founderConsult.space.amenities.length > 0">
                  공용시설:
                  <b-badge
                    variant="info"
                    v-for="amenity in founderConsult.space.amenities"
                    :key="amenity.no"
                    class="mr-1"
                    >{{ amenity.amenityName }}</b-badge
                  >
                </li>
                <li v-if="founderConsult.space.deliverySpaceOptions.length > 0">
                  공간옵션 :
                  <b-badge
                    variant="info"
                    v-for="option in founderConsult.space.deliverySpaceOptions"
                    :key="option.no"
                    class="mr-1"
                    >{{ option.deliverySpaceOptionName }}</b-badge
                  >
                </li>
              </ul>
            </div>
            <div v-else class="empty-data">
              공간 정보 없음
            </div>
          </template>
        </BaseCard>
      </div>
      <div class="my-3 col-md-4">
        <BaseCard title="상담 상세 정보">
          <template v-slot:head>
            <div v-if="founderConsult.createdAt">
              <b-button
                variant="danger"
                @click="updateConsultInfo()"
                v-b-modal.reverse-read
                v-if="founderConsult.viewCount === 'Y'"
                >미열람 처리</b-button
              >
              <b-button
                variant="primary"
                @click="updateConsultInfo()"
                v-b-modal.consult-info
                >수정하기</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <div v-if="founderConsult && founderConsult.codeManagement">
              <ul>
                <li>
                  상담 신청일 :
                  <b>{{ founderConsult.createdAt | dateTransformer }}</b>
                </li>
                <li v-if="founderConsult.changUpExpYn">
                  창업 경험 유무 :
                  <b>{{ founderConsult.changUpExpYn | enumTransformer }}</b>
                </li>
                <li v-if="founderConsult.hopeFoodCategory">
                  희망 업종 :
                  <b>{{ founderConsult.hopeFoodCategory }}</b>
                </li>
                <li>
                  통화 가능 시간 :
                  <b>{{ founderConsult.availableTime.value }}</b>
                </li>
                <li v-if="founderConsult.spaceConsultEtc">
                  문의 내용 : {{ founderConsult.spaceConsultEtc }}
                </li>
                <li>
                  신청 상태:
                  <span class="badge badge-pill badge-warning p-2">{{
                    founderConsult.codeManagement.value
                  }}</span>
                </li>
                <li
                  v-if="
                    founderConsult.companyDecisionStatusCode &&
                      founderConsult.space.companyDistricts.length > 0
                  "
                >
                  업체 지정 상태:
                  <span class="badge badge-pill badge-primary p-2">{{
                    founderConsult.companyDecisionStatusCode.value
                  }}</span>
                </li>
                <li v-if="founderConsult.space.companyDistricts.length > 0">
                  열람 상태:
                  <b>{{ founderConsult.viewCount | enumTransformer }}</b>
                </li>
                <li
                  v-if="
                    founderConsult.viewCount === 'Y' &&
                      founderConsult.space.companyDistricts.length > 0
                  "
                >
                  열람 시간:
                  <b>{{ founderConsult.openedAt | dateTransformer }}</b>
                </li>
                <li
                  v-if="
                    founderConsult.companyUser &&
                      founderConsult.viewCount === 'Y' &&
                      founderConsult.space.companyDistricts.length > 0
                  "
                >
                  열람한 사용자:
                  <b>{{ founderConsult.companyUser.name }}</b>
                </li>
              </ul>
            </div>
            <div v-else class="empty-data">
              상담 내역 없음
            </div>
          </template>
        </BaseCard>
      </div>
    </div>
    <!-- for the text message -->
    <b-modal
      id="nanuda-user"
      title="사용자정보 수정"
      @ok="updateFounderConsult()"
    >
      <div class="form-row">
        <div class="mb-3">
          <b-form-group label="사용자 성별">
            <b-form-radio
              v-model="founderConsultUpdateDto.gender"
              v-for="gender in genderSelect"
              :key="gender.no"
              :value="gender.key"
              name="gender"
              >{{ gender.value }}</b-form-radio
            >
          </b-form-group>
        </div>
      </div>
    </b-modal>
    <b-modal
      id="consult-info"
      title="상담 내용 수정"
      @ok="updateFounderConsult()"
    >
      <div class="form-row">
        <div class="col-12 mb-3">
          <label>신청 상태</label>
          <select
            class="custom-select"
            v-model="founderConsultUpdateDto.status"
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
        <div class="col-12 mb-3">
          <b-form-group label="창업 경험 유무">
            <b-form-radio
              v-model="founderConsultUpdateDto.changUpExpYn"
              v-for="yn in delYn"
              :key="yn"
              :value="yn"
              name="changUpExpYn"
              >{{ yn | enumTransformer }}</b-form-radio
            >
          </b-form-group>
        </div>
        <div class="col-12 mb-3">
          <label>희망 업종</label>
          <template>
            <b-form-input
              list="food-category-list"
              v-model="founderConsultUpdateDto.hopeFoodCategory"
            ></b-form-input>
            <datalist id="food-category-list">
              <option
                v-for="category in foodCategoryList"
                :key="category.code"
                :value="category.nameKr"
                >{{ category.nameKr }}</option
              >
            </datalist>
          </template>
        </div>
      </div>
    </b-modal>
    <b-modal
      v-if="founderConsult.nanudaUser"
      id="message-user"
      ok-title="전송"
      cancel-title="취소"
      :title="`${founderConsult.nanudaUser.name} 사용자에게 문자하기`"
    >
      <p class="mb-2">
        휴대폰 번호 :
        <b class="text-primary">{{ founderConsult.nanudaUser.phone }}</b>
      </p>
      <b-form-textarea
        id="message"
        placeholder="메세지를 입력해주세요.."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
    </b-modal>

    <!-- 열람 상태 미열람 모달 -->
    <b-modal
      id="reverse-read"
      title="상담 미열람 처리"
      header-bg-variant="danger"
      header-text-variant="light"
      ok-title="미열람 처리하기"
      ok-variant="danger"
      @ok="reverseReadStatus()"
    >
      <b-container>
        <p class="text-center">
          <b>미열람 처리하시겠습니까?</b>
        </p>
      </b-container>
    </b-modal>
    <!-- 관리자 수정하기 -->
    <b-modal
      id="admin-list"
      title="관리자 수정하기"
      @cancel="cancelSelection()"
      @hide="cancelSelection()"
      @ok="updateFounderConsult()"
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
import { GENDER, CONST_GENDER } from '../../../services/shared';
import CodeManagementService from '../../../services/code-management.service';
import FounderConsultService from '../../../services/founder-consult.service';
import AdminService from '../../../services/admin.service';
import FoodCategoryService from '../../../services/food-category.service';
import {
  AdminDto,
  AdminListDto,
  FounderConsultDto,
  FounderConsultUpdateDto,
} from '../../../dto';
import {
  FoodCategoryDto,
  FoodCategoryListDto,
} from '../../../dto/food-category';
import { Pagination, YN, CONST_YN } from '../../../common';
import { BaseUser } from '../../../services/shared/auth';
import BaseCard from '../../_components/BaseCard.vue';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'FounderConsultDetail',
  components: {
    BaseCard,
  },
})
export default class FounderConsultDetail extends BaseComponent {
  /* global kakao */

  private adminList: AdminDto[] = [];
  private adminListDto = new AdminListDto();
  private adminListCount = 0;
  private availableTimesSelect: CodeManagementDto[] = [];
  private delYn: YN[] = [...CONST_YN];
  private founderConsult = new FounderConsultDto();
  private founderConsultUpdateDto = new FounderConsultUpdateDto();
  private founderConsultStatusSelect: CodeManagementDto[] = [];
  private genderSelect: CodeManagementDto[] = [];
  private foodCategoryList: FoodCategoryDto[] = [];
  private foodCategoryListDto = new FoodCategoryListDto();
  private foodCategoryListCount = 0;
  private pagination = new Pagination();
  private selectedAdmin: AdminDto = new AdminDto(BaseUser);

  // 사용자 정보 수정
  updateNanudaUser() {
    if (this.founderConsult.nanudaUser.gender) {
      this.founderConsultUpdateDto.gender = this.founderConsult.nanudaUser.gender;
    }
    this.getGender();
  }

  // 상담 내용 수정
  updateConsultInfo() {
    this.founderConsultUpdateDto.status = this.founderConsult.status;
    this.founderConsultUpdateDto.changUpExpYn = this.founderConsult.changUpExpYn;
    this.founderConsultUpdateDto.hopeTime = this.founderConsult.hopeTime;
    this.getFounderConsultCodes();
    this.getAvailableTimes();
    this.findFoodCategory(true);
    this.getGender();
  }

  reverseReadStatus() {
    FounderConsultService.reverseReadStatus(this.$route.params.id).subscribe(
      res => {
        this.findOne(this.$route.params.id);
      },
    );
  }

  // 성별
  getGender() {
    CodeManagementService.findGender().subscribe(res => {
      this.genderSelect = res.data;
    });
  }

  // 희망 상담 시간
  getAvailableTimes() {
    CodeManagementService.findAvailableTimes().subscribe(res => {
      this.availableTimesSelect = res.data;
    });
  }

  // 신청 상태 코드
  getFounderConsultCodes() {
    CodeManagementService.findCodesFounderConsult().subscribe(res => {
      this.founderConsultStatusSelect = res.data;
    });
  }

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
      this.adminList = res.data.items;
      this.adminListCount = res.data.totalCount;
    });
  }

  findFoodCategory(isPagination: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = null;
    FoodCategoryService.findAll(
      this.foodCategoryListDto,
      this.pagination,
    ).subscribe(res => {
      this.foodCategoryList = res.data.items;
      this.foodCategoryListCount = res.data.totalCount;
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
      toast.success('수정완료');
    });
  }

  created() {
    const founderConsultId = this.$route.params.id;
    this.findOne(founderConsultId);
  }
}
</script>
