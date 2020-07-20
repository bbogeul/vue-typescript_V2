<template>
  <section>
    <div class="row">
      <div class="col-md-3">
        <!-- user information -->
        <h5>사용자 정보</h5>
        <div class="card">
          <div class="card-body" v-if="founderConsult.nanudaUser">
            <div>
              <p>
                사용자명:
                <span
                  ><b>{{ founderConsult.nanudaUser.name }}</b></span
                >
              </p>
            </div>
            <div>
              <p>
                전화번호: <b>{{ founderConsult.nanudaUser.phone }}</b>
              </p>
            </div>
            <div>
              <b-button v-b-modal.modal-1>문자하기</b-button>
            </div>
          </div>
          <div class="card-body" v-else><b>관리자 없음</b></div>
        </div>
      </div>
      <div class="col-md-3">
        <h5>관리자 정보</h5>
        <div class="card">
          <div class="card-body" v-if="founderConsult.admin">
            <div>
              <p>
                관리자명:
                <span
                  ><b>{{ founderConsult.admin.name }}</b></span
                >
              </p>
            </div>
            <div>
              <p>
                전화번호: <b>{{ founderConsult.admin.phone }}</b>
              </p>
            </div>
          </div>
          <div class="card-body" v-else><b>관리자 없음</b></div>
        </div>
      </div>
    </div>
    <!-- for the text message -->
    <b-modal id="modal-1" title="나누다 사용자에게 문자하기">
      <p class="my-4">
        <b v-if="founderConsult.nanudaUser">{{
          founderConsult.nanudaUser.name
        }}</b
        >에게 문자하기
      </p>
    </b-modal>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import FounderConsultService from '../../../services/founder-consult.service';
import { FounderConsultDto } from '../../../dto';

@Component({
  name: 'FounderConsultDetail',
})
export default class FounderConsultDetail extends BaseComponent {
  private founderConsult = new FounderConsultDto();
  private googleMap = '';
  findOne(id) {
    // find founder consult detail
    FounderConsultService.findOne(id).subscribe(res => {
      this.founderConsult = res.data;
    });
  }

  mounted() {
    const founderConsultId = this.$route.params.id;
    this.findOne(founderConsultId);
  }
}
</script>
