<template src="./RevenueExpenditureListDictionary.html"></template>
<style lang="scss" scoped src="./RevenueExpenditureListDictionary.scss"></style>
<script lang="ts">
import RevenueExpenditureListDictionary from './RevenueExpenditureListDictionary';
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
import ToolBarItemsView from '@library-src/models/qlch_base/tool_bar_items_view/ToolBarItemsView';
import Revenue from '@store-src/models/revenue/Revenue';
// import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';

export default {

  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
    ECombobox,
    EDate,
    EButton,
  },
  data() {
    const lstRevenue: Ref<Array<Revenue>> = ref(new Array<Revenue>());
    return {
      lstRevenue
    }
  },
  setup() {
    const thisData: Ref<RevenueExpenditureListDictionary> = ref(new RevenueExpenditureListDictionary());
    const cbbRevenueExpenditure: Ref<Combobox> = ref(new Combobox({
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
      cbbRevenueExpenditure,
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
      me.cbbRevenueExpenditure.value = 1;

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
          fieldText: "Ngày chứng từ",
          dataIndex: "DateRevenueExpenditure",
          width: 120,
        }),
        new Column({
          fieldText: "Số chứng từ",
          dataIndex: "CodeRevenueExpenditure",
          width: 260
        }),
        new Column({
          fieldText: "Loại chứng từ",
          dataIndex: "StyleRevenueExpenditure",
          width: 260
        }),
        new Column({
          fieldText: "Tiền thu",
          dataIndex: "TakeRevenueExpenditure",
          width: 260
        }),
        new Column({
          fieldText: "Tiền chi",
          dataIndex: "SpendRevenueExpenditure",
          minWidth: 260,
          flex: 1
        }),
        new Column({
          fieldText: "Demo Column 6 ( Số dư cuối kỳ)",
          dataIndex: "Column6",
          width: 160
        }),
        new Column({
          fieldText: "Nhân viên thu chi",
          dataIndex: "PersonCollectRevenue",
          width: 160
        }),
        new Column({
          fieldText: "Mã đối tượng",
          dataIndex: "CodeObjectRevenue",
          width: 160
        }),
        new Column({
          fieldText: "Tên đối tượng",
          dataIndex: "NameObjectRevenue",
          width: 160
        }),
        new Column({
          fieldText: "Diễn giải",
          dataIndex: "ExplainRevenueExpenditure",
          width: 160
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
        {
          DateRevenueExpenditure: "31/12/2023",
          CodeRevenueExpenditure: "HHP-001",
          StyleRevenueExpenditure: "Phiếu thu tiền mặt",
          TakeRevenueExpenditure: "120000",
          SpendRevenueExpenditure: "0",
          Column6: "0",
          PersonCollectRevenue: "Tnn",
          CodeObjectRevenue: "MISA",
          NameObjectRevenue: "Công Ty MISA",
          ExplainRevenueExpenditure: "Thu tiền hàng hóa"
        }
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
      const frmDetail = (await import(`../revenue-expenditure-detail/RevenueExpenditureDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
