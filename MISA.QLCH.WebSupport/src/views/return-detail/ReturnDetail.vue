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
    const txtCodeProductReturn: Ref<Combobox> = ref(new Combobox({
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
      data: [
        {
          value: "Kho 1",
          display: "Kho 1"
        },
        {
          value: "Kho 2",
          display: "Kho 2"
        }
      ],
      classType: "secondary"
    }));
    const txtUnitProductReturn: Ref<Combobox> = ref(new Combobox({
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
          data: [
            {
              value: "NCC001",
              display: "NCC001"
            }
          ],
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
          data: [
            {
              value: "TNP",
              display: "TNP"
            }
          ],
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
