<template src="./PurchaseListDictionary.html"></template>
<style lang="scss" scoped src="./PurchaseListDictionary.scss"></style>
<script lang="ts">
import PurchaseListDictionary from './PurchaseListDictionary';
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


export default {

  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
    ECombobox,
    EDate,
    EButton,
    // EDropDownMenu
  },
  setup() {
    const thisData: Ref<PurchaseListDictionary> = ref(new PurchaseListDictionary());
    const cbbPurchase: Ref<Combobox> = ref(new Combobox({
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
      cbbPurchase,
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
      me.cbbPurchase.value = 1;

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
          fieldText: "Mã Hàng Hóa",
          dataIndex: "Column1",
          width: 120,
        }),
        new Column({
          fieldText: "Tên Hàng Hóa",
          dataIndex: "Column2",
          width: 260
        }),
        new Column({
          fieldText: "Đơn Vị Tính",
          dataIndex: "Column3",
          width: 260
        }),
        new Column({
          fieldText: "Nhóm Hàng Hóa",
          dataIndex: "Column4",
          width: 260
        }),
        new Column({
          fieldText: "SL Mua (1)",
          dataIndex: "Column5",
          minWidth: 160,
          flex: 1
        }),
        new Column({
          fieldText: "Giá (2)",
          dataIndex: "Column6",
          width: 160
        }),
        new Column({
          fieldText: "Giá trị mua (3)",
          dataIndex: "Column7",
          minWidth: 160,
        }),
        new Column({
          fieldText: "SL Trả lại (4)",
          dataIndex: "Column8",
          minWidth: 160,
        }),
        new Column({
          fieldText: "Giá trị trả lại hàng (5)",
          dataIndex: "Column9",
          minWidth: 160,
        }),
        new Column({
          fieldText: "Tổng giá trị mua hàng (6) = (3) - (5)",
          dataIndex: "Column10",
          minWidth: 260,
          flex: 1
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
          Column1: "HH001",
          Column2: "Quần Đùi Nam",
          Column3: "Chiếc",
          Column4: "Quần Áo Thời Trang Nam",
          Column5: "100",
          Column6: "500000",
          Column7: "50000000",
          Column8: "0",
          Column9: "0",
          Column10: "50000000",
        },
        {
          Column1: "HH00=2",
          Column2: "Quần Dài Nam",
          Column3: "Chiếc",
          Column4: "Quần Áo Thời Trang Nam",
          Column5: "200",
          Column6: "1000000",
          Column7: "100000000",
          Column8: "0",
          Column9: "0",
          Column10: "100000000",
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
    buildToolBarItems(): Array<ToolBarItemsView> {

      return [];

    },

    /**
     * Khai báo import component detail
     * Override lại function after close form
     */
    async createComponent() {
      console.log("DEV: Override Function createComponent Vue component Detail");
      const frmDetail = (await import(`../purchase-detail/PurchaseDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
