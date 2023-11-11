<template src="./CustomerListDictionary.html"></template>
<style lang="scss" scoped src="./CustomerListDictionary.scss"></style>
<script lang="ts">
import CustomerListDictionary from './CustomerListDictionary';
import { Ref, ref } from 'vue';
import BaseDictionaryListView from 'qlch_base/BaseDictionaryListView';
import BaseDictionaryListController from 'qlch_base/BaseDictionaryListController';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Customer from '@store-src/models/customer/Customer';

export default {

  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
  },
  setup() {
    const thisData: Ref<CustomerListDictionary> = ref(new CustomerListDictionary());
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
          fieldText: "Mã khách hàng",
          dataIndex: "CodeCustomer",
          width: 120,
        }),
        new Column({
          fieldText: "Tên khách hàng",
          dataIndex: "NameCustomer",
          width: 260
        }),
        new Column({
          fieldText: "Điện thoại",
          dataIndex: "TelephoneCustomer",
          width: 260
        }),
        new Column({
          fieldText: "email",
          dataIndex: "EmailCustomer",
          width: 260
        }),
        new Column({
          fieldText: "Địa chỉ",
          dataIndex: "AddressCustomer",
          minWidth: 260,
          flex: 1
        }),
        new Column({
          fieldText: "Ngày sinh",
          dataIndex: "DateBirthCustomer",
          width: 160
        }),


        new Column({
          fieldText: "Nhóm khách hàng",
          dataIndex: "CustomerGroupList",
          width: 160
        }),

        new Column({
          fieldText: "Mã nhân viên phụ trách",
          dataIndex: "CodeEmployeeCustomer",
          width: 160
        }),
        new Column({
          fieldText: "Tên nhân viên phụ trách",
          dataIndex: "NameEmployeeCustomer",
          width: 160
        }),
        new Column({
          fieldText: "Chú ý",
          dataIndex: "AttentionCustomer",
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
      if (!LocalStorageLibrary.getByKey<Array<Customer>>("Customer")) {
        return new Array<Customer>;
      }
      else {
        return LocalStorageLibrary.getByKey<Array<Customer>>("Customer");
      }
    },
    /**
      * Thực hiện chức năng xóa trên Toolbar
      * @param listSelectedRecord 
      */
    afterDelete(listMasterData: Array<Record<string, any>>) {
      LocalStorageLibrary.setByKey("Customer", listMasterData);
    },
    /**
     * Set PrimaryKey cho object master
     */
    getPrimaryKeyMaster() {
      console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
      return "CustomerId";
    },

    /**
     * Khai báo import component detail
     * Override lại function after close form
     */
    async createComponent() {
      console.log("DEV: Override Function createComponent Vue component Detail");
      const frmDetail = (await import(`../customer-detail/CustomerDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
