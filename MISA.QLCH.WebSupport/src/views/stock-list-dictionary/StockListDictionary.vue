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
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Stock from '@store-src/models/stock/Stock';
import Product from '@store-src/models/product/Product';
import InwardDetail from '@store-src/models/inward/InwardDetail';
import OutwardDetail from '@store-src/models/outward/OutwardDetail';
export default {

  extends: BaseDictionaryListController,
  components: {
    BaseDictionaryListView,
    ECombobox,
    EDate,
    EButton
  },
  data() {
    const lstStock: Ref<Array<Stock>> = ref(new Array<Stock>());
    return {
      lstStock
    }
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
      me.lstStock = [];
      let itemValue = new Stock();
      const listProduct = LocalStorageLibrary.getByKey<Array<Product>>("Product");
      const listInward = LocalStorageLibrary.getByKey<Array<InwardDetail>>("inwardDetail");
      const listOutward = LocalStorageLibrary.getByKey<Array<OutwardDetail>>("outwardDetail");
      if (listProduct && listProduct.length > 0) {
        listProduct.forEach(product => {
          itemValue = new Stock();
          itemValue.CodeProductStock = product.CodeProductList;
          itemValue.NameProductStock = product.NameProductList;
          itemValue.UnitProductStock = product.UnitProductList;
          itemValue.GroupProductStock = product.GroupProductList;
          itemValue.PriceProductStock = product.PriceProductList;


          //Tính tổng nhập kho
          itemValue.TotalInward = 0;
          itemValue.TotalOutward = 0;
          if (listInward && listInward.length > 0) {
            for (let index = 0; index < listInward.length; index++) {
              const element = listInward[index];
              if (element && element.CodeProductInward == itemValue.CodeProductStock) {
                itemValue.TotalInward += element.NumberProductInward ?? 0;
              }
            }

          }
          if (listOutward && listOutward.length > 0) {
            for (let index = 0; index < listOutward.length; index++) {
              const element = listOutward[index];
              if (element && element.CodeProductOutWard == itemValue.CodeProductStock) {
                itemValue.TotalOutward += element.NumberProductOutWard ?? 0;
              }
            }

          }
          itemValue.InventoryNumberStock = itemValue.TotalInward - itemValue.TotalOutward


          //end TÍnh tổng nhập kho
          me.lstStock.push(itemValue);

        });
      }
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
      return [];
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
    GetDataStock() {
      try {
        const me = this;
        me.lstStock = [];
        let itemValue = new Stock();
        const listInward = LocalStorageLibrary.getByKey<Array<InwardDetail>>("inwardDetail");
        const listOutward = LocalStorageLibrary.getByKey<Array<OutwardDetail>>("outwardDetail");
        const listProduct = LocalStorageLibrary.getByKey<Array<Product>>("Product");
        if (listProduct && listProduct.length > 0) {
          listProduct.forEach(product => {
            itemValue = new Stock();
            itemValue.CodeProductStock = product.CodeProductList;
            itemValue.NameProductStock = product.NameProductList;
            itemValue.UnitProductStock = product.UnitProductList;
            itemValue.GroupProductStock = product.GroupProductList;
            itemValue.PriceProductStock = product.PriceProductList;

            itemValue.TotalInward = 0;
            itemValue.TotalOutward = 0;
            if (listInward && listInward.length > 0) {
              for (let index = 0; index < listInward.length; index++) {
                const element = listInward[index];
                if (element && element.CodeProductInward == itemValue.CodeProductStock) {
                  itemValue.TotalInward += element.NumberProductInward ?? 0;
                }
              }

            }
            if (listOutward && listOutward.length > 0) {
              for (let index = 0; index < listOutward.length; index++) {
                const element = listOutward[index];
                if (element && element.CodeProductOutWard == itemValue.CodeProductStock) {
                  itemValue.TotalOutward += element.NumberProductOutWard ?? 0;
                }
              }

            }
            itemValue.InventoryNumberStock = itemValue.TotalInward - itemValue.TotalOutward

            me.lstStock.push(itemValue);

          });
        }
      } catch (error) {
        Log.ErrorLog(error as Error);
      }
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
