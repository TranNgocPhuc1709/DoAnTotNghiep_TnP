<template src="./ImportDetail.html"></template>
<style lang="scss" scoped src="./ImportDetail.scss"></style>
<script lang="ts">
import ImportDetail from './ImportDetail';
import { PropType, Ref, ref } from 'vue';
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
import Log from '@library-src/utilities/Log';
import Import from '@store-src/models/import/Import';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Guid from '@library-src/utilities/types/Guid';

export default {

  extends: BaseDictionaryDetailController,
  props: {
    masterData: {
      type: Object as PropType<Record<string, any>>,
      require: true
    }
  },
  components: {
    BaseDictionaryDetailView,
    ETextBox,
    EDate,
    ENumber,
    ECombobox
  },

  setup() {
    const thisData: Ref<ImportDetail> = ref(new ImportDetail());
    const disableFormImport: Ref<boolean> = ref(true);
    const disableFormPayment: Ref<boolean> = ref(false);
    const navbar1Selected: Ref<boolean> = ref(false);
    const navbar2Selected: Ref<boolean> = ref(false);

    return {
      thisData,
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
            value: "NCC0012",
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
          data: [
            {
              value: "TNP",
              display: "TNP"
            }
          ],
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

        "txtCodeProductImport": new Combobox({
          fieldText: "",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "123",
              display: "123"
            }
          ],
          classType: "secondary",
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
        "txtNumberProductImport": new NumberModel({
          fieldText: "",
          require: false,
          readOnly: false,
          maxLength: 255,
          classType: "thirty",
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "NumberProductImport"
        }),

        "txtUnitPriceImport": new NumberModel({
          fieldText: "",
          require: false,
          readOnly: false,
          maxLength: 255,
          classType: "thirty",
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
          classType: "thirty",
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 3
          }),
          bindingIndex: "PaymentImport"
        }),

      }
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

    saveData() {
      const me = this;
      let listImport: Array<Import> | null = new Array<Import>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['ImportId'] = Guid.NewGuid();
          listImport = LocalStorageLibrary.getByKey<Array<Import>>("importList");
          if (listImport) {
            listImport.push(me.masterData);
            LocalStorageLibrary.setByKey("importList", listImport);
          }
          else {
            listImport = new Array<Import>({ ...me.masterData });
            LocalStorageLibrary.setByKey("importList", listImport);
          }
        }
        if (me.masterData.editMode == 2) {
          listImport = LocalStorageLibrary.getByKey<Array<Import>>("importList");
          if (listImport) {
            listImport.forEach(newItemImport => {
              if (me.masterData) {
                if (newItemImport.ImportId == me.masterData.ImportId) {
                  newItemImport.DateImport = me.masterData.DateImport;
                  newItemImport.ReceiptNumberImport = me.masterData.ReceiptNumberImport;
                  newItemImport.SupplierImport = me.masterData.SupplierImport;
                  newItemImport.IntoMoneyImport = me.masterData.IntoMoneyImport;
                  newItemImport.StaffImport = me.masterData.StaffImport;
                  newItemImport.ExplainImport = me.masterData.ExplainImport;
                  newItemImport.SupplierNameImport = me.masterData.SupplierNameImport;
                  newItemImport.StaffNameImport = me.masterData.StaffNameImport;
                  newItemImport.DeliverImport = me.masterData.DeliverImport;
                  newItemImport.TotalImport = me.masterData.TotalImport;
                  newItemImport.ReceiverImport = me.masterData.ReceiverImport;
                  newItemImport.AddressImport = me.masterData.AddressImport;
                  newItemImport.ReasonImport = me.masterData.ReasonImport;
                  newItemImport.VotesImport = me.masterData.VotesImport;
                  newItemImport.VotesDateImport = me.masterData.VotesDateImport;
                  newItemImport.TotalPaymentImport = me.masterData.TotalPaymentImport;

                }
              }
            });
            LocalStorageLibrary.setByKey("importList", listImport);
          }
        }
      }
    },



    /**
    * Sau khi đóng form xong thì xử lý thêm gì ở master thì Override function này ở master
    */
    afterCloseForm() { },
  }

}
</script>
