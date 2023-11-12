<template src="./EmployeeListDictionary.html"></template>
<style lang="scss" scoped src="./EmployeeListDictionary.scss"></style>
<script lang="ts">
import EmployeeListDictionary from './EmployeeListDictionary';
import { Ref, ref } from 'vue';
import BaseDictionaryListView from 'qlch_base/BaseDictionaryListView';
import BaseDictionaryListController from 'qlch_base/BaseDictionaryListController';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Employee from '@store-src/models/employee/Employee';

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
          dataIndex: "CodeEmployee",
          width: 120,
        }),
        new Column({
          fieldText: "Tên nhân viên",
          dataIndex: "NameEmployee",
          width: 260
        }),
        new Column({
          fieldText: "Giới tính",
          dataIndex: "GenderEmployee",
          width: 260
        }),
        new Column({
          fieldText: "Ngày sinh",
          dataIndex: "BirthEmployee",
          width: 260
        }),
        new Column({
          fieldText: "Số ĐT",
          dataIndex: "TelephoneEmployee",
          minWidth: 260,
          flex: 1
        }),
        new Column({
          fieldText: "Trạng thái làm việc",
          dataIndex: "StatusEmployee",
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
      if (!LocalStorageLibrary.getByKey<Array<Employee>>("employee")) {
        return new Array<Employee>;
      }
      else {
        return LocalStorageLibrary.getByKey<Array<Employee>>("employee");
      }
    },
    /**
     * Thực hiện chức năng xóa trên Toolbar
     * @param listSelectedRecord 
     */
    afterDelete(listMasterData: Array<Record<string, any>>) {
      LocalStorageLibrary.setByKey("employee", listMasterData);
    },
    /**
     * Set PrimaryKey cho object master
     */
    getPrimaryKeyMaster() {
      console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
      return "CodeEmployee";
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
