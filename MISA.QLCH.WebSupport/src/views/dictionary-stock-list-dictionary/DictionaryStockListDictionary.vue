<template src="./DictionaryStockListDictionary.html"></template>
<style lang="scss" scoped src="./DictionaryStockListDictionary.scss"></style>
<script lang="ts">
import DictionaryStockListDictionary from './DictionaryStockListDictionary';
import { Ref, ref } from 'vue';
import BaseDictionaryListView from 'qlch_base/BaseDictionaryListView';
import BaseDictionaryListController from 'qlch_base/BaseDictionaryListController';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import DictionaryStock from '@store-src/models/dictionary-stock/DictionaryStock';

export default {

  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
  },
  setup() {
    const thisData: Ref<DictionaryStockListDictionary> = ref(new DictionaryStockListDictionary());
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
          fieldText: "Mã kho",
          dataIndex: "CodeStore",
          width: 120,
        }),
        new Column({
          fieldText: "Tên kho",
          dataIndex: "NameStore",
          width: 260
        }),
        new Column({
          fieldText: "Diễn giải",
          dataIndex: "ExplainStore",
          width: 260
        }),
        new Column({
          fieldText: "Trạng thái",
          dataIndex: "StatusStore",
          flex: 1,
        }),

      )
    },
    /**
        * Thực hiện chức năng xóa trên Toolbar
        * @param listSelectedRecord 
        */
    afterDelete(listMasterData: Array<Record<string, any>>) {
      LocalStorageLibrary.setByKey("dictionaryStock", listMasterData);
    },
    /**
     * Load dữ liệu master lên grid
     * @param param 
     */
    loadMasterData(param: ParamPaging) {
      console.log("Dev: Override function loadMasterData with param: " + JSON.stringify(param));
      if (!LocalStorageLibrary.getByKey<Array<DictionaryStock>>("dictionaryStock")) {
        return new Array<DictionaryStock>;
      }
      else {
        return LocalStorageLibrary.getByKey<Array<DictionaryStock>>("dictionaryStock");
      }
    },

    /**
     * Set PrimaryKey cho object master
     */
    getPrimaryKeyMaster() {
      console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
      return "DictionaryStockId";
    },

    /**
     * Khai báo import component detail
     * Override lại function after close form
     */
    async createComponent() {
      console.log("DEV: Override Function createComponent Vue component Detail");
      const frmDetail = (await import(`../dictionary-stock-detail/DictionaryStockDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
