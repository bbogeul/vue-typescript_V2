<template>
  <section>
    <SectionTitle title="브랜드 관리" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <div class="col-md-1 mb-3">
          <label for="brandNo">브랜드 ID</label>
          <input type="text" class="form-control" id="brandNo" v-model="brandListDto.no" />
        </div>
        <div class="col-md-2 mb-3">
          <label>브랜드 영어명</label>
          <input type="text" class="form-control" v-model="brandListDto.nameEng" />
        </div>
        <div class="col-6 col-lg-2 mb-3">
          <label for="admin_user">관리자명</label>
          <template>
            <b-form-input list="admin_list" id="admin_user" v-model="brandListDto.adminName"></b-form-input>
            <datalist id="admin_list">
              <option
                v-for="admin in adminList.items"
                :key="admin.no"
                :value="admin.name"
              >{{ admin.name }}</option>
            </datalist>
          </template>
        </div>
      </b-form-row>
      <!-- second row -->
      <b-row align-h="center">
        <b-btn-group>
          <b-button variant="primary" @click="clearOut()">초기화</b-button>
          <b-button variant="success" @click="search()">검색</b-button>
        </b-btn-group>
      </b-row>
    </div>
    <div class="table-top">
      <div class="total-count">
        <h5>
          <span>TOTAL</span>
          <strong class="text-primary">{{ brandsTotalCount }}</strong>
        </h5>
      </div>
    </div>
    <b-pagination
      v-model="pagination.page"
      v-if="brandsTotalCount"
      pills
      :total-rows="brandsTotalCount"
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
import BaseComponent from '../../../core/base.component';
import { AdminDto, BrandDto, BrandListDto } from '../../../dto';
import BrandService from '../../../services/brand.service';
import { Pagination } from '../../../common';
import AdminService from '../../../services/admin.service';

@Component({
  name: 'BrandList',
})
export default class BrandList extends BaseComponent {
  private brandListDto = new BrandListDto();
  private brands: BrandDto[] = [];
  private adminList: AdminDto[] = [];

  private brandsTotalCount = null;
  private totalPage = null;
  private pagination = new Pagination();
  private dataLoading = false;

  findAdmin() {
    AdminService.findForSelect().subscribe(res => {
      if (res) {
        this.adminList = res.data;
      }
    });
  }

  clearOut() {
    this.brandListDto = new BrandListDto();
  }

  paginateSearch() {
    this.search(true);
  }

  search(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    BrandService.findAll(this.brandListDto, this.pagination).subscribe(res => {
      this.brands = res.data.items;
      this.brandsTotalCount = res.data.totalCount;
      this.totalPage = Math.ceil(this.brandsTotalCount / this.pagination.limit);
    });
  }

  created() {
    this.search();
    this.findAdmin();
  }
}
</script>