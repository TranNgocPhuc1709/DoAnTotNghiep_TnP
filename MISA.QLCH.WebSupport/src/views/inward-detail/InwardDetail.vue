<template src="./InwardDetail.html"></template>
<style lang="scss" scoped src="./InwardDetail.scss"></style>
<script lang="ts">
import InwardDetail from './InwardDetail';
import { Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import EDate from "qlch_control/EDate";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import Grid from '@library-src/models/qlch_control/qlch_grid/Grid';
import EGrid from "qlch_control/EGrid";
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';

export default {

  extends: BaseDictionaryDetailController,

  components: {
    BaseDictionaryDetailView,
    ETextBox,
    EDate,
    ECombobox,
    EGrid

  },

  setup() {
    const thisData: Ref<InwardDetail> = ref(new InwardDetail());
    const columnDefault: Array<Column> = Array(
      new Column({
        fieldText: "Mã nhân viên",
        width: 250,
        dataIndex: "EmployeeCode",

        isFilter: true
      }),
      new Column({
        fieldText: "Sinh nhật",
        dataIndex: "BirthDay",
        isFilter: true,
        width: 250
      }),

      new Column({
        fieldText: "Địa chỉ",
        minWidth: 350,
        flex: 1,
        dataIndex: "Address",
        isFilter: true
      }),

      new Column({
        fieldText: "Lương",
        width: 350,
        dataIndex: "Amount",
        isFilter: true
      }),

    );
    const dataGrid: Array<Record<string, any>> = new Array(
      {
        "EmployeeCode": "Tran Duc 1",
        "BirthDay": "29/12/1994",
        "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
        "Amount": "2000000"
      },
      {
        "EmployeeCode": "Tran Duc 1",
        "BirthDay": "29/12/1994",
        "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
        "Amount": "2000000"
      },
      {
        "EmployeeCode": "Tran Duc 1",
        "BirthDay": "29/12/1994",
        "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
        "Amount": "2000000"
      },
      {
        "EmployeeCode": "Tran Duc 1",
        "BirthDay": "29/12/1994",
        "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
        "Amount": "2000000"
      },
      {
        "EmployeeCode": "Tran Duc 1",
        "BirthDay": "29/12/1994",
        "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
        "Amount": "2000000"
      },
      {
        "EmployeeCode": "Tran Duc 1",
        "BirthDay": "29/12/1994",
        "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
        "Amount": "2000000"
      },
      {
        "EmployeeCode": "Tran Duc 1",
        "BirthDay": "29/12/1994",
        "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
        "Amount": "2000000"
      },
      {
        "EmployeeCode": "Tran Duc 1",
        "BirthDay": "29/12/1994",
        "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
        "Amount": "2000000"
      },
    )

    const tblDefault: Ref<Grid> = ref(new Grid({
      columns: columnDefault,
      data: dataGrid,
      isNotShowFooter: true,
      primaryKey: "EmployeeCode"
    }));
    return {
      tblDefault
    }
    return { thisData };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm mới phiếu nhập kho";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtColumn1": new DateModel({
          fieldText: "Ngày nhập",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column1"
        }),
        "txtColumn2": new TextBox({
          fieldText: "Số phiếu nhập",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column2"
        }),
        "txtColumn3": new Combobox({
          fieldText: "Đối tượng",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: 1,
              display: "Nhân viên"
            },
            {
              value: 2,
              display: "Khách hàng"
            },
            {
              value: 3,
              display: "Nhà cung cấp"
            }
          ],
          bindingIndex: "Column3"
        }),
        "txtColumn4": new TextBox({
          fieldText: "Tổng tiền",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
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
          fieldText: "Người giao",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column6"
        }),
        "txtColumn7": new Combobox({
          fieldText: "Tên",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,

          bindingIndex: "Column7"
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
