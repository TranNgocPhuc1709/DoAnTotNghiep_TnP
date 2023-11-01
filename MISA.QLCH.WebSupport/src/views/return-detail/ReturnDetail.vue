<template src="./ReturnDetail.html"></template>
<style lang="scss" scoped src="./ReturnDetail.scss"></style>
<script lang="ts">
import ReturnDetail from './ReturnDetail';
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

export default {

  extends: BaseDictionaryDetailController,

  components: {
    BaseDictionaryDetailView,
    ETextBox,
    EDate,
    ECombobox
  },

  setup() {
    const thisData: Ref<ReturnDetail> = ref(new ReturnDetail());
    return { thisData };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Phiếu trả lại hàng mua";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtColumn1": new DateModel({
          fieldText: "Ngày trả hàng",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column1"
        }),
        "txtColumn2": new TextBox({
          fieldText: "Số phiếu xuất",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column2"
        }),
        "txtColumn3": new Combobox({
          fieldText: "Nhà cung cấp",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column3"
        }),
        "txtColumn4": new NumberModel({
          fieldText: "Thành tiền",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 2
          }),
          bindingIndex: "Column4"
        }),
        "txtColumn5": new TextBox({
          fieldText: "Diễn giải",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column5"
        }),
        "txtColumn6": new TextBox({
          fieldText: "Tên nhà cung cấp",
          readOnly: true,
          require: false,
          maxLength: 255,
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
        })
      }
    },

    /**
    * Sau khi đóng form xong thì xử lý thêm gì ở master thì Override function này ở master
    */
    afterCloseForm() { },
  }

}
</script>
