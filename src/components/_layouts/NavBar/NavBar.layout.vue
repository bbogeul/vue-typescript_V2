<template>
  <section>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">NND</a>
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
      <NavBarList v-if="isLoggedIn" />
    </nav>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import NavBarList from './NavBarList.layout.vue';

@Component({
  name: 'Navbar',
  components: {
    NavBarList,
  },
})
export default class NavBar extends BaseComponent {
  isLoggedIn = false;
}
</script>
