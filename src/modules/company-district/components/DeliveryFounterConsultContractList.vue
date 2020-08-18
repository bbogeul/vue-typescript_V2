<template>
  <div v-if="deliverFounderConsultContarctList.totalCount > 0" class="mt-4">
    <div class="title">
      <h4>
        계약자 리스트
      </h4>
    </div>
    <div class="divider my-2"></div>
    <div class="table-top">
      <div class="total-count">
        <span>TOTAL</span>
        <strong class="text-primary">{{
          deliverFounderConsultContarctList.totalCount
        }}</strong>
      </div>
    </div>
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <th scope="col">NO</th>
          <th scope="col">계약 신청서 번호</th>
          <th scope="col">계약자 이름</th>
          <th scope="col">계약자 전화번호</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="contract in deliverFounderConsultContarctList.items"
          :key="contract.no"
        >
          <th scope="row">
            {{ contract.no }}
          </th>
          <td>
            <router-link
              :to="{
                name: 'FounderConsultDetail',
                params: contract.deliveryFounderConsultNo,
              }"
            >
              {{ contract.deliveryFounderConsultNo }}
            </router-link>
          </td>
          <td>
            {{ contract.nanudaUser.name }}
          </td>
          <td>
            {{ contract.nanudaUser.phone }}
          </td>
          <td>
            <b-button variant="danger" @click="deleteContarct()">
              삭제
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import Component from 'vue-class-component';
import { DeliveryFounderConsultContractDto } from '../../../dto';
import DeliveryFounderConsultContractService from '../../../services/delivery-founder-consult-contarct.service';

@Component({
  name: 'DeliverFonderConsultContract',
})
export default class DeliverFounderConsultContract extends BaseComponent {
  private deliverFounderConsultContarctList: DeliveryFounderConsultContractDto[] = [];

  findForContract() {
    DeliveryFounderConsultContractService.findForContract().subscribe(res => {
      if (res) {
        console.log(res);
        this.deliverFounderConsultContarctList = res.data;
      }
    });
  }

  deleteContarct() {
    DeliveryFounderConsultContractService.deleteContarct(3).subscribe(res => {
      if (res) {
      }
    });
  }

  created() {
    this.findForContract();
  }
}
</script>
