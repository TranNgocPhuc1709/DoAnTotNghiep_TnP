<template src="./BankAccountListDictionary.html"></template>
<style lang="scss" scoped src="./BankAccountListDictionary.scss"></style>
<script lang="ts">
import BankAccountListDictionary from './BankAccountListDictionary';
import { Ref, ref } from 'vue';
import BaseDictionaryListView from 'qlch_base/BaseDictionaryListView';
import BaseDictionaryListController from 'qlch_base/BaseDictionaryListController';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import BankAccount from '@store-src/models/bank-account/BankAccount';

export default {

  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
  },
  setup() {
    const thisData: Ref<BankAccountListDictionary> = ref(new BankAccountListDictionary());
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
          fieldText: "Tên thẻ",
          dataIndex: "NameCardBank",
          width: 260
        }),
        new Column({
          fieldText: "Diễn giải",
          dataIndex: "ExplainBank",
          width: 260
        }),
        new Column({
          fieldText: "Trạng thái",
          dataIndex: "StatusBank",
          width: 260,
          flex: 1
        })
      )
    },

    /**
     * Load dữ liệu master lên grid
     * @param param 
     */
    loadMasterData(param: ParamPaging) {
      console.log("Dev: Override function loadMasterData with param: " + JSON.stringify(param));
      if (!LocalStorageLibrary.getByKey<Array<BankAccount>>("BankAccount")) {
        return new Array<BankAccount>;
      }
      else {
        return LocalStorageLibrary.getByKey<Array<BankAccount>>("BankAccount");
      }
    },
    /**
     * Thực hiện chức năng xóa trên Toolbar
     * @param listSelectedRecord 
     */
    afterDelete(listMasterData: Array<Record<string, any>>) {
      LocalStorageLibrary.setByKey("BankAccount", listMasterData);
    },

    /**
     * Set PrimaryKey cho object master
     */
    getPrimaryKeyMaster() {
      console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
      return "BankAccountId";
    },

    /**
     * Khai báo import component detail
     * Override lại function after close form
     */
    async createComponent() {
      console.log("DEV: Override Function createComponent Vue component Detail");
      const frmDetail = (await import(`../bank-account-detail/BankAccountDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
