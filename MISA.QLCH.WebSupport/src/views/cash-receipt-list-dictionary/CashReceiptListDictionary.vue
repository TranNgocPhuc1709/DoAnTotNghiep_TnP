<template src="./CashReceiptListDictionary.html"></template>
<style lang="scss" scoped src="./CashReceiptListDictionary.scss"></style>
<script lang="ts">
import CashReceiptListDictionary from './CashReceiptListDictionary';
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
    const thisData: Ref<CashReceiptListDictionary> = ref(new CashReceiptListDictionary());
    const cbbCashReceipt: Ref<Combobox> = ref(new Combobox({
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
      cbbCashReceipt,
      dtBeginRequire,
      dtEndRequire,
      btnGetData,
    };
  },
  created() {
    try {
      const me = this;
      me.cbbCashReceipt.value = 1;
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
          dataIndex: "Column1",
          width: 120,
        }),
        new Column({
          fieldText: "Số chứng từ",
          dataIndex: "Column2",
          width: 260
        }),
        new Column({
          fieldText: "Tổng tiền",
          dataIndex: "Column3",
          width: 260
        }),
        new Column({
          fieldText: "Đối tượng nộp tiền",
          dataIndex: "Column4",
          width: 260
        }),
        new Column({
          fieldText: "Lý do",
          dataIndex: "Column5",
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
      return [
        {
          Column1: "31/12/2023",
          Column2: "SH-00112",
          Column3: "150000",
          Column4: "Khách hàng",
          Column5: "Thanh toán hàng hóa",
        },
        {
          Column1: "10/12/2023",
          Column2: "SH-00145",
          Column3: "250000",
          Column4: "Đối tác vận chuyển hàng",
          Column5: "Thanh toán hàng hóa vận chuyển",
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
      const frmDetail = (await import(`../cash-receipt-detail/CashReceiptDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
