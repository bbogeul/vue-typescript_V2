<template>
  <section>
    <h3>공지사항 관리</h3>
    <div class="divider"></div>
    <div v-on:keyup.enter="search()">
      <div class="form-row mb-3">
        <div class="col-md-2">
          <label for>공지사항 아이디</label>
          <input type="text" class="form-control" v-model="noticeBoardListDto.no" />
        </div>
        <div class="col-md-4">
          <label for>제목</label>
          <input type="text" class="form-control" v-model="noticeBoardListDto.title" />
        </div>
        <div class="col-md-4">
          <label for>웹주소</label>
          <input type="text" class="form-control" v-model="noticeBoardListDto.url" />
        </div>
        <div class="col-md-2">
          <label for>공지사항 종류</label>
          <select class="custom-select" v-model="noticeBoardListDto.noticeBoardType">
            <option
              v-for="noticeBoardType in noticeBoardTypes"
              :key="noticeBoardType"
              :value="noticeBoardType"
            >{{noticeBoardType | enumTransformer}}</option>
          </select>
        </div>
      </div>
      <div class="form-row mb-3">
        <div class="col-md-2">
          <label for>관리자 아이디</label>
          <input type="text" class="form-control" v-model="noticeBoardListDto.adminName" />
        </div>
      </div>
      <div class="text-center">
        <div class="btn-group mb-4">
          <button class="btn btn-primary" @click="clearOut()">초기화</button>
          <button class="btn btn-success" @click="search()">검색</button>
        </div>
      </div>
    </div>
    <div class="table-top">
      <div class="total-count">
        <h5>
          <span>TOTAL</span>
          <strong class="text-primary">
            {{
            noticeBoardListCount
            }}
          </strong>
        </h5>
      </div>
      <b-button variant="primary" :to="{path: '/notice-board/create'}">공지사항 생성</b-button>
    </div>
    <table class="table table-bordered table-hover table-sm text-center" v-if="!dataLoading">
      <thead>
        <tr>
          <th scope="col" v-bind:class="{ highlighted: noticeBoardListDto.no }">NO</th>
          <th scope="col" v-bind:class="{ highlighted: noticeBoardListDto.adminName }">관리자</th>
          <th scope="col" v-bind:class="{ highlighted: noticeBoardListDto.title }">TITLE</th>
          <th scope="col" v-bind:class="{ highlighted: noticeBoardListDto.url }">웹 주소</th>
          <th scope="col" v-bind:class="{ highlighted: noticeBoardListDto.noticeBoardType }">알림 종류</th>
          <th scope="col">VIEW</th>
        </tr>
      </thead>
      <tbody v-if="noticeBoardListCount">
        <tr v-for="noticeBoard in noticeBoards" :key="noticeBoard.no">
          <th scope="row" class="align-middle">{{ noticeBoard.no }}</th>
          <td class="align-middle" v-if="noticeBoard.admin">{{ noticeBoard.admin.name }}</td>
          <td class="align-middle">{{ noticeBoard.title }}</td>
          <td class="align-middle">{{ noticeBoard.url }}</td>
          <td
            class="align-middle"
            v-if="noticeBoard.codeManagement"
          >{{ noticeBoard.codeManagement.value }}</td>

          <td class="align-middle">
            <router-link>상세보기</router-link>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan=" 6" class="empty-data">검색결과가 없습니다.</td>
        </tr>
      </tbody>
    </table>
    <b-pagination
      v-model="pagination.page"
      v-if="noticeBoardListCount"
      pills
      :total-rows="noticeBoardListCount"
      :per-page="pagination.limit"
      @input="paginateSearch"
      class="mt-4 justify-content-center"
    ></b-pagination>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '@/core/base.component';
import { NOTICE_BOARD, CONST_NOTICE_BOARD } from '@/services/shared';
import NoticeBoardService from '../../../services/notice-board.service';
import { NoticeBoardListDto, NoticeBoardDto } from '@/dto';
import { Pagination } from '@/common';

@Component({
  name: 'NoticeBoardList',
})
export default class NoticeBoardList extends BaseComponent {
  private noticeBoardListDto = new NoticeBoardListDto();
  private pagination = new Pagination();
  private noticeBoardTypes: NOTICE_BOARD[] = [...CONST_NOTICE_BOARD];
  private noticeBoardListCount = null;
  private noticeBoards: NoticeBoardDto[] = null;
  private totalPage = null;
  private dataLoading = false;

  clearOut() {
    this.pagination.page = 1;
    this.noticeBoardListDto = new NoticeBoardListDto();
    this.search();
  }

  paginatedSearch() {
    this.search(true);
  }

  search(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    NoticeBoardService.findAll(
      this.noticeBoardListDto,
      this.pagination,
    ).subscribe(res => {
      this.dataLoading = false;
      this.noticeBoardListCount = res.data.totalCount;
      this.noticeBoards = res.data.items;
      this.totalPage = Math.ceil(
        this.noticeBoardListCount / this.pagination.limit,
      );
    });
    window.scrollTo(0, 0);
  }

  created() {
    this.pagination.page = 1;
    this.search();
  }
}
</script>