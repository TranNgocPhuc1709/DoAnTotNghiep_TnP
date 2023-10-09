<template src="./VendorCategoryListDictionary.html"></template>
<style lang="scss" scoped src="./VendorCategoryListDictionary.scss"></style>
<script lang="ts">
import VendorCategoryListDictionary from './VendorCategoryListDictionary';
import { Ref, ref } from 'vue';
import BaseDictionaryListView from 'qlch_base/BaseDictionaryListView';
import BaseDictionaryListController from 'qlch_base/BaseDictionaryListController';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';

export default {

  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
  },
  setup() {
    const thisData: Ref<VendorCategoryListDictionary> = ref(new VendorCategoryListDictionary());
    return { thisData };
  },
  methods: {

    /**
     * Tạo dòng mặc định
     */
    getTemplateRecord() {
      console.log("DEV: Override Function getTemplateRecord return new model()");
      return {};
    },

    /**
     * build danh sách cột cho grid chính
     */
    buildGridMasterColumn(): Array<Column> {
      console.log("DEV: Override Function buildGridMasterColumn return list Column in Grid");
      return Array(
        new Column({
          fieldText: "Mã nhóm NCC",
          dataIndex: "Column1",
          width: 120,
        }),
        new Column({
          fieldText: "Tên nhóm NCC",
          dataIndex: "Column2",
          width: 260
        }),
        new Column({
          fieldText: "Mô tả",
          dataIndex: "Column3",
          width: 260
        }),
        new Column({
          fieldText: "Trạng thái",
          dataIndex: "Column4",
          width: 260
        }),
      )
    },

    /**
     * Load dữ liệu master lên grid
     * @param param 
     */
    loadMasterData(param: ParamPaging) {
      console.log("Dev: Override function loadMasterData with param: " + JSON.stringify(param));
      return [
        {
          Column1: "NCC001",
          Column2: "Hàng nội địa",
          Column3: "Hàng mới về",
          Column4: "Đang theo dõi",

        },
        {
          Column1: "NCC002",
          Column2: "Hàng nhập khẩu",
          Column3: "Hàng mới",
          Column4: "Ngừng theo dõi",

        },

      ];
    },

    /**
     * Set PrimaryKey cho object master
     */
    getPrimaryKeyMaster() {
      console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
      return "Column1";
    },

    /**
     * Khai báo import component detail
     * Override lại function after close form
     */
    async createComponent() {
      console.log("DEV: Override Function createComponent Vue component Detail");
      const frmDetail = (await import(`../vendor-category-detail/VendorCategoryDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
