<template src="./ProfitListDictionary.html"></template>
<style lang="scss" scoped src="./ProfitListDictionary.scss"></style>
<script lang="ts">
import ProfitListDictionary from './ProfitListDictionary';
import { Ref, ref } from 'vue';
import BaseDictionaryListView from 'qlch_base/BaseDictionaryListView';
import BaseDictionaryListController from 'qlch_base/BaseDictionaryListController';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import ToolBarItemsView from '@library-src/models/qlch_base/tool_bar_items_view/ToolBarItemsView';
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import EDate from "qlch_control/EDate";
import Button from '@library-src/models/qlch_control/qlch_button/Button';
import EButton from "qlch_control/EButton";
import TextBox from '@library-src/models/qlch_control/qlch_text_box/TextBox';
import ETextBox from "qlch_control/ETextBox";
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import ENumber from "qlch_control/ENumber";
import Log from '@library-src/utilities/Log';
import Bill from '@store-src/models/bill-main/Bill';
import CashReceipt from '@store-src/models/cash-receipt/CashReceipt';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Outward from '@store-src/models/outward/Outward';
import CashPayment from '@store-src/models/cash-payment/CashPayment';
import PopupLibrary from '@library-src/utilities/commons/PopupLibrary';
import NotificationPopupViewModel from '@library-src/models/qlch_notification/NotificationPopupViewModel';
export default {

  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
    ECombobox,
    EDate,
    ETextBox,
    ENumber,
    EButton
  },

  data() {
    const TotalSales: Ref<number> = ref(0);
    const TotalProfit: Ref<number> = ref(0);
    const TotalOtherRevenue: Ref<number> = ref(0);
    const TotalOtherCosts: Ref<number> = ref(0);
    const TotalRevenue: Ref<number> = ref(0);
    const TotalExpense: Ref<number> = ref(0);
    const TotalCostPrice: Ref<number> = ref(0);
    const lstBill: Ref<Array<Bill>> = ref(new Array<Bill>());
    const itemBill: Ref<Bill> = ref(new Bill());
    // const lstCashReceipt: Ref<Array<CashReceipt>> = ref(new Array<CashReceipt>()); // Thu tiền
    const lstOutward: Ref<Array<Outward>> = ref(new Array<Outward>());
    const lstCashPayment: Ref<Array<CashPayment>> = ref(new Array<CashPayment>());

    return {
      TotalSales,
      lstBill,
      itemBill,
      // lstCashReceipt,
      TotalOtherRevenue,
      TotalRevenue,
      lstOutward,
      TotalCostPrice,
      lstCashPayment,
      TotalOtherCosts,
      TotalExpense,
      TotalProfit

    }
  },

  setup() {
    const thisData: Ref<ProfitListDictionary> = ref(new ProfitListDictionary());
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
      me.lstBill = LocalStorageLibrary.getByKey<Array<Bill>>("itemBill") ?? new Array<Bill>();
      me.lstOutward = LocalStorageLibrary.getByKey<Array<Outward>>("outwardItem") ?? new Array<Outward>();
      me.lstCashPayment = LocalStorageLibrary.getByKey<Array<CashPayment>>("cashPayment") ?? new Array<CashPayment>();
      const lstCashReceipt = LocalStorageLibrary.getByKey<Array<CashReceipt>>("cashReceipt") ?? new Array<CashReceipt>();
      for (let index = 0; index < me.lstBill.length; index++) {
        const element = me.lstBill[index];
        if (element) {
          me.TotalSales = me.lstBill.map(element => element.collectedMoney ?? 0).reduce((acc, val) => acc + val, 0);;
        }
      }
      for (let index = 0; index < lstCashReceipt.length; index++) {
        const element = lstCashReceipt[index];
        if (element) {
          me.TotalOtherRevenue += element.TotalMoneyCashReceipt || 0;
        }
      }
      for (let index = 0; index < me.lstOutward.length; index++) {
        const element = me.lstOutward[index];
        if (element) {
          me.TotalCostPrice += element.TotalMoneyOutward || 0;
        }
      }
      for (let index = 0; index < me.lstCashPayment.length; index++) {
        const element = me.lstCashPayment[index];
        if (element) {
          me.TotalOtherCosts += element.TotalCashPayment || 0;
        }
      }
      me.TotalRevenue = me.TotalSales + me.TotalOtherRevenue;
      me.TotalExpense = me.TotalCostPrice + me.TotalOtherCosts;
      me.TotalProfit = me.TotalRevenue - me.TotalExpense;

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
      return Array()
    },

    /**
     * Load dữ liệu master lên grid
     * @param param 
     */
    loadMasterData(param: ParamPaging) {
      console.log("Dev: Override function loadMasterData with param: " + JSON.stringify(param));
      return [];
    },
    GetDataProfit() {
      try {
        const me = this;
        me.cbbSales.value = 1;
        me.lstBill = LocalStorageLibrary.getByKey<Array<Bill>>("itemBill") ?? new Array<Bill>();
        me.lstOutward = LocalStorageLibrary.getByKey<Array<Outward>>("outwardItem") ?? new Array<Outward>();
        me.lstCashPayment = LocalStorageLibrary.getByKey<Array<CashPayment>>("cashPayment") ?? new Array<CashPayment>();
        const lstCashReceipt = LocalStorageLibrary.getByKey<Array<CashReceipt>>("cashReceipt") ?? new Array<CashReceipt>();
        for (let index = 0; index < me.lstBill.length; index++) {
          const element = me.lstBill[index];
          if (element) {
            me.TotalSales = me.lstBill.map(element => element.collectedMoney ?? 0).reduce((acc, val) => acc + val, 0);;
          }
        }
        for (let index = 0; index < lstCashReceipt.length; index++) {
          const element = lstCashReceipt[index];
          if (element) {
            me.TotalOtherRevenue = lstCashReceipt.map(element => element.TotalMoneyCashReceipt ?? 0).reduce((acc, val) => acc + val, 0);;
          }
        }
        for (let index = 0; index < me.lstOutward.length; index++) {
          const element = me.lstOutward[index];
          if (element) {
            me.TotalCostPrice = me.lstOutward.map(element => element.TotalMoneyOutward ?? 0).reduce((acc, val) => acc + val, 0);;
          }
        }
        for (let index = 0; index < me.lstCashPayment.length; index++) {
          const element = me.lstCashPayment[index];
          if (element) {
            me.TotalOtherCosts = me.lstCashPayment.map(element => element.TotalCashPayment ?? 0).reduce((acc, val) => acc + val, 0);;
          }
        }
        me.TotalRevenue = me.TotalSales + me.TotalOtherRevenue;
        me.TotalExpense = me.TotalCostPrice + me.TotalOtherCosts;
        me.TotalProfit = me.TotalRevenue - me.TotalExpense;

      } catch (error) {
        Log.ErrorLog(error as Error);
      }
    },

    async showInformationPending() {
      const infoNotification = new NotificationPopupViewModel({
        icon: "info",
        message: "Yêu cầu đang phát triển. Vui lòng thử lại sau!",
        toolBarItems: Array(
          new ToolBarItemsView({
            name: "btnOK",
            control: new Button({
              fieldText: "Đồng ý"
            })
          })
        )
      })

      const component = (await import(`qlch_control/ENotification`)).default;
      if (component && component.methods) {
        component.methods["onSelectAction"] = (item: ToolBarItemsView) => {
          Log.InfoLog(JSON.stringify(item));
        };
      };
      if (component) {
        PopupLibrary.createPopup(component, { "propView": infoNotification, "styleFrom": "min-width: 400px" });
      };
    },
    onClickUpdate() {
      try {
        const me = this;
        me.showInformationPending();
      } catch (error) {
        Log.ErrorLog(error as Error)
      }
    },
    formatCurrency(value: any) {
      // Định dạng giá trị tiền tệ
      const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND', // Điều này có thể được thay đổi thành đơn vị tiền tệ của bạn
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
      const currencySymbol = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
      }).formatToParts(1).find(part => part.type === 'currency')?.value;
      if (currencySymbol) {
        return formattedValue.replace(new RegExp(currencySymbol, 'g'), '').trim();
      }
      return formattedValue.trim();
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
      const frmDetail = (await import(`../profit-detail/ProfitDetail.vue`)).default;
      return frmDetail;
    },
    buildToolBarItems(): Array<ToolBarItemsView> {

      return [];

    },
  }

}
</script>
