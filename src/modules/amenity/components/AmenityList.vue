<template>
  <div>
    <div>
      <b-button @click="search('common-facility')">공용시설</b-button>
      <b-button @click="search('kitchen-facility')">주방시설</b-button>
    </div>
    <div v-for="amenity in amenityList" :key="amenity.amenityName">
      {{ amenity.amenityName }}
    </div>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import Component from 'vue-class-component';
import { AmenityDto, AmenityListDto } from '@/dto';
import { Pagination } from '@/common';
import { AMENITY } from '@/services/shared';
import AmenityService from '@/services/amenity.service';

@Component({
  name: 'AmenityList',
})
export default class AmenityList extends BaseComponent {
  private amenityList: AmenityDto[] = [];
  private amenityListCount = 0;
  private amenitySearchDto = new AmenityListDto();
  private pagination = new Pagination();

  search(amenityType?: string, isPagination?: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.amenitySearchDto.amenityType = AMENITY.COMMON_FACILITY;
    AmenityService.findAmenities(amenityType).subscribe(res => {
      this.amenityList = res.data;
      console.log(this.amenityList);
    });
  }

  created() {
    this.search('common-facility');
  }
}
</script>
