<template>
  <section>
    <div class="d-flex justify-content-between align-items-end mb-2">
      <h3 v-if="companyUser" class="mb-0">
        {{ companyUser.name }} - 사용자 정보
      </h3>
      <router-link to="/company-user" class="btn btn-secondary text-center"
        >목록으로</router-link
      >
    </div>
    <div class="row d-flex align-items-stretch">
      <div class="col col-12">
        <BaseCard title="사용자 정보">
          <template v-slot:body>
            <div>
              <ul>
                <li>업체명 : {{ companyUser.company.nameKr }}</li>
                <li>사용자명 : {{ companyUser.name }}</li>
                <li>휴대폰 번호 : {{ companyUser.phone }}</li>
                <li>이메일 : {{ companyUser.email }}</li>
                <li>
                  승인상태 :
                  <span class="badge badge-pill badge-warning p-2">
                    {{ companyUser.companyUserStatus | enumTransformer }}
                  </span>
                </li>
              </ul>
            </div>
          </template>
        </BaseCard>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import BaseCard from '../../_components/BaseCard.vue';
import CompanyUserService from '../../../services/company-user.service';
import { CompanyDto, CompanyUserDto } from '../../../dto';
import { BaseUser } from '../../../services/shared/auth';

@Component({
  name: 'CompanyUserDetail',
  components: {
    BaseCard,
  },
})
export default class CompanyUserDetail extends BaseComponent {
  private companyUser = new CompanyUserDto(BaseUser);
  s;
  getCompanyUser(id) {
    CompanyUserService.findOne(id).subscribe(res => {
      this.companyUser = res.data;
      console.log(res);
    });
  }
  created() {
    const id = this.$route.params.id;
    this.getCompanyUser(id);
  }
}
</script>
