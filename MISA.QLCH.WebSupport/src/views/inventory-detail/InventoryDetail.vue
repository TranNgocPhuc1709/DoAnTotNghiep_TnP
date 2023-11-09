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
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import ENumber from "qlch_control/ENumber";

export default {

  extends: BaseDictionaryDetailController,

  components: {
    BaseDictionaryDetailView,
    ETextBox,
    EDate,
    ENumber,
    ECombobox
  },

  setup() {
    const thisData: Ref<InventoryDetail> = ref(new InventoryDetail());
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
      return "Thêm mới phiếu kiểm kê kho";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtDateInventory": new DateModel({
          fieldText: "Ngày kiểm kê",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DateInventory"
        }),
        "txtVotesInventory": new TextBox({
          fieldText: "Số phiếu kiểm kê",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "VotesInventory"
        }),
        "txtWarehouseInventory": new Combobox({
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
          bindingIndex: "WarehouseInventory"
        }),
        "txtExplantInventory": new TextBox({
          fieldText: "Diễn giải",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ExplantInventory"
        }),
        "txtStatusInventory": new TextBox({
          fieldText: "Trạng thái",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "StatusInventory"
        }),
        "txtTotalBeginInventory": new NumberModel({
          fieldText: "Tổng số lượng ban đầu",
          readOnly: true,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "TotalBeginInventory"
        }),
        "txtTotalUpdateInventory": new NumberModel({
          fieldText: "Tổng số lượng kiểm kê",
          readOnly: true,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "TotalUpdateInventory"
        }),
        "txtTotalEndInventory": new NumberModel({
          fieldText: "Tổng số lượng chênh lệch",
          readOnly: true,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "TotalEndInventory"
        }),


        //Table Grid

        "txtCodeProductInventory": new TextBox({
          fieldText: "",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          classType: "tertiary",
          bindingIndex: "CodeProductInventory"
        }),
        "txtNameProductInventory": new TextBox({
          fieldText: "",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          classType: "tertiary",
          bindingIndex: "NameProductInventory"
        }),
        "txtUnitProductInventory": new Combobox({
          fieldText: "",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "Chiếc",
              display: "Chiếc"
            }
          ],
          classType: "secondary",
          bindingIndex: "UnitProductInventory"
        }),
        "txtBeginInventory": new NumberModel({
          fieldText: "",
          require: false,
          readOnly: false,
          maxLength: 255,
          labelWidth: labelWidth,
          classType: "secondary",
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 3
          }),
          bindingIndex: "BeginInventory"
        }),
        "txtUpdateInventory": new NumberModel({
          fieldText: "",
          require: false,
          readOnly: false,
          maxLength: 255,
          labelWidth: labelWidth,
          classType: "secondary",
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 3
          }),
          bindingIndex: "UpdateInventory"
        }),
        "txtEndInventory": new NumberModel({
          fieldText: "",
          require: false,
          readOnly: false,
          maxLength: 255,
          labelWidth: labelWidth,
          classType: "secondary",
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 3
          }),
          bindingIndex: "EndInventory"
        }),
        "txtReasonInventory": new TextBox({
          fieldText: "",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          classType: "tertiary",
          bindingIndex: "ReasonInventory"
        }),
        "txtHandleInventory": new TextBox({
          fieldText: "",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          classType: "tertiary",
          bindingIndex: "HandleInventory"
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
