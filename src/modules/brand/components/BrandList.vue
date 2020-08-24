<template>
  <section>
    <SectionTitle title="브랜드 관리" divider></SectionTitle>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';

@Component({
  name: 'BrandList',
})
export default class BrandList extends BaseComponent {}
</script>