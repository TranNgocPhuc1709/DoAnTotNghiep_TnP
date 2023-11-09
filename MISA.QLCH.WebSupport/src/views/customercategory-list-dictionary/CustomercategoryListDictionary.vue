<template src="./CustomercategoryListDictionary.html"></template>
<style lang="scss" scoped src="./CustomercategoryListDictionary.scss"></style>
<script lang="ts">
import CustomercategoryListDictionary from './CustomercategoryListDictionary';
import { Ref, ref } from 'vue';
import BaseDictionaryListView from 'qlch_base/BaseDictionaryListView';
import BaseDictionaryListController from 'qlch_base/BaseDictionaryListController';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import CustomerCategory from '@store-src/models/customer-category/CustomerCategory';
export default {
  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
  },
  setup() {
    const thisData: Ref<CustomercategoryListDictionary> = ref(new CustomercategoryListDictionary());
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
          fieldText: "Mã nhóm khách hàng",
          dataIndex: "CodeCustomerCategory",
          width: 150,
        }),
        new Column({
          fieldText: "Tên nhóm khách hàng",
          dataIndex: "NameCustomerCategory",
          width: 260
        }),
        new Column({
          fieldText: "Mô tả",
          dataIndex: "DescribeCustomerCategory",
          width: 260
        }),
        new Column({
          fieldText: "Trạng thái",
          dataIndex: "StatusCustomerCategory",
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
      if (!LocalStorageLibrary.getByKey<Array<CustomerCategory>>("customerCategory")) {
        return new Array<CustomerCategory>;
      }
      else {
        return LocalStorageLibrary.getByKey<Array<CustomerCategory>>("customerCategory");
      }
    },

    /**
     * Set PrimaryKey cho object master
     */
    getPrimaryKeyMaster() {
      console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
      return "CodeCustomerCategory";
    },

    /**
     * Khai báo import component detail
     * Override lại function after close form
     */
    async createComponent() {
      console.log("DEV: Override Function createComponent Vue component Detail");
      const frmDetail = (await import(`../customercategory-detail/CustomercategoryDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
