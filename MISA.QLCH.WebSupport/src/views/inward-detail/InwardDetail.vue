<template src="./InwardDetail.html"></template>
<style lang="scss" scoped src="./InwardDetail.scss"></style>
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
import ENumber from "qlch_control/ENumber";
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Guid from '@library-src/utilities/types/Guid';
import Inward from '@store-src/models/inward/Inward';
import InwardDetail from '@store-src/models/inward/InwardDetail';
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
    ECombobox,
    ENumber,
    EButton
  },

  data() {
    const lstInwardDetail: Ref<Array<InwardDetail>> = ref(new Array<InwardDetail>());
    const lstCodeProductInward = LocalStorageLibrary.getByKey<Array<Product>>("Product") ?? new Array<Product>();
    const lstWarehouseProductInward = LocalStorageLibrary.getByKey<Array<DictionaryStock>>("dictionaryStock") ?? new Array<DictionaryStock>();
    const txtCodeProductInward: Ref<Combobox> = ref(new Combobox({
      fieldText: "",
      require: false,
      maxLength: 255,
      data: lstCodeProductInward,
      valueField: "CodeProductList",
      displayField: "CodeProductList",
      classType: "secondary"
    }));
    const txtNameProductInward: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    const txtWarehouseProductInward: Ref<Combobox> = ref(new Combobox({
      fieldText: "",
      require: false,
      maxLength: 255,
      data: lstWarehouseProductInward,
      valueField: "NameStore",
      displayField: "NameStore",
      classType: "secondary"
    }));
    const txtUnitProductInward: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    const txtNumberProductInward: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    const txtUnitPriceInward: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    const txtPaymentInward: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));

    return {
      lstInwardDetail,
      txtCodeProductInward,
      txtNameProductInward,
      txtWarehouseProductInward,
      txtUnitProductInward,
      txtNumberProductInward,
      txtUnitPriceInward,
      txtPaymentInward,



    }
  },
  created() {
    try {
      //lấy giá trị khóa phụ trong masterData
      const me = this;
      if (me.masterData) {
        const privateKey = me.masterData['InwardId'];
        if (privateKey) {
          const localStorageInwardDetail = LocalStorageLibrary.getByKey<Array<InwardDetail>>("inwardDetail");
          if (localStorageInwardDetail && localStorageInwardDetail.length > 0) {
            me.lstInwardDetail = localStorageInwardDetail.filter(item => {
              return item.InwardId == privateKey;
            })
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  setup() {
    const thisData: Ref<InwardDetail> = ref(new InwardDetail());
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
      return "Thêm mới phiếu nhập kho";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      const lstObjectInward = LocalStorageLibrary.getByKey<Array<Employee>>("employee") ?? new Array<Employee>();
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
          data: lstObjectInward,
          valueField: "CodeEmployee",
          displayField: "CodeEmployee",
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
        "txtNameObjectInward": new TextBox({
          fieldText: "Tên",
          require: false,
          readOnly: true,
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
            me.masterData['NameObjectInward'] = rowVendorByEmployeeCode.NameEmployee;
          }
        }
      }
    },
    AddListTable() {
      try {
        const me = this;
        if (me.lstInwardDetail?.length > 0) {
          me.lstInwardDetail.push(new InwardDetail());
        } else {
          me.lstInwardDetail = new Array<InwardDetail>({});
        }
      } catch (error) {
        console.log(error);
      }
    },
    DelListTable(item: InwardDetail) {
      const me = this;
      if (item && me.lstInwardDetail?.length > 0) {
        me.lstInwardDetail = me.lstInwardDetail.filter(detail => {
          return detail.InwardDetailId != item.InwardDetailId;
        })
      }
      // Tính lại tổng tiền
      if (me.masterData) {
        me.masterData['TotalMoneyInward'] = 0;
        me.masterData['TotalInward'] = 0;
      }

      for (let index = 0; index < me.lstInwardDetail.length; index++) {
        const element = me.lstInwardDetail[index];
        if (me.masterData && element) {

          me.masterData['TotalMoneyInward'] += element.PaymentInward ?? 0;
          me.masterData['TotalInward'] += element.NumberProductInward ?? 0;
        }
      }
    },


    ShowNameProduct(value: any, item: InwardDetail) {
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
            item.NameProductInward = rowProductByProductCode.NameProductList;
            item.UnitProductInward = rowProductByProductCode.UnitProductList;
            item.UnitPriceInward = rowProductByProductCode.PurchasePriceProductList;
          }
        }
      }
    },

    ShowPaymentInward(value: number, item: InwardDetail) {
      const me = this;
      if (item.UnitPriceInward) {
        item.PaymentInward = item.UnitPriceInward * value;

      }

      if (me.masterData) {
        me.masterData['TotalMoneyInward'] = 0;
        me.masterData['TotalInward'] = 0;
      }

      for (let index = 0; index < me.lstInwardDetail.length; index++) {
        const element = me.lstInwardDetail[index];
        if (me.masterData && element) {

          me.masterData['TotalMoneyInward'] += element.PaymentInward ?? 0;
          me.masterData['TotalInward'] += element.NumberProductInward ?? 0;
        }
      }
    },

    saveData() {
      const me = this;
      console.log(me.lstInwardDetail);
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
          //cất detail
          //gán khoá phụ cho detail
          if (me.lstInwardDetail?.length > 0) {
            me.lstInwardDetail.forEach(detailItem => {
              if (me.masterData) {
                detailItem.InwardId = me.masterData['InwardId'];
              }
            });
            //end gán khoá phụ

            let listInwardDetail: Array<InwardDetail> | null = new Array<InwardDetail>;
            listInwardDetail = LocalStorageLibrary.getByKey<Array<InwardDetail>>("inwardDetail");
            if (listInwardDetail) {
              listInwardDetail.push(...me.lstInwardDetail);
              LocalStorageLibrary.setByKey("inwardDetail", listInwardDetail);
            }
            else {
              listInwardDetail = new Array<InwardDetail>(...me.lstInwardDetail);
              LocalStorageLibrary.setByKey("inwardDetail", listInwardDetail);
            }
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

          //cất detail
          //gán khoá phụ cho detail
          if (me.lstInwardDetail?.length > 0) {
            me.lstInwardDetail.forEach(detailItem => {
              if (me.masterData) {
                detailItem.InwardId = me.masterData['InwardId'];
              }
            });
            //end gán khoá phụ

            let listInwardDetail: Array<InwardDetail> | null = new Array<InwardDetail>;
            listInwardDetail = LocalStorageLibrary.getByKey<Array<InwardDetail>>("inwardDetail");
            if (listInwardDetail) {
              listInwardDetail = listInwardDetail.filter(item => {
                if (me.masterData) {
                  return item.InwardId != me.masterData['InwardId'];
                }
              });
              listInwardDetail.push(...me.lstInwardDetail);
              LocalStorageLibrary.setByKey("inwardDetail", listInwardDetail);
            }
            else {
              listInwardDetail = new Array<InwardDetail>(...me.lstInwardDetail);
              LocalStorageLibrary.setByKey("inwardDetail", listInwardDetail);
            }
          } else {
            let listInwardDetail: Array<InwardDetail> | null = new Array<InwardDetail>;
            listInwardDetail = LocalStorageLibrary.getByKey<Array<InwardDetail>>("inwardDetail");
            if (listInwardDetail) {
              listInwardDetail = listInwardDetail.filter(item => {
                if (me.masterData) {
                  return item.InwardId != me.masterData['InwardId'];
                }
              });
              listInwardDetail.push(...me.lstInwardDetail);
              LocalStorageLibrary.setByKey("inwardDetail", listInwardDetail);
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
