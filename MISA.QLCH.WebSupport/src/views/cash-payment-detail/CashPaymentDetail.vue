<template src="./CashPaymentDetail.html"></template>
<style lang="scss" scoped src="./CashPaymentDetail.scss"></style>
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
import CashPayment from '@store-src/models/cash-payment/CashPayment';
import CashPaymentDetail from '@store-src/models/cash-payment/CashPaymentDetail';
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
    ECombobox,
    ENumber,
    ECheckbox,
    EButton
  },


  data() {
    const lstCashPaymentDetail: Ref<Array<CashPaymentDetail>> = ref(new Array<CashPaymentDetail>());

    const txtExplainCashPayment: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    const txtMoneyCashPayment: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));

    return {
      lstCashPaymentDetail,
      txtExplainCashPayment,
      txtMoneyCashPayment

    }
  },
  created() {
    try {
      //lấy giá trị khóa phụ trong masterData
      const me = this;
      if (me.masterData) {
        const privateKey = me.masterData['CashPaymentsId'];
        if (privateKey) {
          const localStorageCashPaymentDetail = LocalStorageLibrary.getByKey<Array<CashPaymentDetail>>("cashPaymentDetail");
          if (localStorageCashPaymentDetail && localStorageCashPaymentDetail.length > 0) {
            me.lstCashPaymentDetail = localStorageCashPaymentDetail.filter(item => {
              return item.CashPaymentsId == privateKey;
            })
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

  },

  setup() {
    const thisData: Ref<CashPaymentDetail> = ref(new CashPaymentDetail());
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
      return "Phiếu chi tiền";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtDateCashPayment": new DateModel({
          fieldText: "Ngày chi",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DateCashPayment"
        }),
        "txtCodeCashPayment": new TextBox({
          fieldText: "Số phiếu chi",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "CodeCashPayment"
        }),
        "txtTotalCashPayment": new NumberModel({
          fieldText: "Tổng tiền",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 2
          }),
          bindingIndex: "TotalCashPayment"
        }),
        "txtNameObjectCashPayment": new Combobox({
          fieldText: "Tên đối tượng",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "Khách hàng",
              display: "Khách hàng"
            }
          ],
          bindingIndex: "NameObjectCashPayment"
        }),
        "txtReasonCashPayment": new TextBox({
          fieldText: "Lý do chi",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ReasonCashPayment"
        }),

        //6
        "txtObjectCashPayment": new Combobox({
          fieldText: "Đối tượng nhận",
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
              value: 3,
              display: "Nhân viên"
            }
          ],
          labelWidth: labelWidth,
          bindingIndex: "ObjectCashPayment"
        }),
        "txtReceiverCashPayment": new TextBox({
          fieldText: "Người nhận",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ReceiverCashPayment"
        }),
        "txtAddressCashPayment": new TextBox({
          fieldText: "Địa chỉ",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "AddressCashPayment"
        }),
        "txtStaffCashPayment": new Combobox({
          fieldText: "Nhân viên chi",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "PNJ",
              display: "PNJ"
            }
          ],
          bindingIndex: "StaffCashPayment"
        }),
        "txtNameStaffCashPayment": new TextBox({
          fieldText: "Tên nhân viên",
          readOnly: false,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameStaffCashPayment"
        }),
        "txtIncludedCashPayment": new Checkbox({
          fieldText: "Tính vào chi phí",
          bindingIndex: "IncludedCashPayment",
        }),
        // "txtColumn12": new TextBox({
        //   fieldText: "Tổng tiền",
        //   readOnly: true,
        //   require: false,
        //   maxLength: 255,
        //   labelWidth: labelWidth,
        //   bindingIndex: "Column12",
        // }),



        //Table Grid


      }
    },
    AddListTable() {
      try {
        const me = this;
        if (me.lstCashPaymentDetail?.length > 0) {
          me.lstCashPaymentDetail.push(new CashPaymentDetail());
        } else {
          me.lstCashPaymentDetail = new Array<CashPaymentDetail>({});
        }
      } catch (error) {
        console.log(error);
      }
    },
    DelListTable(item: CashPaymentDetail) {
      const me = this;
      if (item && me.lstCashPaymentDetail?.length > 0) {
        me.lstCashPaymentDetail = me.lstCashPaymentDetail.filter(detail => {
          return detail.CashPaymentDetailId != item.CashPaymentDetailId;
        })
      }


    },


    saveData() {
      const me = this;
      let listCashPayment: Array<CashPayment> | null = new Array<CashPayment>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['CashPaymentsId'] = Guid.NewGuid();
          listCashPayment = LocalStorageLibrary.getByKey<Array<CashPayment>>("cashPayment");
          if (listCashPayment) {
            listCashPayment.push(me.masterData);
            LocalStorageLibrary.setByKey("cashPayment", listCashPayment);
          }
          else {
            listCashPayment = new Array<CashPayment>({ ...me.masterData });
            LocalStorageLibrary.setByKey("cashPayment", listCashPayment);
          }
          //cất detail
          //gán khoá phụ cho detail
          if (me.lstCashPaymentDetail?.length > 0) {
            me.lstCashPaymentDetail.forEach(detailItem => {
              if (me.masterData) {
                detailItem.CashPaymentsId = me.masterData['CashPaymentsId'];
              }
            });
            //end gán khoá phụ

            let listCashPaymentDetail: Array<CashPaymentDetail> | null = new Array<CashPaymentDetail>;
            listCashPaymentDetail = LocalStorageLibrary.getByKey<Array<CashPaymentDetail>>("cashPaymentDetail");
            if (listCashPaymentDetail) {
              listCashPaymentDetail.push(...me.lstCashPaymentDetail);
              LocalStorageLibrary.setByKey("cashPaymentDetail", listCashPaymentDetail);
            }
            else {
              listCashPaymentDetail = new Array<CashPaymentDetail>(...me.lstCashPaymentDetail);
              LocalStorageLibrary.setByKey("cashPaymentDetail", listCashPaymentDetail);
            }
          }
        }
        if (me.masterData.editMode == 2) {
          listCashPayment = LocalStorageLibrary.getByKey<Array<CashPayment>>("cashPayment");
          if (listCashPayment) {
            listCashPayment.forEach(newItemCashPayment => {
              if (me.masterData) {
                if (newItemCashPayment.CashPaymentsId == me.masterData.CashPaymentsId) {
                  newItemCashPayment.DateCashPayment = me.masterData.DateCashPayment;
                  newItemCashPayment.CodeCashPayment = me.masterData.CodeCashPayment;
                  newItemCashPayment.TotalCashPayment = me.masterData.TotalCashPayment;
                  newItemCashPayment.NameObjectCashPayment = me.masterData.NameObjectCashPayment;
                  newItemCashPayment.ReasonCashPayment = me.masterData.ReasonCashPayment;
                  newItemCashPayment.ObjectCashPayment = me.masterData.ObjectCashPayment;
                  newItemCashPayment.ReceiverCashPayment = me.masterData.ReceiverCashPayment;
                  newItemCashPayment.AddressCashPayment = me.masterData.AddressCashPayment;
                  newItemCashPayment.StaffCashPayment = me.masterData.StaffCashPayment;
                  newItemCashPayment.NameStaffCashPayment = me.masterData.NameStaffCashPayment;
                  newItemCashPayment.IncludedCashPayment = me.masterData.IncludedCashPayment;
                }
              }
            });
            LocalStorageLibrary.setByKey("cashPayment", listCashPayment);
          }

          //cất detail
          //gán khoá phụ cho detail
          if (me.lstCashPaymentDetail?.length > 0) {
            me.lstCashPaymentDetail.forEach(detailItem => {
              if (me.masterData) {
                detailItem.CashPaymentsId = me.masterData['CashPaymentsId'];
              }
            });
            //end gán khoá phụ

            let listCashPaymentDetail: Array<CashPaymentDetail> | null = new Array<CashPaymentDetail>;
            listCashPaymentDetail = LocalStorageLibrary.getByKey<Array<CashPaymentDetail>>("cashPaymentDetail");
            if (listCashPaymentDetail) {
              listCashPaymentDetail = listCashPaymentDetail.filter(item => {
                if (me.masterData) {
                  return item.CashPaymentsId != me.masterData['CashPaymentsId'];
                }
              });
              listCashPaymentDetail.push(...me.lstCashPaymentDetail);
              LocalStorageLibrary.setByKey("cashPaymentDetail", listCashPaymentDetail);
            }
            else {
              listCashPaymentDetail = new Array<CashPaymentDetail>(...me.lstCashPaymentDetail);
              LocalStorageLibrary.setByKey("cashPaymentDetail", listCashPaymentDetail);
            }
          } else {
            let listCashPaymentDetail: Array<CashPaymentDetail> | null = new Array<CashPaymentDetail>;
            listCashPaymentDetail = LocalStorageLibrary.getByKey<Array<CashPaymentDetail>>("cashPaymentDetail");
            if (listCashPaymentDetail) {
              listCashPaymentDetail = listCashPaymentDetail.filter(item => {
                if (me.masterData) {
                  return item.CashPaymentsId != me.masterData['CashPaymentsId'];
                }
              });
              listCashPaymentDetail.push(...me.lstCashPaymentDetail);
              LocalStorageLibrary.setByKey("cashPaymentDetail", listCashPaymentDetail);
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
