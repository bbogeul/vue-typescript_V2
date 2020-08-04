<template>
  <section>
    <div class="board-reply" v-if="inquiryReplyListCount">
      <div class="reply-header">
        <h4 class="reply-title">답변 리스트</h4>
        <div class="reply-count">
          <span class="mr-2">TOTAL</span>
          <strong class="text-primary">{{ inquiryReplyListCount }}</strong>
        </div>
      </div>
      <div class="reply-body">
        <div class="reply-list">
          <div
            v-for="reply in inquiryReplyList"
            :key="reply.no"
            class="reply-item-wrap"
            :class="[reply.companyUserNo ? 'company-user' : 'admin']"
          >
            <div class="reply-item">
              <template v-if="reply.companyUserNo">
                <div class="reply-user">
                  <span class="user-icon">
                    <b-avatar size="4em"></b-avatar>
                  </span>
                  <span class="user-name" v-if="reply.companyUser"
                    >{{ reply.companyUser.name }}
                  </span>
                  <span class="user-company" v-if="reply.company">{{
                    reply.company.nameKr
                  }}</span>
                </div>
                <div class="reply-area">
                  <div class="reply-content">
                    <div>
                      {{ reply.content }}
                    </div>
                  </div>
                  <span class="reply-date">{{
                    reply.updatedAt | dateTransformer
                  }}</span>
                </div>
              </template>
              <template v-else>
                <div class="reply-user">
                  <span class="user-icon">
                    <b-avatar variant="warning" size="4em">
                      <strong>NND</strong>
                    </b-avatar>
                  </span>
                  <span class="user-name" v-if="reply.admin"
                    >{{ reply.admin.name }}
                  </span>
                </div>
                <div class="reply-area">
                  <div class="reply-content">
                    <div>
                      {{ reply.content }}
                    </div>
                    <div class="mt-2" v-if="admin.no === reply.adminNo">
                      <b-button
                        variant="link"
                        size="sm"
                        v-b-modal.update_reply
                        class="btn-edit"
                        >수정</b-button
                      >
                    </div>
                  </div>
                  <span class="reply-date">{{
                    reply.updatedAt | dateTransformer
                  }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty-data border">
      <p>답변을 작성해주세요.</p>
    </div>
    <b-pagination
      v-model="pagination.page"
      v-if="inquiryReplyListCount"
      pills
      :total-rows="inquiryReplyListCount"
      :per-page="pagination.limit"
      @input="paginateSearch"
      class="mt-4 justify-content-center"
    ></b-pagination>
    <b-modal id="update_reply" title="답글 수정하기" hide-footer>
      <div>
        <div></div>
        <b-form-textarea
          name="update_reply"
          v-model="inquiryListDto.content"
        ></b-form-textarea>
        <div class="text-right mt-2">
          <b-button variant="danger" @click="updateReply()">취소</b-button>
          <b-button variant="primary" @click="updateReply()">수정</b-button>
        </div>
      </div>
    </b-modal>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import InquiryService from '../../../services/inquiry.service';
import { InquiryDto, InquiryListDto, InquiryReplyListDto } from '../../../dto';
import { Pagination } from '../../../common';

@Component({
  name: 'InquiryReplyList',
})
export default class InquiryReplyList extends BaseComponent {
  @Prop() admin!: {
    type: object;
  };

  private inquiryReplyList: InquiryDto[] = [];
  private inquiryReplyListCount = 0;
  private inquiryListDto = new InquiryReplyListDto();
  private pagination = new Pagination();

  findAll(isPagination?: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = null;

    InquiryService.findForReply(
      this.$route.params.id,
      this.inquiryListDto,
      this.pagination,
    ).subscribe(res => {
      this.inquiryReplyList = res.data.items;
      this.inquiryReplyListCount = res.data.totalCount;
    });
  }

  paginateSearch() {
    this.findAll(true);
  }

  updateReply() {
    alert('답글 수정');
  }

  created() {
    this.findAll();
  }
}
</script>
<style lang="scss">
.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1rem 0;
  border-bottom: 1px solid #a7a7a7;
  margin-bottom: 2rem;
}
.reply-list {
  .reply-item-wrap {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    + .reply-item-wrap {
      margin-top: 1.5rem;
    }

    &.company-user {
      justify-content: flex-start;
      .reply-item {
        justify-content: flex-start;
        .reply-user {
          margin-right: 2rem;
        }
        .reply-area {
          text-align: right;
          .reply-content {
            text-align: left;
            &:before {
              left: -1rem;
              border-right: 2rem solid #f5f5f5;
            }
          }
        }
      }
    }

    &.admin {
      justify-content: flex-end;
      .reply-item {
        justify-content: flex-end;
        flex-direction: row-reverse;

        .reply-user {
          margin-left: 2rem;
        }

        .reply-area {
          text-align: right;
          .reply-content {
            text-align: right;
            &:before {
              right: -1rem;
              border-left: 2rem solid #f5f5f5;
            }
          }
        }
      }
    }

    .reply-item {
      display: flex;
      min-width: 60%;
      max-width: 90%;

      .reply-user {
        // min-width: 6rem;
        text-align: center;

        .user-icon {
          display: block;
          margin-bottom: 0.5rem;
        }
        .user-name {
          font-weight: 600;
          font-size: 1rem;
          color: #323232;
        }
        .user-company {
          display: block;
          color: #646464;
        }
      }

      .reply-area {
        width: calc(100% - 6rem);

        .reply-content {
          position: relative;
          width: 100%;
          border-radius: 0.25rem;
          background-color: #f5f5f5;
          padding: 1rem;
          // min-height: 60px;

          &:before {
            display: block;
            content: '';
            position: absolute;
            top: 0.5rem;
            width: 0;
            height: 0;
            border-top: 1rem solid transparent;
            border-bottom: 1rem solid transparent;
          }

          .btn-edit {
            position: absolute;
            right: 100%;
            margin-right: 5px;
            white-space: nowrap;
            bottom: 0;
            padding: 0;
          }
        }
        .reply-date {
          display: block;
          margin-top: 0.5rem;
        }
      }
    }
  }
}
</style>
