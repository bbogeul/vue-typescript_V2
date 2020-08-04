<template>
  <section>
    <b-row no-gutters align-h="between" align-v="end" class="title mb-2">
      <h3>
        <span>공지사항 등록</span>
      </h3>
      <router-link to="/notice-board" class="btn btn-secondary text-center"
        >목록으로</router-link
      >
    </b-row>
    <div class="mt-3">
      <div class="form-row">
        <div class="col-md-2 mb-3">
          <label for="create_board_type">
            카테고리
            <span class="red-text">*</span>
          </label>
          <select
            class="custom-select"
            id="create_board_type"
            v-model="noticeBoardCreateDto.noticeBoardType"
          >
            <option
              v-for="noticeBoardType in noticeBoardTypes"
              :key="noticeBoardType"
              :value="noticeBoardType"
              >{{ noticeBoardType | enumTransformer }}</option
            >
          </select>
        </div>
        <div class="col-md-10 mb-3">
          <label for="create_title">
            제목
            <span class="red-text">*</span>
          </label>
          <input
            class="form-control"
            id="create_title"
            v-model="noticeBoardCreateDto.title"
          />
        </div>
      </div>
      <!-- <div
        class="mb-2"
        v-if="noticeBoardCreateDto.noticeBoardType === 'EVENT_NOTICE'"
      >
        <label for="create_startend">
          이벤트 기간
        </label>
        <b-row align-v="center">
          <b-col>
            <b-form-datepicker
              id="create_started"
              v-model="startDate"
            ></b-form-datepicker>
          </b-col>
          ~
          <b-col>
            <b-form-datepicker
              id="create_ended"
              v-model="endDate"
            ></b-form-datepicker>
          </b-col>
        </b-row>
      </div> -->
      <div class="form-row">
        <div class="col-md-12 mb-3">
          <label for="create_content">
            내용
            <span class="red-text">*</span>
          </label>
          <vue-editor
            id="create_content"
            class="bg-white"
            v-model="noticeBoardCreateDto.content"
            :editorToolbar="editorToolbar"
          ></vue-editor>
        </div>
      </div>
      <div class="form-row">
        <div class="col-12  mb-3">
          <label for="create_url">
            URL
          </label>
          <input
            class="form-control"
            id="create_url"
            v-model="noticeBoardCreateDto.url"
          />
        </div>
      </div>
      <div class="text-center mt-4">
        <b-row
          no-gutters
          align-h="between"
          align-v="center"
          class="mb-4"
          v-if="noticeBoardCreateDto.content"
        >
          <b-button variant="secondary" @click="clearedOut()">초기화</b-button>
          <b-button v-b-modal.confirm-notice variant="primary"
            >등록하기</b-button
          >
        </b-row>
      </div>
    </div>
    <!-- <b-modal
      id="preview-notice"
      title="공지사항 미리보기"
      size="xl"
      header-bg-variant="warning"
      hide-footer
    >
      <div class="container ql-editor">
        <h3>제목: {{ noticeBoardCreateDto.title }}</h3>
        <div class="divider mt-2"></div>
        <span v-html="noticeBoardCreateDto.content"></span>
      </div>
    </b-modal>-->
    <b-modal
      id="confirm-notice"
      title="공지사항 미리보기"
      size="xl"
      header-bg-variant="success"
      header-text-variant="light"
      ok-title="등록하기"
      ok-variant="success"
      @ok="create()"
    >
      <div class="container ql-editor">
        <h3>{{ noticeBoardCreateDto.title }}</h3>
        <div class="divider mt-2"></div>
        <span v-html="noticeBoardCreateDto.content"></span>
        <p class="mt-4 text-right" style="font-size:11px">
          <i
            >사용자들이 보는 공지사항과 하단에 표시된 내용이 사용자 컴퓨터나
            브라우저 따라 다소 차이가 있을 수 있습니다.</i
          >
        </p>
      </div>
    </b-modal>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '@/core/base.component';
import { VueEditor } from 'vue2-editor';
import { EditorConfig } from '../../../config';
import { NoticeBoardDto } from '@/dto';
import { NOTICE_BOARD, CONST_NOTICE_BOARD } from '@/services/shared';
import NoticeBoardService from '../../../services/notice-board.service';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'NoticeBoardCreate',
  components: {
    VueEditor,
  },
})
export default class NoticeBoardCreate extends BaseComponent {
  private noticeBoardCreateDto = new NoticeBoardDto();
  private htmlContent = null;
  private noticeBoardTypes: NOTICE_BOARD[] = [...CONST_NOTICE_BOARD];
  private editorToolbar = EditorConfig;
  private startDate = new Date();
  private endDate = new Date();

  clearedOut() {
    this.noticeBoardCreateDto = new NoticeBoardDto();
  }

  create() {
    NoticeBoardService.create(this.noticeBoardCreateDto).subscribe(res => {
      if (res) {
        this.$router.push('/notice-board');
        toast.success('승인완료');
      }
    });
  }
}
</script>
<style lang="scss" scoped></style>
