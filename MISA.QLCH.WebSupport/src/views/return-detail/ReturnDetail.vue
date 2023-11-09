<template src="./ReturnDetail.html"></template>
<style lang="scss" scoped src="./ReturnDetail.scss"></style>
<script lang="ts">
import ReturnDetail from './ReturnDetail';
import { Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import Common from "@library-src/utilities/commons/Function";
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
    const thisData: Ref<ReturnDetail> = ref(new ReturnDetail());
    const disableFormImport: Ref<boolean> = ref(true);
    const disableFormPayment: Ref<boolean> = ref(false);
    const navbar1Selected: Ref<boolean> = ref(false);
    const navbar2Selected: Ref<boolean> = ref(false);
    const columnReturn: Array<Column> = Array(
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
    const dataGridReturn: Array<Record<string, any>> = new Array(
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
        "Code": "SP-00123",
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
    const tblReturn: Ref<Grid> = ref(new Grid({
      columns: columnReturn,
      data: dataGridReturn,
      isNotShowFooter: true,
      isNotShowCheckbox: true,
      primaryKey: "EmployeeCode"
    }));
    return {
      thisData,
      tblReturn,
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
      return "Phiếu trả lại hàng mua";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtDateReturn": new DateModel({
          fieldText: "Ngày trả hàng",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DateReturn"
        }),
        "txtBillNumberReturn": new TextBox({
          fieldText: "Số phiếu xuất",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "BillNumberReturn"
        }),
        //ncc
        "txtSupplierReturn": new Combobox({
          fieldText: "Nhà cung cấp",
          require: false,
          maxLength: 255,
          data: [
            {
              value: "NCC001",
              display: "NCC001"
            }
          ],
          labelWidth: labelWidth,
          bindingIndex: "SupplierReturn"
        }),
        "txtTotalMoneyReturn": new NumberModel({
          fieldText: "Thành tiền",
          readOnly: false,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "TotalMoneyReturn"
        }),
        "txtExplantReturn": new TextBox({
          fieldText: "Diễn giải",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ExplantReturn"
        }),
        "txtNameSupplierReturn": new TextBox({
          fieldText: "Tên nhà cung cấp",
          readOnly: true,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameSupplierReturn"
        }),
        "txtReceiverReturn": new TextBox({
          fieldText: "Người nhận",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ReceiverReturn"
        }),
        "txtAddressSupplierReturn": new TextBox({
          fieldText: "Địa chỉ",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "AddressSupplierReturn"
        }),
        //Tong so luong
        "txtTotalQuantityReturn": new NumberModel({
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
          bindingIndex: "TotalQuantityReturn"
        }),
        // "txtColumn10": new TextBox({
        //   fieldText: "Địa chỉ",
        //   require: false,
        //   maxLength: 255,
        //   labelWidth: labelWidth,
        //   bindingIndex: "Column10"
        // }),
        "txtReasonReturn": new TextBox({
          fieldText: "Lý do thu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ReasonReturn"
        }),
        "txtRevenueOfficer": new Combobox({
          fieldText: "Nhân viên thu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "RevenueOfficerReturn"
        }),
        "txtRevenueOfficerNameReturn": new TextBox({
          fieldText: "Tên nhân viên",
          require: false,
          readOnly: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "RevenueOfficerNameReturn"
        }),
        "txtReceiptNumberReturn": new TextBox({
          fieldText: "Số phiếu thu",
          require: false,
          readOnly: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ReceiptNumberReturn"
        }),
        "txtCollectionDateReturn": new DateModel({
          fieldText: "Ngày thu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "CollectionDateReturn"
        }),



        //Table Grid

        "txtCodeProductReturn": new TextBox({
          fieldText: "",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          classType: "tertiary",
          bindingIndex: "CodeProductReturn"
        }),
        "txtNameProductReturn": new TextBox({
          fieldText: "",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          classType: "tertiary",
          bindingIndex: "NameProductReturn"
        }),
        "txtWarehouseProductReturn": new Combobox({
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
          bindingIndex: "WarehouseProductReturn"
        }),
        "txtUnitProductReturn": new Combobox({
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
          bindingIndex: "UnitProductReturn"
        }),
        "txtNumberProductReturn": new TextBox({
          fieldText: "",
          require: false,
          readOnly: false,
          maxLength: 255,
          type: "number",
          classType: "tertiary",
          bindingIndex: "NumberProductReturn"
        }),

        "txtUnitPriceReturn": new NumberModel({
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
          bindingIndex: "UnitPriceReturn"
        }),
        "txtPaymentReturn": new NumberModel({
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
          bindingIndex: "PaymentReturn"
        }),

      }
    },
    async onLoadData(parameter: any) {
      const me = this;
      me.tblReturn.isLoadingData = true;
      me.tblReturn.data = new Array(
        // binding dữ liệu
      );
      await Common.getTimeOut(3000, "");
      me.tblReturn.isLoadingData = false;
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
