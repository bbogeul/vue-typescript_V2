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
  background-color: #f1f1f1;
  padding: 10px 0 40px;
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

.div-center {
  margin: 0;
}

.highlighted {
  background-color: orange;
  border-color: orange;
  color: #fff;
}

a,
a:hover {
  color: inherit;
}
select {
  font: inherit;
}

.table-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1rem;
  .total-count {
    h5 {
      font-size: 14px;
      margin: 0;
    }
  }
}
.table {
  margin-bottom: 0;
  th,
  td {
    vertical-align: middle;
    text-align: center;
  }
  thead {
    th {
      border-top: 0;
      border-bottom: 0;
    }
  }
  .empty-data {
    display: table-cell;
    height: 100px;
  }

  &.table-sm {
    font-size: 11px;
  }
}
.modal-title {
  font-size: 1rem;
  font-weight: bold;
}

.empty-data {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  min-height: 100px;
}
</style>
