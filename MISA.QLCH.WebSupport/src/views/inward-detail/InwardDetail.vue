<template src="./InwardDetail.html"></template>
<style lang="scss" scoped src="./InwardDetail.scss"></style>
<script lang="ts">
import InwardDetail from './InwardDetail';
import { PropType, Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import EDate from "qlch_control/EDate";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import ENumber from "qlch_control/ENumber";
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Guid from '@library-src/utilities/types/Guid';
import Inward from '@store-src/models/inward/Inward';



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
    ENumber
  },

  setup() {
    const thisData: Ref<InwardDetail> = ref(new InwardDetail());
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

        "txtCodeProductInward": new Combobox({
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
        "txtNumberProductInward": new NumberModel({
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
          bindingIndex: "NumberProductInward"
        }),

        "txtUnitPriceInward": new NumberModel({
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
          bindingIndex: "UnitPriceInward"
        }),
        "txtPaymentInward": new NumberModel({
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
          bindingIndex: "PaymentInward"
        }),
      }
    },

    saveData() {
      const me = this;
      let listInward: Array<Inward> | null = new Array<Inward>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['InwardId'] = Guid.NewGuid();
          listInward = LocalStorageLibrary.getByKey<Array<Inward>>("inward");
          if (listInward) {
            listInward.push(me.masterData);
            LocalStorageLibrary.setByKey("inward", listInward);
          }
          else {
            listInward = new Array<Inward>({ ...me.masterData });
            LocalStorageLibrary.setByKey("inward", listInward);
          }
        }
        if (me.masterData.editMode == 2) {
          listInward = LocalStorageLibrary.getByKey<Array<Inward>>("inward");
          if (listInward) {
            listInward.forEach(newItemInward => {
              if (me.masterData) {
                if (newItemInward.InwardId == me.masterData.InwardId) {
                  newItemInward.DayInward = me.masterData.DayInward;
                  newItemInward.VotesInward = me.masterData.VotesInward;
                  newItemInward.ObjectInward = me.masterData.ObjectInward;
                  newItemInward.TotalMoneyInward = me.masterData.TotalMoneyInward;
                  newItemInward.ExplantInward = me.masterData.ExplantInward;
                  newItemInward.DeliverInward = me.masterData.DeliverInward;
                  newItemInward.NameObjectInward = me.masterData.NameObjectInward;
                  newItemInward.TotalInward = me.masterData.TotalInward;

                }
              }
            });
            LocalStorageLibrary.setByKey("inward", listInward);
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
