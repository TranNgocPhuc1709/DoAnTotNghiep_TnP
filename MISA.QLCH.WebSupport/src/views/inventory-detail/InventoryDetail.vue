<template src="./InventoryDetail.html"></template>
<style lang="scss" scoped src="./InventoryDetail.scss"></style>
<script lang="ts">
import InventoryDetail from './InventoryDetail';
import { Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import EDate from "qlch_control/EDate";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";

export default {

  extends: BaseDictionaryDetailController,

  components: {
    BaseDictionaryDetailView,
    ETextBox,
    EDate,
    ECombobox
  },

  setup() {
    const thisData: Ref<InventoryDetail> = ref(new InventoryDetail());
    return { thisData };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm mới phiếu kiểm kê kho";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtColumn1": new DateModel({
          fieldText: "Ngày kiểm kê",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column1"
        }),
        "txtColumn2": new TextBox({
          fieldText: "Số phiếu kiểm kê",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column2"
        }),
        "txtColumn3": new Combobox({
          fieldText: "Kho kiểm kê",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: 1,
              display: "Kho 1"
            },
            {
              value: 2,
              display: "Kho 2"
            }
          ],
          bindingIndex: "Column3"
        }),
        "txtColumn4": new TextBox({
          fieldText: "Diễn giải",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column4"
        }),
        "txtColumn5": new TextBox({
          fieldText: "Trạng thái",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column5"
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
