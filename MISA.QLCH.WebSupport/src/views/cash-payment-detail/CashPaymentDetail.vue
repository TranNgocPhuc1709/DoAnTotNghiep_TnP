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
    ECheckbox
  },

  setup() {
    const thisData: Ref<CashPaymentDetail> = ref(new CashPaymentDetail());
    return { thisData };
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
        "txtColumn1": new DateModel({
          fieldText: "Ngày chi",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column1"
        }),
        "txtColumn2": new TextBox({
          fieldText: "Số phiếu chi",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column2"
        }),
        "txtColumn3": new NumberModel({
          fieldText: "Tổng tiền",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 2
          }),
          bindingIndex: "Column3"
        }),
        "txtColumn4": new Combobox({
          fieldText: "Tên đối tượng",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column4"
        }),
        "txtColumn5": new TextBox({
          fieldText: "Lý do chi",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column5"
        }),
        "txtColumn6": new Combobox({
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
          bindingIndex: "Column6"
        }),
        "txtColumn7": new TextBox({
          fieldText: "Người nhận",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column7"
        }),
        "txtColumn8": new TextBox({
          fieldText: "Địa chỉ",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column8"
        }),
        "txtColumn9": new Combobox({
          fieldText: "Nhân viên chi",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column9"
        }),
        "txtColumn10": new TextBox({
          fieldText: "Tên nhân viên",
          readOnly: true,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column10"
        }),
        "txtColumn11": new Checkbox({
          fieldText: "Tính vào doanh thu",
          bindingIndex: "Column11",
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
