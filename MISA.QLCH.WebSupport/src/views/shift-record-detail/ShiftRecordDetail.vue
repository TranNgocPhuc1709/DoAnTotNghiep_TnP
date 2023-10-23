<template src="./ShiftRecordDetail.html"></template>
<style lang="scss" scoped src="./ShiftRecordDetail.scss"></style>
<script lang="ts">
import ShiftRecordDetail from './ShiftRecordDetail';
import { Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";

export default {

  extends: BaseDictionaryDetailController,

  components: {
    BaseDictionaryDetailView,
    ETextBox,
    ECombobox
  },

  setup() {
    const thisData: Ref<ShiftRecordDetail> = ref(new ShiftRecordDetail());
    return { thisData };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm mới ca làm việc";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtColumn1": new TextBox({
          fieldText: "Tên ca",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column1"
        }),
        "txtColumn2": new Combobox({
          fieldText: "Giờ bắt đầu",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column2",
          data: [
            {
              value: 1,
              display: "07:00"
            },
            {
              value: 2,
              display: "12:00"
            },
            {
              value: 3,
              display: "18:00"
            },
          ]
        }),
        "txtColumn3": new Combobox({
          fieldText: "Giờ kết thúc",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column3",
          data: [
            {
              value: 1,
              display: "12:00"
            },
            {
              value: 2,
              display: "18:00"
            },
            {
              value: 3,
              display: "22:00"
            },
          ]
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
