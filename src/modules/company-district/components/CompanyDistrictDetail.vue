<template>
  <section>
    <b-row
      no-gutters
      align-h="between"
      align-v="end"
      class="title mb-3"
      v-if="companyDistrict"
    >
      <h3>
        <span v-if="companyDistrict.nameKr"
          >{{ companyDistrict.nameKr }} - 업체 지점 정보</span
        >
      </h3>
      <router-link
        to="/company/company-district"
        class="btn btn-secondary text-center"
        >목록으로</router-link
      >
    </b-row>
    <div class="row d-flex align-items-stretch">
      <div class="col col-12 col-lg-6 my-3">
        <BaseCard title="지점 정보">
          <template v-slot:head>
            <div v-if="companyDistrict.companyDistrictStatus === 'APPROVAL'">
              <b-button
                variant="primary"
                v-b-modal.district_info
                @click="findDistrictInfo()"
                >수정하기</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <div v-if="companyDistrict">
              <div>
                <ul>
                  <li v-if="companyDistrict.no">
                    지점 ID : <b>{{ companyDistrict.no }}</b>
                  </li>
                  <li v-if="companyDistrict.nameKr">
                    지점명 : <b>{{ companyDistrict.nameKr }}</b> ({{
                      companyDistrict.nameEng
                    }})
                  </li>
                  <li v-if="companyDistrict.address">
                    지점 주소 : <b>{{ companyDistrict.address }}</b>
                  </li>
                  <li v-if="companyDistrict.company">
                    업체명 :
                    <router-link
                      :to="{
                        name: 'CompanyDetail',
                        params: {
                          id: companyDistrict.company.no,
                        },
                      }"
                    >
                      <b>{{ companyDistrict.company.nameKr }}</b>
                    </router-link>
                  </li>
                  <li>
                    공용 시설 정보 :
                    <b-badge
                      variant="info"
                      v-for="amenity in companyDistrict.amenities"
                      :key="amenity.no"
                      class="m-1"
                    >
                      {{ amenity.amenityName }}
                    </b-badge>
                  </li>
                  <li v-if="companyDistrict.createdAt">
                    등록일 : {{ companyDistrict.createdAt | dateTransformer }}
                  </li>
                  <li v-if="companyDistrict.companyDistrictStatus">
                    승인 상태 :
                    <b-badge variant="warning" class="badge-pill p-2 mr-2">
                      {{
                        companyDistrict.companyDistrictStatus | enumTransformer
                      }}
                    </b-badge>
                    <span
                      v-if="companyDistrict.updatedAt"
                      class="d-inline-block"
                      >({{ companyDistrict.updatedAt | dateTransformer }})</span
                    >
                  </li>
                </ul>
              </div>
              <div class="mt-4">
                <div id="map" style="width:100%; height:300px"></div>
                <div class="text-right mt-2">
                  <a
                    :href="
                      `https://map.kakao.com/link/map/${companyDistrict.nameKr},${companyDistrict.lat},${companyDistrict.lon}`
                    "
                    target="_blank"
                    class="btn btn-sm btn-outline-info"
                    >크게보기</a
                  >
                </div>
              </div>
            </div>
            <ApprovalCard
              :data="companyDistrict"
              :dto="companyDistrictUpdateRefusalDto"
              :reasonDto="companyDistrictUpdateRefusalReasonDto"
              status="companyDistrictStatus"
              histories="companyDistrictUpdateHistories"
              @approval="updateApproval()"
              @refusal="updateRefusal()"
            />
          </template>
        </BaseCard>
      </div>
      <div class="col col-12 col-lg-6 my-3">
        <BaseCard title="타입 정보">
          <template v-slot:head> </template>
          <template v-slot:body>
            <div v-if="deliverySpaceListCount">
              <div v-for="type in deliverySpaceList" :key="type.no">
                <div class="card mb-3">
                  <b-row no-gutters align-h="start" align-v="start">
                    <b-col cols="4" class="p-2">
                      <b-img
                        src="https://www.ajactraining.org/wp-content/uploads/2019/09/image-placeholder.jpg"
                        rounded
                        alt="Rounded image"
                        style="max-width:100%"
                      ></b-img>
                    </b-col>
                    <b-col cols="8" class="p-2">
                      <h5 v-if="type.typeName">{{ type.typeName }}</h5>
                      <ul>
                        <li v-if="type.buildingName">
                          건물명 : {{ type.buildingName }}
                        </li>
                        <li v-if="type.size">평수 : {{ type.size }} 평</li>
                        <li v-if="type.deposit">
                          보증금 : {{ type.deposit }} 만원
                        </li>
                        <li v-if="type.monthlyUtilityFee">
                          관리비 : {{ type.monthlyUtilityFee }} 만원
                        </li>
                        <li v-if="type.quantity">
                          남은 공실 갯수 :
                          <b>{{ type.remainingCount }}/ {{ type.quantity }}</b>
                        </li>
                        <li v-if="type.deliverySpaceOptions.length > 0">
                          공간 옵션 :
                          <b-badge
                            variant="success"
                            v-for="option in type.deliverySpaceOptions"
                            :key="option.no"
                            class="m-1"
                          >
                            {{ option.deliverySpaceOptionName }}
                          </b-badge>
                        </li>
                        <li v-if="type.amenities.length > 0">
                          주방 시설 :
                          <b-badge
                            variant="info"
                            v-for="amenity in type.amenities"
                            :key="amenity.no"
                            class="m-1"
                          >
                            {{ amenity.amenityName }}
                          </b-badge>
                        </li>
                      </ul>
                    </b-col>
                  </b-row>
                </div>
              </div>
              <b-pagination
                v-model="pagination.page"
                v-if="deliverySpaceListCount"
                pills
                :total-rows="deliverySpaceListCount"
                :per-page="pagination.limit"
                @input="paginateSearch"
                class="mt-4 justify-content-center"
              ></b-pagination>
            </div>
            <div v-else class="empty-data">
              타입 정보 없음
            </div>
          </template>
        </BaseCard>
      </div>
    </div>
    <b-modal id="district_info" title="업체 정보 수정" @ok="updateDistrict()">
      <div class="form-row">
        <div class="col-12 col-md-6 mt-2">
          <label>지점명</label>
          <input
            type="text"
            v-model="companyDistrictUpdateDto.nameKr"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label>지점명(영문)</label>
          <input
            type="text"
            v-model="companyDistrictUpdateDto.nameEng"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label>지점 주소</label>
          <input
            type="text"
            v-model="companyDistrictUpdateDto.address"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label>공용 시설 정보</label>
          <b-form-checkbox-group
            id="common_amenity"
            v-model="companyDistrictUpdateDto.amenities"
            name="common_amenity"
          >
            <b-form-checkbox
              v-for="amenity in commonAmenityList"
              :key="amenity.no"
              :value="amenity"
              >{{ amenity.amenityName }}</b-form-checkbox
            >
          </b-form-checkbox-group>
        </div>
      </div>
    </b-modal>
  </section>
