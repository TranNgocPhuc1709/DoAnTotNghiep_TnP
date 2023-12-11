<template src="./TransferStockDetail.html"></template>
<style lang="scss" scoped src="./TransferStockDetail.scss"></style>
<script lang="ts">
import { PropType, Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import EDate from "qlch_control/EDate";
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import ENumber from "qlch_control/ENumber";
import Button from '@library-src/models/qlch_control/qlch_button/Button';
import EButton from "qlch_control/EButton";
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Employee from '@store-src/models/employee/Employee';
import TransferStockDetail from '@store-src/models/transfer-stock/TransferStockDetail';
import TransferStock from '@store-src/models/transfer-stock/TransferStock';
import Product from '@store-src/models/product/Product';
import DictionaryStock from '@store-src/models/dictionary-stock/DictionaryStock';
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
    ECombobox,
    EDate,
    ENumber,
    EButton
  },

  data() {
    const lstTransferStockDetail: Ref<Array<TransferStockDetail>> = ref(new Array<TransferStockDetail>());
    const lstCodeProductTransfer = LocalStorageLibrary.getByKey<Array<Product>>("Product") ?? new Array<Product>();
    const lstWarehouseProductTransfer = LocalStorageLibrary.getByKey<Array<DictionaryStock>>("dictionaryStock") ?? new Array<DictionaryStock>();
    const txtCodeProductTransfer: Ref<Combobox> = ref(new Combobox({
      fieldText: "",
      require: false,
      maxLength: 255,
      data: lstCodeProductTransfer,
      valueField: "CodeProductList",
      displayField: "CodeProductList",
      classType: "secondary"
    }));
    const txtNameProductTransfer: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    const txtUnitProductTransfer: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    const txtWarehouseExport: Ref<Combobox> = ref(new Combobox({
      fieldText: "",
      require: false,
      maxLength: 255,
      data: lstWarehouseProductTransfer,
      valueField: "NameStore",
      displayField: "NameStore",
      classType: "secondary"
    }));
    const txtWarehouseImport: Ref<Combobox> = ref(new Combobox({
      fieldText: "",
      require: false,
      maxLength: 255,
      data: lstWarehouseProductTransfer,
      valueField: "NameStore",
      displayField: "NameStore",
      classType: "secondary"
    }));
    const txtQuantityProductTransfer: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    const txtUnitPriceTransfer: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    const txtIntoMoneyTransfer: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    return {
      txtCodeProductTransfer,
      txtNameProductTransfer,
      txtUnitProductTransfer,
      txtWarehouseExport,
      txtWarehouseImport,
      txtQuantityProductTransfer,
      txtUnitPriceTransfer,
      txtIntoMoneyTransfer,
      lstTransferStockDetail,
      lstCodeProductTransfer,
      lstWarehouseProductTransfer
    }
  },

  created() {
    try {
      //lấy giá trị khóa phụ trong masterData
      const me = this;
      if (me.masterData) {
        const privateKey = me.masterData['TransferStockId'];
        if (privateKey) {
          const localStorageTransferStockDetail = LocalStorageLibrary.getByKey<Array<TransferStockDetail>>("transferStockDetail");
          if (localStorageTransferStockDetail && localStorageTransferStockDetail.length > 0) {
            me.lstTransferStockDetail = localStorageTransferStockDetail.filter(item => {
              return item.TransferStockId == privateKey;
            })
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

  },

  setup() {
    const thisData: Ref<TransferStockDetail> = ref(new TransferStockDetail());
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
      return "Thêm mới phiếu chuyển kho";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const lstObjectTransfer = LocalStorageLibrary.getByKey<Array<Employee>>("employee") ?? new Array<Employee>();
      const labelWidth = 115;
      return {
        "txtObjectTransferStock": new Combobox({
          fieldText: "Đối tượng",
          require: false,
          maxLength: 255,
          data: lstObjectTransfer,
          valueField: "CodeEmployee",
          displayField: "CodeEmployee",
          labelWidth: labelWidth,
          bindingIndex: "ObjectTransfer"
        }),
        "txtObjectNameTransferStock": new TextBox({
          fieldText: "Tên",
          readOnly: true,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameObjectTransfer"
        }),
        "txtNoteTransferStock": new TextBox({
          fieldText: "Diễn giải",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NoteTransferStock"
        }),
        "txtVotesTransferStock": new TextBox({
          fieldText: "Số phiếu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "votesTransferStock"
        }),
        "txtDateTransferStock": new DateModel({
          fieldText: "Ngày chuyển",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DateTransferStock"
        }),
        "txtTotalQuantityTransfer": new NumberModel({
          fieldText: "Tổng số lượng",
          readOnly: false,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "TotalQuantityTransfer"
        }),
        "txtTotalMoneyTransferStock": new NumberModel({
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
          bindingIndex: "TotalMoneyTransferStock"
        }),


      }
    },
    AddListTable() {
      try {
        const me = this;
        if (me.lstTransferStockDetail?.length > 0) {
          me.lstTransferStockDetail.push(new TransferStockDetail());
        } else {
          me.lstTransferStockDetail = new Array<TransferStockDetail>({});
        }
      } catch (error) {
        console.log(error);
      }
    },
    DelListTable(item: TransferStockDetail) {
      const me = this;
      if (item && me.lstTransferStockDetail?.length > 0) {
        me.lstTransferStockDetail = me.lstTransferStockDetail.filter(detail => {
          return detail.TransferStockDetailId != item.TransferStockDetailId;
        })
      }
      // Tính lại tổng tiền
      if (me.masterData) {
        me.masterData['TotalQuantityTransfer'] = 0;
        me.masterData['TotalMoneyTransferStock'] = 0;
      }
      for (let index = 0; index < me.lstTransferStockDetail.length; index++) {
        const element = me.lstTransferStockDetail[index];
        if (me.masterData && element) {

          me.masterData['TotalQuantityTransfer'] += element.QuantityTransfer ?? 0;
          me.masterData['TotalMoneyTransferStock'] += element.IntoMoneyProduct ?? 0;
        }
      }
    },
    ShowNameTransfer(value: any) {
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
            me.masterData['NameObjectTransfer'] = rowVendorByEmployeeCode.NameEmployee;
          }
        }
      }
    },
    ShowNameProduct(value: any, item: TransferStockDetail) {
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
            item.NameProductTransfer = rowProductByProductCode.NameProductList;
            item.UnitTransfer = rowProductByProductCode.UnitProductList;
            item.UnitPriceProduct = rowProductByProductCode.PurchasePriceProductList;
          }
        }
      }
    },
    ShowIntoMoneyTransfer(value: number, item: TransferStockDetail) {
      const me = this;
      if (item.UnitPriceProduct) {
        item.IntoMoneyProduct = item.UnitPriceProduct * value;

      }
      if (me.masterData) {
        me.masterData['TotalQuantityTransfer'] = 0;
        me.masterData['TotalMoneyTransferStock'] = 0;
      }

      for (let index = 0; index < me.lstTransferStockDetail.length; index++) {
        const element = me.lstTransferStockDetail[index];
        if (me.masterData && element) {

          me.masterData['TotalQuantityTransfer'] += element.QuantityTransfer ?? 0;
          me.masterData['TotalMoneyTransferStock'] += element.IntoMoneyProduct ?? 0;
        }
      }
    },

    //Lưu vào localStorage

    saveData() {
      const me = this;
      let listTransferStock: Array<TransferStock> | null = new Array<TransferStock>;
      if (me.masterData) {
        debugger
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['TransferStockId'] = Guid.NewGuid();
          listTransferStock = LocalStorageLibrary.getByKey<Array<TransferStock>>("transferStock");
          if (listTransferStock) {
            listTransferStock.push(me.masterData);
            LocalStorageLibrary.setByKey("transferStock", listTransferStock);
          }
          else {
            listTransferStock = new Array<TransferStock>({ ...me.masterData });
            LocalStorageLibrary.setByKey("transferStock", listTransferStock);
          }

          //cất detail

          //gán khoá phụ cho detail
          if (me.lstTransferStockDetail?.length > 0) {
            me.lstTransferStockDetail.forEach(detailItem => {
              if (me.masterData) {
                detailItem.TransferStockId = me.masterData['TransferStockId'];
              }
            });
            //end gán khoá phụ

            let listTransferStockDetail: Array<TransferStockDetail> | null = new Array<TransferStockDetail>;
            listTransferStockDetail = LocalStorageLibrary.getByKey<Array<TransferStockDetail>>("transferStockDetail");
            if (listTransferStockDetail) {
              listTransferStockDetail.push(...me.lstTransferStockDetail);
              LocalStorageLibrary.setByKey("transferStockDetail", listTransferStockDetail);
            }
            else {
              listTransferStockDetail = new Array<TransferStockDetail>(...me.lstTransferStockDetail);
              LocalStorageLibrary.setByKey("transferStockDetail", listTransferStockDetail);
            }
          }
        }
        if (me.masterData.editMode == 2) {
          listTransferStock = LocalStorageLibrary.getByKey<Array<TransferStock>>("transferStock");
          if (listTransferStock) {
            listTransferStock.forEach(newItemTransferStock => {
              if (me.masterData) {
                if (newItemTransferStock.TransferStockId == me.masterData.TransferStockId) {
                  newItemTransferStock.ObjectTransfer = me.masterData.ObjectTransfer;
                  newItemTransferStock.NameObjectTransfer = me.masterData.NameObjectTransfer;
                  newItemTransferStock.VoteTransfer = me.masterData.VoteTransfer;
                  newItemTransferStock.DateTransfer = me.masterData.DateTransfer;
                  newItemTransferStock.NoteTransfer = me.masterData.NoteTransfer;
                  newItemTransferStock.TotalQuantityTransfer = me.masterData.TotalQuantityTransfer;
                  newItemTransferStock.TotalPriceTransfer = me.masterData.TotalPriceTransfer;
                }
              }
            });
            LocalStorageLibrary.setByKey("transferStock", listTransferStock);
          }

          //Cất Detail

          //Start gán khóa phụ
          if (me.lstTransferStockDetail?.length > 0) {
            me.lstTransferStockDetail.forEach(detailItem => {
              if (me.masterData) {
                detailItem.TransferStockId = me.masterData['TransferStockId'];
              }
            });
            //end gán khoá phụ

            let listTransferStockDetail: Array<TransferStockDetail> | null = new Array<TransferStockDetail>;
            listTransferStockDetail = LocalStorageLibrary.getByKey<Array<TransferStockDetail>>("transferStockDetail");
            if (listTransferStockDetail) {
              listTransferStockDetail = listTransferStockDetail.filter(item => {
                if (me.masterData) {
                  return item.TransferStockId != me.masterData['TransferStockId'];
                }
              });
              listTransferStockDetail.push(...me.lstTransferStockDetail);
              LocalStorageLibrary.setByKey("transferStockDetail", listTransferStockDetail);
            }
            else {
              listTransferStockDetail = new Array<TransferStockDetail>(...me.lstTransferStockDetail);
              LocalStorageLibrary.setByKey("transferStockDetail", listTransferStockDetail);
            }
          } else {
            let listTransferStockDetail: Array<TransferStockDetail> | null = new Array<TransferStockDetail>;
            listTransferStockDetail = LocalStorageLibrary.getByKey<Array<TransferStockDetail>>("transferStockDetail");
            if (listTransferStockDetail) {
              listTransferStockDetail = listTransferStockDetail.filter(item => {
                if (me.masterData) {
                  return item.TransferStockId != me.masterData['TransferStockId'];
                }
              });
              listTransferStockDetail.push(...me.lstTransferStockDetail);
              LocalStorageLibrary.setByKey("transferStockDetail", listTransferStockDetail);
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
