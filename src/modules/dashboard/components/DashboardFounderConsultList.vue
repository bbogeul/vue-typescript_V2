<template>
  <section>
    <div class="title">
      <h4 class="d-inline-block">최신 방문자 신청</h4>
      <router-link to="/founder-consult" class="btn btn-primary float-right">
        더 보기
      </router-link>
    </div>
    <table
      class="table table-sm table-bordered text-center"
      v-if="founderConsultListCount"
    >
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">SPACE ID</th>
          <th scope="col">USER NAME</th>
          <th scope="col">USER PHONE</th>

          <th scope="col">ADDRESS</th>
          <th scope="col">CREATED</th>
          <th scope="col">COMPANY</th>
          <th scope="col">AVAILABLE TIME</th>
          <th scope="col">STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="founderConsult in founderConsultList"
          :key="founderConsult.no"
        >
          <th scope="row">
            <router-link
              :to="{
                name: 'FounderConsultDetail',
                params: { id: founderConsult.no },
              }"
              >{{ founderConsult.no }}</router-link
            >
          </th>
          <td>{{ founderConsult.spaceNo }}</td>
          <td>{{ founderConsult.nanudaUser.name }}</td>
          <td>{{ founderConsult.nanudaUser.phone }}</td>
          <td>
            {{ founderConsult.space.address }}
            {{ founderConsult.space.detailAddress }}
          </td>
          <td>{{ founderConsult.createdAt | dateTransformer }}</td>
          <td v-if="founderConsult.space.companyDistricts">
            <div
              v-for="company in founderConsult.space.companyDistricts"
              :key="company.no"
            >
              <div v-if="company.company.nameKr">
                {{ company.company.nameKr }}
              </div>
            </div>
          </td>
          <td>
            <div v-if="founderConsult.availableTime">
              {{ founderConsult.availableTime.value }}
            </div>
          </td>
          <td>
            <router-link
              :to="{
                name: 'FounderConsultDetail',
                params: { id: founderConsult.no },
              }"
            >
              <span class="badge badge-pill badge-warning p-2">{{
                founderConsult.codeManagement.value
              }}</span>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p>Nothing here</p>
    </div>
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
