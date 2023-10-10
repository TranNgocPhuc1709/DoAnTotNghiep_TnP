<template src="./EmployeeListDictionary.html"></template>
<style lang="scss" scoped src="./EmployeeListDictionary.scss"></style>
<script lang="ts">
import EmployeeListDictionary from './EmployeeListDictionary';
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
    const thisData: Ref<EmployeeListDictionary> = ref(new EmployeeListDictionary());
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
          fieldText: "Mã nhân viên",
          dataIndex: "Column1",
          width: 120,
        }),
        new Column({
          fieldText: "Tên nhân viên",
          dataIndex: "Column2",
          width: 260
        }),
        new Column({
          fieldText: "Giới tính",
          dataIndex: "Column3",
          width: 260
        }),
        new Column({
          fieldText: "Ngày sinh",
          dataIndex: "Column4",
          width: 260
        }),
        new Column({
          fieldText: "Số ĐT",
          dataIndex: "Column5",
          minWidth: 260,
          flex: 1
        }),
        new Column({
          fieldText: "Trạng thái làm việc",
          dataIndex: "Column6",
          width: 160
        })
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
          Column1: "NV-01",
          Column2: "Nguyễn Thảo",
          Column3: "Nữ",
          Column4: "17-08-2002",
          Column5: "0123456789",
          Column6: "Chính thức"
        },
        {
          Column1: "NV-02",
          Column2: "Trần Long",
          Column3: "Nam",
          Column4: "27-10-2006",
          Column5: "0123456789",
          Column6: "Thử việc"
        },
        {
          Column1: "NV-03",
          Column2: "Nguyễn Phương",
          Column3: "Nữ",
          Column4: "27-10-2006",
          Column5: "0123456789",
          Column6: "Đã nghỉ việc"
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
      const frmDetail = (await import(`../employee-detail/EmployeeDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
