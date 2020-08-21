<template>
  <b-modal
    id="update_delivery_space"
    title="타입 수정"
    size="xl"
    @hide="clearOut()"
    @cancel="clearOut()"
    @ok="update()"
  >
    <b-form-row>
      <b-col lg="3" class="mb-3">
        <label>
          타입명
          <span class="red-text">*</span>
        </label>
        <b-form-input
          type="text"
          v-model="deliverySpaceUpdateDto.typeName"
        ></b-form-input>
      </b-col>
      <b-col lg="3" class="mb-3">
        <label>건물명</label>
        <b-form-input
          type="text"
          v-model="deliverySpaceUpdateDto.buildingName"
        ></b-form-input>
      </b-col>
      <b-col lg="3" class="mb-3">
        <label>
          평수
          <span class="red-text">*</span>
        </label>
        <b-form-input
          type="text"
          v-model="deliverySpaceUpdateDto.size"
        ></b-form-input>
      </b-col>
      <b-col lg="3" class="mb-3">
        <label>
          공간 수
          <span class="red-text">*</span>
        </label>
        <b-form-input
          type="number"
          v-model="deliverySpaceUpdateDto.quantity"
        ></b-form-input>
      </b-col>
      <b-col lg="3" class="mb-3">
        <label>
          보증금 (만원 단위)
          <span class="red-text">*</span>
        </label>
        <b-form-input
          type="text"
          v-model="deliverySpaceUpdateDto.deposit"
        ></b-form-input>
      </b-col>
      <b-col lg="3" class="mb-3">
        <label>
          월 임대료 (만원 단위)
          <span class="red-text">*</span>
        </label>
        <b-form-input
          type="text"
          v-model="deliverySpaceUpdateDto.monthlyRentFee"
        ></b-form-input>
      </b-col>

      <b-col lg="3" class="mb-3">
        <label>
          월 관리비 (만원 단위)
          <span class="red-text">*</span>
        </label>
        <b-form-input
          type="text"
          v-model="deliverySpaceUpdateDto.monthlyUtilityFee"
        ></b-form-input>
      </b-col>
      <b-col lg="12" class="mb-3">
        <label>공간 옵션</label>
        <b-form-checkbox-group
          id="update_delivery_space_options"
          v-model="deliverySpaceOptionIds"
          name="update_delivery_space_options"
        >
          <b-form-checkbox
            v-for="option in deliverySpaceOptionsList"
            :key="option.no"
            :value="option.no"
            @change="addDeliverySpaceOption(option.no)"
            >{{ option.deliverySpaceOptionName }}</b-form-checkbox
          >
        </b-form-checkbox-group>
      </b-col>
      <b-col lg="12" class="mb-3">
        <label>주방 시설</label>
        <b-form-checkbox-group
          id="update_kitchen_facility"
          v-model="amenityIds"
          name="update_kitchen_facility"
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
            >이미지 변경</label
          >
        </div>
        <div v-if="!dataLoading">
          <div
            v-if="selectedImages && selectedImages.length > 0 && !changedImage"
            class="attatchments-list mt-2"
          >
            <b-form-row no-gutters>
              <b-col
                cols="2"
                v-for="images in selectedImages"
                :key="images.originFileName"
                class="p-2"
              >
                <div class="attatchments-list-item">
                  <b-img
                    :src="images.endpoint"
                    alt
                    style="max-width:100%"
                    class="border rounded"
                  />
                  <b-icon
                    icon="backspace-fill"
                    variant="danger"
                    class="btn-delete-item"
                    @click="deleteImages(images)"
                  ></b-icon>
                </div>
              </b-col>
            </b-form-row>
          </div>
          <div
            v-if="newImages && newImages.length > 0 && changedImage"
            class="attatchments-list mt-2"
          >
            <b-form-row no-gutters>
              <b-col
                cols="2"
                v-for="images in newImages"
                :key="images.originFileName"
                class="p-2"
              >
                <div class="attatchments-list-item">
                  <b-img
                    :src="images.endpoint"
                    alt
                    style="max-width:100%"
                    class="border rounded"
                  />
                  <b-icon
                    icon="backspace-fill"
                    variant="danger"
                    class="btn-delete-item"
                    @click="deleteImages(images)"
                  ></b-icon>
                </div>
              </b-col>
            </b-form-row>
          </div>
        </div>
        <div class="half-circle-spinner mt-5" v-if="dataLoading">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
        </div>
      </b-col>
    </b-form-row>
  </b-modal>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import Component from 'vue-class-component';
