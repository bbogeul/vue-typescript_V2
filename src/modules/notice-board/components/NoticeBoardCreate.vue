<template>
  <section>
    <h3>공지사항 생성</h3>
    <div class="divider"></div>
    <div class="form-row">
      <div class="col-md-10">
        <label>
          제목
          <span class="red-text">*</span>
        </label>
        <input class="form-control" v-model="noticeBoardCreateDto.title" />
      </div>
      <div class="col-md-2">
        <label>
          공지사항 종류
          <span class="red-text">*</span>
        </label>
        <select class="custom-select" v-model="noticeBoardCreateDto.noticeBoardType">
          <option
            v-for="noticeBoardType in noticeBoardTypes"
            :key="noticeBoardType"
            :value="noticeBoardType"
          >{{ noticeBoardType | enumTransformer }}</option>
        </select>
      </div>
    </div>
    <div class="form-row mt-2">
      <div class="col-md-12">
        <label>
          내용
          <span class="red-text">*</span>
        </label>
        <vue-editor v-model="noticeBoardCreateDto.content" :editorToolbar="editorToolbar"></vue-editor>
      </div>
    </div>
    <div class="text-center mt-2">
      <div class="btn-group mb-4" v-if="noticeBoardCreateDto.content">
        <b-button variant="primary" @click="clearedOut()">초기화</b-button>
        <b-button v-b-modal.confirm-notice variant="success">생성하기</b-button>
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
      title="공지사항 생성하겠습니까?"
      size="xl"
      header-bg-variant="success"
      header-text-variant="light"
      ok-title="생성하기"
      ok-variant="success"
      @ok="create()"
    >
      <div class="container ql-editor">
        <p class="mb-2" style="font-size:11px">
          <i>사용자들이 보는 공지사항과 하단에 표시된 내용이 사용자 컴퓨터나 브라우저 따라 다소 차이가 있을 수 있습니다.</i>
        </p>
        <h3>{{ noticeBoardCreateDto.title }}</h3>
        <div class="divider mt-2"></div>
        <span v-html="noticeBoardCreateDto.content"></span>
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

  clearedOut() {
    this.noticeBoardCreateDto = new NoticeBoardDto();
  }

  create() {
    NoticeBoardService.create(this.noticeBoardCreateDto).subscribe(res => {
      console.log(res);
      this.$router.push('/notice-board');
    });
  }
}
</script>
<style lang="scss" scoped>
</style>
