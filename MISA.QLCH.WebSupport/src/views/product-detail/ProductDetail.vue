<template src="./ProductDetail.html"></template>
<style lang="scss" scoped src="./ProductDetail.scss"></style>
<script lang="ts">
import ProductDetail from './ProductDetail';
import { Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";

export default {

  extends: BaseDictionaryDetailController,

  components: {
    BaseDictionaryDetailView,
    ETextBox
  },

  setup() {
    const thisData: Ref<ProductDetail> = ref(new ProductDetail());
    return { thisData };
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
        "txtColumn3": new TextBox({
          fieldText: "Nhóm Sản Phẩm",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column3"
        }),
        "txtColumn4": new TextBox({
          fieldText: "Đơn Vị Tính",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column4"
        }),
        "txtColumn5": new TextBox({
          fieldText: "Giá",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column5"
        }),
        "txtColumn6": new TextBox({
          fieldText: "Ghi Chú",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column6"
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
