<template src="./InventoryListDictionary.html"></template>
<style lang="scss" scoped src="./InventoryListDictionary.scss"></style>
<script lang="ts">
import InventoryListDictionary from './InventoryListDictionary';
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
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Inventory from '@store-src/models/inventory/Inventory';

export default {

  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
    ECombobox,
    EDate,
    EButton
  },
  setup() {
    const thisData: Ref<InventoryListDictionary> = ref(new InventoryListDictionary());
    const cbbInventory: Ref<Combobox> = ref(new Combobox({
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
      cbbInventory,
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

      me.cbbInventory.value = 1;


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
          fieldText: "Ngày",
          dataIndex: "DateInventory",
          width: 120,
        }),
        new Column({
          fieldText: "Số phiếu kiểm kê",
          dataIndex: "VotesInventory",
          width: 260
        }),
        new Column({
          fieldText: "Kho kiểm kê",
          dataIndex: "WarehouseInventory",
          width: 260
        }),
        new Column({
          fieldText: "Diễn giải",
          dataIndex: "ExplantInventory",
          width: 260
        }),
        new Column({
          fieldText: "Trạng thái",
          dataIndex: "MainStatusInventory",
          minWidth: 260,
          flex: 1
        })
      )
    },
    /**
     * Load dữ liệu master lên grid
     * @param param 
     */
    loadMasterData(param: ParamPaging) {
      console.log("Dev: Override function loadMasterData with param: " + JSON.stringify(param));
      if (!LocalStorageLibrary.getByKey<Array<Inventory>>("inventoryList")) {
        return new Array<Inventory>;
      }
      else {
        return LocalStorageLibrary.getByKey<Array<Inventory>>("inventoryList");
      }
    },
    /**
     * Thực hiện chức năng xóa trên Toolbar
     * @param listSelectedRecord 
     */
    afterDelete(listMasterData: Array<Record<string, any>>) {
      LocalStorageLibrary.setByKey("inventoryList", listMasterData);
    },

    /**
     * Set PrimaryKey cho object master
     */
    getPrimaryKeyMaster() {
      console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
      return "InventoryId";
    },

    /**
     * Khai báo import component detail
     * Override lại function after close form
     */
    async createComponent() {
      console.log("DEV: Override Function createComponent Vue component Detail");
      const frmDetail = (await import(`../inventory-detail/InventoryDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
