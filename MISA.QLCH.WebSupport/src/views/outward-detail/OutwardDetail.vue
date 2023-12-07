<template src="./OutwardDetail.html"></template>
<style lang="scss" scoped src="./OutwardDetail.scss"></style>
<script lang="ts">
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
import OutwardDetail from '@store-src/models/outward/OutwardDetail';
import Guid from '@library-src/utilities/types/Guid';
import Button from '@library-src/models/qlch_control/qlch_button/Button';
import EButton from "qlch_control/EButton";
import Product from '@store-src/models/product/Product';
import DictionaryStock from '@store-src/models/dictionary-stock/DictionaryStock';
import Employee from '@store-src/models/employee/Employee';

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
    EButton,
    ECombobox
  },


  data() {
    const lstOutwardDetail: Ref<Array<OutwardDetail>> = ref(new Array<OutwardDetail>());
    const lstCodeProductOutWard = LocalStorageLibrary.getByKey<Array<Product>>("Product") ?? new Array<Product>();
    const lstWarehouseProductOutWard = LocalStorageLibrary.getByKey<Array<DictionaryStock>>("dictionaryStock") ?? new Array<DictionaryStock>();
    const txtCodeProductOutWard: Ref<Combobox> = ref(new Combobox({
      fieldText: "",
      require: false,
      maxLength: 255,
      data: lstCodeProductOutWard,
      valueField: "CodeProductList",
      displayField: "CodeProductList",
      classType: "secondary"
    }));
    const txtNameProductOutWard: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    const txtWarehouseProductOutWard: Ref<Combobox> = ref(new Combobox({
      fieldText: "",
      require: false,
      maxLength: 255,
      data: lstWarehouseProductOutWard,
      valueField: "NameStore",
      displayField: "NameStore",
      classType: "secondary"
    }));
    const txtUnitProductOutWard: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    const txtNumberProductOutWard: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    const txtUnitPriceOutWard: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    const txtPurchaseOutWard: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    const txtPaymentOutWard: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));

    return {
      lstOutwardDetail,
      txtCodeProductOutWard,
      txtNameProductOutWard,
      txtWarehouseProductOutWard,
      txtUnitProductOutWard,
      txtNumberProductOutWard,
      txtUnitPriceOutWard,
      txtPurchaseOutWard,
      txtPaymentOutWard


    }
  },
  created() {
    try {
      //lấy giá trị khóa phụ trong masterData
      const me = this;
      if (me.masterData) {
        const privateKey = me.masterData['OutwardId'];
        if (privateKey) {
          const localStorageOutwardDetail = LocalStorageLibrary.getByKey<Array<OutwardDetail>>("outwardDetail");
          if (localStorageOutwardDetail && localStorageOutwardDetail.length > 0) {
            me.lstOutwardDetail = localStorageOutwardDetail.filter(item => {
              return item.OutwardId == privateKey;
            })
          }
        }
      }


    } catch (error) {
      console.log(error);
    }

  },

  setup() {
    const thisData: Ref<OutwardDetail> = ref(new OutwardDetail());
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
      return "Thêm mới phiếu xuất kho";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      const lstObjectInward = LocalStorageLibrary.getByKey<Array<Employee>>("employee") ?? new Array<Employee>();
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
          data: lstObjectInward,
          valueField: "CodeEmployee",
          displayField: "CodeEmployee",
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
        "txtObjectNameOutward": new TextBox({
          fieldText: "Tên",
          readOnly: true,
          require: false,
          maxLength: 255,
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
      }
    },
    ShowNameInward(value: any) {
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
            me.masterData['ObjectNameOutward'] = rowVendorByEmployeeCode.NameEmployee;
          }
        }
      }
    },

    AddListTable() {
      try {
        const me = this;
        if (me.lstOutwardDetail?.length > 0) {
          me.lstOutwardDetail.push(new OutwardDetail());
        } else {
          me.lstOutwardDetail = new Array<OutwardDetail>({});
        }
      } catch (error) {
        console.log(error);
      }
    },
    DelListTable(item: OutwardDetail) {
      const me = this;
      if (item && me.lstOutwardDetail?.length > 0) {
        me.lstOutwardDetail = me.lstOutwardDetail.filter(detail => {
          return detail.OutWardDetailId != item.OutWardDetailId;
        })
      }
      ///tinh lai tong tien
      if (me.masterData) {
        me.masterData['TotalMoneyOutward'] = 0;
        me.masterData['TotalQuantityOutward'] = 0;
      }

      for (let index = 0; index < me.lstOutwardDetail.length; index++) {
        const element = me.lstOutwardDetail[index];
        if (me.masterData && element) {
          me.masterData['TotalMoneyOutward'] += element.PaymentOutWard ?? 0;
          me.masterData['TotalQuantityOutward'] += element.NumberProductOutWard ?? 0;
        }
      }
    },

    ShowNameProduct(value: any, item: OutwardDetail) {
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
            item.NameProductOutWard = rowProductByProductCode.NameProductList;
            item.UnitProductOutWard = rowProductByProductCode.UnitProductList;
            item.UnitPriceOutWard = rowProductByProductCode.PurchasePriceProductList;
          }
        }
      }
    },


    ShowPaymentOutward(value: number, item: OutwardDetail) {
      const me = this;
      if (item.UnitPriceOutWard) {
        item.PaymentOutWard = item.UnitPriceOutWard * value;
      }
      ///tinh lai tong tien
      if (me.masterData) {
        me.masterData['TotalMoneyOutward'] = 0;
        me.masterData['TotalQuantityOutward'] = 0;
      }

      for (let index = 0; index < me.lstOutwardDetail.length; index++) {
        const element = me.lstOutwardDetail[index];
        if (me.masterData && element) {
          me.masterData['TotalMoneyOutward'] += element.PaymentOutWard ?? 0;
          me.masterData['TotalQuantityOutward'] += element.NumberProductOutWard ?? 0;

        }
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

          //cất detail
          //gán khoá phụ cho detail
          if (me.lstOutwardDetail?.length > 0) {
            me.lstOutwardDetail.forEach(detailItem => {
              if (me.masterData) {
                detailItem.OutwardId = me.masterData['OutwardId'];
              }
            });
            //end gán khoá phụ

            let listOutwardDetail: Array<OutwardDetail> | null = new Array<OutwardDetail>;
            listOutwardDetail = LocalStorageLibrary.getByKey<Array<OutwardDetail>>("outwardDetail");
            if (listOutwardDetail) {
              listOutwardDetail.push(...me.lstOutwardDetail);
              LocalStorageLibrary.setByKey("outwardDetail", listOutwardDetail);
            }
            else {
              listOutwardDetail = new Array<OutwardDetail>(...me.lstOutwardDetail);
              LocalStorageLibrary.setByKey("outwardDetail", listOutwardDetail);
            }
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

          //cất detail
          //gán khoá phụ cho detail
          if (me.lstOutwardDetail?.length > 0) {
            me.lstOutwardDetail.forEach(detailItem => {
              if (me.masterData) {
                detailItem.OutwardId = me.masterData['OutwardId'];
              }
            });
            //end gán khoá phụ

            let listOutwardDetail: Array<OutwardDetail> | null = new Array<OutwardDetail>;
            listOutwardDetail = LocalStorageLibrary.getByKey<Array<OutwardDetail>>("outwardDetail");
            if (listOutwardDetail) {
              listOutwardDetail = listOutwardDetail.filter(item => {
                if (me.masterData) {
                  return item.OutwardId != me.masterData['OutwardId'];
                }
              });
              listOutwardDetail.push(...me.lstOutwardDetail);
              LocalStorageLibrary.setByKey("outwardDetail", listOutwardDetail);
            }
            else {
              listOutwardDetail = new Array<OutwardDetail>(...me.lstOutwardDetail);
              LocalStorageLibrary.setByKey("outwardDetail", listOutwardDetail);
            }
          } else {
            let listOutwardDetail: Array<OutwardDetail> | null = new Array<OutwardDetail>;
            listOutwardDetail = LocalStorageLibrary.getByKey<Array<OutwardDetail>>("outwardDetail");
            if (listOutwardDetail) {
              listOutwardDetail = listOutwardDetail.filter(item => {
                if (me.masterData) {
                  return item.OutwardId != me.masterData['OutwardId'];
                }
              });
              listOutwardDetail.push(...me.lstOutwardDetail);
              LocalStorageLibrary.setByKey("outwardDetail", listOutwardDetail);
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
