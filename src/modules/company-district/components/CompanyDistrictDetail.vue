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
          <template v-slot:body>
            <div v-if="companyDistrict">
              <ul>
                <li v-if="companyDistrict.no">
                  지점 ID : <b>{{ companyDistrict.no }}</b>
                </li>
                <li v-if="companyDistrict.nameKr">
                  지점명 : <b>{{ companyDistrict.nameKr }}</b>
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
              status="companyDistrictStatus"
              histories="companyDistrictUpdateHistories"
              @approval="updateApproval()"
            />
          </template>
        </BaseCard>
      </div>
    </div>
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

  //거절
  // updateRefusal() {
  //   CompanyDistrictService.updateCompanyDistrictStatus(
  //     this.$route.params.id,
  //     'refuse-update',
  //     this.companyDistrictUpdateRefusalDto,
  //   ).subscribe(res => {
  //     if (res) {
  //       this.findOne(this.$route.params.id);
  //       toast.success('승인거절');
  //     }
  //   });
  // }

  created() {
    const id = this.$route.params.id;
    this.findOne(id);
  }
}
</script>
