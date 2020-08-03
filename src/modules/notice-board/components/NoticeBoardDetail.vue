<template>
  <div>
    <div>
      <h3>
        <b-badge variant="warning">{{ noticeBoard.noticeBoardType }}</b-badge>
        <p>{{ noticeBoard.title }}</p>
      </h3>
    </div>
    <div
      v-html="noticeBoard.content"
      class="border-top border-bottom  p-3 my-4"
    >
      {{ noticeBoard.content }}
    </div>
    <div v-if="noticeBoard.url">
      참조 URL -
      <a :href="noticeBoard.url" target="_blank">{{ noticeBoard.url }}</a>
    </div>
    <div class="text-right mt-4">
      <router-link to="/company" class="btn btn-secondary text-center"
        >목록으로</router-link
      >
    </div>
  </div>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import BaseComponent from '../../../core/base.component';
import { NoticeBoardDto } from '../../../dto';
import NoticeBoardService from '../../../services/notice-board.service';
@Component({
  name: 'NoticeBoardDetail',
})
export default class NoticeBoardDetail extends BaseComponent {
  private noticeBoard = new NoticeBoardDto();

  findOne(id) {
    NoticeBoardService.findOne(id).subscribe(res => {
      if (res) {
        this.noticeBoard = res.data;
      }
    });
  }

  created() {
    const id = this.$route.params.id;
    this.findOne(id);
  }
}
</script>
