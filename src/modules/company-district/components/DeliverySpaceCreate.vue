<template>
  <b-modal
    id="add_delivery_space"
    size="xl"
    title="타입 추가"
    @cancel="clearOut()"
    @ok="create()"
  >
    <b-form-row>
      <b-col lg="3" class="mb-3" v-if="!this.$route.params.id">
        <label>
          업체명
          <span class="red-text">*</span>
        </label>
        <select class="custom-select" @change="changeCompany($event)">
          <option
            v-for="company in companySelect"
            :key="company.no"
            :value="company.no"
            >{{ company.nameKr }}</option
          >
        </select>
      </b-col>
      <b-col lg="3" class="mb-3" v-if="!this.$route.params.id">
        <label>
          지점명 {{ deliverySpaceCreateDto.companyDistrictNo }}
          <span class="red-text">*</span>
        </label>
        <select
          class="custom-select"
          v-model="deliverySpaceCreateDto.companyDistrictNo"
        >
          <option value selected disabled>업체를 선택해주세요</option>
          <option
            v-for="district in districtSelect.items"
            :key="district.no"
            :value="district.no"
            >{{ district.nameKr }}</option
          >
        </select>
      </b-col>
      <b-col lg="3" class="mb-3">
        <label>
          타입명
          <span class="red-text">*</span>
        </label>
        <b-form-input
          type="text"
          v-model="deliverySpaceCreateDto.typeName"
        ></b-form-input>
      </b-col>
      <b-col lg="3" class="mb-3">
        <label>건물명</label>
        <b-form-input
          type="text"
          v-model="deliverySpaceCreateDto.buildingName"
        ></b-form-input>
      </b-col>
      <b-col lg="3" class="mb-3">
        <label>
          평수
          <span class="red-text">*</span>
        </label>
        <b-form-input
          type="text"
          v-model="deliverySpaceCreateDto.size"
        ></b-form-input>
      </b-col>
      <b-col lg="3" class="mb-3">
        <label>
          공간 수
          <span class="red-text">*</span>
        </label>
        <b-form-input
          type="number"
          v-model="deliverySpaceCreateDto.quantity"
        ></b-form-input>
      </b-col>
      <b-col lg="3" class="mb-3">
        <label>
          보증금 (만원 단위)
          <span class="red-text">*</span>
        </label>
        <b-form-input
          type="text"
          v-model="deliverySpaceCreateDto.deposit"
        ></b-form-input>
      </b-col>
      <b-col lg="3" class="mb-3">
        <label>
          월 임대료 (만원 단위)
          <span class="red-text">*</span>
        </label>
        <b-form-input
          type="text"
          v-model="deliverySpaceCreateDto.monthlyRentFee"
        ></b-form-input>
      </b-col>

      <b-col lg="3" class="mb-3">
        <label>
          월 관리비 (만원 단위)
          <span class="red-text">*</span>
        </label>
        <b-form-input
          type="text"
          v-model="deliverySpaceCreateDto.monthlyUtilityFee"
        ></b-form-input>
      </b-col>
      <b-col lg="12" class="mb-3">
        <label>공간 옵션</label>
        <b-form-checkbox-group
          id="kitchen_amenity"
          v-model="deliverySpaceCreateDto.deliverySpaceOptionIds"
          name="kitchen_amenity"
        >
          <b-form-checkbox
            v-for="option in spaceOptions"
            :key="option.no"
            :value="option.no"
            @change="addDeliverySpaceOption(option.no)"
            >{{ option.deliverySpaceOptionName }}</b-form-checkbox
          >
        </b-form-checkbox-group>
      </b-col>
      <b-col lg="12" class="mb-3">
        <label>주방 시설 정보</label>
        <b-form-checkbox-group
          id="kitchen_amenity"
          v-model="deliverySpaceCreateDto.amenityIds"
          name="kitchen_amenity"
        >
          <b-form-checkbox
            v-for="amenity in amenityList"
            :key="amenity.no"
            :value="amenity.no"
            @change="addAmenity(amenity.no)"
            >{{ amenity.amenityName }}</b-form-checkbox
          >
        </b-form-checkbox-group>
      </b-col>
      <b-col lg="12">
        <label for>이미지</label>
        <div class="custom-file">
          <input
            type="file"
            class="custom-file-input"
            id="customFileLang"
            lang="kr"
            v-on:change="upload($event.target.files)"
            multiple
          />
          <label class="custom-file-label" for="customFileLang"
            >이미지 추가</label
          >
        </div>
        <div v-if="attachments && attachments.length > 0" class="mt-2">
          <b-form-row no-gutters>
            <b-col
              cols="2"
              v-for="attachment in attachments"
              :key="attachment.originFileName"
              class="p-2"
            >
              <b-img
                :src="attachment.endpoint"
                alt
                style="max-width:100%"
                class="border rounded"
              />
            </b-col>
          </b-form-row>
        </div>
      </b-col>
    </b-form-row>
  </b-modal>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import {
  AmenityDto,
  CompanyDto,
  CompanyDistrictDto,
  DeliverySpaceDto,
  DeliverSpaceCreateDto,
  DeliverySpaceListDto,
  DeliverySpaceOptionDto,
} from '@/dto';
import { Component, Prop } from 'vue-property-decorator';

