<template>
  <div>
    <router-link class="navbar-link" :to="to">
      <slot />
    </router-link>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';

@Component({
  name: 'NavBarLink',
})
export default class NavBarLink extends BaseComponent {
  @Prop({ required: true }) private to!: string;
}
</script>
