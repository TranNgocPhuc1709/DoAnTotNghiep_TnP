<template src="./ProductDetail.html"></template>
<style lang="scss" scoped src="./ProductDetail.scss"></style>
<script lang="ts">
import ProductDetail from './ProductDetail';
import { Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import ENumber from "qlch_control/ENumber";
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import Checkbox from '@library-src/models/qlch_control/qlch_checkbox/Checkbox';
import ECheckbox from "qlch_control/ECheckbox";
export default {

  extends: BaseDictionaryDetailController,

  components: {
    BaseDictionaryDetailView,
    ETextBox,
    ECombobox,
    ENumber,
    ECheckbox,
  },

  setup() {
    const thisData: Ref<ProductDetail> = ref(new ProductDetail());
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
      return "Thông Tin Sản Phẩm";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtColumn1": new TextBox({
          fieldText: "Mã Sản Phẩm",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column1"
        }),
        "txtColumn2": new TextBox({
          fieldText: "Tên Sản Phẩm",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column2"
        }),
        "txtColumn3": new Combobox({
          fieldText: "Nhóm Sản Phẩm",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column3",
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
        "txtColumn4": new Combobox({
          fieldText: "Đơn Vị Tính",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column4",
          data: [
            {
              value: 1,
              display: "Chiếc"
            },
            {
              value: 2,
              display: "Cái"
            },
            {
              value: 3,
              display: "Combo"
            },
          ]
        }),
        "txtColumn5": new NumberModel({
          fieldText: "Giá",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 4
          }),
          bindingIndex: "Column5"
        }),

        "txtColumn6": new Checkbox({
          fieldText: "Hiển thị trên trang bán hàng",
          bindingIndex: "Column6"
        }),
        "txtColumn7": new TextBox({
          fieldText: "Màu sắc",
          placeholder: "Xanh, Đỏ, Vàng,..",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column7"
        }),
        "txtColumn8": new TextBox({
          fieldText: "Size",
          placeholder: "S,M,L,XL,...",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column8"
        }),

      }
    },
    // Khởi tạo ảnh

    /**
    * Sau khi đóng form xong thì xử lý thêm gì ở master thì Override function này ở master
    */
    afterCloseForm() { },
  }

}
</script>
