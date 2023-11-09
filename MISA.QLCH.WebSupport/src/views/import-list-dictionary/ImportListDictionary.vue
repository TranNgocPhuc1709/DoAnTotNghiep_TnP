<template src="./ImportListDictionary.html"></template>
<style lang="scss" scoped src="./ImportListDictionary.scss"></style>
<script lang="ts">
import ImportListDictionary from './ImportListDictionary';
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

export default {

  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
    ECombobox,
    EDate,
    EButton
  },
  setup() {
    const thisData: Ref<ImportListDictionary> = ref(new ImportListDictionary());
    const cbbImport: Ref<Combobox> = ref(new Combobox({
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

    return {
      thisData,
      cbbImport,
      dtBeginRequire,
      dtEndRequire,
      btnGetData,
    };
  },
  created() {
    try {
      const me = this;

      me.cbbImport.value = 1;


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
        // new Column({
        //   fieldText: "Ngày nhập",
        //   dataIndex: "Column1",
        //   width: 120,
        // }),
        // new Column({
        //   fieldText: "Số phiếu nhập",
        //   dataIndex: "Column2",
        //   width: 260
        // }),
        // new Column({
        //   fieldText: "Nhà cung cấp",
        //   dataIndex: "Column3",
        //   width: 260
        // }),
        // new Column({
        //   fieldText: "Thành tiền",
        //   dataIndex: "Column4",
        //   width: 260
        // }),
        // new Column({
        //   fieldText: "Nhân viên mua hàng",
        //   dataIndex: "Column5",
        //   minWidth: 260,
        //   flex: 1
        // }),
        // new Column({
        //   fieldText: "Diễn giải",
        //   dataIndex: "Column6",
        //   width: 160
        // })
        new Column({
          fieldText: "Ngày nhập",
          dataIndex: "DateImport",
          width: 120,
        }),
        new Column({
          fieldText: "Số phiếu nhập",
          dataIndex: "ReceiptNumberImport",
          width: 260
        }),
        new Column({
          fieldText: "Nhà cung cấp",
          dataIndex: "SupplierImport",
          width: 260
        }),
        new Column({
          fieldText: "Thành tiền",
          dataIndex: "IntoMoneyImport",
          width: 260
        }),
        new Column({
          fieldText: "Nhân viên mua hàng",
          dataIndex: "StaffImport",
          minWidth: 260,
          flex: 1
        }),
        new Column({
          fieldText: "Diễn giải",
          dataIndex: "ExplainImport",
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
          DateImport: "21/10/2023",
          ReceiptNumberImport: "123",
          SupplierImport: "NCC123",
          IntoMoneyImport: "120000",
          StaffImport: "PNJ",
          ExplainImport: "Nhập Hàng"
        },

      ];
    },

    /**
     * Set PrimaryKey cho object master
     */
    getPrimaryKeyMaster() {
      console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
      return "DateImport";
    },

    /**
     * Khai báo import component detail
     * Override lại function after close form
     */
    async createComponent() {
      console.log("DEV: Override Function createComponent Vue component Detail");
      const frmDetail = (await import(`../import-detail/ImportDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
