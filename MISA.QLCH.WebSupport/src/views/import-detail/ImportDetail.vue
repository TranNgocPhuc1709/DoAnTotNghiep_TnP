<template src="./ImportDetail.html"></template>
<style lang="scss" scoped src="./ImportDetail.scss"></style>
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
import Import from '@store-src/models/import/Import';
import ImportDetail from '@store-src/models/import/ImportDetail';
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
    ECombobox,
    EButton
  },
  data() {
    const lstImportDetail: Ref<Array<ImportDetail>> = ref(new Array<ImportDetail>());
    const lstCodeProductImport = LocalStorageLibrary.getByKey<Array<Product>>("Product") ?? new Array<Product>();
    const lstWarehouseProductImport = LocalStorageLibrary.getByKey<Array<DictionaryStock>>("dictionaryStock") ?? new Array<DictionaryStock>();
    const txtCodeProductImport: Ref<Combobox> = ref(new Combobox({
      fieldText: "",
      require: false,
      maxLength: 255,
      data: lstCodeProductImport,
      valueField: "CodeProductList",
      displayField: "CodeProductList",
      classType: "secondary"
    }));
    const txtNameProductImport: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    const txtWarehouseProductImport: Ref<Combobox> = ref(new Combobox({
      fieldText: "",
      require: false,
      maxLength: 255,
      data: lstWarehouseProductImport,
      valueField: "NameStore",
      displayField: "NameStore",
      classType: "secondary"
    }));
    const txtUnitProductImport: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      // data:,
      classType: "tertiary"
    }));

    const txtNumberProductImport: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    const txtUnitPriceImport: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    const txtPaymentImport: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));

    return {
      txtCodeProductImport,
      txtNameProductImport,
      txtWarehouseProductImport,
      txtNumberProductImport,
      txtUnitProductImport,
      txtUnitPriceImport,
      txtPaymentImport,
      lstImportDetail
    };
  },

  created() {
    try {
      console.log(this.masterData);
      //lấy giá trị khóa phụ trong masterData
      const me = this;
      if (me.masterData) {
        const privateKey = me.masterData['ImportId'];
        if (privateKey) {
          const localStorageImportDetail = LocalStorageLibrary.getByKey<Array<ImportDetail>>("importDetail");
          if (localStorageImportDetail && localStorageImportDetail.length > 0) {
            me.lstImportDetail = localStorageImportDetail.filter(item => {
              return item.ImportId == privateKey;
            })
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

  },
  setup() {
    const thisData: Ref<ImportDetail> = ref(new ImportDetail());
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
      return "Phiếu nhập hàng";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const lstSupplierImport = LocalStorageLibrary.getByKey<Array<Vendor>>("Vendor") ?? new Array<Vendor>();
      const lstStaffImport = LocalStorageLibrary.getByKey<Array<Employee>>("employee") ?? new Array<Employee>();
      const labelWidth = 115;
      return {
        "txtDateImport": new DateModel({
          fieldText: "Ngày nhập",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DateImport"
        }),
        "txtReceiptNumberImport": new TextBox({
          fieldText: "Số phiếu nhập",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ReceiptNumberImport"
        }),
        "txtSupplierImport": new Combobox({
          fieldText: "Nhà cung cấp",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: lstSupplierImport,
          valueField: "CodeVendor",
          displayField: "CodeVendor",
          bindingIndex: "SupplierImport"
        }),
        "txtIntoMoneyImport": new NumberModel({
          fieldText: "Thành tiền",
          require: false,
          readOnly: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "IntoMoneyImport"
        }),
        "txtStaffImport": new Combobox({
          fieldText: "Nhân viên mua hàng",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: lstStaffImport,
          valueField: "CodeEmployee",
          displayField: "CodeEmployee",
          bindingIndex: "StaffImport"
        }),
        "txtExplainImport": new TextBox({
          fieldText: "Diễn giải",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ExplainImport"
        }),

        //txt7
        "txtSupplierNameImport": new TextBox({
          fieldText: "Tên NCC",
          readOnly: false,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "SupplierNameImport"
        }),
        "txtStaffNameImport": new TextBox({
          fieldText: "Tên nhân viên",
          readOnly: true,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "StaffNameImport"
        }),
        "txtDeliverImport": new TextBox({
          fieldText: "Người giao",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DeliverImport"
        }),
        "txtTotalImport": new NumberModel({
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
          bindingIndex: "TotalImport"
        }),

        "txtReceiverImport": new TextBox({
          fieldText: "Người nhận",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ReceiverImport"
        }),
        "txtAddressImport": new TextBox({
          fieldText: "Địa chỉ",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "AddressImport"
        }),
        "txtReasonImport": new TextBox({
          fieldText: "Lý do chi",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ReasonImport"
        }),
        "txtVotesImport": new TextBox({
          fieldText: "Số phiếu chi",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "VotesImport"
        }),
        "txtVotesDateImport": new DateModel({
          fieldText: "Ngày chi",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "VotesDateImport"
        }),
        "txtTotalPaymentImport": new NumberModel({
          fieldText: "Tổng tiền thanh toán",
          require: false,
          readOnly: false,
          maxLength: 255,
          labelWidth: 150,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "TotalPaymentImport"
        }),

      }
    },

    AddListTable() {
      try {
        const me = this;
        if (me.lstImportDetail?.length > 0) {
          me.lstImportDetail.push(new ImportDetail());
        } else {
          me.lstImportDetail = new Array<ImportDetail>({});
        }
      } catch (error) {
        console.log(error);
      }
    },

    DelListTable(item: ImportDetail) {
      const me = this;
      if (item && me.lstImportDetail?.length > 0) {
        me.lstImportDetail = me.lstImportDetail.filter(detail => {
          return detail.ImportDetailId != item.ImportDetailId;
        })
      }
      //Tính lại tổng tiền
      if (me.masterData) {
        me.masterData['IntoMoneyImport'] = 0;
        me.masterData['TotalPaymentImport'] = 0;
        me.masterData['TotalImport'] = 0;
      }

      for (let index = 0; index < me.lstImportDetail.length; index++) {
        const element = me.lstImportDetail[index];
        if (me.masterData && element) {

          me.masterData['IntoMoneyImport'] += element.PaymentImport ?? 0;
          me.masterData['TotalPaymentImport'] += element.PaymentImport ?? 0;
          me.masterData['TotalImport'] += element.NumberProductImport ?? 0;
        }
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
            me.masterData['SupplierNameImport'] = rowVendorByVendorCode.NameVendor;
          }
        }
      }
    },
    ShowNameEmployee(value: any) {
      const me = this;
      const listEmployee = LocalStorageLibrary.getByKey<Array<Employee>>("employee")
      if (listEmployee && listEmployee.length > 0 && me.masterData) {
        // const vendorCode = me.masterData['SupplierOrder'];
        if (value) {
          let rowEmployeeByCodeEmployee = new Employee();
          for (let index = 0; index < listEmployee.length; index++) {
            const rowVendor = listEmployee[index];
            if (rowVendor.CodeEmployee == value) {
              rowEmployeeByCodeEmployee = rowVendor;
              break;
            }

          }
          if (rowEmployeeByCodeEmployee) {
            me.masterData['StaffNameImport'] = rowEmployeeByCodeEmployee.NameEmployee;
          }
        }
      }
    },

    ShowNameProduct(value: any, item: ImportDetail) {
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
            item.NameProductImport = rowProductByProductCode.NameProductList;
            item.UnitProductImport = rowProductByProductCode.UnitProductList;
            item.UnitPriceImport = rowProductByProductCode.PurchasePriceProductList;
          }
        }
      }
    },
    ShowPaymentImport(value: number, item: ImportDetail) {

      const me = this;
      if (item.UnitPriceImport) {
        item.PaymentImport = item.UnitPriceImport * value;

      }
      ///tinh lai tong tien
      if (me.masterData) {
        me.masterData['IntoMoneyImport'] = 0;
        me.masterData['TotalPaymentImport'] = 0;
        me.masterData['TotalImport'] = 0;
      }

      for (let index = 0; index < me.lstImportDetail.length; index++) {
        const element = me.lstImportDetail[index];
        if (me.masterData && element) {

          me.masterData['IntoMoneyImport'] += element.PaymentImport ?? 0;
          me.masterData['TotalPaymentImport'] += element.PaymentImport ?? 0;
          me.masterData['TotalImport'] += element.NumberProductImport ?? 0;
        }
      }
    },


    saveData() {
      const me = this;
      let listImport: Array<Import> | null = new Array<Import>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['ImportId'] = Guid.NewGuid();
          listImport = LocalStorageLibrary.getByKey<Array<Import>>("importList");
          if (listImport) {
            listImport.push(me.masterData);
            LocalStorageLibrary.setByKey("importList", listImport);
          }
          else {
            listImport = new Array<Import>({ ...me.masterData });
            LocalStorageLibrary.setByKey("importList", listImport);
          }

          //cất detail
          //gán khoá phụ cho detail
          if (me.lstImportDetail?.length > 0) {
            me.lstImportDetail.forEach(detailItem => {
              if (me.masterData) {
                detailItem.ImportId = me.masterData['ImportId'];
              }
            });
            //end gán khoá phụ

            let listImportDetail: Array<ImportDetail> | null = new Array<ImportDetail>;
            listImportDetail = LocalStorageLibrary.getByKey<Array<ImportDetail>>("importDetail");
            if (listImportDetail) {
              listImportDetail.push(...me.lstImportDetail);
              LocalStorageLibrary.setByKey("importDetail", listImportDetail);
            }
            else {
              listImportDetail = new Array<ImportDetail>(...me.lstImportDetail);
              LocalStorageLibrary.setByKey("importDetail", listImportDetail);
            }
          }
          //end cất detail
        }
        if (me.masterData.editMode == 2) {
          listImport = LocalStorageLibrary.getByKey<Array<Import>>("importList");
          if (listImport) {
            listImport.forEach(newItemImport => {
              if (me.masterData) {
                if (newItemImport.ImportId == me.masterData.ImportId) {
                  newItemImport.DateImport = me.masterData.DateImport;
                  newItemImport.ReceiptNumberImport = me.masterData.ReceiptNumberImport;
                  newItemImport.SupplierImport = me.masterData.SupplierImport;
                  newItemImport.IntoMoneyImport = me.masterData.IntoMoneyImport;
                  newItemImport.StaffImport = me.masterData.StaffImport;
                  newItemImport.ExplainImport = me.masterData.ExplainImport;
                  newItemImport.SupplierNameImport = me.masterData.SupplierNameImport;
                  newItemImport.StaffNameImport = me.masterData.StaffNameImport;
                  newItemImport.DeliverImport = me.masterData.DeliverImport;
                  newItemImport.TotalImport = me.masterData.TotalImport;
                  newItemImport.ReceiverImport = me.masterData.ReceiverImport;
                  newItemImport.AddressImport = me.masterData.AddressImport;
                  newItemImport.ReasonImport = me.masterData.ReasonImport;
                  newItemImport.VotesImport = me.masterData.VotesImport;
                  newItemImport.VotesDateImport = me.masterData.VotesDateImport;
                  newItemImport.TotalPaymentImport = me.masterData.TotalPaymentImport;

                }
              }
            });
            LocalStorageLibrary.setByKey("importList", listImport);
          }


          //cất detail
          //gán khoá phụ cho detail
          if (me.lstImportDetail?.length > 0) {
            me.lstImportDetail.forEach(detailItem => {
              if (me.masterData) {
                detailItem.ImportId = me.masterData['ImportId'];
              }
            });
            //end gán khoá phụ

            let listImportDetail: Array<ImportDetail> | null = new Array<ImportDetail>;
            listImportDetail = LocalStorageLibrary.getByKey<Array<ImportDetail>>("importDetail");
            if (listImportDetail) {
              listImportDetail = listImportDetail.filter(item => {
                if (me.masterData) {
                  return item.ImportId != me.masterData['ImportId'];
                }
              });
              listImportDetail.push(...me.lstImportDetail);
              LocalStorageLibrary.setByKey("importDetail", listImportDetail);
            }
            else {
              listImportDetail = new Array<ImportDetail>(...me.lstImportDetail);
              LocalStorageLibrary.setByKey("importDetail", listImportDetail);
            }
          } else {
            let listImportDetail: Array<ImportDetail> | null = new Array<ImportDetail>;
            listImportDetail = LocalStorageLibrary.getByKey<Array<ImportDetail>>("importDetail");
            if (listImportDetail) {
              listImportDetail = listImportDetail.filter(item => {
                if (me.masterData) {
                  return item.ImportId != me.masterData['ImportId'];
                }
              });
              listImportDetail.push(...me.lstImportDetail);
              LocalStorageLibrary.setByKey("ImportDetail", listImportDetail);
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
