<template>
  <section class="body text-center">
    <form class="form-signin">
      <img
        class="mb-4 logo"
        src="https://nanudakitchen.com/_nuxt/img/65bad5b.svg"
        alt
        width="72"
      />

      <label for="inputEmail" class="sr-only">휴대폰 번호</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="휴대폰 번호"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">비밀번호</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="비밀번호"
        required
      />

      <button class="btn btn-lg btn-primary btn-block" type="submit">
        로그인
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 위대한 상사 2020</p>
    </form>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';

@Component({
  name: 'LoginLayout',
})
export default class LoginLayout extends BaseComponent {}
</script>
<style lang="scss" scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.btn-primary {
  background-color: #eb7f1a;
  border-color: #eb7f1a;
}

/* img */
.logo {
  padding-bottom: 40px;
}
</style>
