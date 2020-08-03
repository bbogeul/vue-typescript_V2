<template>
  <section>
    <div
      v-if="companyUser"
      class="d-flex justify-content-between align-items-end mb-2"
    >
      <h3>{{ companyUser.name }} - 사용자 정보</h3>
      <router-link
        to="/company/company-user"
        class="btn btn-secondary text-center"
        >목록으로</router-link
      >
    </div>
    <div class="row d-flex align-items-stretch">
      <div class="col col-12 col-lg-6 my-3">
        <BaseCard title="사용자 정보">
          <template v-slot:head>
            <div>
              <b-button variant="danger" v-b-modal.delete_user
                >삭제하기</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <div v-if="companyUser">
              <ul>
                <li>
                  사용자 ID :
                  <b>{{ companyUser.no }}</b>
                </li>
                <li>
                  사용자명 :
                  <b>{{ companyUser.name }}</b>
                </li>
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
                <li>휴대폰 번호 : {{ companyUser.phone }}</li>
                <li>이메일 : {{ companyUser.email }}</li>
                <li>
                  관리자 등급 : {{ companyUser.authCode | enumTransformer }}
                </li>
                <li v-if="companyUser.createdAt">
                  등록일 : {{ companyUser.createdAt | dateTransformer }}
                </li>
                <li v-if="companyUser.companyUserStatus">
                  승인 상태 :
                  <span class="badge badge-pill badge-warning p-2 mr-2">
                    {{ companyUser.companyUserStatus | enumTransformer }}
                  </span>
                  <span v-if="companyUser.updatedAt" class="d-inline-block"
                    >({{ companyUser.updatedAt | dateTransformer }})</span
                  >
                </li>
              </ul>
            </div>
            <ApprovalCard
              :data="companyUser"
              :dto="companyUserUpdateRefusalDto"
              :reasonDto="companyUserUpdateRefusalReasonDto"
              status="companyUserStatus"
              histories="companyUserUpdateHistories"
              @approval="updateApproval()"
              @refusal="updateRefusal()"
            />
          </template>
        </BaseCard>
      </div>
    </div>
    <b-modal
      id="delete_user"
      title="사용자 삭제"
      header-bg-variant="danger"
      header-text-variant="light"
      hide-footer
    >
      <div class="text-center">
        <p>
          <b>정말로 삭제하시겠습니까?</b>
        </p>
        <div class="mt-3">
          <input
            type="text"
            placeholder="사용자 이름을 입력해주세요"
            name="delete_name"
            class="form-control"
            id="delete_user_name"
            v-model="deleteUserName"
          />
        </div>
        <div class="mt-2 text-right">
          <b-button variant="danger" @click="deleteCompanyUser()"
            >삭제</b-button
          >
        </div>
      </div>
    </b-modal>
    <!-- <b-modal
      id="company-user-info"
      title="사용자 정보 수정"
      @ok="updateUserInfo()"
    >
      <div>
        <div class="col-12 col-md-6">
          <label>관리자 등급</label>
          <select class="custom-select" v-model="companyUserUpdateDto.authCode">
            <option
              v-for="role in companyUserAdminRole"
              :key="role"
              :value="role"
              >{{ role | enumTransformer }}</option
            >
          </select>
        </div>
      </div>
    </b-modal> -->
  </section>
</template>
<script lang="ts">
import ApprovalCard from '../../../modules/_components/ApprovalCard.vue';
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
import {
  APPROVAL_STATUS,
  CONST_APPROVAL_STATUS,
  COMPANY_USER,
  CONST_COMPANY_USER,
} from '../../../services/shared';

@Component({
  name: 'CompanyUserDetail',
  components: {
    ApprovalCard,
    BaseCard,
  },
})
export default class CompanyUserDetail extends BaseComponent {
  private companyUser = new CompanyUserDto(BaseUser);
  private companyUserUpdateDto = new CompanyUserUpdateDto();
  private companyUserUpdateRefusalDto = new CompanyUserUpdateRefusalDto();
  private companyUserUpdateRefusalReasonDto = (this.companyUserUpdateRefusalDto.refusalReasons = new CompanyUserUpdateRefusalReasonDto());
  private companyUserAdminRole: COMPANY_USER[] = [...CONST_COMPANY_USER];
  private deleteUserName = '';

  findOne(id) {
    CompanyUserService.findOne(id).subscribe(res => {
      this.companyUser = res.data;
    });
  }

  // // 사용자 정보 수정
  // updateUserInfo() {
  //   CompanyUserService.update(
  //     this.$route.params.id,
  //     this.companyUserUpdateDto,
  //   ).subscribe(res => {
  //     if (res) {
  //       this.findOne(this.$route.params.id);
  //     }
  //   });
  // }

  // 삭제
  deleteCompanyUser() {
    if (this.deleteUserName === this.companyUser.name) {
      CompanyUserService.deleteCompanyUser(this.$route.params.id).subscribe(
        res => {
          if (res) {
            this.$router.push('/company-user');
          }
        },
      );
    } else {
      toast.error('이름을 정확히 입력해주세요');
    }
  }

  // 승인
  updateApproval() {
    CompanyUserService.updateCompanyUserStatus(
      this.$route.params.id,
      'approve-update',
    ).subscribe(res => {
      if (res) {
        this.findOne(this.$route.params.id);
        toast.success('승인완료');
      }
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
