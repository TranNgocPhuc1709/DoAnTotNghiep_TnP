<template src="./OrderListDictionary.html"></template>
<style lang="scss" scoped src="./OrderListDictionary.scss"></style>
<script lang="ts">
import OrderListDictionary from './OrderListDictionary';
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
    const thisData: Ref<OrderListDictionary> = ref(new OrderListDictionary());
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
          fieldText: "Ngày Tạo Đơn",
          dataIndex: "Column1",
          width: 120,
        }),
        new Column({
          fieldText: "Ngày Giao Hàng",
          dataIndex: "Column2",
          width: 120
        }),
        new Column({
          fieldText: "Mã Hóa Đơn",
          dataIndex: "Column3",
          width: 120
        }),
        new Column({
          fieldText: "Trạng Thái",
          dataIndex: "Column4",
          width: 120
        }),
        new Column({
          fieldText: "Nhân Viên Bán Hàng",
          dataIndex: "Column5",
          minWidth: 200,
          flex: 1
        }),
        new Column({
          fieldText: "Người Nhận",
          dataIndex: "Column6",
          width: 200
        }),
        new Column({
          fieldText: "SĐT Người Nhận",
          dataIndex: "Column7",
          width: 160
        }),
        new Column({
          fieldText: "Địa chỉ giao hàng",
          dataIndex: "Column8",
          width: 260
        }),
        new Column({
          fieldText: "Phí GH Thu Khách",
          dataIndex: "Column9",
          width: 120
        }),
        new Column({
          fieldText: "Đối Tác Giao Hàng",
          dataIndex: "Column10",
          width: 160
        }),
        new Column({
          fieldText: "TT Đơn Vị Vận Chuyển",
          dataIndex: "Column11",
          width: 160
        }),
        new Column({
          fieldText: "Mã Vận Đơn",
          dataIndex: "Column12",
          width: 160
        }),
        new Column({
          fieldText: "Mã Đơn Hàng Trên Sàn",
          dataIndex: "Column13",
          width: 160
        }),
        new Column({
          fieldText: "Tổng Thanh Toán",
          dataIndex: "Column14",
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
          Column1: "Value 11",
          Column2: "Value 21",
          Column3: "Value 31",
          Column4: "Value 41",
          Column5: "Value 51",
          Column6: "Value 61",
          Column7: "Value 61",
          Column8: "Value 61",
          Column9: "Value 61",
          Column10: "Value 61",
          Column11: "Value 61",
          Column12: "Value 61",
          Column13: "Value 61",
          Column14: "Value 61"
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
      const frmDetail = (await import(`../order-detail/OrderDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
