<template>
  <section>
    <div v-if="companyUser" class="d-flex justify-content-between align-items-end mb-2">
      <h3>{{ companyUser.name }} - 사용자 정보</h3>
      <router-link to="/company/company-user" class="btn btn-secondary text-center">목록으로</router-link>
    </div>
    <div class="row d-flex align-items-stretch">
      <div class="col col-12 col-lg-6">
        <BaseCard title="사용자 정보">
          <template v-slot:body>
            <div v-if="companyUser">
              <ul>
                <li v-if="companyUser.company">
                  업체명 :
                  <router-link
                    :to="{
                      name: 'CompanyDetail',
                      params: {
                        id: companyUser.company.no,
                      },
                    }"
                  >
                    <b>{{ companyUser.company.nameKr }}</b>
                  </router-link>
                </li>
                <li>
                  사용자 ID :
                  <b>{{ companyUser.no }}</b>
                </li>
                <li>
                  사용자명 :
                  <b>{{ companyUser.name }}</b>
                </li>
                <li>휴대폰 번호 : {{ companyUser.phone }}</li>
                <li>이메일 : {{ companyUser.email }}</li>
                <li v-if="companyUser.createdAt">등록일 : {{ companyUser.createdAt | dateTransformer }}</li>
                <li v-if="companyUser.companyUserStatus">
                  승인 상태 :
                  <span class="badge badge-pill badge-warning p-2 mr-2">
                    {{
                    companyUser.companyUserStatus | enumTransformer
                    }}
                  </span>
                  <span
                    v-if="companyUser.updatedAt"
                    class="d-inline-block"
                  >({{ companyUser.updatedAt | dateTransformer }})</span>
                </li>
              </ul>
            </div>
            <template
              v-if="
                companyUser.companyUserStatus === 'UPDATE_APPROVAL' ||
                  companyUser.companyUserStatus === 'NEED_APPROVAL'
              "
            >
              <div class="border rounded bg-light p-3 mt-4">
                <template v-if="companyUser.companyUserStatus === 'UPDATE_APPROVAL'">
                  <h5 class="text-danger" style="font-size:14px; font-weight:bold;">승인 요청 항목</h5>
                  <div
                    v-if="companyUser.companyUserUpdateHistories"
                    class="py-2 mt-3 mb-2 border-top border-bottom"
                  >
                    <ul>
                      <li
                        v-for="(value, name) in companyUser
                          .companyUserUpdateHistories[0]"
                        :key="name"
                      >{{ name | stringTransformer }} : {{ value }}</li>
                    </ul>
                  </div>
                </template>
                <div class="text-right">
                  <b-button variant="primary" class="mx-1" @click="updateApproval()">승인</b-button>
                  <b-button variant="secondary" v-b-modal.refusal-info class="mx-1">거절</b-button>
                </div>
              </div>
            </template>
            <template v-if="companyUser.companyUserStatus === 'REFUSED'">
              <div class="border rounded bg-light p-3 mt-4">
                <div>
                  <h5 class="text-danger" style="font-size:14px; font-weight:bold;">승인 거절 사유</h5>
                </div>
                <div v-if="companyUser.companyUserUpdateHistories" class="py-2 mt-3 border-top">
                  <ul>
                    <li
                      v-for="(value, name) in companyUser
                        .companyUserUpdateHistories[0].refusalReasons"
                      :key="name"
                    >
                      <span :class="{ 'text-danger': value }">
                        {{
                        name | stringTransformer
                        }}
                      </span>
                    </li>
                  </ul>
                  <p
                    v-if="companyUser.companyUserUpdateHistories[0].refusalDesc"
                    class="pt-2 mt-2 border-top"
                  >
                    거절 사유 :
                    {{ companyUser.companyUserUpdateHistories[0].refusalDesc }}
                  </p>
                </div>
              </div>
            </template>
          </template>
        </BaseCard>
      </div>
    </div>
    <b-modal id="refusal-info" title="승인 거절 사유" @ok="updateRefusal()">
      <div v-if="companyUser.companyUserUpdateHistories">
        <div
          class="form-check"
          v-for="(value, name) in companyUser.companyUserUpdateHistories[0]"
          :key="name"
        >
          <input
            type="checkbox"
            v-model="companyUserUpdateRefusalReasonDto[name]"
            v-if="companyUser.companyUserUpdateHistories[0][name]"
            class="form-check-input"
            :id="name"
          />
          <label :for="name">{{ name | stringTransformer }}</label>
        </div>
        <div>
          <label for="refusalDesc" class="d-block">거절이유</label>
          <textarea
            name="refusalDesc"
            id="refusalDesc"
            v-model="companyUserUpdateRefusalDto.refusalDesc"
            style="width:100%; height:100px;"
          ></textarea>
        </div>
      </div>
    </b-modal>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import BaseCard from '../../_components/BaseCard.vue';
import CompanyUserService from '../../../services/company-user.service';
import {
  CompanyUserDto,
  CompanyUserUpdateDto,
  CompanyUserUpdateRefusalDto,
  CompanyUserUpdateRefusalReasonDto,
} from '../../../dto';
import { BaseUser } from '../../../services/shared/auth';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'CompanyUserDetail',
  components: {
    BaseCard,
  },
})
export default class CompanyUserDetail extends BaseComponent {
  private companyUser = new CompanyUserDto(BaseUser);
  private companyUserUpdateDto = new CompanyUserUpdateDto();
  private companyUserUpdateRefusalDto = new CompanyUserUpdateRefusalDto();
  private companyUserUpdateRefusalReasonDto = (this.companyUserUpdateRefusalDto.refusalReasons = new CompanyUserUpdateRefusalReasonDto());

  findOne(id) {
    CompanyUserService.findOne(id).subscribe(res => {
      this.companyUser = res.data;
    });
  }

  // 승인
  updateApproval() {
    CompanyUserService.updateCompanyUserStatus(
      this.$route.params.id,
      'approve-update',
    ).subscribe(res => {
      this.findOne(this.$route.params.id);
      toast.success('승인완료');
    });
  }

  // 거절
  updateRefusal() {
    CompanyUserService.updateCompanyUserStatus(
      this.$route.params.id,
      'refuse-update',
      this.companyUserUpdateRefusalDto,
    ).subscribe(res => {
      if (res) {
        this.findOne(this.$route.params.id);
        toast.success('승인거절');
      }
    });
  }

  created() {
    const id = this.$route.params.id;
    this.findOne(id);
  }
}
</script>
