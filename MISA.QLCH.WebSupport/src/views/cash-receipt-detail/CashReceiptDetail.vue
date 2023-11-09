<template src="./CashReceiptDetail.html"></template>
<style lang="scss" scoped src="./CashReceiptDetail.scss"></style>
<script lang="ts">
import CashReceiptDetail from './CashReceiptDetail';
import { Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import EDate from "qlch_control/EDate";
import ECombobox from "qlch_control/ECombobox";
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import ENumber from "qlch_control/ENumber";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import Checkbox from '@library-src/models/qlch_control/qlch_checkbox/Checkbox';
import ECheckbox from "qlch_control/ECheckbox";
import EGrid from "qlch_control/EGrid";
import Grid from '@library-src/models/qlch_control/qlch_grid/Grid';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import Log from '@library-src/utilities/Log';
import Common from "@library-src/utilities/commons/Function";

export default {

  extends: BaseDictionaryDetailController,

  components: {
    BaseDictionaryDetailView,
    ETextBox,
    EDate,
    ECombobox,
    EGrid,
    ENumber,
    ECheckbox

  },

  setup() {
    const thisData: Ref<CashReceiptDetail> = ref(new CashReceiptDetail());
    const columnCashReceipt: Array<Column> = Array(
      new Column({
        fieldText: "Diễn giải",
        width: 125,
        dataIndex: "info",
        flex: 1,
        isFilter: true
      }),
      new Column({
        fieldText: "Số tiền",
        dataIndex: "NumberMoney",
        isFilter: true,
        width: 200
      })


    );
    const dataGridCashReceipt: Array<Record<string, any>> = new Array(
      {
        "info": "Thu tiền từ khách hàng",
        "NumberMoney": "100000",
      },
      {
        "info": "Thu tiền từ khách hàng",
        "NumberMoney": "100000",
      },
      {
        "info": "Thu tiền từ khách hàng",
        "NumberMoney": "100000",
      },



    )
    const tblCashReceipt: Ref<Grid> = ref(new Grid({
      columns: columnCashReceipt,
      data: dataGridCashReceipt,
      isNotShowFooter: true,
      isNotShowCheckbox: true,
      primaryKey: "EmployeeCode"

    }));
    return {
      thisData,
      tblCashReceipt
    };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm mới phiếu thu";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtDateCashReceipt": new DateModel({
          fieldText: "Ngày thu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DateCashReceipt"
        }),
        "txtCodeCashReceipt": new TextBox({
          fieldText: "Số phiếu thu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "CodeCashReceipt"
        }),
        "txtTotalMoneyCashReceipt": new NumberModel({
          fieldText: "Tổng tiền",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 2
          }),
          bindingIndex: "TotalMoneyCashReceipt"
        }),
        "txtNameObjectCashReceipt": new Combobox({
          fieldText: "Tên đối tượng",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameObjectCashReceipt"
        }),
        "txtExplantCashReceipt": new TextBox({
          fieldText: "Lý do thu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ExplantCashReceipt"
        }),
        "txtObjectCashReceipt": new Combobox({
          fieldText: "Đối tượng nộp",
          require: false,
          maxLength: 255,
          data: [
            {
              value: 1,
              display: "Nhà cung cấp"
            },
            {
              value: 2,
              display: "khách hàng"
            },
            {
              value: 3,
              display: "Nhân viên"
            }
          ],
          labelWidth: labelWidth,
          bindingIndex: "ObjectCashReceipt"
        }),
        "txtPayerCashReceipt": new TextBox({
          fieldText: "Người nộp",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "PayerCashReceipt"
        }),
        "txtAddressPayerCashReceipt": new TextBox({
          fieldText: "Địa chỉ",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "AddressPayerCashReceipt"
        }),
        "txtRevenueOfficerCashReceipt": new Combobox({
          fieldText: "Nhân viên thu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "RevenueOfficerCashReceipt"
        }),
        "txtNameRevenueOfficerCashReceipt": new TextBox({
          fieldText: "Tên nhân viên",
          readOnly: true,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameRevenueOfficerCashReceipt"
        }),
        "txtIncludedCashReceipt": new Checkbox({
          fieldText: "Tính vào doanh thu",
          bindingIndex: "IncludedCashReceipt ",
        }),


        //Grid-Table

        //Table Grid

        "txtExplainCashReceipt": new TextBox({
          fieldText: "",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          classType: "tertiary",
          bindingIndex: "ExplainCashReceipt"
        }),
        "txtMoneyCashDetail": new NumberModel({
          fieldText: "",
          require: false,
          readOnly: false,
          maxLength: 255,
          classType: "secondary",
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 3
          }),
          bindingIndex: "MoneyCashDetail"
        }),

      }
    },
    async onLoadData(parameter: any) {
      const me = this;
      me.tblCashReceipt.isLoadingData = true;
      me.tblCashReceipt.data = new Array(

        // Khai báo dữ liệu biding
      );
      await Common.getTimeOut(3000, "");
      me.tblCashReceipt.isLoadingData = false;
      Log.InfoLog(parameter);

    },
    /**
    * Sau khi đóng form xong thì xử lý thêm gì ở master thì Override function này ở master
    */
    afterCloseForm() { },
  }

}
</script>
