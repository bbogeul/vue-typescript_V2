<template>
  <div class="card">
    <div class="card-head" v-show="!hideTitle">
      <h4 class="card-title">{{ title }}</h4>
      <slot name="head"></slot>
    </div>
    <div class="card-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseComponent from '../../core/base.component';

@Component({
  name: 'BaseCard',
})
export default class BaseCard extends BaseComponent {
  @Prop() readonly title: string;
  @Prop({ default: false }) readonly hideTitle: boolean;
}
</script>
<style lang="scss" scoped>
.card {
  border-color: #ddd;
  background-color: #fff;
  height: 100%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
  .card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 0.625rem 1rem;
    min-height: 52px;
    .card-title {
      margin-bottom: 0;
      line-height: 1;
      font-size: 1rem;
      font-weight: bold;
    }
  }
  .card-body {
    ul {
      padding-left: 0;
      margin-left: 0;
      li {
        list-style: none;
        position: relative;
        padding-left: 10px;
        &:before {
          display: inline-block;
          content: '';
          position: absolute;
          left: 0;
          top: 0.625em;
          vertical-align: top;
          width: 4px;
          height: 4px;
          border: 1px solid #646464;
          transform: rotate(45deg);
        }
      }
    }
  }
}
</style>
