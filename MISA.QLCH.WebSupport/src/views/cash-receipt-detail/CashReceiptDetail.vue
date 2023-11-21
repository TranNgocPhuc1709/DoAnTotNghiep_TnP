<template src="./CashReceiptDetail.html"></template>
<style lang="scss" scoped src="./CashReceiptDetail.scss"></style>
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
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import ENumber from "qlch_control/ENumber";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import Checkbox from '@library-src/models/qlch_control/qlch_checkbox/Checkbox';
import ECheckbox from "qlch_control/ECheckbox";
import CashReceipt from '@store-src/models/cash-receipt/CashReceipt';
import CashReceiptDetail from '@store-src/models/cash-receipt/CashReceiptDetail';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Guid from '@library-src/utilities/types/Guid';
import Button from '@library-src/models/qlch_control/qlch_button/Button';
import EButton from "qlch_control/EButton";
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
    ECheckbox,
    EButton

  },


  data() {
    const lstCashReceiptDetail: Ref<Array<CashReceiptDetail>> = ref(new Array<CashReceiptDetail>());
    const txtExplainCashReceipt: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    const txtMoneyCashDetail: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));

    return {
      lstCashReceiptDetail,
      txtExplainCashReceipt,
      txtMoneyCashDetail
    }
  },
  created() {
    try {
      //lấy giá trị khóa phụ trong masterData
      const me = this;
      if (me.masterData) {
        const privateKey = me.masterData['CashReceiptId'];
        if (privateKey) {
          const localStorageCashReceiptDetail = LocalStorageLibrary.getByKey<Array<CashReceiptDetail>>("cashReceiptDetail");
          if (localStorageCashReceiptDetail && localStorageCashReceiptDetail.length > 0) {
            me.lstCashReceiptDetail = localStorageCashReceiptDetail.filter(item => {
              return item.CashReceiptId == privateKey;
            })
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

  },

  setup() {
    const thisData: Ref<CashReceiptDetail> = ref(new CashReceiptDetail());
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
      return "Thêm mới phiếu thu";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const lstRevenueOfficerCashReceipt = LocalStorageLibrary.getByKey<Array<Employee>>("employee") ?? new Array<Employee>();
      const labelWidth = 115;
      return {
        "txtDateCashReceipt": new DateModel({
          fieldText: "Ngày thu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DateCashReceipt"
        }),
        "txtCodeCashReceipt": new TextBox({
          fieldText: "Số phiếu thu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "CodeCashReceipt"
        }),
        "txtTotalMoneyCashReceipt": new NumberModel({
          fieldText: "Tổng tiền",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "TotalMoneyCashReceipt"
        }),
        "txtNameObjectCashReceipt": new Combobox({
          fieldText: "Tên đối tượng",
          require: false,
          maxLength: 255,
          data: [
            {
              value: "TNP",
              display: "TNP"
            }
          ],
          labelWidth: labelWidth,
          bindingIndex: "NameObjectCashReceipt"
        }),
        "txtExplantCashReceipt": new TextBox({
          fieldText: "Lý do thu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ExplantCashReceipt"
        }),
        "txtObjectCashReceipt": new Combobox({
          fieldText: "Đối tượng nộp",
          require: false,
          maxLength: 255,
          data: [
            {
              value: "Nhà cung cấp",
              display: "Nhà cung cấp"
            },
            {
              value: "Khách hàng",
              display: "khách hàng"
            },
            {
              value: "Nhân viên",
              display: "Nhân viên"
            }
          ],
          labelWidth: labelWidth,
          bindingIndex: "ObjectCashReceipt"
        }),
        "txtPayerCashReceipt": new TextBox({
          fieldText: "Người nộp",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "PayerCashReceipt"
        }),
        "txtAddressPayerCashReceipt": new TextBox({
          fieldText: "Địa chỉ",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "AddressPayerCashReceipt"
        }),
        "txtRevenueOfficerCashReceipt": new Combobox({
          fieldText: "Nhân viên thu",
          require: false,
          maxLength: 255,
          data: lstRevenueOfficerCashReceipt,
          valueField: "CodeEmployee",
          displayField: "CodeEmployee",
          labelWidth: labelWidth,
          bindingIndex: "RevenueOfficerCashReceipt"
        }),
        "txtNameRevenueOfficerCashReceipt": new TextBox({
          fieldText: "Tên nhân viên",
          readOnly: true,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameRevenueOfficerCashReceipt"
        }),
        "txtIncludedCashReceipt": new Checkbox({
          fieldText: "Tính vào doanh thu",
          bindingIndex: "IncludedCashReceipt",
        }),

      }
    },
    ShowPaymentCashReceipt() {
      const me = this;

      ///tinh lai tong tien
      if (me.masterData) {
        me.masterData['TotalMoneyCashReceipt'] = 0;

      }

      for (let index = 0; index < me.lstCashReceiptDetail.length; index++) {
        const element = me.lstCashReceiptDetail[index];
        if (me.masterData && element) {
          me.masterData['TotalMoneyCashReceipt'] += element.MoneyCashDetail ?? 0;

        }
      }
    },

    AddListTable() {
      try {
        const me = this;
        if (me.lstCashReceiptDetail?.length > 0) {
          me.lstCashReceiptDetail.push(new CashReceiptDetail());
        } else {
          me.lstCashReceiptDetail = new Array<CashReceiptDetail>({});
        }
      } catch (error) {
        console.log(error);
      }
    },

    DelListTable(item: CashReceiptDetail) {
      const me = this;
      if (item && me.lstCashReceiptDetail?.length > 0) {
        me.lstCashReceiptDetail = me.lstCashReceiptDetail.filter(detail => {
          return detail.CashReceiptDetailId != item.CashReceiptDetailId;
        })
      }
      if (me.masterData) {
        me.masterData['TotalMoneyCashReceipt'] = 0;

      }

      for (let index = 0; index < me.lstCashReceiptDetail.length; index++) {
        const element = me.lstCashReceiptDetail[index];
        if (me.masterData && element) {
          me.masterData['TotalMoneyCashReceipt'] += element.MoneyCashDetail ?? 0;

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
            me.masterData['NameRevenueOfficerCashReceipt'] = rowVendorByEmployeeCode.NameEmployee;
          }
        }
      }
    },
    saveData() {
      const me = this;
      let listCashReceipt: Array<CashReceipt> | null = new Array<CashReceipt>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['CashReceiptId'] = Guid.NewGuid();
          listCashReceipt = LocalStorageLibrary.getByKey<Array<CashReceipt>>("cashReceipt");
          if (listCashReceipt) {
            listCashReceipt.push(me.masterData);
            LocalStorageLibrary.setByKey("cashReceipt", listCashReceipt);
          }
          else {
            listCashReceipt = new Array<CashReceipt>({ ...me.masterData });
            LocalStorageLibrary.setByKey("cashReceipt", listCashReceipt);
          }

          //cất detail
          //gán khoá phụ cho detail
          if (me.lstCashReceiptDetail?.length > 0) {
            me.lstCashReceiptDetail.forEach(detailItem => {
              if (me.masterData) {
                detailItem.CashReceiptId = me.masterData['CashReceiptId'];
              }
            });
            //end gán khoá phụ

            let listCashReceiptDetail: Array<CashReceiptDetail> | null = new Array<CashReceiptDetail>;
            listCashReceiptDetail = LocalStorageLibrary.getByKey<Array<CashReceiptDetail>>("cashReceiptDetail");
            if (listCashReceiptDetail) {
              listCashReceiptDetail.push(...me.lstCashReceiptDetail);
              LocalStorageLibrary.setByKey("cashReceiptDetail", listCashReceiptDetail);
            }
            else {
              listCashReceiptDetail = new Array<CashReceiptDetail>(...me.lstCashReceiptDetail);
              LocalStorageLibrary.setByKey("cashReceiptDetail", listCashReceiptDetail);
            }
          }
        }
        if (me.masterData.editMode == 2) {
          listCashReceipt = LocalStorageLibrary.getByKey<Array<CashReceipt>>("cashReceipt");
          if (listCashReceipt) {
            listCashReceipt.forEach(newItemCashReceipt => {
              if (me.masterData) {
                if (newItemCashReceipt.CashReceiptId == me.masterData.CashReceiptId) {
                  newItemCashReceipt.DateCashReceipt = me.masterData.DateCashReceipt;
                  newItemCashReceipt.CodeCashReceipt = me.masterData.CodeCashReceipt;
                  newItemCashReceipt.TotalMoneyCashReceipt = me.masterData.TotalMoneyCashReceipt;
                  newItemCashReceipt.NameObjectCashReceipt = me.masterData.NameObjectCashReceipt;
                  newItemCashReceipt.ExplantCashReceipt = me.masterData.ExplantCashReceipt;
                  newItemCashReceipt.ObjectCashReceipt = me.masterData.ObjectCashReceipt;
                  newItemCashReceipt.PayerCashReceipt = me.masterData.PayerCashReceipt;
                  newItemCashReceipt.AddressPayerCashReceipt = me.masterData.AddressPayerCashReceipt;
                  newItemCashReceipt.RevenueOfficerCashReceipt = me.masterData.RevenueOfficerCashReceipt;
                  newItemCashReceipt.NameRevenueOfficerCashReceipt = me.masterData.NameRevenueOfficerCashReceipt;
                  newItemCashReceipt.IncludedCashReceipt = me.masterData.IncludedCashReceipt;
                }
              }
            });
            LocalStorageLibrary.setByKey("cashReceipt", listCashReceipt);
          }

          //cất detail
          //gán khoá phụ cho detail
          if (me.lstCashReceiptDetail?.length > 0) {
            me.lstCashReceiptDetail.forEach(detailItem => {
              if (me.masterData) {
                detailItem.CashReceiptId = me.masterData['CashReceiptId'];
              }
            });
            //end gán khoá phụ

            let listCashReceiptDetail: Array<CashReceiptDetail> | null = new Array<CashReceiptDetail>;
            listCashReceiptDetail = LocalStorageLibrary.getByKey<Array<CashReceiptDetail>>("cashReceiptDetail");
            if (listCashReceiptDetail) {
              listCashReceiptDetail = listCashReceiptDetail.filter(item => {
                if (me.masterData) {
                  return item.CashReceiptId != me.masterData['CashReceiptId'];
                }
              });
              listCashReceiptDetail.push(...me.lstCashReceiptDetail);
              LocalStorageLibrary.setByKey("cashReceiptDetail", listCashReceiptDetail);
            }
            else {
              listCashReceiptDetail = new Array<CashReceiptDetail>(...me.lstCashReceiptDetail);
              LocalStorageLibrary.setByKey("cashReceiptDetail", listCashReceiptDetail);
            }
          } else {
            let listCashReceiptDetail: Array<CashReceiptDetail> | null = new Array<CashReceiptDetail>;
            listCashReceiptDetail = LocalStorageLibrary.getByKey<Array<CashReceiptDetail>>("cashReceiptDetail");
            if (listCashReceiptDetail) {
              listCashReceiptDetail = listCashReceiptDetail.filter(item => {
                if (me.masterData) {
                  return item.CashReceiptId != me.masterData['CashReceiptId'];
                }
              });
              listCashReceiptDetail.push(...me.lstCashReceiptDetail);
              LocalStorageLibrary.setByKey("cashReceiptDetail", listCashReceiptDetail);
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
