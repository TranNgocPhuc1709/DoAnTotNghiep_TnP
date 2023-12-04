<template src="./SalesListDictionary.html"></template>
<style lang="scss" scoped src="./SalesListDictionary.scss"></style>
<script lang="ts">
import SalesListDictionary from './SalesListDictionary';
import { Ref, ref } from 'vue';
import BaseDictionaryListView from 'qlch_base/BaseDictionaryListView';
import BaseDictionaryListController from 'qlch_base/BaseDictionaryListController';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import Log from '@library-src/utilities/Log';
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import EDate from "qlch_control/EDate";
import Button from '@library-src/models/qlch_control/qlch_button/Button';
import EButton from "qlch_control/EButton";
// import ToolBarItemsView from '@library-src/models/qlch_base/tool_bar_items_view/ToolBarItemsView';
import TextBox from '@library-src/models/qlch_control/qlch_text_box/TextBox';
import ETextBox from "qlch_control/ETextBox";
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import ENumber from "qlch_control/ENumber";
import PopupLibrary from '@library-src/utilities/commons/PopupLibrary';
import Bill from '@store-src/models/bill-main/Bill';

export default {

  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
    ECombobox,
    EDate,
    EButton,
    ETextBox,
    ENumber
  },
  data() {
    const lstBill: Ref<Array<Bill>> = ref(new Array<Bill>());
    return {
      lstBill
    }
  },
  setup() {
    const thisData: Ref<SalesListDictionary> = ref(new SalesListDictionary());
    const cbbSales: Ref<Combobox> = ref(new Combobox({
      require: true,
      data: [
        {
          value: 1,
          display: "Tháng này"
        },
        {
          value: 2,
          display: "Tháng trước"
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

    //detail_table
    const txtDateSalesDetail: DateModel = new DateModel({
      fieldText: "",
      labelWidth: 60,


    });
    const txtTimesSalesDetail: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    const txtSalesAgent: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    const txtBillsSalesDetail: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    const txtNoticeSales: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    const txtTotalSalesDetail: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    const txtGoodsMoneySalesDetail: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    const txtPromotionSalesDetail: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    const btnDelListTable: Button = new Button({
      fieldText: "Hủy Hóa Đơn",
      classType: "secondary"
    });


    return {
      thisData,
      cbbSales,
      dtBeginRequire,
      dtEndRequire,
      btnGetData,
      btnExportData,
      btnPrintData,
      txtDateSalesDetail,
      txtTimesSalesDetail,
      txtBillsSalesDetail,
      txtTotalSalesDetail,
      txtSalesAgent,
      txtNoticeSales,
      txtGoodsMoneySalesDetail,
      txtPromotionSalesDetail,
      btnDelListTable

    };
  },
  created() {
    try {
      const me = this;

      me.cbbSales.value = 1;


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


    async ShowBill() {

      const component = (await import(`./popup-bill/PopupBill.vue`)).default;
      if (component) {
        PopupLibrary.createPopup(component, {});
      };
    },

    /**
     * build danh sách cột cho grid chính
     */
    buildGridMasterColumn(): Array<Column> {
      console.log("DEV: Override Function buildGridMasterColumn return list Column in Grid");
      return Array(
        new Column({
          fieldText: "Ngày",
          dataIndex: "DateSales",
          width: 120,
        }),
        new Column({
          fieldText: "Giờ",
          dataIndex: "TimesSales",
          width: 120,
        }),
        new Column({
          fieldText: "Số hóa đơn",
          dataIndex: "NumberBillsSales",
          width: 200,
        }),
        new Column({
          fieldText: "Trạng thái",
          dataIndex: "StatusBillsSales",
          width: 220,
        }),
        new Column({
          fieldText: "Tổng (4) = (1) +(2) - (3)",
          dataIndex: "TotalSales",
          minWidth: 260,
          flex: 1
        }),
        new Column({
          fieldText: "Tiền hàng (1)",
          dataIndex: "RevenueMoneySales",
          width: 260
        }),
        new Column({
          fieldText: "Tiền phí (2)",
          dataIndex: "ExpenseMoneySales",
          width: 260
        }),
        new Column({
          fieldText: "Khuyến mại (3)",
          dataIndex: "PromotionSales",
          width: 260
        }),

      )
    },
    /**
     * Load dữ liệu master lên grid
     * @param param 
     */
    loadMasterData(param: ParamPaging) {
      console.log("Dev: Override function loadMasterData with param: " + JSON.stringify(param));
      return [
        // {
        //   DateSales: "27/10/2023",
        //   TimesSales: "20:00",
        //   NumberBillsSales: "2131321232",
        //   StatusBillsSales: "Đã Xác Nhận",
        //   RevenueMoneySales: "100000",
        //   ExpenseMoneySales: "20000",
        //   PromotionSales: "0",
        //   TotalSales: "120000",
        // },

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
      const frmDetail = (await import(`../sales-detail/SalesDetail.vue`)).default;
      return frmDetail;
    },
    // buildToolBarItems(): Array<ToolBarItemsView> {
    //   return [];
    // },
  }
}
</script>
