<template>
  <section>
    <h3 v-if="founderConsultList > 0">총 {{ founderConsultListCount }}</h3>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">SPACE ID</th>
          <th scope="col">USER ID</th>
          <th scope="col">ADDRESS</th>
          <th scope="col">CREATED</th>
          <th scope="col">STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="founderConsult in founderConsultList"
          :key="founderConsult.no"
        >
          <th scope="row">{{ founderConsult.no }}</th>
          <td>{{ founderConsult.spaceNo }}</td>
          <td>{{ founderConsult.nanudaUserNo }}</td>
          <td>
            {{ founderConsult.space.address }}
            {{ founderConsult.space.detailAddress }}
          </td>
          <td>
            {{ founderConsult.createdAt | dateFilter }}
          </td>
          <td>
            <span class="badge badge-pill badge-warning">{{
              founderConsult.codeManagement.value
            }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import FounderConsultService from '../../../services/founder-consult.service';
import { Pagination, PaginatedResponse } from '../../../common';
import {
  FounderConsultListDto,
  FounderConsultDto,
} from '../../../dto/founder-consult';

@Component({
  name: 'DashboardFounderConsultList',
})
export default class DashboardFounderConsultList extends BaseComponent {
  private founderConsultList: FounderConsultDto[] = [];
  private founderConsultListCount = null;
  private pagination = new Pagination();
  private founderConsultListDto = new FounderConsultListDto();

  //TODO:  need to refactor base service
  getDashboardList() {
    this.pagination.limit = 10;
    FounderConsultService.findAll(
      this.founderConsultListDto,
      this.pagination,
    ).subscribe(res => {
      const data = res;
      this.founderConsultList = data.data.items;
      this.founderConsultListCount = data.data.totalCount;
    });
  }

  mounted() {
    this.getDashboardList();
  }
}
</script>
