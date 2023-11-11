<template src="./VendorCategoryListDictionary.html"></template>
<style lang="scss" scoped src="./VendorCategoryListDictionary.scss"></style>
<script lang="ts">
import VendorCategoryListDictionary from './VendorCategoryListDictionary';
import { Ref, ref } from 'vue';
import BaseDictionaryListView from 'qlch_base/BaseDictionaryListView';
import BaseDictionaryListController from 'qlch_base/BaseDictionaryListController';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import VendorCategory from '@store-src/models/vendor-category/VendorCategory';

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
          dataIndex: "CodeVendorCategory",
          width: 120,
        }),
        new Column({
          fieldText: "Tên nhóm NCC",
          dataIndex: "NameVendorCategory",
          width: 260
        }),
        new Column({
          fieldText: "Mô tả",
          dataIndex: "DescribeVendorCategory",
          width: 260
        }),
        new Column({
          fieldText: "Trạng thái",
          dataIndex: "StatusVendorCategory",
          width: 260,
          flex: 1
        }),
      )
    },

    /**
     * Load dữ liệu master lên grid
     * @param param 
     */
    loadMasterData(param: ParamPaging) {
      console.log("Dev: Override function loadMasterData with param: " + JSON.stringify(param));
      if (!LocalStorageLibrary.getByKey<Array<VendorCategory>>("VendorCategory")) {
        return new Array<VendorCategory>;
      }
      else {
        return LocalStorageLibrary.getByKey<Array<VendorCategory>>("VendorCategory");
      }
    },
    /**
      * Thực hiện chức năng xóa trên Toolbar
      * @param listSelectedRecord 
      */
    afterDelete(listMasterData: Array<Record<string, any>>) {
      LocalStorageLibrary.setByKey("VendorCategory", listMasterData);
    },
    /**
     * Set PrimaryKey cho object master
     */
    getPrimaryKeyMaster() {
      console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
      return "VendorCategoryId";
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
