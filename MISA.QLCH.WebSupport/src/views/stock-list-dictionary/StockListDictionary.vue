<template src="./StockListDictionary.html"></template>
<style lang="scss" scoped src="./StockListDictionary.scss"></style>
<script lang="ts">
import StockListDictionary from './StockListDictionary';
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
// import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
export default {

  extends: BaseDictionaryListController,
  components: {
    BaseDictionaryListView,
    ECombobox,
    EDate,
    EButton
  },
  data() {
    // const lstStock = LocalStorageLibrary.getByKey<Array<Stock>>("itemBill") ?? new Array<Stock>();
  },
  setup() {
    const thisData: Ref<StockListDictionary> = ref(new StockListDictionary());
    const cbbStock: Ref<Combobox> = ref(new Combobox({
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
    return {
      thisData,
      cbbStock,
      dtBeginRequire,
      dtEndRequire,
      btnGetData,
      btnExportData,
      btnPrintData

    };
  },
  created() {
    try {
      const me = this;
      me.cbbStock.value = 1;

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
      return Array();
    },

    /**
     * Load dữ liệu master lên grid
     * @param param 
     */
    loadMasterData(param: ParamPaging) {
      console.log("Dev: Override function loadMasterData with param: " + JSON.stringify(param));
      return [
        {
          CodeStock: "HH0001",
          NameStock: "Quần Áo Nam",
          UnitStock: "Chiếc",
          GroupStock: "Quần Áo",
          PriceStock: "100000",
          InventoryStock: "10"
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

    // Hide-ToolBar-Footer

    buildToolBarItems(): Array<ToolBarItemsView> {

      return [];

    },

    /**
     * Khai báo import component detail
     * Override lại function after close form
     */
    async createComponent() {
      console.log("DEV: Override Function createComponent Vue component Detail");
      const frmDetail = (await import(`../stock-detail/StockDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
