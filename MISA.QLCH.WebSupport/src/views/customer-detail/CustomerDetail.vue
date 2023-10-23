<template src="./CustomerDetail.html"></template>
<style lang="scss" scoped src="./CustomerDetail.scss"></style>
<script lang="ts">
import CustomerDetail from './CustomerDetail';
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
    const thisData: Ref<CustomerDetail> = ref(new CustomerDetail());
    return { thisData };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm Mới Khách Hàng";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtColumn1": new TextBox({
          fieldText: "Mã khách hàng",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column1"
        }),
        "txtColumn2": new TextBox({
          fieldText: "Tên khách hàng",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column2"
        }),
        "txtColumn3": new TextBox({
          fieldText: "Số điện thoại",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column3"
        }),
        "txtColumn4": new TextBox({
          fieldText: "Email",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column4"
        }),
        "txtColumn5": new TextBox({
          fieldText: "Địa chỉ",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column5"
        }),
        "txtColumn6": new TextBox({
          fieldText: "Ngày sinh",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column6"
        }),
        "txtColumn7": new Combobox({
          fieldText: "Nhóm khách hàng",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column7",
          data: [
            {

              value: 1,
              display: "G1"
            },
            {
              value: 2,
              display: "G2"
            },
            {
              value: 3,
              display: "G3"
            },

          ]
        }),
        "txtColumn8": new Combobox({
          fieldText: "Mã nhân viên phụ trách",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column8",
          data: [
            {

              value: 1,
              display: "NV001"
            },
            {
              value: 2,
              display: "NV002"
            },
            {
              value: 3,
              display: "NV003"
            },

          ]
        }),
        "txtColumn9": new TextBox({
          fieldText: "Tên nhân viên phụ trách",
          require: false,
          readOnly: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column9"
        }),
        "txtColumn10": new TextBox({
          fieldText: " Ghi chú",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column10"
        }),
        "txtColumn11": new Combobox({
          fieldText: "Giới tính",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column10",
          data: [
            {

              value: 1,
              display: "Nam"
            },
            {
              value: 2,
              display: "Nữ"
            },
            {
              value: 3,
              display: "Không xác định"
            },

          ]
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
