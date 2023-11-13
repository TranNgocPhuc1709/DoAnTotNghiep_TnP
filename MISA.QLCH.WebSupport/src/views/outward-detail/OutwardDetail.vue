<template src="./OutwardDetail.html"></template>
<style lang="scss" scoped src="./OutwardDetail.scss"></style>
<script lang="ts">
import OutwardDetail from './OutwardDetail';
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
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import ENumber from "qlch_control/ENumber";
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Outward from '@store-src/models/outward/Outward';
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
    const thisData: Ref<OutwardDetail> = ref(new OutwardDetail());

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
      return "Thêm mới phiếu xuất kho";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtDayOutward": new DateModel({
          fieldText: "Ngày xuất",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DayOutward"
        }),
        "txtDeliveryOutward": new TextBox({
          fieldText: "Số phiếu xuất",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DeliveryOutward"
        }),
        "txtObjectOutward": new Combobox({
          fieldText: "Đối tượng",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "Nhân viên",
              display: "Nhân viên"
            },
            {
              value: "Khách hàng",
              display: "Khách hàng"
            },
            {
              value: "Nhà cung cấp",
              display: "Nhà cung cấp"
            }
          ],
          bindingIndex: "ObjectOutward"
        }),
        "txtTotalMoneyOutward": new NumberModel({
          fieldText: "Tổng tiền",
          readOnly: false,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "TotalMoneyOutward"
        }),
        "txtExplainOutward": new TextBox({
          fieldText: "Diễn giải",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ExplainOutward"
        }),
        "txtDeliverOutward": new TextBox({
          fieldText: "Người giao",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DeliverOutward"
        }),
        "txtObjectNameOutward": new Combobox({
          fieldText: "Tên",
          require: false,
          maxLength: 255,
          data: [
            {
              value: "TNP",
              display: "PNJ"
            }
          ],
          labelWidth: labelWidth,
          bindingIndex: "ObjectNameOutward"
        }),
        "txtTotalQuantityOutward": new NumberModel({
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
          bindingIndex: "TotalQuantityOutward"
        }),



        //Table Grid

        "txtCodeProductOutWard": new Combobox({
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
          bindingIndex: "CodeProductOutWard"
        }),
        "txtNameProductOutWard": new TextBox({
          fieldText: "",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          classType: "tertiary",
          bindingIndex: "NameProductOutWard"
        }),
        "txtWarehouseProductOutWard": new Combobox({
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
          bindingIndex: "WarehouseProductOutWard"
        }),
        "txtUnitProductOutWard": new Combobox({
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
          bindingIndex: "UnitProductOutWard"
        }),
        "txtNumberProductOutWard": new NumberModel({
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
          bindingIndex: "NumberProductOutWard"
        }),

        "txtUnitPriceOutWard": new NumberModel({
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
          bindingIndex: "UnitPriceOutWard"
        }),
        "txtPaymentOutWard": new NumberModel({
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
          bindingIndex: "PaymentOutWard"
        }),
      }
    },

    saveData() {
      const me = this;
      let listOutward: Array<Outward> | null = new Array<Outward>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['OutwardId'] = Guid.NewGuid();
          listOutward = LocalStorageLibrary.getByKey<Array<Outward>>("outwardItem");
          if (listOutward) {
            listOutward.push(me.masterData);
            LocalStorageLibrary.setByKey("outwardItem", listOutward);
          }
          else {
            listOutward = new Array<Outward>({ ...me.masterData });
            LocalStorageLibrary.setByKey("outwardItem", listOutward);
          }
        }
        if (me.masterData.editMode == 2) {
          listOutward = LocalStorageLibrary.getByKey<Array<Outward>>("outwardItem");
          if (listOutward) {
            listOutward.forEach(newItemOutward => {
              if (me.masterData) {
                if (newItemOutward.OutwardId == me.masterData.OutwardId) {
                  newItemOutward.DayOutward = me.masterData.DayOutward;
                  newItemOutward.DeliveryOutward = me.masterData.DeliveryOutward;
                  newItemOutward.ObjectOutward = me.masterData.ObjectOutward;
                  newItemOutward.TotalMoneyOutward = me.masterData.TotalMoneyOutward;
                  newItemOutward.ExplainOutward = me.masterData.ExplainOutward;
                  newItemOutward.DeliverOutward = me.masterData.DeliverOutward;
                  newItemOutward.ObjectNameOutward = me.masterData.ObjectNameOutward;
                  newItemOutward.TotalQuantityOutward = me.masterData.TotalQuantityOutward;
                }
              }
            });
            LocalStorageLibrary.setByKey("outwardItem", listOutward);
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