import toast from '../../../../resources/assets/js/services/toast.js';

import {
  AmenityDto,
  DeliverySpaceDto,
  DeliverySpaceOptionDto,
  DeliverySpaceUpdateDto,
} from '../../../dto';

import {
  ATTACHMENT_REASON_TYPE,
  FileAttachmentDto,
} from '../../../services/shared/file-upload';
import AmenityService from '../../../services/amenity.service';
import DeliverySpaceService from '../../../services/delivery-space.service';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';

@Component({
  name: 'DeliverySpaceUpdate',
})
export default class DeliverySpaceUpdate extends BaseComponent {
  private deliverySpaceDto = new DeliverySpaceDto();
  private deliverySpaceUpdateDto = new DeliverySpaceUpdateDto();

  private amenityIds: number[] = [];
  private amenityList: AmenityDto[] = [];
  private attachments: FileAttachmentDto[] = [];
  private deliverySpaceOptionIds: number[] = [];
  private deliverySpaceOptionsList: DeliverySpaceOptionDto[] = [];

  private selectedImages = [];
  private newImages: FileAttachmentDto[] = [];
  private changedImage = false;
  private dataLoading = false;

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
    if (this.deliverySpaceOptionIds.includes(parseInt(deliverySpaceOptionId))) {
      const index = this.deliverySpaceOptionIds.indexOf(
        parseInt(deliverySpaceOptionId),
      );
      if (index > -1) {
        this.deliverySpaceOptionIds.splice(index, 1);
      }
    } else {
      this.deliverySpaceOptionIds.unshift(parseInt(deliverySpaceOptionId));
    }
  }

  // get common facility list
  getSpaceOptions() {
    DeliverySpaceService.findSpaceOption().subscribe(res => {
      if (res) {
        this.deliverySpaceOptionsList = res.data;
      }
    });
  }

  // get kitchen facility list
  getAmenities() {
    AmenityService.findAmenities('kitchen-facility').subscribe(res => {
      if (res) {
        this.amenityList = res.data;
      }
    });
  }

  // find delivery space dto
  findOne(deliverySpaceDto: DeliverySpaceDto) {
    this.deliverySpaceDto = deliverySpaceDto;

    this.deliverySpaceUpdateDto = this.deliverySpaceDto;
    this.deliverySpaceUpdateDto.companyDistrictNo =
      deliverySpaceDto.companyDistrictNo;

    this.amenityIds = this.deliverySpaceDto.amenities.map(v => v.no);
    this.deliverySpaceOptionIds = this.deliverySpaceDto.deliverySpaceOptions.map(
      v => v.no,
    );

    this.selectedImages = this.deliverySpaceDto.images;
  }

  // 이미지 업로드
  async upload(file: FileList) {
    this.dataLoading = true;
    const attachments = await FileUploadService.upload(
      UPLOAD_TYPE.DELIVERY_SPACE,
      file,
    );
    this.newImages.push(
      ...attachments.filter(
        fileUpload =>
          fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
      ),
    );
    this.dataLoading = false;
    this.changedImage = true;
  }

  // TODO: 이미지 리스트 상 삭제 리팩토링 필요..
  // delete images
  deleteImages(image) {
    if (!this.changedImage) {
      if (this.selectedImages.includes(image)) {
        const index = this.selectedImages.indexOf(image);
        if (index > -1) {
          this.selectedImages.splice(index, 1);
        }
      }
    } else {
      if (this.newImages.includes(image)) {
        const index = this.newImages.indexOf(image);
        if (index > -1) {
          this.newImages.splice(index, 1);
        }
      }
    }
  }

  // update delivery space dto
  update() {
    this.deliverySpaceUpdateDto.deliverySpaceOptionIds = this.deliverySpaceOptionIds;
    this.deliverySpaceUpdateDto.amenityIds = this.amenityIds;
    if (this.newImages.length > 0) {
      this.deliverySpaceUpdateDto.images = this.newImages;
    }

    DeliverySpaceService.update(
      this.$route.params.id,
      this.deliverySpaceUpdateDto,
    ).subscribe(res => {
      if (res) {
        this.changedImage = false;
        this.$root.$emit('find_delivery_space');
        toast.success('수정완료');
      }
    });
  }

  clearOut() {
    this.deliverySpaceUpdateDto = new DeliverySpaceUpdateDto();
  }

  created() {
    this.getAmenities();
    this.getSpaceOptions();
  }

  mounted() {
    this.$root.$on('update_delivery_space', deliverySpaceDto => {
      this.findOne(deliverySpaceDto);
    });
  }
}
</script>