import AmenityService from '../../../services/amenity.service';
import CompanyService from '../../../services/company.service';
import CompanyDistrictService from '../../../services/company-district.service';
import DeliverSpaceService from '../../../services/delivery-space.service';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';

import {
  ATTACHMENT_REASON_TYPE,
  FileAttachmentDto,
} from '../../../services/shared/file-upload';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'DeliverySpaceCreate',
})
export default class DeliverySpaceCreate extends BaseComponent {
  private deliverySpaceCreateDto = new DeliverSpaceCreateDto();
  private attachments: FileAttachmentDto[] = [];
  private amenityList: AmenityDto[] = Array<AmenityDto>();
  private amenityIds: number[] = [];
  private spaceOptions: DeliverySpaceOptionDto[] = Array<
    DeliverySpaceOptionDto
  >();
  private deliverySpaceOptionsIds: number[] = [];

  private companySelect: CompanyDto[] = [];
  private districtSelect: CompanyDistrictDto[] = [];
  private companyDistrictDto = new CompanyDistrictDto();

  // TODO: Create autocomplete box
  getCompanies() {
    CompanyService.findForSelect().subscribe(res => {
      this.companySelect = res.data;
    });
  }

  // change compay select
  changeCompany(event) {
    const companyNo = event.target.value;
    this.getCompanyDistrict(companyNo);
  }

  // get company district select box
  getCompanyDistrict(companyNo) {
    this.companyDistrictDto.companyNo = companyNo;
    CompanyDistrictService.findForSelect(this.companyDistrictDto).subscribe(
      res => {
        if (res) {
          this.districtSelect = res.data;
        }
      },
    );
  }

  // add amenity array
  addAmenity(amenityId) {
    if (this.amenityIds.includes(parseInt(amenityId))) {
      const index = this.amenityIds.indexOf(parseInt(amenityId));
      if (index > -1) {
        this.amenityIds.splice(index, 1);
      }
    } else {
      this.amenityIds.unshift(parseInt(amenityId));
    }
  }

  // add delivery space option ids
  addDeliverySpaceOption(deliverySpaceOptionId) {
    if (
      this.deliverySpaceOptionsIds.includes(parseInt(deliverySpaceOptionId))
    ) {
      const index = this.deliverySpaceOptionsIds.indexOf(
        parseInt(deliverySpaceOptionId),
      );
      if (index > -1) {
        this.deliverySpaceOptionsIds.splice(index, 1);
      }
    } else {
      this.deliverySpaceOptionsIds.unshift(parseInt(deliverySpaceOptionId));
    }
  }

  // 타입 생성
  create() {
    if (this.$route.params.id) {
      this.deliverySpaceCreateDto.companyDistrictNo = parseInt(
        this.$route.params.id,
      );
    }
    this.deliverySpaceCreateDto.amenityIds = this.amenityIds;
    this.deliverySpaceCreateDto.deliverySpaceOptionIds = this.deliverySpaceOptionsIds;
    this.deliverySpaceCreateDto.images = this.attachments;
    DeliverSpaceService.create(this.deliverySpaceCreateDto).subscribe(res => {
      if (res) {
        this.clearOut();
        toast.success('추가완료');
        // 굳이 false보낼 필요는 없음
        this.$root.$emit('delivery_space_create', false);
      }
    });
  }

  // 타입 생성 초기화
  clearOut() {
    this.deliverySpaceCreateDto = new DeliverySpaceDto();
    this.amenityIds = [];
    this.deliverySpaceOptionsIds = [];
    this.attachments = [];
  }

  // 이미지 업로드
  async upload(file: FileList) {
    const attachments = await FileUploadService.upload(
      UPLOAD_TYPE.DELIVERY_SPACE,
      file,
    );
    this.attachments.push(
      ...attachments.filter(
        fileUpload =>
          fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
      ),
    );
  }

  getAmenities() {
    AmenityService.findAmenities('kitchen-facility').subscribe(res => {
      if (res) {
        this.amenityList = res.data;
      }
    });
  }

  getSpaceOptions() {
    DeliverSpaceService.findSpaceOption().subscribe(res => {
      if (res) {
        this.spaceOptions = res.data;
      }
    });
  }

  created() {
    this.getSpaceOptions();
    this.getAmenities();
    this.getCompanies();
  }
}
</script>
