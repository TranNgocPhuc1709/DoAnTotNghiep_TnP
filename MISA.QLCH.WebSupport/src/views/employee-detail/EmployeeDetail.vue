<template src="./EmployeeDetail.html"></template>
<style lang="scss" scoped src="./EmployeeDetail.scss"></style>
<script lang="ts">
import EmployeeDetail from './EmployeeDetail';
import { Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import EDate from "qlch_control/EDate";
// import Log from '@library-src/utilities/Log';

export default {

  extends: BaseDictionaryDetailController,

  components: {
    BaseDictionaryDetailView,
    ETextBox,
    ECombobox,
    EDate
  },

  setup() {
    const thisData: Ref<EmployeeDetail> = ref(new EmployeeDetail());
    return {
      thisData,
      disabledFormInfo: true,
      disabledFormInfo2: false
    };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm mới nhân viên";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtColumn1": new TextBox({
          fieldText: "Mã nhân viên",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column1"
        }),
        "txtColumn2": new TextBox({
          fieldText: "Tên nhân viên",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column2"
        }),
        "txtColumn3": new Combobox({
          fieldText: "Giới tính",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column3",
          data: [
            {
              value: 1,
              display: "Nam"
            },
            {
              value: 2,
              display: "Nữ"
            }
          ]
        }),
        "txtColumn4": new DateModel({
          fieldText: "Ngày sinh",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column4"
        }),
        "txtColumn5": new TextBox({
          fieldText: "Số điện thoại",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column5"
        }),
        "txtColumn6": new Combobox({
          fieldText: "Trạng thái làm việc",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column6",
          data: [
            {
              value: 1,
              display: "Nhân viên chính thức"
            },
            {
              value: 2,
              display: "Nhân viên thử việc"
            }
          ]
        }),
        "txtColumn7": new TextBox({
          fieldText: "Mật khẩu",
          type: "password",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          styleInput: "padding-left: 35px",
          bindingIndex: "Column7",


        }),
      }
    },
    // ShowTaskInfo() {
    //   try {
    //     const me = this;
    //     me.disabledFormInfo = me.disabledFormInfo;
    //   } catch (error) {
    //     Log.ErrorLog(error as Error);
    //   }
    // },
    // ShowTaskInfo2() {
    //   try {
    //     const me = this;
    //     me.disabledFormInfo = !me.disabledFormInfo;
    //     me.disabledFormInfo2 = true;
    //   } catch (error) {
    //     Log.ErrorLog(error as Error);
    //   }
    // },

    /**
    * Sau khi đóng form xong thì xử lý thêm gì ở master thì Override function này ở master
    */
    afterCloseForm() { },
  }

}
</script>
