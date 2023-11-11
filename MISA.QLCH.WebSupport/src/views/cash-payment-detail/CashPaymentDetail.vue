<template src="./CashPaymentDetail.html"></template>
<style lang="scss" scoped src="./CashPaymentDetail.scss"></style>
<script lang="ts">
import CashPaymentDetail from './CashPaymentDetail';
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

export default {

  extends: BaseDictionaryDetailController,

  components: {
    BaseDictionaryDetailView,
    ETextBox,
    EDate,
    ECombobox,
    ENumber,
    ECheckbox
  },

  setup() {
    const thisData: Ref<CashPaymentDetail> = ref(new CashPaymentDetail());

    return {
      thisData,

    };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Phiếu chi tiền";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtDateCashPayment": new DateModel({
          fieldText: "Ngày chi",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DateCashPayment"
        }),
        "txtCodeCashPayment": new TextBox({
          fieldText: "Số phiếu chi",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "CodeCashPayment"
        }),
        "txtTotalCashPayment": new NumberModel({
          fieldText: "Tổng tiền",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 2
          }),
          bindingIndex: "TotalCashPayment"
        }),
        "txtNameObjectCashPayment": new Combobox({
          fieldText: "Tên đối tượng",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "Khách hàng",
              display: "Khách hàng"
            }
          ],
          bindingIndex: "NameObjectCashPayment"
        }),
        "txtReasonCashPayment": new TextBox({
          fieldText: "Lý do chi",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ReasonCashPayment"
        }),

        //6
        "txtObjectCashPayment": new Combobox({
          fieldText: "Đối tượng nhận",
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
          bindingIndex: "ObjectCashPayment"
        }),
        "txtReceiverCashPayment": new TextBox({
          fieldText: "Người nhận",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ReceiverCashPayment"
        }),
        "txtAddressCashPayment": new TextBox({
          fieldText: "Địa chỉ",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "AddressCashPayment"
        }),
        "txtStaffCashPayment": new Combobox({
          fieldText: "Nhân viên chi",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "PNJ",
              display: "PNJ"
            }
          ],
          bindingIndex: "StaffCashPayment"
        }),
        "txtNameStaffCashPayment": new TextBox({
          fieldText: "Tên nhân viên",
          readOnly: true,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameStaffCashPayment"
        }),
        "txtIncludedCashPayment": new Checkbox({
          fieldText: "Tính vào chi phí",
          bindingIndex: "IncludedCashPayment",
        }),
        // "txtColumn12": new TextBox({
        //   fieldText: "Tổng tiền",
        //   readOnly: true,
        //   require: false,
        //   maxLength: 255,
        //   labelWidth: labelWidth,
        //   bindingIndex: "Column12",
        // }),



        //Table Grid

        "txtExplainCashPayment": new TextBox({
          fieldText: "",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          classType: "tertiary",
          bindingIndex: "ExplainCashPayment"
        }),
        "txtMoneyCashPayment": new NumberModel({
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
          bindingIndex: "MoneyCashPayment"
        }),
      }
    },

    /**
    * Sau khi đóng form xong thì xử lý thêm gì ở master thì Override function này ở master
    */
    afterCloseForm() { },
  }

}
</script>
