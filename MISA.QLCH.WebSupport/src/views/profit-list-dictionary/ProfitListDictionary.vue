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
export default {

  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
  },
  setup() {
    const thisData: Ref<ProfitListDictionary> = ref(new ProfitListDictionary());
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
          fieldText: "Tháng",
          dataIndex: "MonthProfit",
          width: 200,
        }),
        new Column({
          fieldText: "Lợi nhuận (9) = (5) - (8)",
          dataIndex: "TotalProfit",
          width: 260,
          flex: 1
        }),
        new Column({
          fieldText: "Tổng doanh thu (5) = (3) + (4)",
          dataIndex: "TotalRevenue",
          width: 300
        }),
        new Column({
          fieldText: " Tổng doanh thu bán hàng (3) = (1) - (2)",
          dataIndex: "TotalRevenueProfit",
          width: 300
        }),
        new Column({
          fieldText: "Tiền Hàng(1)",
          dataIndex: "SalesProceedsProfit",
          width: 200,
        }),
        new Column({
          fieldText: "Khuyến mại(2)",
          dataIndex: "PromotionProfit",
          width: 260
        }),
        new Column({
          fieldText: " Thu khác (4)",
          dataIndex: "CollectOtherMoney",
          width: 300
        }),
        new Column({
          fieldText: "Tổng chi phí (8) = (6) + (7)",
          dataIndex: "TotalExportProfit",
          width: 200
        }),
        new Column({
          fieldText: "Chi phí xuất kho bán hàng (6)",
          dataIndex: "ExportProductProfit",
          width: 260
        }),
        new Column({
          fieldText: "Chi phí khác (7)",
          dataIndex: "ExportOtherProfit",
          minWidth: 200,

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
          MonthProfit: "Tháng 1",
          TotalProfit: "10000",
          TotalRevenue: "80000",
          TotalRevenueProfit: "1000000",
          SalesProceedsProfit: "10000",
          PromotionProfit: "90000",
          CollectOtherMoney: "80000",
          TotalExportProfit: "0",
          ExportProductProfit: "100",
          ExportOtherProfit: "200"



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
