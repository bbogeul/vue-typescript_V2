<template>
  <section>
    <NavBar />
    <div id="app-main" class="container">
      <router-view />
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import NavBar from '../NavBar/NavBar.layout.vue';
import JwtStorageService from '../../../services/shared/auth/jwt-storage.service';

@Component({
  name: 'MainLayout',
  components: {
    NavBar,
  },
})
export default class MainLayout extends BaseComponent {}
</script>
<style lang="scss" scoped>
#app-main {
  margin-top: 80px;
  margin-bottom: 40px;
  font-size: 11px;
}
</style>
