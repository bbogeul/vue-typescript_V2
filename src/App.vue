<template>
  <div id="app" class="page-content">
    <component :is="layout"></component>
  </div>
</template>
<script lang="ts">
import BaseComponent from './core/base.component';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'App',
})
export default class extends BaseComponent {
  // get layout
  get layout() {
    return this.$route.meta.layout;
  }
}
</script>
<style lang="scss">
html,
body {
  height: 100%;
}
.btn {
  font-size: 12px;
}
.divider {
  width: 100%;
  height: 1px;
  background-color: grey;
  margin-bottom: 10px;
}
.badge {
  font-size: 11px;
}
</style>
