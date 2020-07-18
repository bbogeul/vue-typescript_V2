<template>
  <nav id="nav" class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand brand-text" to="/">NND</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <NavBarList />
    </div>
  </nav>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import NavBarList from './NavBarList.layout.vue';

@Component({
  name: 'Navbar',
  components: {
    NavBarList,
  },
})
export default class NavBar extends BaseComponent {}
</script>

<style scoped lang="scss">
.brand-text {
  color: #fff;
  font-weight: 700;
}
</style>
