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
import Grid from '@library-src/models/qlch_control/qlch_grid/Grid';
import EGrid from "qlch_control/EGrid";
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
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
    const thisData: Ref<InventoryDetail> = ref(new InventoryDetail());
    const columnInventory: Array<Column> = Array(
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
        fieldText: "ĐV tính",
        dataIndex: "NumberUnit",
        isFilter: true,
        width: 200
      }),
      new Column({
        fieldText: "Theo sổ",
        width: 100,
        dataIndex: "BeginInventory",
        isFilter: true
      }),
      new Column({
        fieldText: "Kiểm kê",
        width: 100,
        dataIndex: "UpdateInventory",
        isFilter: true
      }),
      new Column({
        fieldText: "Chênh lệch",
        width: 100,
        dataIndex: "Difference",
        isFilter: true
      }),
      new Column({
        fieldText: "Nguyên nhân",
        width: 250,
        dataIndex: "Reason",
        isFilter: true,
        flex: 1
      }),
    );
    const dataGridInventory: Array<Record<string, any>> = new Array(
      {
        "Code": "SP-001",
        "Name": "Quần Áo Nam",
        "NumberUnit": "Chiếc",
        "BeginInventory": "100",
        "UpdateInventory": "80",
        "Difference": "20",
        "Reason": "Xuất hàng ra quầy"

      },
      {
        "Code": "SP-002",
        "Name": "Quần Áo Nữ",
        "NumberUnit": "Chiếc",
        "BeginInventory": "100",
        "UpdateInventory": "120",
        "Difference": "20",
        "Reason": "Nhập hàng Từ nhà sản xuất"
      },
      {
        "Code": "SP-002",
        "Name": "Quần Áo Nữ",
        "NumberUnit": "Chiếc",
        "BeginInventory": "100",
        "UpdateInventory": "120",
        "Difference": "20",
        "Reason": "Nhập hàng Từ nhà sản xuất"
      },
    )
    const tblInventory: Ref<Grid> = ref(new Grid({
      columns: columnInventory,
      data: dataGridInventory,
      isNotShowFooter: true,
      isNotShowCheckbox: true,
      primaryKey: "EmployeeCode"

    }));
    return {
      thisData,
      tblInventory
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
        "txtColumn1": new DateModel({
          fieldText: "Ngày kiểm kê",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column1"
        }),
        "txtColumn2": new TextBox({
          fieldText: "Số phiếu kiểm kê",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column2"
        }),
        "txtColumn3": new Combobox({
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
          bindingIndex: "Column3"
        }),
        "txtColumn4": new TextBox({
          fieldText: "Diễn giải",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column4"
        }),
        "txtColumn5": new TextBox({
          fieldText: "Trạng thái",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column5"
        }),
        "txtColumn6": new NumberModel({
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
          bindingIndex: "Column6"
        }),
        "txtColumn7": new NumberModel({
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
          bindingIndex: "Column7"
        }),
        "txtColumn8": new NumberModel({
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
          bindingIndex: "Column8"
        }),

      }
    },
    async onLoadData(parameter: any) {
      const me = this;
      me.tblInventory.isLoadingData = true;
      me.tblInventory.data = new Array(

        // Khai báo dữ liệu biding
      );
      await Common.getTimeOut(3000, "");
      me.tblInventory.isLoadingData = false;
      Log.InfoLog(parameter);

    },

    /**
    * Sau khi đóng form xong thì xử lý thêm gì ở master thì Override function này ở master
    */
    afterCloseForm() { },
  }

}
</script>
