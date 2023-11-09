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
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import ENumber from "qlch_control/ENumber";
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import Log from '@library-src/utilities/Log';
import Common from "@library-src/utilities/commons/Function";


export default {

  extends: BaseDictionaryDetailController,

  components: {
    BaseDictionaryDetailView,
    ETextBox,
    EDate,
    ECombobox,
    ENumber,
    EGrid

  },

  setup() {
    const thisData: Ref<InwardDetail> = ref(new InwardDetail());
    const columnInward: Array<Column> = Array(
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
    const dataGridInward: Array<Record<string, any>> = new Array(
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
    const tblInward: Ref<Grid> = ref(new Grid({
      columns: columnInward,
      data: dataGridInward,
      isNotShowFooter: true,
      isNotShowCheckbox: true,
      primaryKey: "EmployeeCode"
    }));

    return {
      thisData,
      tblInward
    };
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
        "txtDayInward": new DateModel({
          fieldText: "Ngày nhập",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DayInward"
        }),
        "txtVotesInward": new TextBox({
          fieldText: "Số phiếu nhập",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "VotesInward"
        }),
        "txtObjectInward": new Combobox({
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
          bindingIndex: "ObjectInward"
        }),
        "txtTotalMoneyInward": new NumberModel({
          fieldText: "Tổng tiền",
          require: false,
          readOnly: false,
          maxLength: 255,
          classType: "primary",
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "TotalMoneyInward"
        }),
        "txtExplantInward": new TextBox({
          fieldText: "Diễn giải",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ExplantInward"
        }),

        //6
        "txtDeliverInward": new TextBox({
          fieldText: "Người giao",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DeliverInward"
        }),
        "txtNameObjectInward": new Combobox({
          fieldText: "Tên",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameObjectInward"
        }),
        "txtTotalInward": new NumberModel({
          fieldText: "Số lượng",
          readOnly: false,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "TotalInward"
        }),




        //Table Grid

        "txtCodeProductInward": new TextBox({
          fieldText: "",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          classType: "tertiary",
          bindingIndex: "CodeProductInward"
        }),
        "txtNameProductInward": new TextBox({
          fieldText: "",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          classType: "tertiary",
          bindingIndex: "NameProductInward"
        }),
        "txtWarehouseProductInward": new Combobox({
          fieldText: "",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "Kh0 1",
              display: "Kho 1"
            }
          ],
          classType: "secondary",
          bindingIndex: "WarehouseProductInward"
        }),
        "txtUnitProductInward": new Combobox({
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
          bindingIndex: "UnitProductInward"
        }),
        "txtNumberProductInward": new TextBox({
          fieldText: "",
          require: false,
          readOnly: false,
          maxLength: 255,
          type: "number",
          classType: "tertiary",
          bindingIndex: "NumberProductInward"
        }),

        "txtUnitPriceInward": new NumberModel({
          fieldText: "",
          require: false,
          readOnly: false,
          maxLength: 255,
          classType: "secondary",
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 3
          }),
          bindingIndex: "UnitPriceInward"
        }),
        "txtPaymentInward": new NumberModel({
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
          bindingIndex: "PaymentInward"
        }),
      }
    },
    async onLoadData(parameter: any) {
      const me = this;
      me.tblInward.isLoadingData = true;
      me.tblInward.data = new Array(

        // Khai báo dữ liệu biding
      );
      await Common.getTimeOut(3000, "");
      me.tblInward.isLoadingData = false;
      Log.InfoLog(parameter);

    },

    /**
    * Sau khi đóng form xong thì xử lý thêm gì ở master thì Override function này ở master
    */
    afterCloseForm() { },
  }

}
</script>
