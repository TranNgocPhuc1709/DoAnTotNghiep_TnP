<template src="./OrderListDictionary.html"></template>
<style lang="scss" scoped src="./OrderListDictionary.scss"></style>
<script lang="ts">
import OrderListDictionary from './OrderListDictionary';
import { Ref, ref } from 'vue';
import BaseDictionaryListView from 'qlch_base/BaseDictionaryListView';
import BaseDictionaryListController from 'qlch_base/BaseDictionaryListController';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import Button from '@library-src/models/qlch_control/qlch_button/Button';
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import Log from '@library-src/utilities/Log';
import EDate from "qlch_control/EDate";
import EButton from "qlch_control/EButton";
import ToolBarItemsView from '@library-src/models/qlch_base/tool_bar_items_view/ToolBarItemsView';
export default {

  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
    ECombobox,
    EDate,
    EButton
  },
  setup() {
    const thisData: Ref<OrderListDictionary> = ref(new OrderListDictionary());
    const cbbOrder: Ref<Combobox> = ref(new Combobox({
      require: true,
      data: [
        {
          value: 1,
          display: "Khác"
        },
        {
          value: 2,
          display: "Hôm nay"
        },
        {
          value: 3,
          display: "Tuần trước"
        },

      ]
      // require: true
    }));
    const cbbDateOrder: Ref<Combobox> = ref(new Combobox({
      require: true,
      data: [
        {
          value: 1,
          display: "Khác"
        },
        {
          value: 2,
          display: "Hôm nay"
        },
        {
          value: 3,
          display: "Tuần trước"
        },

      ]
      // require: true
    }));
    const dtBeginRequire: DateModel = new DateModel({
      fieldText: "Từ ngày",
      labelWidth: 60
    });
    const dtEndRequire: DateModel = new DateModel({
      fieldText: "Đến ngày",
      labelWidth: 60
    });

    const btnGetData: Button = new Button({
      fieldText: "Lấy dữ liệu",
      classType: "secondary",
      // classIconLeft: "i-add"
    });
    const btnExportData: Button = new Button({
      fieldText: "Xuất File Excel",
      classType: "secondary",

      // classIconLeft: "i-add"
    });
    const btnPrintData: Button = new Button({
      fieldText: "In Dữ Liệu",
      classType: "secondary",

      // classIconLeft: "i-add"
    });
    return {
      thisData,
      cbbOrder,
      dtBeginRequire,
      dtEndRequire,
      btnGetData,
      btnExportData,
      btnPrintData,
      cbbDateOrder

    };
  },
  created() {
    try {
      const me = this;
      me.cbbOrder.value = 1;
      me.cbbDateOrder.value = 1;

    } catch (error) {
      Log.ErrorLog(error as Error);
    }
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
          dataIndex: "DateCreateOrder",
          width: 200,
        }),
        new Column({
          fieldText: "Ngày Giao Hàng",
          dataIndex: "DateDelivery",
          width: 200
        }),
        new Column({
          fieldText: "Mã Hóa Đơn",
          dataIndex: "CodeBill",
          width: 200
        }),
        new Column({
          fieldText: "Trạng Thái",
          dataIndex: "StatusOrderList",
          width: 200,
        }),
        new Column({
          fieldText: "Nhân Viên Bán Hàng",
          dataIndex: "SalesAgentOrder",
          minWidth: 200,

        }),
        new Column({
          fieldText: "Người Nhận",
          dataIndex: "ReceiverOrder",
          width: 200
        }),
        new Column({
          fieldText: "SĐT Người Nhận",
          dataIndex: "PhoneReceiverOrder",
          width: 200
        }),
        new Column({
          fieldText: "Địa chỉ giao hàng",
          dataIndex: "AddressDelivery",
          width: 260
        }),
        new Column({
          fieldText: "Phí GH Thu Khách",
          dataIndex: "DeliveryCharges",
          width: 200
        }),
        new Column({
          fieldText: "Đối Tác Giao Hàng",
          dataIndex: "DeliveryPartner",
          width: 200
        }),
        new Column({
          fieldText: "TT Đơn Vị Vận Chuyển",
          dataIndex: "ShippingOrder",
          width: 200
        }),
        new Column({
          fieldText: "Mã Vận Đơn",
          dataIndex: "LadingBillOrder",
          width: 200
        }),
        new Column({
          fieldText: "Mã Đơn Hàng Trên Sàn",
          dataIndex: "PlatformCodeOrder",
          width: 200
        }),
        new Column({
          fieldText: "Tổng Thanh Toán",
          dataIndex: "TotalPaymentOrder",
          width: 200,
          flex: 1
        })
      )
    },
    // Hide-ToolBar-Footer

    buildToolBarItems(): Array<ToolBarItemsView> {

      return [];

    },

    /**
     * Load dữ liệu master lên grid
     * @param param 
     */
    loadMasterData(param: ParamPaging) {
      console.log("Dev: Override function loadMasterData with param: " + JSON.stringify(param));
      return [
        {
          DateCreateOrder: "Value 11",
          DateDelivery: "Value 21",
          CodeBill: "Value 31",
          StatusOrderList: "Value 41",
          SalesAgentOrder: "Value 51",
          ReceiverOrder: "Value 61",
          PhoneReceiverOrder: "Value 61",
          AddressDelivery: "Value 61",
          DeliveryCharges: "Value 61",
          DeliveryPartner: "Value 61",
          ShippingOrder: "Value 61",
          LadingBillOrder: "Value 61",
          PlatformCodeOrder: "Value 61",
          TotalPaymentOrder: "Value 61"
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
