<template>
  <div v-if="companyUserListCount > 0">
    <table class="table">
      <thead>
        <tr>
          <th>
            NO
          </th>
          <th>
            NAME
          </th>
          <th>
            PHONE
          </th>
          <th>
            EMAIL
          </th>
          <th>
            STATUS
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in companyUserList" :key="user.no">
          <th scope="row">
            <router-link
              :to="{
                name: 'CompanyUserDetail',
                params: {
                  id: user.no,
                },
              }"
              class="text-primary"
            >
              {{ user.no }}
            </router-link>
          </th>
          <td>
            <router-link
              :to="{
                name: 'CompanyUserDetail',
                params: {
                  id: user.no,
                },
              }"
            >
              {{ user.name }}
            </router-link>
          </td>
          <td>{{ user.phone }}</td>
          <td>{{ user.email }}</td>
          <td>
            <router-link
              :to="{
                name: 'CompanyUserDetail',
                params: {
                  id: user.no,
                },
              }"
            >
              <span class="badge badge-pill badge-warning p-2">
                {{ user.companyUserStatus | enumTransformer }}
              </span>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <b-pagination
      v-model="pagination.page"
      v-if="companyUserListCount"
      pills
      :total-rows="companyUserListCount"
      :per-page="pagination.limit"
      @input="paginateSearch"
      class="mt-4 justify-content-center"
    ></b-pagination>
  </div>
  <div v-else class="empty-data">
    사용자 없음
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import { CompanyUserListDto, CompanyUserDto } from '../../../dto';
import CompanyUserService from '../../../services/company-user.service';
import { Pagination } from '@/common';

@Component({
  name: 'CompanyUserList',
})
export default class CompanyUserList extends BaseComponent {
  private pagination = new Pagination();
  private companyUserListDto = new CompanyUserListDto();
  private companyUserList: CompanyUserDto[] = [];
  private companyUserListCount = 0;

  findUser(isPagination: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = 5;

    this.companyUserListDto.companyNo = parseInt(this.$route.params.id);
    CompanyUserService.findAll(
      this.companyUserListDto,
      this.pagination,
    ).subscribe(res => {
      console.log('companyUser', res);
      this.companyUserList = res.data.items;
      this.companyUserListCount = res.data.totalCount;
    });
  }

  paginateSearch() {
    this.findUser(true);
  }

  created() {
    this.findUser(true);
  }
}
</script>
