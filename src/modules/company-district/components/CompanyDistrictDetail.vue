<template>
  <section>
    <div
      v-if="companyDistrict"
      class="d-flex justify-content-between align-items-end mb-2"
    >
      <h3>{{ companyDistrict.name }} - 업체 지점 정보</h3>
      <router-link
        to="/company/company-district"
        class="btn btn-secondary text-center"
        >목록으로</router-link
      >
    </div>
    <div class="row d-flex align-items-stretch">
      <div class="col col-12 col-lg-6">
        <BaseCard title="지점 정보">
          <template v-slot:body>
            <div v-if="companyDistrict">
              <ul>
                <li v-if="companyDistrict.nameKr">
                  업체 지점명 : <b>{{ companyDistrict.nameKr }}</b>
                </li>
                <li v-if="companyDistrict.address">
                  주소 : <b>{{ companyDistrict.address }}</b>
                </li>
                <li v-if="companyDistrict.createdAt">
                  등록일 : {{ companyDistrict.createdAt | dateTransformer }}
                </li>
                <li v-if="companyDistrict.companyDistrictStatus">
                  승인 상태 :
                  <span class="badge badge-pill badge-warning p-2 mr-2">
                    {{
                      companyDistrict.companyDistrictStatus | enumTransformer
                    }}
                  </span>
                  <span v-if="companyDistrict.updatedAt" class="d-inline-block"
                    >({{ companyDistrict.updatedAt | dateTransformer }})</span
                  >
                </li>
              </ul>
            </div>
            <!-- <template
              v-if="
                companyDistrict.companyDistrictStatus === 'UPDATE_APPROVAL' ||
                  companyDistrict.companyDistrictStatus === 'NEED_APPROVAL'
              "
            >
              <div class="border rounded bg-light p-3 mt-4">
                <template v-if="companyDistrict.companyDistrictStatus === 'UPDATE_APPROVAL'">
                  <h5 class="text-danger" style="font-size:14px; font-weight:bold;">승인 요청 항목</h5>
                  <div
                    v-if="companyDistrict.companyDistrictUpdateHistories"
                    class="py-2 mt-3 mb-2 border-top border-bottom"
                  >
                    <ul>
                      <li
                        v-for="(value, name) in companyDistrict
                          .companyDistrictUpdateHistories[0]"
                        :key="name"
                      >{{ name | stringTransformer }} : {{ value }}</li>
                    </ul>
                  </div>
                </template>
                <div class="text-right">
                  <b-button variant="primary" class="mx-1" @click="updateApproval()">승인</b-button>
                  <b-button variant="secondary" v-b-modal.refusal-info class="mx-1">거절</b-button>
                </div>
              </div>
            </template>
            <template v-if="companyDistrict.companyDistrictStatus === 'REFUSED'">
              <div class="border rounded bg-light p-3 mt-4">
                <div>
                  <h5 class="text-danger" style="font-size:14px; font-weight:bold;">승인 거절 사유</h5>
                </div>
                <div v-if="companyDistrict.companyDistrictUpdateHistories" class="py-2 mt-3 border-top">
                  <ul>
                    <li
                      v-for="(value, name) in companyDistrict
                        .companyDistrictUpdateHistories[0].refusalReasons"
                      :key="name"
                    >
                      <span :class="{ 'text-danger': value }">
                        {{
                        name | stringTransformer
                        }}
                      </span>
                    </li>
                  </ul>
                  <p
                    v-if="companyDistrict.companyDistrictUpdateHistories[0].refusalDesc"
                    class="pt-2 mt-2 border-top"
                  >
                    거절 사유 :
                    {{ companyDistrict.companyDistrictUpdateHistories[0].refusalDesc }}
                  </p>
                </div>
              </div>
            </template> -->
          </template>
        </BaseCard>
      </div>
    </div>
    <b-modal id="refusal-info" title="승인 거절 사유" @ok="updateRefusal()">
      <div v-if="companyDistrict.companyDistrictUpdateHistories">
        <div
          class="form-check"
          v-for="(value, name) in companyDistrict
            .companyDistrictUpdateHistories[0]"
          :key="name"
        >
          <input
            type="checkbox"
            v-model="companyDistrictUpdateRefusalReasonDto[name]"
            v-if="companyDistrict.companyDistrictUpdateHistories[0][name]"
            class="form-check-input"
            :id="name"
          />
          <label :for="name">{{ name | stringTransformer }}</label>
        </div>
        <div>
          <label for="refusalDesc" class="d-block">거절이유</label>
          <textarea
            name="refusalDesc"
            id="refusalDesc"
            v-model="companyDistrictUpdateRefusalDto.refusalDesc"
            style="width:100%; height:100px;"
          ></textarea>
        </div>
      </div>
    </b-modal>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import BaseCard from '../../_components/BaseCard.vue';
import CompanyDistrictService from '../../../services/company-district.service';
import { CompanyDistrictDto } from '../../../dto';
import { BaseUser } from '../../../services/shared/auth';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'CompanyDistrictDetail',
  components: {
    BaseCard,
  },
})
export default class CompanyDistrictDetail extends BaseComponent {
  private companyDistrict = new CompanyDistrictDto(BaseUser);
  //   private companyDistrictUpdateDto = new CompanyDistrictUpdateDto();
  //   private companyDistrictUpdateRefusalDto = new CompanyDistrictUpdateRefusalDto();
  //   private companyDistrictUpdateRefusalReasonDto = (this.companyDistrictUpdateRefusalDto.refusalReasons = new CompanyDistrictUpdateRefusalReasonDto());

  findOne(id) {
    CompanyDistrictService.findOne(id).subscribe(res => {
      this.companyDistrict = res.data;
    });
  }

  // 승인
  //   updateApproval() {
  //     CompanyDistrictService.updateCompanyDistrictStatus(
  //       this.$route.params.id,
  //       'approve-update',
  //     ).subscribe(res => {
  //       this.findOne(this.$route.params.id);
  //       toast.success('승인완료');
  //     });
  //   }

  // 거절
  //   updateRefusal() {
  //     CompanyDistrictService.updateCompanyDistrictStatus(
  //       this.$route.params.id,
  //       'refuse-update',
  //       this.companyDistrictUpdateRefusalDto,
  //     ).subscribe(res => {
  //       if (res) {
  //         this.findOne(this.$route.params.id);
  //         toast.success('승인거절');
  //       }
  //     });
  //   }

  created() {
    const id = this.$route.params.id;
    this.findOne(id);
  }
}
</script>
