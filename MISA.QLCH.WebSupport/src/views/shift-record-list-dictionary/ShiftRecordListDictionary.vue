<template src="./ShiftRecordListDictionary.html"></template>
<style lang="scss" scoped src="./ShiftRecordListDictionary.scss"></style>
<script lang="ts">
import ShiftRecordListDictionary from './ShiftRecordListDictionary';
import BaseDictionaryListView from 'qlch_base/BaseDictionaryListView';
import BaseDictionaryListController from 'qlch_base/BaseDictionaryListController';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import ShiftRecord from '@store-src/models/shift-record/ShiftRecord';
import { Ref, ref } from 'vue';
export default {

  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
  },
  setup() {
    const thisData: Ref<ShiftRecordListDictionary> = ref(new ShiftRecordListDictionary());
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
          fieldText: "Tên ca",
          dataIndex: "ShiftName",
          width: 120,
        }),
        new Column({
          fieldText: "Giờ bắt đầu",
          dataIndex: "ShiftTimeStart",
          width: 260
        }),
        new Column({
          fieldText: "Giờ kết thúc",
          dataIndex: "ShiftTimeStartEnd",
          width: 260
        }),
        new Column({
          fieldText: "Trạng thái",
          dataIndex: "ShiftStatus",
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
      // const  newContext = new ShiftRecord ;
      if (!LocalStorageLibrary.getByKey<Array<ShiftRecord>>("ShiftRecord")) {
        return new Array<ShiftRecord>;
      }
      else {
        return LocalStorageLibrary.getByKey<Array<ShiftRecord>>("ShiftRecord");
      }
    },
    delItem() {


      // const me = this;
      // let listShiftRecord: Array<ShiftRecord> | null = LocalStorageLibrary.getByKey<Array<ShiftRecord>>("ShiftRecord");
      // if (me.masterData) {
      //   if (me.masterData.editMode == 3) {
      //     listShiftRecord = LocalStorageLibrary.getByKey<Array<ShiftRecord>>("ShiftRecord");
      //     if (listShiftRecord) {
      //       listShiftRecord = [];
      //       LocalStorageLibrary.setByKey("ShiftRecord", listShiftRecord);
      //     }
      //   }
      // }



    },
    /**
     * Set PrimaryKey cho object master
     */
    getPrimaryKeyMaster() {
      console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
      return "ShiftName";
    },

    /**
     * Khai báo import component detail
     * Override lại function after close form
     */
    async createComponent() {
      console.log("DEV: Override Function createComponent Vue component Detail");
      const frmDetail = (await import(`../shift-record-detail/ShiftRecordDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
