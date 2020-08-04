<template>
  <div class="board-view" v-if="inquiryReplyListDto">
    <div class="board-view-header">
      <div class="board-view-title">
        <!-- <b-badge variant="warning" class="board-view-category">{{
          inquiry.codeManagement.value
        }}</b-badge> -->
        <h3>{{ inquiry.title }}</h3>
      </div>
      <div>
        {{ inquiry.adminNo }}
        <span class="baord-view-date">
          {{ inquiry.createdAt | dateTransformer }}</span
        >
      </div>
    </div>
    <div class="board-view-body">
      <div v-html="inquiry.content" class="board-view-content">
        {{ inquiry.content }}
      </div>
    </div>
    <div class="board-view-footer">
      <div class="text-right">
        <router-link to="/inquiry" class="btn btn-secondary text-center"
          >목록으로</router-link
        >
      </div>
    </div>
    <!-- 답변 작성 TODO: 추후 컴포넌트로 빼기-->
    <div class="reply-write my-4">
      <div class="mb-2">
        <span v-if="admin"
          >관리자 : <strong>{{ admin.name }}</strong></span
        >
      </div>
      <div>
        <b-form-textarea
          style="height:100px;"
          v-model="inquiryReplyListDto.content"
        ></b-form-textarea>
        <div class="text-right mt-2">
          <b-button variant="primary" v-b-modal.add_reply>답변 작성</b-button>
        </div>
      </div>
    </div>
    <b-modal id="add_reply" title="답변 작성하기" @ok="createReply()">
      <div class="text-center">
        <p><b>답변을 작성하시겠습니까?</b></p>
      </div>
    </b-modal>
    <!-- 답변 리스트 -->
    <InquiryReplyList :admin="admin" />
  </div>
</template>
<script lang="ts">
import { BaseUser } from '../../../services/shared/auth';
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import InquiryService from '../../../services/inquiry.service';
import InquiryReplyList from '../../inquiry/components/InquiryReplyList.vue';
import {
  AdminDto,
  InquiryDto,
  InquiryListDto,
  InquiryReplyListDto,
} from '../../../dto';
import { Pagination } from '../../../common';

import AdminService from '../../../services/admin.service';
import JwtStorageService from '../../../services/shared/auth/jwt-storage.service';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'InquiryDetail',
  components: {
    InquiryReplyList,
  },
})
export default class InquiryDetail extends BaseComponent {
  private inquiry = new InquiryDto();
  private pagination = new Pagination();
  private admin = new AdminDto(BaseUser);
  private inquiryReplyListDto = new InquiryReplyListDto();

  findAdmin() {
    AdminService.findMe().subscribe(res => {
      this.admin = res.data;
    });
  }

  findOne() {
    InquiryService.findOne(this.$route.params.id).subscribe(res => {
      this.inquiry = res.data;
    });
  }

  createReply() {
    InquiryService.createReply(
      this.$route.params.id,
      this.inquiryReplyListDto,
    ).subscribe(res => {
      if (res) {
        this.findOne();
        toast.success('작성완료');
      }
    });
  }

  created() {
    this.findOne();
    this.findAdmin();
  }
}
</script>
<style lang="scss">
.board-view {
  background-color: #fff;
  border-radius: 0.25rem;
  padding: 2rem;

  .board-view-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    .board-view-title {
      font-weight: 500;

      .board-view-category {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        margin-bottom: 0.25rem;
      }
    }
    .board-view-date {
      white-space: nowrap;
    }
  }
  .board-view-body {
    padding: 1rem 0;
    margin: 1rem 0;
    border-top: 1px solid #a7a7a7;
    border-bottom: 1px solid #a7a7a7;
    .board-view-content {
      min-height: 400px;
      padding: 0.5rem;
    }
    .board-view-url {
      border-top: 1px solid #a7a7a7;
      padding: 1rem 0.5rem 0;
      line-height: 1;
      strong {
        margin-right: 1em;
      }
    }
  }
}
</style>
