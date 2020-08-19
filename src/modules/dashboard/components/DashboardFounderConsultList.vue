<template>
  <section>
    <div class="title">
      <h4 class="d-inline-block">최신 식당형 방문자 신청</h4>
      <router-link to="/founder-consult" class="btn btn-primary float-right"
        >더 보기</router-link
      >
    </div>
    <div v-if="!dataLoading">
      <table
        class="table table-hover table-sm table-bordered text-center"
        v-if="founderConsultListCount > 0"
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
            <th scope="col">VIEW</th>
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
                class="text-primary"
                >{{ founderConsult.no }}</router-link
              >
            </th>
            <td>{{ founderConsult.spaceNo }}</td>
            <td>{{ founderConsult.nanudaUser.name }}</td>
            <td>{{ founderConsult.nanudaUser.phone | phoneTransformer }}</td>
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
                  <router-link
                    :to="{
                      name: 'CompanyDetail',
                      params: {
                        id: company.company.no,
                      },
                    }"
                    >{{ company.company.nameKr }}</router-link
                  >
                </div>
              </div>
            </td>
            <td>
              <div v-if="founderConsult.availableTime">
                {{ founderConsult.availableTime.value }}
              </div>
            </td>
            <td>
              <span class="badge badge-pill badge-warning p-2">{{
                founderConsult.codeManagement.value
              }}</span>
            </td>
            <td>
              <router-link
                class="btn btn-sm btn-secondary"
                :to="{
                  name: 'FounderConsultDetail',
                  params: { id: founderConsult.no },
                }"
                >상세보기</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div class="empty-data border" v-else>상담 신청 내역 없음</div>
    </div>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
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
import { SPACE_TYPE } from '@/services/shared';

@Component({
  name: 'DashboardFounderConsultList',
})
export default class DashboardFounderConsultList extends BaseComponent {
  private founderConsultList: FounderConsultDto[] = [];
  private founderConsultListCount = null;
  private pagination = new Pagination();
  private founderConsultListDto = new FounderConsultListDto();
  private dataLoading = false;

  //TODO:  need to refactor base service
  getDashboardList() {
    this.dataLoading = true;
    this.pagination.limit = 10;
    this.founderConsultListDto.spaceTypeNo = SPACE_TYPE.SPACE_SHARE;
    FounderConsultService.findAll(
      this.founderConsultListDto,
      this.pagination,
    ).subscribe(res => {
      this.dataLoading = false;
      this.founderConsultList = res.data.items;
      this.founderConsultListCount = res.data.totalCount;
    });
  }

  mounted() {
    this.getDashboardList();
  }
}
</script>