</template>
<script lang="ts">
import ApprovalCard from '../../../modules/_components/ApprovalCard.vue';
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import BaseCard from '../../_components/BaseCard.vue';
import { BaseUser } from '../../../services/shared/auth';
import {
  CompanyDistrictDto,
  CompanyDistrictUpdateDto,
  CompanyDistrictUpdateRefusalDto,
  CompanyDistrictUpdateRefusalReasonDto,
  DeliverySpaceDto,
  DeliverySpaceListDto,
  AmenityDto,
} from '../../../dto';
import AmenityService from '../../../services/amenity.service';
import CompanyDistrictService from '../../../services/company-district.service';
import DeliverSpaceService from '../../../services/delivery-space.service';

import toast from '../../../../resources/assets/js/services/toast.js';
import { Pagination } from '@/common';

@Component({
  components: {
    BaseCard,
    ApprovalCard,
  },
})
export default class CompanyDistrictDetail extends BaseComponent {
  private companyDistrict = new CompanyDistrictDto();
  private companyDistrictUpdateDto = new CompanyDistrictUpdateDto();
  private companyDistrictUpdateRefusalDto = new CompanyDistrictUpdateRefusalDto();
  private companyDistrictUpdateRefusalReasonDto = (this.companyDistrictUpdateRefusalDto.refusalReasons = new CompanyDistrictUpdateRefusalReasonDto());
  private pagination = new Pagination();

  private deliverySpaceList: DeliverySpaceDto[] = Array<DeliverySpaceDto>();
  private deliverySpaceListDto = new DeliverySpaceListDto();
  private deliverySpaceListCount = 0;

  private commonAmenityList = [];
  private selectedCommonAmenities: AmenityDto[] = [];

  findOne(id) {
    CompanyDistrictService.findOne(id).subscribe(res => {
      this.companyDistrict = res.data;
      this.setMap(this.companyDistrict);
      this.findDeliverySpace();
    });
  }

  // 타입 공간 리스트
  findDeliverySpace(isPagination?: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = 3;
    this.deliverySpaceListDto.companyDistrictNo = this.companyDistrict.no;
    DeliverSpaceService.findAll(
      this.deliverySpaceListDto,
      this.pagination,
    ).subscribe(res => {
      this.deliverySpaceList = res.data.items;
      this.deliverySpaceListCount = res.data.totalCount;
    });
  }

  paginateSearch() {
    this.findDeliverySpace(true);
  }

  findDistrictInfo() {
    this.companyDistrictUpdateDto = this.companyDistrict;
    this.findOne(this.$route.params.id);
    this.getAmenities();
  }

  // 공용 시설 정보 리스트
  getAmenities() {
    AmenityService.findCommonAmenities().subscribe(res => {
      this.commonAmenityList = res.data;
    });
  }

  // 지점 정보 수정
  updateDistrict() {
    CompanyDistrictService.update(
      this.$route.params.id,
      this.companyDistrictUpdateDto,
    ).subscribe(res => {
      if (res) {
        this.findOne(this.$route.params.id);
      }
    });
  }

  //승인
  updateApproval() {
    CompanyDistrictService.updateCompanyDistrictStatus(
      this.$route.params.id,
      'approve-update',
    ).subscribe(res => {
      if (res) {
        this.findOne(this.$route.params.id);
        toast.success('승인완료');
      }
    });
  }

  // 거절
  updateRefusal() {
    CompanyDistrictService.updateCompanyDistrictStatus(
      this.$route.params.id,
      'refuse-update',
      this.companyDistrictUpdateRefusalDto,
    ).subscribe(res => {
      if (res) {
        this.findOne(this.$route.params.id);
        toast.success('승인거절');
      }
    });
  }

  // 지도 가져오기
  setMap(district: CompanyDistrictDto) {
    const mapContainer = document.getElementById('map'),
      mapOption = {
        center: new window.kakao.maps.LatLng(district.lat, district.lon),
        level: 3,
        maxLevel: 6,
        mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
      };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    const markerPosition = new window.kakao.maps.LatLng(
      district.lat,
      district.lon,
    );
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }

  created() {
    const id = this.$route.params.id;
    this.findOne(id);
  }
}
</script>
