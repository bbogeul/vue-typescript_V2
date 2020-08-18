<template>
  <div>
    {{ deliveryFounderConsultContractDto }}
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { DeliveryFounderConsultContractDto } from '@/dto';
import Component from 'vue-class-component';

import DeliveryFounderConsultContractService from '../../../services/delivery-founder-consult-contarct.service';

@Component({
  name: 'DeliveryFounderConsultContractDetail',
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
