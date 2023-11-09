<template src="./ImportDetail.html"></template>
<style lang="scss" scoped src="./ImportDetail.scss"></style>
<script lang="ts">
import ImportDetail from './ImportDetail';
import { Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import EDate from "qlch_control/EDate";
import ECombobox from "qlch_control/ECombobox";
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import ENumber from "qlch_control/ENumber";
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import Grid from '@library-src/models/qlch_control/qlch_grid/Grid';
import EGrid from "qlch_control/EGrid";
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
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
    const thisData: Ref<ImportDetail> = ref(new ImportDetail());
    const disableFormImport: Ref<boolean> = ref(true);
    const disableFormPayment: Ref<boolean> = ref(false);
    const navbar1Selected: Ref<boolean> = ref(false);
    const navbar2Selected: Ref<boolean> = ref(false);

    const dataGridImport: Array<Record<string, any>> = new Array(
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
        "Code": "SP-0012345",
        "Name": "Quần Áo Nam",
        "warehouse": "Kho 1",
        "NumberUnit": "Chiếc",
        "NumberOrder": "100",
        "NumberPrice": "25000",
        "IntoMoney": "2500000"
      },



    )
    const columnImport: Array<Column> = Array(
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
    const tblImport: Ref<Grid> = ref(new Grid({
      columns: columnImport,
      data: dataGridImport,
      isNotShowFooter: true,
      isNotShowCheckbox: true,
      primaryKey: "EmployeeCode"
    }));
    return {
      thisData,
      tblImport,
      disableFormImport,
      disableFormPayment,
      navbar1Selected,
      navbar2Selected
    };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Phiếu nhập hàng";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtDateImport": new DateModel({
          fieldText: "Ngày nhập",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DateImport"
        }),
        "txtReceiptNumberImport": new TextBox({
          fieldText: "Số phiếu nhập",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ReceiptNumberImport"
        }),
        "txtSupplierImport": new Combobox({
          fieldText: "Nhà cung cấp",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [{
            value: 1,
            display: "NCC0012"
          }],
          bindingIndex: "SupplierImport"
        }),
        "txtIntoMoneyImport": new NumberModel({
          fieldText: "Thành tiền",
          require: false,
          readOnly: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "IntoMoneyImport"
        }),
        "txtStaffImport": new Combobox({
          fieldText: "Nhân viên mua hàng",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "StaffImport"
        }),
        "txtExplainImport": new TextBox({
          fieldText: "Diễn giải",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ExplainImport"
        }),

        //txt7
        "txtSupplierNameImport": new TextBox({
          fieldText: "Tên NCC",
          readOnly: true,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "SupplierNameImport "
        }),
        "txtStaffNameImport": new TextBox({
          fieldText: "Tên nhân viên",
          readOnly: true,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "StaffNameImport"
        }),
        "txtDeliverImport": new TextBox({
          fieldText: "Người giao",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DeliverImport"
        }),
        "txtTotalImport": new NumberModel({
          fieldText: "Tổng số lượng",
          require: false,
          readOnly: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "TotalImport"
        }),

        "txtReceiverImport": new TextBox({
          fieldText: "Người nhận",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ReceiverImport"
        }),
        "txtAddressImport": new TextBox({
          fieldText: "Địa chỉ",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "AddressImport"
        }),
        "txtReasonImport": new TextBox({
          fieldText: "Lý do chi",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ReasonImport"
        }),
        "txtVotesImport": new TextBox({
          fieldText: "Số phiếu chi",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "VotesImport"
        }),
        "txtVotesDateImport": new DateModel({
          fieldText: "Ngày chi",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "VotesDateImport"
        }),
        "txtTotalPaymentImport": new NumberModel({
          fieldText: "Tổng tiền thanh toán",
          require: false,
          readOnly: false,
          maxLength: 255,
          labelWidth: 150,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "TotalPaymentImport"
        }),



        //Table Grid

        "txtCodeProductImport": new TextBox({
          fieldText: "",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          classType: "tertiary",
          bindingIndex: "CodeProductImport"
        }),
        "txtNameProductImport": new TextBox({
          fieldText: "",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          classType: "tertiary",
          bindingIndex: "NameProductImport"
        }),
        "txtWarehouseProductImport": new Combobox({
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
          bindingIndex: "WarehouseProductImport"
        }),
        "txtUnitProductImport": new Combobox({
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
          bindingIndex: "UnitProductImport"
        }),
        "txtNumberProductImport": new TextBox({
          fieldText: "",
          require: false,
          readOnly: false,
          maxLength: 255,
          type: "number",
          classType: "tertiary",
          bindingIndex: "NumberProductImport"
        }),

        "txtUnitPriceImport": new NumberModel({
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
          bindingIndex: "UnitPriceImport"
        }),
        "txtPaymentImport": new NumberModel({
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
          bindingIndex: "PaymentImport"
        }),

      }
    },
    async onLoadData(parameter: any) {
      const me = this;
      me.tblImport.isLoadingData = true;
      me.tblImport.data = new Array(

        // Khai báo dữ liệu biding
      );
      await Common.getTimeOut(3000, "");
      me.tblImport.isLoadingData = false;
      Log.InfoLog(parameter);

    },
    showImport() {
      try {
        const me = this;
        me.disableFormImport = true;
        me.disableFormPayment = false;
        me.navbar1Selected = true;
        me.navbar2Selected = false;
      } catch (error) {
        Log.ErrorLog(error as Error);
      }
    },
    showExport() {
      try {
        const me = this;
        me.disableFormImport = false;
        me.disableFormPayment = true;
        me.navbar1Selected = false;
        me.navbar2Selected = true;
      } catch (error) {
        Log.ErrorLog(error as Error);
      }
    },



    /**
    * Sau khi đóng form xong thì xử lý thêm gì ở master thì Override function này ở master
    */
    afterCloseForm() { },
  }

}
</script>
