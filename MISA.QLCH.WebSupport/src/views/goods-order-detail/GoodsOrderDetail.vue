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
import Vendor from '@store-src/models/vendor/Vendor';
import Employee from '@store-src/models/employee/Employee';
import Product from '@store-src/models/product/Product';


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
    const lstCodeProductOrder = LocalStorageLibrary.getByKey<Array<Product>>("Product") ?? new Array<Product>();
    const txtCodeProductOrder: Ref<Combobox> = ref(new Combobox({
      fieldText: "",
      require: false,
      maxLength: 255,
      data: lstCodeProductOrder,
      valueField: "CodeProductList",
      displayField: "CodeProductList",
      classType: "secondary"
    }));
    const txtNameProductOrder: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    // const txtUnitProductOrder: Ref<Combobox> = ref(new Combobox({
    //   fieldText: "",
    //   require: false,
    //   maxLength: 255,
    //   data: [
    //     {
    //       value: "Chiếc",
    //       display: "Chiếc"
    //     },
    //     {
    //       value: "Bộ",
    //       display: "Bộ"
    //     }
    //   ],
    //   classType: "secondary"
    // }));
    const txtUnitProductOrder: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
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
      const lstSupplierOrder = LocalStorageLibrary.getByKey<Array<Vendor>>("Vendor") ?? new Array<Vendor>();
      const lstPersonOrder = LocalStorageLibrary.getByKey<Array<Employee>>("employee") ?? new Array<Employee>();
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
          data: lstPersonOrder,
          valueField: "CodeEmployee",
          displayField: "CodeEmployee",
          bindingIndex: "PersonOrder"
        }),
        "txtSupplierOrder": new Combobox({
          fieldText: "Nhà cung cấp",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: lstSupplierOrder,
          valueField: "CodeVendor",
          displayField: "CodeVendor",
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

    DelListTable(item: GoodsOrderDetail) {
      const me = this;
      if (item && me.lstGoodsOrderDetail?.length > 0) {
        me.lstGoodsOrderDetail = me.lstGoodsOrderDetail.filter(detail => {
          return detail.GoodsOrderDetailId != item.GoodsOrderDetailId;
        })
      }
      //Tính lại tổng tiền
      if (me.masterData) {
        me.masterData['FullMoneyOrder'] = 0;
        me.masterData['TotalOrder'] = 0;
      }

      for (let index = 0; index < me.lstGoodsOrderDetail.length; index++) {
        const element = me.lstGoodsOrderDetail[index];
        if (me.masterData) {
          me.masterData['FullMoneyOrder'] += element.PaymentOrder ?? 0;
          me.masterData['TotalOrder'] += element.NumberProductOrder ?? 0;
        }
      }
    },

    ShowNameVendor(value: any) {
      // debugger
      const me = this;
      const listVendor = LocalStorageLibrary.getByKey<Array<Vendor>>("Vendor");
      if (listVendor && listVendor.length > 0 && me.masterData) {
        // const vendorCode = me.masterData['SupplierOrder'];
        if (value) {
          let rowVendorByVendorCode = new Vendor();
          for (let index = 0; index < listVendor.length; index++) {
            const rowVendor = listVendor[index];
            if (rowVendor.CodeVendor == value) {
              rowVendorByVendorCode = rowVendor;
              break;
            }

          }
          if (rowVendorByVendorCode) {
            me.masterData['SupplierNameOrder'] = rowVendorByVendorCode.NameVendor;
          }
        }
      }


    },
    ShowNameEmployee(value: any) {
      const me = this;
      const listEmployee = LocalStorageLibrary.getByKey<Array<Employee>>("employee");
      if (listEmployee && listEmployee.length > 0 && me.masterData) {
        // const vendorCode = me.masterData['SupplierOrder'];
        if (value) {
          let rowVendorByEmployeeCode = new Employee();
          for (let index = 0; index < listEmployee.length; index++) {
            const rowVendor = listEmployee[index];
            if (rowVendor.CodeEmployee == value) {
              rowVendorByEmployeeCode = rowVendor;
              break;
            }

          }
          if (rowVendorByEmployeeCode) {
            me.masterData['PersonOrderName'] = rowVendorByEmployeeCode.NameEmployee;
          }
        }
      }

    },
    ShowNameProduct(value: any, item: GoodsOrderDetail) {
      const me = this;
      const listProduct = LocalStorageLibrary.getByKey<Array<Product>>("Product");
      if (listProduct && listProduct.length > 0 && me.masterData) {
        // const vendorCode = me.masterData['SupplierOrder'];
        if (value) {
          let rowProductByProductCode = new Product();
          for (let index = 0; index < listProduct.length; index++) {
            const rowProductDetail = listProduct[index];
            if (rowProductDetail.CodeProductList == value) {
              rowProductByProductCode = rowProductDetail;
              break;
            }
          }
          if (rowProductByProductCode) {
            item.NameProductOrder = rowProductByProductCode.NameProductList;
            item.UnitProductOrder = rowProductByProductCode.UnitProductList;
            item.UnitPriceOrder = rowProductByProductCode.PurchasePriceProductList;
          }
        }
      }
    },

    ShowPaymentOrder(value: number, item: GoodsOrderDetail) {

      const me = this;
      if (item.UnitPriceOrder) {
        item.PaymentOrder = item.UnitPriceOrder * value;
      }
      ///tinh lai tong tien
      if (me.masterData) {
        me.masterData['FullMoneyOrder'] = 0;
        me.masterData['TotalOrder'] = 0;
      }

      for (let index = 0; index < me.lstGoodsOrderDetail.length; index++) {
        const element = me.lstGoodsOrderDetail[index];
        if (me.masterData && element) {

          me.masterData['FullMoneyOrder'] += element.PaymentOrder ?? 0;
          me.masterData['TotalOrder'] += element.NumberProductOrder ?? 0;
        }
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
              listGoodsOrderDetail = listGoodsOrderDetail.filter(item => {
                if (me.masterData) {
                  return item.GoodsOrderId != me.masterData['GoodsOrderId'];
                }
              });
              listGoodsOrderDetail.push(...me.lstGoodsOrderDetail);
              LocalStorageLibrary.setByKey("goodsOrderDetail", listGoodsOrderDetail);
            }
            else {
              listGoodsOrderDetail = new Array<GoodsOrderDetail>(...me.lstGoodsOrderDetail);
              LocalStorageLibrary.setByKey("goodsOrderDetail", listGoodsOrderDetail);
            }
          } else {
            let listGoodsOrderDetail: Array<GoodsOrderDetail> | null = new Array<GoodsOrderDetail>;
            listGoodsOrderDetail = LocalStorageLibrary.getByKey<Array<GoodsOrderDetail>>("goodsOrderDetail");
            if (listGoodsOrderDetail) {
              listGoodsOrderDetail = listGoodsOrderDetail.filter(item => {
                if (me.masterData) {
                  return item.GoodsOrderId != me.masterData['GoodsOrderId'];
                }
              });
              listGoodsOrderDetail.push(...me.lstGoodsOrderDetail);
              LocalStorageLibrary.setByKey("goodsOrderDetail", listGoodsOrderDetail);
            }
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
