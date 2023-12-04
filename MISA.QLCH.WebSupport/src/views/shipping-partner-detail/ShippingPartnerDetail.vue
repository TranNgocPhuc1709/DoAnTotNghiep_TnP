<template src="./ShippingPartnerDetail.html"></template>
<style lang="scss" scoped src="./ShippingPartnerDetail.scss"></style>
<script lang="ts">
import ShippingPartnerDetail from './ShippingPartnerDetail';
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
    const thisData: Ref<ShippingPartnerDetail> = ref(new ShippingPartnerDetail());
    return { thisData };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm mới đơn vị vận chuyển";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 125;
      return {
        "txtColumn1": new TextBox({
          fieldText: "Mã DT Giao Hàng",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column1"
        }),
        "txtColumn2": new TextBox({
          fieldText: "Tên DT Giao Hàng",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column2"
        }),
        "txtColumn3": new TextBox({
          fieldText: "Số Điện Thoại",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column3"
        }),
        "txtColumn4": new TextBox({
          fieldText: "Địa Chỉ",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column4"
        }),
        "txtColumn5": new Combobox({
          fieldText: "Trạng Thái",
          require: false,
          data: [
            {
              value: "Đang hoạt động",
              display: "Đang hoạt động"
            },
            {
              value: "Ngừng hoạt động",
              display: "Ngừng hoạt động"
            }
          ],
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
