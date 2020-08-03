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
                  <span v-if="companyDistrict.updatedAt" class="d-inline-block"
                    >({{ companyDistrict.updatedAt | dateTransformer }})</span
                  >
                </li>
              </ul>
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
import CompanyDistrictService from '../../../services/company-district.service';
import {
  CompanyDistrictDto,
  CompanyDistrictUpdateDto,
  CompanyDistrictUpdateRefusalDto,
  CompanyDistrictUpdateRefusalReasonDto,
} from '../../../dto';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'CompanyDistrictDetail',
  components: {
    ApprovalCard,
    BaseCard,
  },
})
export default class CompanyDistrictDetail extends BaseComponent {
  private companyDistrict = new CompanyDistrictDto();
  private companyDistrictUpdateDto = new CompanyDistrictUpdateDto();
  private companyDistrictUpdateRefusalDto = new CompanyDistrictUpdateRefusalDto();
  private companyDistrictUpdateRefusalReasonDto = (this.companyDistrictUpdateRefusalDto.refusalReasons = new CompanyDistrictUpdateRefusalReasonDto());

  findOne(id) {
    CompanyDistrictService.findOne(id).subscribe(res => {
      this.companyDistrict = res.data;
    });
  }

  findDistrictInfo() {
    this.companyDistrictUpdateDto.nameKr = this.companyDistrict.nameKr;
    this.companyDistrictUpdateDto.nameEng = this.companyDistrict.nameEng;
    this.companyDistrictUpdateDto.address = this.companyDistrict.address;
    this.findOne(this.$route.params.id);
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

  created() {
    const id = this.$route.params.id;
    this.findOne(id);
  }
}
</script>
