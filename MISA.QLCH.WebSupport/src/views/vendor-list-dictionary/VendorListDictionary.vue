<template src="./VendorListDictionary.html"></template>
<style lang="scss" scoped src="./VendorListDictionary.scss"></style>
<script lang="ts">
import VendorListDictionary from './VendorListDictionary';
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
    const thisData: Ref<VendorListDictionary> = ref(new VendorListDictionary());
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
          fieldText: "Mã NCC",
          dataIndex: "CodeVendor",
          width: 120,
        }),
        new Column({
          fieldText: "Tên NCC",
          dataIndex: "NameVendor",
          width: 260
        }),
        new Column({
          fieldText: "Nhóm NCC",
          dataIndex: "GroupVendor",
          width: 260
        }),
        new Column({
          fieldText: "Số điện thoại",
          dataIndex: "TelephoneVendor",
          width: 260
        }),
        new Column({
          fieldText: "Địa chỉ",
          dataIndex: "AddressVendor",
          minWidth: 260,
          flex: 1
        }),
        new Column({
          fieldText: "Trạng thái",
          dataIndex: "StatusVendor",
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
          CodeVendor: "NCC-H1",
          NameVendor: "Cty HaMinh",
          GroupVendor: "Hàng Nhập Khẩu",
          TelephoneVendor: "012345",
          AddressVendor: "Hà Nội",
          StatusVendor: "Đang theo dõi"
        },
      ];
    },

    /**
     * Set PrimaryKey cho object master
     */
    getPrimaryKeyMaster() {
      console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
      return "CodeVendor";
    },

    /**
     * Khai báo import component detail
     * Override lại function after close form
     */
    async createComponent() {
      console.log("DEV: Override Function createComponent Vue component Detail");
      const frmDetail = (await import(`../vendor-detail/VendorDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
