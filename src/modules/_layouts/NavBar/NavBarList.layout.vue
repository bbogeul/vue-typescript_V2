<template>
  <div class="collapse navbar-collapse " id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto ">
      <li class="nav-item dropdown  ">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          v-if="admin.data"
        >
          {{ admin.data.name }}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">
            마이 프로필
          </a>

          <div class="dropdown-divider"></div>
          <a class="dropdown-item" @click="logout()">로그아웃</a>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import AdminService from '../../../services/admin.service';
import JwtStorageService from '../../../services/shared/auth/jwt-storage.service';
import toast from '../../../../resources/assets/js/services/toast.js';
import { AdminDto } from '../../../dto';

@Component({
  name: 'NavBarList',
})
export default class NavBarList extends BaseComponent {
  private admin: any = {};

  logout() {
    JwtStorageService.removeToken();
    toast.success('로그아웃 성공적으로 했습니다.');
    this.$router.push('/login');
  }

  mounted() {
    AdminService.findMe().subscribe(res => {
      this.admin = res;
    });
  }
}
</script>
