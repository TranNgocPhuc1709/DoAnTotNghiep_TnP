<template src="./BankListDictionary.html"></template>
<style lang="scss" scoped src="./BankListDictionary.scss"></style>
<script lang="ts">
import BankListDictionary from './BankListDictionary';
import { Ref, ref } from 'vue';
import BaseDictionaryListView from 'qlch_base/BaseDictionaryListView';
import BaseDictionaryListController from 'qlch_base/BaseDictionaryListController';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Bank from '@store-src/models/bank/Bank';

export default {

  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
  },
  setup() {
    const thisData: Ref<BankListDictionary> = ref(new BankListDictionary());
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
          fieldText: "Số tài khoản",
          dataIndex: "CodeAccount",
          width: 120,
        }),
        new Column({
          fieldText: "Tên ngân hàng",
          dataIndex: "NameAccount",
          width: 260
        }),
        new Column({
          fieldText: "Chủ tài khoản",
          dataIndex: "OwnerAccount",
          width: 260
        }),
        new Column({
          fieldText: "Diễn giải",
          dataIndex: "ExplainAccount",
          width: 260
        }),
        new Column({
          fieldText: "Trạng thái",
          dataIndex: "StatusAccount",
          width: 260
        })
      )
    },

    /**
     * Load dữ liệu master lên grid
     * @param param 
     */
    loadMasterData(param: ParamPaging) {
      console.log("Dev: Override function loadMasterData with param: " + JSON.stringify(param));
      if (!LocalStorageLibrary.getByKey<Array<Bank>>("Bank")) {
        return new Array<Bank>;
      }
      else {
        return LocalStorageLibrary.getByKey<Array<Bank>>("Bank");
      }
    },

    /**
     * Thực hiện chức năng xóa trên Toolbar
     * @param listSelectedRecord 
     */
    afterDelete(listMasterData: Array<Record<string, any>>) {
      LocalStorageLibrary.setByKey("Bank", listMasterData);
    },

    /**
     * Set PrimaryKey cho object master
     */
    getPrimaryKeyMaster() {
      console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
      return "BankId";
    },

    /**
     * Khai báo import component detail
     * Override lại function after close form
     */
    async createComponent() {
      console.log("DEV: Override Function createComponent Vue component Detail");
      const frmDetail = (await import(`../bank-detail/BankDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
