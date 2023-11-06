<template src="./OutwardDetail.html"></template>
<style lang="scss" scoped src="./OutwardDetail.scss"></style>
<script lang="ts">
import OutwardDetail from './OutwardDetail';
import { Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import EDate from "qlch_control/EDate";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import Grid from '@library-src/models/qlch_control/qlch_grid/Grid';
import EGrid from "qlch_control/EGrid";
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import ENumber from "qlch_control/ENumber";
import Log from '@library-src/utilities/Log';
import Common from "@library-src/utilities/commons/Function";


export default {

  extends: BaseDictionaryDetailController,

  components: {
    BaseDictionaryDetailView,
    ETextBox,
    EDate,
    EGrid,
    ENumber,
    ECombobox
  },

  setup() {
    const thisData: Ref<OutwardDetail> = ref(new OutwardDetail());
    const columnOutward: Array<Column> = Array(
      new Column({
        fieldText: "Mã HH",
        width: 125,
        dataIndex: "Code",
        isFilter: true
      }),
      new Column({
        fieldText: "Tên hàng hóa",
        dataIndex: "Name",
        isFilter: true,
        width: 200
      }),
      new Column({
        fieldText: "Kho",
        dataIndex: "warehouse",
        isFilter: true,
        width: 200
      }),

      new Column({
        fieldText: "ĐV Tính",
        width: 100,
        dataIndex: "NumberUnit",
        isFilter: true
      }),

      new Column({
        fieldText: "Số lượng",
        width: 100,
        dataIndex: "NumberOrder",
        isFilter: true
      }),
      new Column({
        fieldText: "Đơn giá",
        width: 100,
        dataIndex: "NumberPrice",
        isFilter: true
      }),
      new Column({
        fieldText: "Thành tiền",
        width: 250,
        dataIndex: "IntoMoney",
        isFilter: true,
        flex: 1
      }),

    );
    const dataGridOutward: Array<Record<string, any>> = new Array(
      {
        "Code": "SP-001",
        "Name": "Quần Áo Nam",
        "warehouse": "Kho 1",
        "NumberUnit": "Chiếc",
        "NumberOrder": "100",
        "NumberPrice": "25000",
        "IntoMoney": "2500000"
      },
      {
        "Code": "SP-001",
        "Name": "Quần Áo Nam",
        "warehouse": "Kho 1",
        "NumberUnit": "Chiếc",
        "NumberOrder": "100",
        "NumberPrice": "25000",
        "IntoMoney": "2500000"
      },
      {
        "Code": "SP-001",
        "Name": "Quần Áo Nam",
        "warehouse": "Kho 1",
        "NumberUnit": "Chiếc",
        "NumberOrder": "100",
        "NumberPrice": "25000",
        "IntoMoney": "2500000"
      },



    )
    const tblOutward: Ref<Grid> = ref(new Grid({
      columns: columnOutward,
      data: dataGridOutward,
      isNotShowFooter: true,
      isNotShowCheckbox: true,
      primaryKey: "EmployeeCode"

    }));
    return {
      thisData,
      tblOutward
    };
    return { thisData };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm mới phiếu xuất kho";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtColumn1": new DateModel({
          fieldText: "Ngày xuất",
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
        "txtColumn4": new NumberModel({
          fieldText: "Tổng tiền",
          readOnly: true,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
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
        }),
        "txtColumn8": new NumberModel({
          fieldText: "Tổng số lượng",
          require: false,
          readOnly: true,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "Column8"
        }),
      }
    },
    async onLoadData(parameter: any) {
      const me = this;
      me.tblOutward.isLoadingData = true;
      me.tblOutward.data = new Array(

        // Khai báo dữ liệu biding
        {
          "Code": "SP-001",
          "Name": "Quần Áo Nam",
          "warehouse": "Kho 1",
          "NumberUnit": "Chiếc",
          "NumberOrder": "100",
          "NumberPrice": "25000",
          "IntoMoney": "2500000"
        },
        {
          "Code": "SP-001",
          "Name": "Quần Áo Nam",
          "warehouse": "Kho 1",
          "NumberUnit": "Chiếc",
          "NumberOrder": "100",
          "NumberPrice": "25000",
          "IntoMoney": "2500000"
        },
        {
          "Code": "SP-001",
          "Name": "Quần Áo Nam",
          "warehouse": "Kho 1",
          "NumberUnit": "Chiếc",
          "NumberOrder": "100",
          "NumberPrice": "25000",
          "IntoMoney": "2500000"
        },
      );
      await Common.getTimeOut(3000, "");
      me.tblOutward.isLoadingData = false;
      Log.InfoLog(parameter);

    },


    /**
    * Sau khi đóng form xong thì xử lý thêm gì ở master thì Override function này ở master
    */
    afterCloseForm() { },
  }

}
</script>
