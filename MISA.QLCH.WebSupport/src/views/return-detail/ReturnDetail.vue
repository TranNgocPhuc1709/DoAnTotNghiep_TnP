<template src="./ReturnDetail.html"></template>
<style lang="scss" scoped src="./ReturnDetail.scss"></style>
<script lang="ts">
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
import Return from '@store-src/models/return/Return';
import ReturnDetail from '@store-src/models/return/ReturnDetail';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Guid from '@library-src/utilities/types/Guid';
import Button from '@library-src/models/qlch_control/qlch_button/Button';
import EButton from "qlch_control/EButton";
import Vendor from '@store-src/models/vendor/Vendor';
import Employee from '@store-src/models/employee/Employee';
import Product from '@store-src/models/product/Product';
import DictionaryStock from '@store-src/models/dictionary-stock/DictionaryStock';


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
    const lstReturnDetail: Ref<Array<ReturnDetail>> = ref(new Array<ReturnDetail>());
    const lstCodeProductReturn = LocalStorageLibrary.getByKey<Array<Product>>("Product") ?? new Array<Product>();
    const lstWarehouseProductReturn = LocalStorageLibrary.getByKey<Array<DictionaryStock>>("dictionaryStock") ?? new Array<DictionaryStock>();
    const txtCodeProductReturn: Ref<Combobox> = ref(new Combobox({
      fieldText: "",
      require: false,
      maxLength: 255,
      data: lstCodeProductReturn,
      valueField: "CodeProductList",
      displayField: "CodeProductList",
      classType: "secondary"
    }));
    const txtNameProductReturn: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    const txtWarehouseProductReturn: Ref<Combobox> = ref(new Combobox({
      fieldText: "",
      require: false,
      maxLength: 255,
      data: lstWarehouseProductReturn,
      valueField: "NameStore",
      displayField: "NameStore",
      classType: "secondary"
    }));
    const txtUnitProductReturn: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));

    const txtNumberProductReturn: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    const txtUnitPriceReturn: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    const txtPaymentReturn: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));

    return {
      txtCodeProductReturn,
      txtNameProductReturn,
      txtWarehouseProductReturn,
      txtNumberProductReturn,
      txtUnitProductReturn,
      txtUnitPriceReturn,
      txtPaymentReturn,
      lstReturnDetail
    };
  },

  created() {
    try {
      console.log(this.masterData);
      //lấy giá trị khóa phụ trong masterData
      const me = this;
      if (me.masterData) {
        const privateKey = me.masterData['ReturnId'];
        if (privateKey) {
          const localStorageReturnDetail = LocalStorageLibrary.getByKey<Array<ReturnDetail>>("returnDetail");
          if (localStorageReturnDetail && localStorageReturnDetail.length > 0) {
            me.lstReturnDetail = localStorageReturnDetail.filter(item => {
              return item.ReturnId == privateKey;
            })
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  setup() {
    const thisData: Ref<ReturnDetail> = ref(new ReturnDetail());
    const disableFormImport: Ref<boolean> = ref(true);
    const disableFormPayment: Ref<boolean> = ref(false);
    const navbar1Selected: Ref<boolean> = ref(false);
    const navbar2Selected: Ref<boolean> = ref(false);


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
      disableFormImport,
      disableFormPayment,
      navbar1Selected,
      navbar2Selected,
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
      return "Phiếu trả lại hàng mua";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const lstSupplierReturn = LocalStorageLibrary.getByKey<Array<Vendor>>("Vendor") ?? new Array<Vendor>();
      const lstRevenueOfficerReturn = LocalStorageLibrary.getByKey<Array<Employee>>("employee") ?? new Array<Employee>();
      const labelWidth = 115;
      return {
        "txtDateReturn": new DateModel({
          fieldText: "Ngày trả hàng",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DateReturn"
        }),
        "txtBillNumberReturn": new TextBox({
          fieldText: "Số phiếu xuất",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "BillNumberReturn"
        }),
        //ncc
        "txtSupplierReturn": new Combobox({
          fieldText: "Nhà cung cấp",
          require: false,
          maxLength: 255,
          data: lstSupplierReturn,
          valueField: "CodeVendor",
          displayField: "CodeVendor",
          labelWidth: labelWidth,
          bindingIndex: "SupplierReturn"
        }),
        "txtTotalMoneyReturn": new NumberModel({
          fieldText: "Thành tiền",
          readOnly: false,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "TotalMoneyReturn"
        }),
        "txtExplantReturn": new TextBox({
          fieldText: "Diễn giải",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ExplantReturn"
        }),
        "txtNameSupplierReturn": new TextBox({
          fieldText: "Tên nhà cung cấp",
          readOnly: true,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameSupplierReturn"
        }),
        "txtReceiverReturn": new TextBox({
          fieldText: "Người nhận",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ReceiverReturn"
        }),
        "txtAddressSupplierReturn": new TextBox({
          fieldText: "Địa chỉ",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "AddressSupplierReturn"
        }),
        //Tong so luong
        "txtTotalQuantityReturn": new NumberModel({
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
          bindingIndex: "TotalQuantityReturn"
        }),
        "txtReasonReturn": new TextBox({
          fieldText: "Lý do thu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ReasonReturn"
        }),
        "txtRevenueOfficer": new Combobox({
          fieldText: "Nhân viên thu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: lstRevenueOfficerReturn,
          valueField: "CodeEmployee",
          displayField: "CodeEmployee",
          bindingIndex: "RevenueOfficerReturn"
        }),
        "txtRevenueOfficerNameReturn": new TextBox({
          fieldText: "Tên nhân viên",
          require: false,
          readOnly: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "RevenueOfficerNameReturn"
        }),
        "txtReceiptNumberReturn": new TextBox({
          fieldText: "Số phiếu thu",
          require: false,
          readOnly: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ReceiptNumberReturn"
        }),
        "txtCollectionDateReturn": new DateModel({
          fieldText: "Ngày thu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "CollectionDateReturn"
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

    AddListTable() {
      try {
        const me = this;
        if (me.lstReturnDetail?.length > 0) {
          me.lstReturnDetail.push(new ReturnDetail());
        } else {
          me.lstReturnDetail = new Array<ReturnDetail>({});
        }
      } catch (error) {
        console.log(error);
      }
    },

    DelListTable(item: ReturnDetail) {
      const me = this;
      if (item && me.lstReturnDetail?.length > 0) {
        me.lstReturnDetail = me.lstReturnDetail.filter(detail => {
          return detail.ReturnDetailId != item.ReturnDetailId;
        })
      }

      // TÍnh lại giá trị
      if (me.masterData) {
        me.masterData['TotalMoneyReturn'] = 0;
        me.masterData['TotalQuantityReturn'] = 0;

      }

      for (let index = 0; index < me.lstReturnDetail.length; index++) {
        const element = me.lstReturnDetail[index];
        if (me.masterData && element) {
          me.masterData['TotalMoneyReturn'] += element.PaymentReturn ?? 0;
          me.masterData['TotalQuantityReturn'] += element.NumberProductReturn ?? 0;

        }
      }
    },
    ShowNameVendor(value: any) {
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
            me.masterData['NameSupplierReturn'] = rowVendorByVendorCode.NameVendor;
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
          let rowEmployeeByEmployeeCode = new Employee();
          for (let index = 0; index < listEmployee.length; index++) {
            const rowVendor = listEmployee[index];
            if (rowVendor.CodeEmployee == value) {
              rowEmployeeByEmployeeCode = rowVendor;
              break;
            }
          }
          if (rowEmployeeByEmployeeCode) {
            me.masterData['RevenueOfficerNameReturn'] = rowEmployeeByEmployeeCode.NameEmployee;
          }
        }
      }
    },
    ShowNameProduct(value: any, item: ReturnDetail) {
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
            item.NameProductReturn = rowProductByProductCode.NameProductList;
            item.UnitProductReturn = rowProductByProductCode.UnitProductList;
            item.UnitPriceReturn = rowProductByProductCode.PurchasePriceProductList;
          }
        }
      }
    },

    ShowPaymentReturn(value: number, item: ReturnDetail) {
      const me = this;
      if (item.UnitPriceReturn) {
        item.PaymentReturn = item.UnitPriceReturn * value;
      }
      ///tinh lai tong tien
      if (me.masterData) {
        me.masterData['TotalMoneyReturn'] = 0;
        me.masterData['TotalQuantityReturn'] = 0;

      }

      for (let index = 0; index < me.lstReturnDetail.length; index++) {
        const element = me.lstReturnDetail[index];
        if (me.masterData && element) {
          me.masterData['TotalMoneyReturn'] += element.PaymentReturn ?? 0;
          me.masterData['TotalQuantityReturn'] += element.NumberProductReturn ?? 0;

        }
      }
    },

    saveData() {
      const me = this;
      let listReturn: Array<Return> | null = new Array<Return>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['ReturnId'] = Guid.NewGuid();
          listReturn = LocalStorageLibrary.getByKey<Array<Return>>("returnItem");
          if (listReturn) {
            listReturn.push(me.masterData);
            LocalStorageLibrary.setByKey("returnItem", listReturn);
          }
          else {
            listReturn = new Array<Return>({ ...me.masterData });
            LocalStorageLibrary.setByKey("returnItem", listReturn);
          }

          //cất detail
          //gán khoá phụ cho detail
          if (me.lstReturnDetail?.length > 0) {
            me.lstReturnDetail.forEach(detailItem => {
              if (me.masterData) {
                detailItem.ReturnId = me.masterData['ReturnId'];
              }
            });
            //end gán khoá phụ

            let listReturnDetail: Array<ReturnDetail> | null = new Array<ReturnDetail>;
            listReturnDetail = LocalStorageLibrary.getByKey<Array<ReturnDetail>>("returnDetail");
            if (listReturnDetail) {
              listReturnDetail.push(...me.lstReturnDetail);
              LocalStorageLibrary.setByKey("returnDetail", listReturnDetail);
            }
            else {
              listReturnDetail = new Array<ReturnDetail>(...me.lstReturnDetail);
              LocalStorageLibrary.setByKey("returnDetail", listReturnDetail);
            }
          }
        }
        if (me.masterData.editMode == 2) {
          listReturn = LocalStorageLibrary.getByKey<Array<Return>>("returnItem");
          if (listReturn) {
            listReturn.forEach(newItemReturn => {
              if (me.masterData) {
                if (newItemReturn.ReturnId == me.masterData.ReturnId) {
                  newItemReturn.DateReturn = me.masterData.DateReturn;
                  newItemReturn.BillNumberReturn = me.masterData.BillNumberReturn;
                  newItemReturn.SupplierReturn = me.masterData.SupplierReturn;
                  newItemReturn.TotalMoneyReturn = me.masterData.TotalMoneyReturn;
                  newItemReturn.ExplantReturn = me.masterData.ExplantReturn;
                  newItemReturn.NameSupplierReturn = me.masterData.NameSupplierReturn;
                  newItemReturn.ReceiverReturn = me.masterData.ReceiverReturn;
                  newItemReturn.AddressSupplierReturn = me.masterData.AddressSupplierReturn;
                  newItemReturn.TotalQuantityReturn = me.masterData.TotalQuantityReturn;
                  newItemReturn.ReasonReturn = me.masterData.ReasonReturn;
                  newItemReturn.RevenueOfficerReturn = me.masterData.RevenueOfficerReturn;
                  newItemReturn.RevenueOfficerNameReturn = me.masterData.RevenueOfficerNameReturn;
                  newItemReturn.ReceiptNumberReturn = me.masterData.ReceiptNumberReturn;
                  newItemReturn.CollectionDateReturn = me.masterData.CollectionDateReturn;

                }
              }
            });
            LocalStorageLibrary.setByKey("returnItem", listReturn);
          }

          //cất detail
          //gán khoá phụ cho detail
          if (me.lstReturnDetail?.length > 0) {
            me.lstReturnDetail.forEach(detailItem => {
              if (me.masterData) {
                detailItem.ReturnId = me.masterData['ReturnId'];
              }
            });
            //end gán khoá phụ

            let listReturnDetail: Array<ReturnDetail> | null = new Array<ReturnDetail>;
            listReturnDetail = LocalStorageLibrary.getByKey<Array<ReturnDetail>>("returnDetail");
            if (listReturnDetail) {
              listReturnDetail = listReturnDetail.filter(item => {
                if (me.masterData) {
                  return item.ReturnId != me.masterData['ReturnId'];
                }
              });
              listReturnDetail.push(...me.lstReturnDetail);
              LocalStorageLibrary.setByKey("returnDetail", listReturnDetail);
            }
            else {
              listReturnDetail = new Array<ReturnDetail>(...me.lstReturnDetail);
              LocalStorageLibrary.setByKey("returnDetail", listReturnDetail);
            }
          } else {
            let listReturnDetail: Array<ReturnDetail> | null = new Array<ReturnDetail>;
            listReturnDetail = LocalStorageLibrary.getByKey<Array<ReturnDetail>>("returnDetail");
            if (listReturnDetail) {
              listReturnDetail = listReturnDetail.filter(item => {
                if (me.masterData) {
                  return item.ReturnId != me.masterData['ReturnId'];
                }
              });
              listReturnDetail.push(...me.lstReturnDetail);
              LocalStorageLibrary.setByKey("returnDetail", listReturnDetail);
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
