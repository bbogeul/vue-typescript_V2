<template>
  <b-modal id="add_nanuda_user" title="사용자 추가하기" @ok="findNanudaUser()">
    <table class="table table-sm tabl-bordered text-center">
      <thead>
        <tr>
          <th scope="col">NAME</th>
          <th scope="col">PHONE</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in nanudaUserList" :key="user.no">
          <td>{{ user.name }}</td>
          <td>{{ user.phone }}</td>
          <td class="text-center">
            <button class="btn btn-primary" @click="selectUser(user)">
              선택
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="selectedUser.name"
      class="py-2 px-4 rounded"
      style="background-color:#f1f1f1"
    >
      선택한 사용자 :
      <b>{{ selectedUser.name }}</b>
    </div>
    <b-pagination
      v-model="pagination.page"
      v-if="nanudaUserListCount"
      pills
      :total-rows="nanudaUserListCount"
      :per-page="pagination.limit"
      @input="paginateSearch2"
      class="mt-4 justify-content-center"
    ></b-pagination>
  </b-modal>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import Component from 'vue-class-component';
import { NanudaUserDto, NanudaUserListDto } from '../../../dto';
import NanudaUserService from '../../../services/nanuda-user.service';
import { BaseUser } from '@/services/shared/auth';
import { Pagination } from '@/common';

export default class NanudaUserCreate extends BaseComponent {
  private nanudaUserList: NanudaUserDto[] = [];
  private nanudaUserListDto = new NanudaUserListDto();
  private nanudaUserListCount = 0;
  private selectedUser: NanudaUserDto = new NanudaUserDto(BaseUser);
  private pagination = new Pagination();

  search(isPagination?: boolean) {
    this.pagination.page = 1;
    this.pagination.limit = 10;
    NanudaUserService.findAll(
      this.nanudaUserListDto,
      this.pagination,
    ).subscribe(res => {
      if (res) {
        console.log(res);
        this.nanudaUserList = res.data.items;
        this.nanudaUserListCount = res.data.totalCount;
      }
    });
  }

  selectUser(user: NanudaUserDto) {
    this.selectedUser = user;
  }

  paginateSearch() {
    this.search(true);
  }

  // 사용자 추가
  //   findNanudaUser() {
  //     if (this.selectedUser) {
  //       this.deliveryFounderConsultCreateDto.nanudaUserNo = this.selectedUser.no;
  //     }
  //   }

  created() {
    this.search();
  }

  mounted() {
    this.$root.$on('find_nanuda_user', () => {
      console.log('ss');
      this.search();
    });
  }
}
</script>
