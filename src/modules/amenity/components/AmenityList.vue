<template>
  <section>
    <div class="title mb-2 pb-2">
      <h3>시설 관리</h3>
    </div>
    <div class="divider"></div>
    <div class="text-right">
      <b-button variant="primary" v-b-modal.add_aminity>
        추가하기
      </b-button>
    </div>
    <b-row>
      <b-col lg="6" class="my-3">
        <BaseCard title="공통 시설" no-body>
          <template v-slot:head> </template>
          <table class="table">
            <tbody>
              <tr
                v-for="amenity in amenityCommonList"
                :key="amenity.amenityName"
              >
                <td>{{ amenity.amenityName }}</td>
                <td>{{ amenity.amenityCode }}</td>
              </tr>
            </tbody>
          </table>
        </BaseCard>
      </b-col>
      <b-col lg="6" class="my-3">
        <BaseCard title="주방 시설" no-body>
          <template v-slot:head> </template>
          <table class="table">
            <tbody>
              <tr
                v-for="amenity in amenityKitchenList"
                :key="amenity.amenityName"
              >
                <td>{{ amenity.amenityName }}</td>
                <td>{{ amenity.amenityCode }}</td>
              </tr>
            </tbody>
          </table>
        </BaseCard>
      </b-col>
    </b-row>
    <b-modal
      id="add_aminity"
      title="시설 추가하기"
      @hide="clearOut()"
      @cancel="clearOut()"
      @ok="create()"
    >
      <b-form-row>
        <b-col cols="12">
          <b-form-group label-cols="3" label="시설 타입">
            <b-form-radio
              v-model="amenityCreateDto.amenityType"
              v-for="code in amenityCodeSelect"
              :key="code"
              :value="code"
              name="amenity_code"
              >{{ code | enumTransformer }}</b-form-radio
            >
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="시설 코드">
            <b-form-input v-model="amenityCreateDto.amenityCode" />
          </b-form-group>
        </b-col>
        <b-col cols="8">
          <b-form-group label="시설 이름">
            <b-form-input v-model="amenityCreateDto.amenityName" />
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-modal>
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import Component from 'vue-class-component';
import { AmenityDto, AmenityListDto } from '@/dto';
import { Pagination } from '@/common';
import { AMENITY, CONST_AMENITY } from '@/services/shared';

import AmenityService from '@/services/amenity.service';
import BaseCard from '../../_components/BaseCard.vue';

import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'AmenityList',
  components: {
    BaseCard,
  },
})
export default class AmenityList extends BaseComponent {
  private amenityCommonList: AmenityDto[] = [];
  private amenityKitchenList: AmenityDto[] = [];
  private amenitySearchDto = new AmenityListDto();
  private amenityCreateDto = new AmenityDto();
  private amenityCodeSelect: AMENITY[] = [...CONST_AMENITY];

  search() {
    AmenityService.findAmenities('common-facility').subscribe(res => {
      this.amenityCommonList = res.data;
    });
    AmenityService.findAmenities('kitchen-facility').subscribe(res => {
      this.amenityKitchenList = res.data;
    });
  }

  create() {
    AmenityService.create(this.amenityCreateDto).subscribe(res => {
      if (res) {
        this.search();
        toast.success('추가완료');
      }
    });
  }

  clearOut() {
    this.amenityCreateDto = new AmenityDto();
    this.search();
  }

  created() {
    this.search();
  }
}
</script>
