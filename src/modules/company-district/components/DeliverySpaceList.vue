<template>
  <div>
    <div v-if="deliverySpaceListCount">
      <div v-for="type in deliverySpaceList" :key="type.no">
        <div class="card mb-3">
          <b-row no-gutters align-h="start" align-v="start">
            <b-col cols="4" class="p-2">
              <b-img-lazy
                v-if="
                  type.images &&
                    type.images[0] &&
                    type.images[0].endpoint.includes('storage')
                "
                :src="type.images[0].endpoint"
                :alt="type.images[0].originalFilename"
                onerror="https://www.ajactraining.org/wp-content/uploads/2019/09/image-placeholder.jpg"
                rounded
                style="max-width:100%"
              />
              <b-img-lazy
                v-else
                src="https://www.ajactraining.org/wp-content/uploads/2019/09/image-placeholder.jpg"
                rounded
                style="max-width:100%"
              />
              <div class="text-center mt-2">
                <b-button
                  variant="outline-secondary"
                  size="sm"
                  v-b-modal.view_detail
                  @click="findOne(type.no)"
                >상세보기</b-button>
              </div>
            </b-col>
            <b-col cols="8" class="p-2">
              <h5 v-if="type.typeName">{{ type.typeName }}</h5>
              <ul class="u-list">
                <li v-if="type.buildingName">건물명 : {{ type.buildingName }}</li>
                <li v-if="type.size">평수 : {{ type.size }} 평</li>
                <li v-if="type.deposit">보증금 : {{ type.deposit }} 만원</li>
                <li v-if="type.monthlyRentFee">월 임대료 : {{ type.monthlyRentFee }} 만원</li>
                <li v-if="type.monthlyUtilityFee">월 관리비 : {{ type.monthlyUtilityFee }} 만원</li>
                <li v-if="type.quantity">
                  남은 공실 갯수 :
                  <b>{{ type.quantity - type.contracts.length }} / {{ type.quantity }}</b>
                </li>
                <li v-if="type.deliverySpaceOptions.length > 0">
                  공간 옵션 :
                  <b-badge
                    variant="success"
                    v-for="option in type.deliverySpaceOptions"
                    :key="option.no"
                    class="m-1"
                  >{{ option.deliverySpaceOptionName }}</b-badge>
                </li>
                <li v-if="type.amenities.length > 0">
                  주방 시설 :
                  <b-badge
                    variant="info"
                    v-for="amenity in type.amenities"
                    :key="amenity.no"
                    class="m-1"
                  >{{ amenity.amenityName }}</b-badge>
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
    <div v-else class="empty-data">타입 정보 없음</div>
    <b-modal id="view_detail" size="xl" :title="`${deliverySpaceDto.typeName} 상세 보기`">
      <b-row>
        <b-col cols="12" md="6">
          <b-carousel
            v-if="deliverySpaceDto.images"
            :interval="3000"
            controls
            indicators
            background="white"
            img-width="500"
            img-height="480"
          >
            <b-carousel-slide
              v-for="image in deliverySpaceDto.images"
              :key="image.originalFilename"
              :img-src="image.endpoint"
            ></b-carousel-slide>
          </b-carousel>
        </b-col>
        <b-col cols="12" md="6">
          <h4 v-if="deliverySpaceDto.typeName" class="mb-3">{{ deliverySpaceDto.typeName }}</h4>
          <ul class="u-list">
            <li v-if="deliverySpaceDto.buildingName">건물명 : {{ deliverySpaceDto.buildingName }}</li>
            <li v-if="deliverySpaceDto.size">평수 : {{ deliverySpaceDto.size }} 평</li>
            <li v-if="deliverySpaceDto.deposit">보증금 : {{ deliverySpaceDto.deposit }} 만원</li>
            <li
              v-if="deliverySpaceDto.monthlyRentFee"
            >월 임대료 : {{ deliverySpaceDto.monthlyRentFee }} 만원</li>
            <li
              v-if="deliverySpaceDto.monthlyUtilityFee"
            >월 관리비 : {{ deliverySpaceDto.monthlyUtilityFee }} 만원</li>
            <li
              v-if="
                deliverySpaceDto.deliverySpaceOptions &&
                  deliverySpaceDto.deliverySpaceOptions.length > 0
              "
            >
              공간 옵션 :
              <b-badge
                variant="success"
                v-for="option in deliverySpaceDto.deliverySpaceOptions"
                :key="option.no"
                class="m-1"
              >{{ option.deliverySpaceOptionName }}</b-badge>
            </li>
            <li
              v-if="
                deliverySpaceDto.amenities &&
                  deliverySpaceDto.amenities.length > 0
              "
            >
              주방 시설 :
              <b-badge
                variant="info"
                v-for="amenity in deliverySpaceDto.amenities"
                :key="amenity.no"
                class="m-1"
              >{{ amenity.amenityName }}</b-badge>
            </li>
          </ul>
          <div v-if="deliverySpaceDto.quantity" class="border bg-light rounded p-3 mt-3">
            남은 공실 갯수 :
            <b
              :class="[
                deliverySpaceDto.remainingCount > 0
                  ? 'text-success'
                  : 'text-danger',
              ]"
            >{{ deliverySpaceDto.remainingCount }}</b>
            /
            {{ deliverySpaceDto.quantity }}
          </div>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>
<script lang="ts">
import BaseCard from '../../_components/BaseCard.vue';
import BaseComponent from '@/core/base.component';
import { DeliverySpaceDto, DeliverySpaceListDto } from '../../../dto';
import AmenityService from '../../../services/amenity.service';
import DeliverSpaceService from '../../../services/delivery-space.service';
import { Pagination } from '@/common';
import { Prop, Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'DeliverySpaceList',
  components: {
    BaseCard,
  },
})
export default class DeliverySpaceList extends BaseComponent {
  private deliverySpaceList: DeliverySpaceDto[] = Array<DeliverySpaceDto>();
  private deliverySpaceListDto = new DeliverySpaceListDto();
  private deliverySpaceDto = new DeliverySpaceDto();
  private deliverySpaceListCount = 0;
  private pagination = new Pagination();

  // 타입 공간 리스트
  findAll(isPagination?: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = 3;
    this.deliverySpaceListDto.companyDistrictNo = parseInt(
      this.$route.params.id,
    );

    DeliverSpaceService.findAll(
      this.deliverySpaceListDto,
      this.pagination,
    ).subscribe(res => {
      this.deliverySpaceList = res.data.items;
      this.deliverySpaceListCount = res.data.totalCount;
    });
  }

  // 타입 상세 보기
  findOne(typeNo) {
    DeliverSpaceService.findOne(typeNo).subscribe(res => {
      if (res) {
        this.deliverySpaceDto = res.data;
      }
    });
  }

  paginateSearch() {
    this.findAll(true);
  }

  created() {
    this.findAll();
  }
}
</script>
