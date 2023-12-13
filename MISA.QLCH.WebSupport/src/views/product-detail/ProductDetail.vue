<template src="./ProductDetail.html"></template>
<style lang="scss" scoped src="./ProductDetail.scss"></style>
<script lang="ts">
import ProductDetail from './ProductDetail';
import { PropType, Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import ENumber from "qlch_control/ENumber";
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Guid from '@library-src/utilities/types/Guid';
import Product from '@store-src/models/product/Product';
import CategoryItem from '@store-src/models/category-item/CategoryItem';
import Unit from '@store-src/models/unit/Unit';
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
    ECombobox,
    ENumber,

  },

  setup() {
    const thisData: Ref<ProductDetail> = ref(new ProductDetail());
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
      return "Thông Tin Sản Phẩm";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const lstGroupProductList = LocalStorageLibrary.getByKey<Array<CategoryItem>>("CategoryItem") ?? new Array<CategoryItem>()
      const lstUnitProductList = LocalStorageLibrary.getByKey<Array<Unit>>("Unit") ?? new Array<Unit>()

      const labelWidth = 135;
      // return {
      //   "txtColumn1": new TextBox({
      //     fieldText: "Mã Sản Phẩm",
      //     require: true,
      //     maxLength: 255,
      //     labelWidth: labelWidth,
      //     bindingIndex: "Column1"
      //   }),
      //   "txtColumn2": new TextBox({
      //     fieldText: "Tên Sản Phẩm",
      //     require: true,
      //     maxLength: 255,
      //     labelWidth: labelWidth,
      //     bindingIndex: "Column2"
      //   }),
      //   "txtColumn3": new Combobox({
      //     fieldText: "Nhóm Sản Phẩm",
      //     require: false,
      //     maxLength: 255,
      //     labelWidth: labelWidth,
      //     bindingIndex: "Column3",
      //     data: [
      //       {
      //         value: 1,
      //         display: "G1"
      //       },
      //       {
      //         value: 2,
      //         display: "G2"
      //       },
      //       {
      //         value: 3,
      //         display: "G3"
      //       },
      //     ]
      //   }),
      //   "txtColumn4": new Combobox({
      //     fieldText: "Đơn Vị Tính",
      //     require: false,
      //     maxLength: 255,
      //     labelWidth: labelWidth,
      //     bindingIndex: "Column4",
      //     data: [
      //       {
      //         value: 1,
      //         display: "Chiếc"
      //       },
      //       {
      //         value: 2,
      //         display: "Cái"
      //       },
      //       {
      //         value: 3,
      //         display: "Combo"
      //       },
      //     ]
      //   }),
      //   "txtColumn5": new NumberModel({
      //     fieldText: "Giá mua",
      //     require: false,
      //     maxLength: 255,
      //     labelWidth: labelWidth,
      //     format: new NumberFormat({
      //       decimal: ".",
      //       thousands: ",",
      //       precision: 3
      //     }),
      //     bindingIndex: "Column5"
      //   }),
      //   "txtColumn12": new NumberModel({
      //     fieldText: "Giá bán",
      //     require: false,
      //     maxLength: 255,
      //     labelWidth: labelWidth,
      //     format: new NumberFormat({
      //       decimal: ".",
      //       thousands: ",",
      //       precision: 3
      //     }),
      //     bindingIndex: "Column12"
      //   }),

      //   "txtColumn6": new Checkbox({
      //     fieldText: "Hiển thị trên trang bán hàng",
      //     bindingIndex: "Column6",
      //   }),
      //   "txtColumn7": new TextBox({
      //     fieldText: "Màu sắc",
      //     placeholder: "Xanh, Đỏ, Vàng,..",
      //     require: false,
      //     maxLength: 255,
      //     labelWidth: labelWidth,
      //     bindingIndex: "Column7"
      //   }),
      //   "txtColumn8": new TextBox({
      //     fieldText: "Size",
      //     placeholder: "S,M,L,XL,...",
      //     require: false,
      //     maxLength: 255,
      //     labelWidth: labelWidth,
      //     bindingIndex: "Column8"
      //   }),
      //   "txtColumn9": new NumberModel({
      //     fieldText: "Tồn kho ban đầu",
      //     require: false,
      //     maxLength: 255,
      //     labelWidth: labelWidth,
      //     format: new NumberFormat({
      //       decimal: ".",
      //       thousands: ",",
      //       precision: 0
      //     }),
      //     bindingIndex: "Column9"
      //   }),
      //   "txtColumn10": new NumberModel({
      //     fieldText: "Tồn kho tối thiểu",
      //     require: false,
      //     maxLength: 255,
      //     labelWidth: labelWidth,
      //     format: new NumberFormat({
      //       decimal: ".",
      //       thousands: ",",
      //       precision: 0
      //     }),
      //     bindingIndex: "Column10"
      //   }),
      //   "txtColumn11": new NumberModel({
      //     fieldText: "Tồn kho tối đa",
      //     require: false,
      //     maxLength: 255,
      //     labelWidth: labelWidth,
      //     format: new NumberFormat({
      //       decimal: ".",
      //       thousands: ",",
      //       precision: 0
      //     }),
      //     bindingIndex: "Column11"
      //   }),

      // }
      return {
        "txtCodeProductList": new TextBox({
          fieldText: "Mã Hàng Hóa",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "CodeProductList"
        }),
        "txtNameProductList": new TextBox({
          fieldText: "Tên Hàng Hóa",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameProductList"
        }),
        "txtGroupProductList": new Combobox({
          fieldText: "Nhóm Hàng Hóa",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: lstGroupProductList,
          valueField: "NameGroupCategory",
          displayField: "NameGroupCategory",
          bindingIndex: "GroupProductList",
        }),
        "txtUnitProductList": new Combobox({
          fieldText: "Đơn Vị Tính",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: lstUnitProductList,
          valueField: "CodeUnitList",
          displayField: "CodeUnitList",
          bindingIndex: "UnitProductList",


        }),
        "txtPurchasePriceProductList": new NumberModel({
          fieldText: "Giá mua",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 3
          }),
          bindingIndex: "PurchasePriceProductList"
        }),

        "txtShowDisplayProduct": new Combobox({
          fieldText: "Hiển thị trên danh sách bán hàng",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "Có",
              display: "Có"
            },
            {
              value: "không",
              display: "Không"
            }
          ],
          bindingIndex: "ShowDisplayProduct",
        }),
        "txtProductInventory": new NumberModel({
          fieldText: "Tồn kho ban đầu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "ProductInventory"
        }),
        "txtProductMinInventory": new NumberModel({
          fieldText: "Tồn kho tối thiểu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "ProductMinInventory"
        }),
        "txtProductMaxInventory": new NumberModel({
          fieldText: "Tồn kho tối đa",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "ProductMaxInventory"
        }),
        "txtPriceProductList": new NumberModel({
          fieldText: "Giá bán",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 3
          }),
          bindingIndex: "PriceProductList"
        }),
        "txtStatusProductList": new Combobox({
          fieldText: "Trạng thái kinh doanh",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "Đang kinh doanh",
              display: "Đang kinh doanh"
            },
            {
              value: "Ngừng kinh doanh",
              display: "Ngừng kinh doanh"
            }
          ],
          bindingIndex: "StatusProductList",
        }),

      }
    },

    ShowNameGroupCategory() {

    },

    saveData() {
      const me = this;
      let listProduct: Array<Product> | null = new Array<Product>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['ProductId'] = Guid.NewGuid();
          listProduct = LocalStorageLibrary.getByKey<Array<Product>>("Product");
          if (listProduct) {
            listProduct.push(me.masterData);
            LocalStorageLibrary.setByKey("Product", listProduct);
          }
          else {
            listProduct = new Array<Product>({ ...me.masterData });
            LocalStorageLibrary.setByKey("Product", listProduct);
          }
        }
        if (me.masterData.editMode == 2) {
          listProduct = LocalStorageLibrary.getByKey<Array<Product>>("Product");
          if (listProduct) {
            listProduct.forEach(newItemProduct => {
              if (me.masterData) {
                if (newItemProduct.ProductId == me.masterData.ProductId) {
                  newItemProduct.CodeProductList = me.masterData.CodeProductList;
                  newItemProduct.NameProductList = me.masterData.NameProductList;
                  newItemProduct.GroupProductList = me.masterData.GroupProductList;
                  newItemProduct.UnitProductList = me.masterData.UnitProductList;
                  newItemProduct.PurchasePriceProductList = me.masterData.PurchasePriceProductList;
                  newItemProduct.ShowDisplayProduct = me.masterData.ShowDisplayProduct;
                  newItemProduct.ProductInventory = me.masterData.ProductInventory;
                  newItemProduct.PriceProductList = me.masterData.PriceProductList;
                  newItemProduct.StatusProductList = me.masterData.StatusProductList;
                  // newItemProduct.ProductMinInventory = me.masterData.ProductMinInventory;
                  // newItemProduct.ProductMaxInventory = me.masterData.ProductMaxInventory;

                }
              }
            });
            LocalStorageLibrary.setByKey("Product", listProduct);
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
