<template src="./GoodsOrderDetail.html"></template>
<style lang="scss" scoped src="./GoodsOrderDetail.scss"></style>
<script lang="ts">
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
import GoodsOrderDetail from '@store-src/models/goods-order/GoodsOrderDetail';
import Button from '@library-src/models/qlch_control/qlch_button/Button';
import EButton from "qlch_control/EButton";


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
    EButton
  },

  data() {
    const lstGoodsOrderDetail: Ref<Array<GoodsOrderDetail>> = ref(new Array<GoodsOrderDetail>());
    const txtCodeProductOrder: Ref<Combobox> = ref(new Combobox({
      fieldText: "",
      require: false,
      maxLength: 255,
      data: [
        {
          value: "A123",
          display: "A123"
        },
        {
          value: "B123",
          display: "B123"
        }
      ],
      classType: "secondary"
    }));
    const txtNameProductOrder: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    const txtUnitProductOrder: Ref<Combobox> = ref(new Combobox({
      fieldText: "",
      require: false,
      maxLength: 255,
      data: [
        {
          value: "Chiếc",
          display: "Chiếc"
        },
        {
          value: "Bộ",
          display: "Bộ"
        }
      ],
      classType: "secondary"
    }));
    const txtNumberProductOrder: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    const txtUnitPriceOrder: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    const txtPaymentOrder: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));

    return {
      lstGoodsOrderDetail,
      txtCodeProductOrder,
      txtNameProductOrder,
      txtUnitProductOrder,
      txtNumberProductOrder,
      txtUnitPriceOrder,
      txtPaymentOrder


    }
  },
  created() {
    try {
      //lấy giá trị khóa phụ trong masterData
      const me = this;
      if (me.masterData) {
        const privateKey = me.masterData['GoodsOrderId'];
        if (privateKey) {
          const localStorageGoodsOrderDetail = LocalStorageLibrary.getByKey<Array<GoodsOrderDetail>>("goodsOrderDetail");
          if (localStorageGoodsOrderDetail && localStorageGoodsOrderDetail.length > 0) {
            me.lstGoodsOrderDetail = localStorageGoodsOrderDetail.filter(item => {
              return item.GoodsOrderId == privateKey;
            })
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

  },

  setup() {
    const thisData: Ref<GoodsOrderDetail> = ref(new GoodsOrderDetail());
    const btnAddListTable: Button = new Button({
      fieldText: "Thêm dòng",
      classType: "primary"
    });
    const btnDelListTable: Button = new Button({
      fieldText: "Xóa dòng",
      classType: "secondary"
    });
    return {
      thisData,
      btnAddListTable,
      btnDelListTable
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
          readOnly: false,
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
      }
    },

    AddListTable() {
      try {
        const me = this;
        if (me.lstGoodsOrderDetail?.length > 0) {
          me.lstGoodsOrderDetail.push(new GoodsOrderDetail());
        } else {
          me.lstGoodsOrderDetail = new Array<GoodsOrderDetail>({});
        }
      } catch (error) {
        console.log(error);
      }
    },

    saveData() {
      const me = this;
      console.log(me.lstGoodsOrderDetail);
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

          //cất detail
          //gán khoá phụ cho detail
          if (me.lstGoodsOrderDetail?.length > 0) {
            me.lstGoodsOrderDetail.forEach(detailItem => {
              if (me.masterData) {
                detailItem.GoodsOrderId = me.masterData['GoodsOrderId'];
              }
            });
            //end gán khoá phụ

            let listGoodsOrderDetail: Array<GoodsOrderDetail> | null = new Array<GoodsOrderDetail>;
            listGoodsOrderDetail = LocalStorageLibrary.getByKey<Array<GoodsOrderDetail>>("goodsOrderDetail");
            if (listGoodsOrderDetail) {
              listGoodsOrderDetail.push(...me.lstGoodsOrderDetail);
              LocalStorageLibrary.setByKey("goodsOrderDetail", listGoodsOrderDetail);
            }
            else {
              listGoodsOrderDetail = new Array<GoodsOrderDetail>(...me.lstGoodsOrderDetail);
              LocalStorageLibrary.setByKey("goodsOrderDetail", listGoodsOrderDetail);
            }
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
