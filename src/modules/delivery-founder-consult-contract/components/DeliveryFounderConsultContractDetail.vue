<template>
  <section>
    <div
      v-if="deliveryFounderConsultContractDto"
      class="d-flex justify-content-between align-items-end mb-2"
    >
      <h3 v-if="deliveryFounderConsultContractDto.deliverySpace" class="mb-0">
        {{ deliveryFounderConsultContractDto.deliverySpace.typeName }} - 계약
        정보
      </h3>
      <router-link
        to="/delivery-founder-consult-contract"
        class="btn btn-secondary text-center"
        >목록으로</router-link
      >
    </div>
    <b-row>
      <b-col md="6" class="my-3">
        <BaseCard title="계약자 정보">
          <template v-slot:body>
            <div v-if="deliveryFounderConsultContractDto.nanudaUser">
              <ul class="u-list">
                <li>
                  계약자명 :
                  {{ deliveryFounderConsultContractDto.nanudaUser.name }}
                </li>
                <li>
                  휴대폰 번호 :
                  {{ deliveryFounderConsultContractDto.nanudaUser.phone }}
                </li>
              </ul>
            </div>
          </template>
        </BaseCard>
      </b-col>
      <b-col md="6" class="my-3">
        <BaseCard title="계약 공간 정보">
          <template v-slot:head>
            <span>
              계약일
              {{
                deliveryFounderConsultContractDto.createdAt | enumTransformer
              }}
            </span>
          </template>
          <template v-slot:body>
            <div v-if="deliveryFounderConsultContractDto.deliverySpace">
              <ul class="u-list">
                <li
                  v-if="
                    deliveryFounderConsultContractDto.deliverySpace.typeName
                  "
                >
                  공간 타입 :
                  {{ deliveryFounderConsultContractDto.deliverySpace.typeName }}
                </li>
                <li>
                  보증금 :
                  {{ deliveryFounderConsultContractDto.deliverySpace.deposit }}
                  만원
                </li>
                <li>
                  월 임대로 :
                  {{
                    deliveryFounderConsultContractDto.deliverySpace
                      .monthlyRentFee
                  }}
                  만원
                </li>
                <li>
                  월 관리비 :
                  {{
                    deliveryFounderConsultContractDto.deliverySpace
                      .monthlyUtilityFee
                  }}
                  만원
                </li>
              </ul>
              <b-btn-group class="mt-2">
                <router-link
                  :to="{
                    name: 'DeliveryFounderConsultDetail',
                    params: {
                      id:
                        deliveryFounderConsultContractDto.deliveryFounderConsultNo,
                    },
                  }"
                  class="btn btn-outline-info"
                >
                  방문 신청 내용 보기
                </router-link>
                <router-link
                  :to="{
                    name: 'CompanyDistrictDetail',
                    params: {
                      id: deliveryFounderConsultContractDto.companyDistrictNo,
                    },
                  }"
                  class="btn btn-outline-info"
                >
                  계약 공간 보기
                </router-link>
              </b-btn-group>
            </div>
          </template>
        </BaseCard>
      </b-col>
    </b-row>
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { DeliveryFounderConsultContractDto } from '@/dto';
import Component from 'vue-class-component';
import BaseCard from '../../_components/BaseCard.vue';

import DeliveryFounderConsultContractService from '../../../services/delivery-founder-consult-contarct.service';

@Component({
  name: 'DeliveryFounderConsultContractDetail',
  components: {
    BaseCard,
  },
})
export default class DeliveryFounderConsultContractDetail extends BaseComponent {
  private deliveryFounderConsultContractDto = new DeliveryFounderConsultContractDto();

  findOne() {
    DeliveryFounderConsultContractService.findOne(
      this.$route.params.id,
    ).subscribe(res => {
      if (res) {
        this.deliveryFounderConsultContractDto = res.data;
      }
    });
  }
  created() {
    this.findOne();
  }
}
</script>
