<template src="./CustomerListDictionary.html"></template>
<style lang="scss" scoped src="./CustomerListDictionary.scss"></style>
<script lang="ts">
import CustomerListDictionary from './CustomerListDictionary';
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
          dataIndex: "Column1",
          width: 120,
        }),
        new Column({
          fieldText: "Tên khách hàng",
          dataIndex: "Column2",
          width: 260
        }),
        new Column({
          fieldText: "Điện thoại",
          dataIndex: "Column3",
          width: 260
        }),
        new Column({
          fieldText: "email",
          dataIndex: "Column4",
          width: 260
        }),
        new Column({
          fieldText: "Địa chỉ",
          dataIndex: "Column5",
          minWidth: 260,
          flex: 1
        }),

        new Column({
          fieldText: "Ngày sinh",
          dataIndex: "Column6",
          width: 160
        }),
        new Column({
          fieldText: "Nhóm khách hàng",
          dataIndex: "Column7",
          width: 160
        }),
        new Column({
          fieldText: "Mã nhân viên phụ trách",
          dataIndex: "Column8",
          width: 160
        }),
        new Column({
          fieldText: "Tên nhân viên phụ trách",
          dataIndex: "Column9",
          width: 160
        }),
        new Column({
          fieldText: "Chú ý",
          dataIndex: "Column10",
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
          Column1: "KH001",
          Column2: "Nguyễn Văn A",
          Column3: "0123456789",
          Column4: "NguyenVanA@gmail.com",
          Column5: "Hà Nội",
          Column6: "Cầu Giấy",
          Column7: "Phường Dịch Vọng",
          Column8: "123, Cầu Giấy, Hà Nội",
          Column9: "18/10/2003",
          Column10: "Nhóm khách hàng thân thiết",
          Column11: "NV001",
          Column12: "Nguyễn Thị Lụa",
          Column13: "Khách quen",
        },
        {
          Column1: "KH002",
          Column2: "Nguyễn Hoàng A",
          Column3: "0123456789",
          Column4: "NguyenHoangA@gmail.com",
          Column5: "Nam Định",
          Column6: "Cổ Nhuế",
          Column7: "Phường Nam Từ Liên",
          Column8: "123, Cầu Giấy, Hà Nội",
          Column9: "12/5/2002",
          Column10: "Khách hàng V.I.P",
          Column11: "NV002",
          Column12: "Đinh Thị Hương",
          Column13: "Khách mới",
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
      const frmDetail = (await import(`../customer-detail/CustomerDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
