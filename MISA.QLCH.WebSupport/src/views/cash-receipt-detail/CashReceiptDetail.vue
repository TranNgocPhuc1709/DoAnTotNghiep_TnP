<template src="./CashReceiptDetail.html"></template>
<style lang="scss" scoped src="./CashReceiptDetail.scss"></style>
<script lang="ts">
import CashReceiptDetail from './CashReceiptDetail';
import { PropType, Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import EDate from "qlch_control/EDate";
import ECombobox from "qlch_control/ECombobox";
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import ENumber from "qlch_control/ENumber";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import Checkbox from '@library-src/models/qlch_control/qlch_checkbox/Checkbox';
import ECheckbox from "qlch_control/ECheckbox";
import CashReceipt from '@store-src/models/cash-receipt/CashReceipt';
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
    ECombobox,
    ENumber,
    ECheckbox

  },

  setup() {
    const thisData: Ref<CashReceiptDetail> = ref(new CashReceiptDetail());
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
      return "Thêm mới phiếu thu";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtDateCashReceipt": new DateModel({
          fieldText: "Ngày thu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DateCashReceipt"
        }),
        "txtCodeCashReceipt": new TextBox({
          fieldText: "Số phiếu thu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "CodeCashReceipt"
        }),
        "txtTotalMoneyCashReceipt": new NumberModel({
          fieldText: "Tổng tiền",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 2
          }),
          bindingIndex: "TotalMoneyCashReceipt"
        }),
        "txtNameObjectCashReceipt": new Combobox({
          fieldText: "Tên đối tượng",
          require: false,
          maxLength: 255,
          data: [
            {
              value: "TNP",
              display: "TNP"
            }
          ],
          labelWidth: labelWidth,
          bindingIndex: "NameObjectCashReceipt"
        }),
        "txtExplantCashReceipt": new TextBox({
          fieldText: "Lý do thu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ExplantCashReceipt"
        }),
        "txtObjectCashReceipt": new Combobox({
          fieldText: "Đối tượng nộp",
          require: false,
          maxLength: 255,
          data: [
            {
              value: "Nhà cung cấp",
              display: "Nhà cung cấp"
            },
            {
              value: "Khách hàng",
              display: "khách hàng"
            },
            {
              value: "Nhân viên",
              display: "Nhân viên"
            }
          ],
          labelWidth: labelWidth,
          bindingIndex: "ObjectCashReceipt"
        }),
        "txtPayerCashReceipt": new TextBox({
          fieldText: "Người nộp",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "PayerCashReceipt"
        }),
        "txtAddressPayerCashReceipt": new TextBox({
          fieldText: "Địa chỉ",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "AddressPayerCashReceipt"
        }),
        "txtRevenueOfficerCashReceipt": new Combobox({
          fieldText: "Nhân viên thu",
          require: false,
          maxLength: 255,
          data: [
            {
              value: "TNP",
              display: "TNP"
            }
          ],
          labelWidth: labelWidth,
          bindingIndex: "RevenueOfficerCashReceipt"
        }),
        "txtNameRevenueOfficerCashReceipt": new TextBox({
          fieldText: "Tên nhân viên",
          readOnly: true,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameRevenueOfficerCashReceipt"
        }),
        "txtIncludedCashReceipt": new Checkbox({
          fieldText: "Tính vào doanh thu",
          bindingIndex: "IncludedCashReceipt",
        }),


        //Grid-Table

        //Table Grid

        "txtExplainCashReceipt": new TextBox({
          fieldText: "",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          classType: "tertiary",
          bindingIndex: "ExplainCashReceipt"
        }),
        "txtMoneyCashDetail": new NumberModel({
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
          bindingIndex: "MoneyCashDetail"
        }),

      }
    },
    saveData() {
      const me = this;
      let listCashReceipt: Array<CashReceipt> | null = new Array<CashReceipt>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['CashReceiptId'] = Guid.NewGuid();
          listCashReceipt = LocalStorageLibrary.getByKey<Array<CashReceipt>>("cashReceipt");
          if (listCashReceipt) {
            listCashReceipt.push(me.masterData);
            LocalStorageLibrary.setByKey("cashReceipt", listCashReceipt);
          }
          else {
            listCashReceipt = new Array<CashReceipt>({ ...me.masterData });
            LocalStorageLibrary.setByKey("cashReceipt", listCashReceipt);
          }
        }
        if (me.masterData.editMode == 2) {
          listCashReceipt = LocalStorageLibrary.getByKey<Array<CashReceipt>>("cashReceipt");
          if (listCashReceipt) {
            listCashReceipt.forEach(newItemCashReceipt => {
              if (me.masterData) {
                if (newItemCashReceipt.CashReceiptId == me.masterData.CashReceiptId) {
                  newItemCashReceipt.DateCashReceipt = me.masterData.DateCashReceipt;
                  newItemCashReceipt.CodeCashReceipt = me.masterData.CodeCashReceipt;
                  newItemCashReceipt.TotalMoneyCashReceipt = me.masterData.TotalMoneyCashReceipt;
                  newItemCashReceipt.NameObjectCashReceipt = me.masterData.NameObjectCashReceipt;
                  newItemCashReceipt.ExplantCashReceipt = me.masterData.ExplantCashReceipt;
                  newItemCashReceipt.ObjectCashReceipt = me.masterData.ObjectCashReceipt;
                  newItemCashReceipt.PayerCashReceipt = me.masterData.PayerCashReceipt;
                  newItemCashReceipt.AddressPayerCashReceipt = me.masterData.AddressPayerCashReceipt;
                  newItemCashReceipt.RevenueOfficerCashReceipt = me.masterData.RevenueOfficerCashReceipt;
                  newItemCashReceipt.NameRevenueOfficerCashReceipt = me.masterData.NameRevenueOfficerCashReceipt;
                  newItemCashReceipt.IncludedCashReceipt = me.masterData.IncludedCashReceipt;
                }
              }
            });
            LocalStorageLibrary.setByKey("cashReceipt", listCashReceipt);
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
