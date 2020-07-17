<template>
  <div id="app">
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
<style lang="scss" scoped>
html {
  position: relative;
}
</style>