<template src="./GoodsOrderDetail.html"></template>
<style lang="scss" scoped src="./GoodsOrderDetail.scss"></style>
<script lang="ts">
import GoodsOrderDetail from './GoodsOrderDetail';
import { PropType, Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import EDate from "qlch_control/EDate";
import ECombobox from "qlch_control/ECombobox";
import ENumber from "qlch_control/ENumber";
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Guid from '@library-src/utilities/types/Guid';
import GoodsOrder from '@store-src/models/goods-order/GoodsOrder';





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
  },

  setup() {
    const thisData: Ref<GoodsOrderDetail> = ref(new GoodsOrderDetail());

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
      return "Phiếu đặt hàng";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtDateOrder": new DateModel({
          fieldText: "Ngày đặt hàng",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DateOrder"
        }),
        "txtNumberOrder": new TextBox({
          fieldText: "Số phiếu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NumberOrder"
        }),
        "txtPersonOrder": new Combobox({
          fieldText: "Người đặt",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "TNP",
              display: "TNP"
            }
          ],
          bindingIndex: "PersonOrder"
        }),
        "txtSupplierOrder": new Combobox({
          fieldText: "Nhà cung cấp",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "NCC001",
              display: "NCC001"
            }
          ],
          bindingIndex: "SupplierOrder"
        }),
        "txtFullMoneyOrder": new NumberModel({
          fieldText: "Tổng tiền",
          maxLength: 255,
          readOnly: false,
          labelWidth: 80,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "FullMoneyOrder"
        }),
        "txtStatusOrder": new Combobox({
          fieldText: "Trạng thái",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "Đã thực hiện",
              display: "Đã thực hiện"
            },
            {
              value: "Chưa thực hiện",
              display: "Chưa thực hiện"
            },
          ],
          bindingIndex: "StatusOrder"
        }),
        "txtExplainOrder": new TextBox({
          fieldText: "Diễn giải",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ExplainOrder"
        }),
        "txtSupplierNameOrder": new TextBox({
          fieldText: "Tên nhà cung cấp",
          require: false,
          readOnly: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "SupplierNameOrder"
        }),
        "txtPersonOrderName": new TextBox({
          fieldText: "Tên người đặt",
          require: false,
          readOnly: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "PersonOrderName"
        }),
        "txtTotalOrder": new NumberModel({
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
          bindingIndex: "TotalOrder"
        }),



        // Grid Table

        "txtCodeProductOrder": new Combobox({
          fieldText: "",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "1",
              display: "123"
            },
            {
              value: "CODE",
              display: "Code"
            }
          ],
          classType: "secondary",
          bindingIndex: "CodeProductOrder"
        }),
        "txtNameProductOrder": new TextBox({
          fieldText: "",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          classType: "tertiary",
          bindingIndex: "NameProductOrder"
        }),
        "txtUnitProductOrder": new Combobox({
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
          bindingIndex: "UnitProductOrder"
        }),
        // "txtNumberProductOrder": new TextBox({
        //   fieldText: "",
        //   require: false,
        //   readOnly: false,
        //   maxLength: 255,
        //   type: "number",
        //   classType: "tertiary",
        //   bindingIndex: "NumberProductOrder"
        // }),

        "txtNumberProductOrder": new NumberModel({
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
          bindingIndex: "NumberProductOrder"
        }),

        "txtUnitPriceOrder": new NumberModel({
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
          bindingIndex: "UnitPriceOrder"
        }),
        "txtPaymentOrder": new NumberModel({
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
          bindingIndex: "PaymentOrder"
        }),
      }
    },

    saveData() {
      const me = this;
      let listGoodsOrder: Array<GoodsOrder> | null = new Array<GoodsOrder>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['GoodsOrderId'] = Guid.NewGuid();
          listGoodsOrder = LocalStorageLibrary.getByKey<Array<GoodsOrder>>("goodsOrder");
          if (listGoodsOrder) {
            listGoodsOrder.push(me.masterData);
            LocalStorageLibrary.setByKey("goodsOrder", listGoodsOrder);
          }
          else {
            listGoodsOrder = new Array<GoodsOrder>({ ...me.masterData });
            LocalStorageLibrary.setByKey("goodsOrder", listGoodsOrder);
          }
        }
        if (me.masterData.editMode == 2) {
          listGoodsOrder = LocalStorageLibrary.getByKey<Array<GoodsOrder>>("goodsOrder");
          if (listGoodsOrder) {
            listGoodsOrder.forEach(newItemGoodsOrder => {
              if (me.masterData) {
                if (newItemGoodsOrder.GoodsOrderId == me.masterData.GoodsOrderId) {
                  newItemGoodsOrder.DateOrder = me.masterData.DateOrder;
                  newItemGoodsOrder.NumberOrder = me.masterData.NumberOrder;
                  newItemGoodsOrder.PersonOrder = me.masterData.PersonOrder;
                  newItemGoodsOrder.SupplierOrder = me.masterData.SupplierOrder;
                  newItemGoodsOrder.FullMoneyOrder = me.masterData.FullMoneyOrder;
                  newItemGoodsOrder.StatusOrder = me.masterData.StatusOrder;
                  newItemGoodsOrder.ExplainOrder = me.masterData.ExplainOrder;
                  newItemGoodsOrder.SupplierNameOrder = me.masterData.SupplierNameOrder;
                  newItemGoodsOrder.PersonOrderName = me.masterData.PersonOrderName;
                  newItemGoodsOrder.TotalOrder = me.masterData.TotalOrder;
                }
              }
            });
            LocalStorageLibrary.setByKey("goodsOrder", listGoodsOrder);
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
