<template>
  <section>
    <NavBar />
    <div id="app-main" class="container">
      <router-view />
      <button @click="logout()">Logout</button>
    </div>
    <!-- 
    <footer class="footer">
      <div class="container">
        <span>
          The Great Trading Company All Rights Reserved | 위대한 상사
          2020
        </span>
      </div>
    </footer>-->
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
export default class MainLayout extends BaseComponent {
  // TODO: REMOVE THIS LATER
  logout() {
    JwtStorageService.removeToken();
    this.$router.push('/login');
  }
}
</script>
<style lang="scss" scoped>
#app-main {
  margin-top: 80px;
}

.footer {
  bottom: 0;
  width: 100%;
  height: 60px; /* Set the fixed height of the footer here */
  line-height: 60px; /* Vertically center the text there */
  background-color: rgb(255, 136, 0);
}

.footer span {
  color: #ffffff;
  font-weight: 400;
  height: 12px;
}
</style>
