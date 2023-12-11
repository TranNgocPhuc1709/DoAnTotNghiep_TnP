<template src="./TransferStockListDictionary.html"></template>
<style lang="scss" scoped src="./TransferStockListDictionary.scss"></style>
<script lang="ts">
import TransferStockListDictionary from './TransferStockListDictionary';
import { Ref, ref } from 'vue';
import BaseDictionaryListView from 'qlch_base/BaseDictionaryListView';
import BaseDictionaryListController from 'qlch_base/BaseDictionaryListController';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import TransferStock from '@store-src/models/transfer-stock/TransferStock';

export default {

  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
  },
  setup() {
    const thisData: Ref<TransferStockListDictionary> = ref(new TransferStockListDictionary());
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
          fieldText: "Ngày",
          dataIndex: "DateTransferStock",
          width: 120,
        }),
        new Column({
          fieldText: "Số phiếu",
          dataIndex: "votesTransferStock",
          width: 260
        }),
        new Column({
          fieldText: "Đối tượng vận chuyển",
          dataIndex: "NameObjectTransfer",
          width: 260
        }),
        new Column({
          fieldText: "Tổng tiền",
          dataIndex: "TotalMoneyTransferStock",
          width: 260
        }),
        new Column({
          fieldText: "Diễn giải",
          dataIndex: "NoteTransferStock",
          minWidth: 260,
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
      if (!LocalStorageLibrary.getByKey<Array<TransferStock>>("transferStock")) {
        return new Array<TransferStock>;
      }
      else {
        return LocalStorageLibrary.getByKey<Array<TransferStock>>("transferStock");
      }
    },
    afterDelete(listMasterData: Array<Record<string, any>>) {
      LocalStorageLibrary.setByKey("transferStock", listMasterData);
    },
    /**
     * Set PrimaryKey cho object master
     */
    getPrimaryKeyMaster() {
      console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
      return "TransferStockId";
    },

    /**
     * Khai báo import component detail
     * Override lại function after close form
     */
    async createComponent() {
      console.log("DEV: Override Function createComponent Vue component Detail");
      const frmDetail = (await import(`../transfer-stock-detail/TransferStockDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
