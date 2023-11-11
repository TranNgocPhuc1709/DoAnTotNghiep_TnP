<template src="./CustomerDetail.html"></template>
<style lang="scss" scoped src="./CustomerDetail.scss"></style>
<script lang="ts">
import CustomerDetail from './CustomerDetail';
import { PropType, Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import EDate from "qlch_control/EDate";
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Guid from '@library-src/utilities/types/Guid';
import Customer from '@store-src/models/customer/Customer';

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
    EDate

  },

  setup() {
    const thisData: Ref<CustomerDetail> = ref(new CustomerDetail());
    return { thisData };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm Mới Khách Hàng";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtCodeCustomer": new TextBox({
          fieldText: "Mã khách hàng",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "CodeCustomer"
        }),
        "txtNameCustomer": new TextBox({
          fieldText: "Tên khách hàng",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameCustomer"
        }),
        "txtTelephoneCustomer": new TextBox({
          fieldText: "Số điện thoại",
          require: true,
          maxLength: 255,
          type: "number",
          labelWidth: labelWidth,
          bindingIndex: "TelephoneCustomer"
        }),
        "txtEmailCustomer": new TextBox({
          fieldText: "Email",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "EmailCustomer"
        }),
        "txtAddressCustomer": new TextBox({
          fieldText: "Địa chỉ",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "AddressCustomer"
        }),
        "txtDateBirthCustomer": new DateModel({
          fieldText: "Ngày sinh",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DateBirthCustomer"
        }),
        "txtCustomerGroupList": new Combobox({
          fieldText: "Nhóm khách hàng",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: 1,
              display: "G1"
            },
            {
              value: 2,
              display: "G2"
            },
            {
              value: 3,
              display: "G3"
            },

          ],
          bindingIndex: "CustomerGroupList",
        }),
        "txtCodeEmployeeCustomer": new Combobox({
          fieldText: "Mã nhân viên phụ trách",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {

              value: 1,
              display: "NV001"
            },
            {
              value: 2,
              display: "NV002"
            },
            {
              value: 3,
              display: "NV003"
            },

          ],
          bindingIndex: "CodeEmployeeCustomer",
        }),
        "txtNameEmployeeCustomer": new TextBox({
          fieldText: "Tên nhân viên phụ trách",
          require: false,
          readOnly: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameEmployeeCustomer"
        }),
        "txtAttentionCustomer": new TextBox({
          fieldText: " Ghi chú",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "AttentionCustomer"
        }),
        "txtGenderCustomer": new Combobox({
          fieldText: "Giới tính",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "GenderCustomer",
          data: [
            {

              value: "Name",
              display: "Nam"
            },
            {
              value: "Nữ",
              display: "Nữ"
            },
            {
              value: "Không xác định",
              display: "Không xác định"
            },

          ]
        }),
      }
    },
    // return {
    //     "txtCodeCustomer": new TextBox({
    //       fieldText: "Mã khách hàng",
    //       require: true,
    //       maxLength: 255,
    //       labelWidth: labelWidth,
    //       bindingIndex: "CodeCustomer"
    //     }),
    //     "txtNameCustomer": new TextBox({
    //       fieldText: "Tên khách hàng",
    //       require: true,
    //       maxLength: 255,
    //       labelWidth: labelWidth,
    //       bindingIndex: "NameCustomer"
    //     }),
    //     "txtColumn3": new TextBox({
    //       fieldText: "Số điện thoại",
    //       require: true,
    //       maxLength: 255,
    //       labelWidth: labelWidth,
    //       bindingIndex: "Column3"
    //     }),
    //     "txtColumn4": new TextBox({
    //       fieldText: "Email",
    //       require: false,
    //       maxLength: 255,
    //       labelWidth: labelWidth,
    //       bindingIndex: "Column4"
    //     }),
    //     "txtColumn5": new TextBox({
    //       fieldText: "Địa chỉ",
    //       require: false,
    //       maxLength: 255,
    //       labelWidth: labelWidth,
    //       bindingIndex: "Column5"
    //     }),
    //     "txtColumn6": new DateModel({
    //       fieldText: "Ngày sinh",
    //       require: false,
    //       maxLength: 255,
    //       labelWidth: labelWidth,
    //       bindingIndex: "Column6"
    //     }),
    //     "txtColumn7": new Combobox({
    //       fieldText: "Nhóm khách hàng",
    //       require: false,
    //       maxLength: 255,
    //       labelWidth: labelWidth,
    //       bindingIndex: "Column7",
    //       data: [
    //         {

    //           value: 1,
    //           display: "G1"
    //         },
    //         {
    //           value: 2,
    //           display: "G2"
    //         },
    //         {
    //           value: 3,
    //           display: "G3"
    //         },

    //       ]
    //     }),
    //     "txtColumn8": new Combobox({
    //       fieldText: "Mã nhân viên phụ trách",
    //       require: false,
    //       maxLength: 255,
    //       labelWidth: labelWidth,
    //       bindingIndex: "Column8",
    //       data: [
    //         {

    //           value: 1,
    //           display: "NV001"
    //         },
    //         {
    //           value: 2,
    //           display: "NV002"
    //         },
    //         {
    //           value: 3,
    //           display: "NV003"
    //         },

    //       ]
    //     }),
    //     "txtColumn9": new TextBox({
    //       fieldText: "Tên nhân viên phụ trách",
    //       require: false,
    //       readOnly: true,
    //       maxLength: 255,
    //       labelWidth: labelWidth,
    //       bindingIndex: "Column9"
    //     }),
    //     "txtColumn10": new TextBox({
    //       fieldText: " Ghi chú",
    //       require: false,
    //       maxLength: 255,
    //       labelWidth: labelWidth,
    //       bindingIndex: "Column10"
    //     }),
    //     "txtColumn11": new Combobox({
    //       fieldText: "Giới tính",
    //       require: false,
    //       maxLength: 255,
    //       labelWidth: labelWidth,
    //       bindingIndex: "Column10",
    //       data: [
    //         {

    //           value: 1,
    //           display: "Nam"
    //         },
    //         {
    //           value: 2,
    //           display: "Nữ"
    //         },
    //         {
    //           value: 3,
    //           display: "Không xác định"
    //         },

    //       ]
    //     }),
    //   }
    saveData() {
      const me = this;
      let listCustomer: Array<Customer> | null = new Array<Customer>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['CustomerId'] = Guid.NewGuid();
          listCustomer = LocalStorageLibrary.getByKey<Array<Customer>>("Customer");
          if (listCustomer) {
            listCustomer.push(me.masterData);
            LocalStorageLibrary.setByKey("Customer", listCustomer);
          }
          else {
            listCustomer = new Array<Customer>({ ...me.masterData });
            LocalStorageLibrary.setByKey("Customer", listCustomer);
          }
        }
        if (me.masterData.editMode == 2) {
          listCustomer = LocalStorageLibrary.getByKey<Array<Customer>>("Customer");
          if (listCustomer) {
            listCustomer.forEach(newItemCustomer => {
              if (me.masterData) {
                if (newItemCustomer.CustomerId == me.masterData.CustomerId) {
                  newItemCustomer.CodeCustomer = me.masterData.CodeCustomer;
                  newItemCustomer.NameCustomer = me.masterData.NameCustomer;
                  newItemCustomer.TelephoneCustomer = me.masterData.TelephoneCustomer;
                  newItemCustomer.EmailCustomer = me.masterData.EmailCustomer;
                  newItemCustomer.AddressCustomer = me.masterData.AddressCustomer;
                  newItemCustomer.DateBirthCustomer = me.masterData.DateBirthCustomer;
                  newItemCustomer.CustomerGroupList = me.masterData.CustomerGroupList;
                  newItemCustomer.CodeEmployeeCustomer = me.masterData.CodeEmployeeCustomer;
                  newItemCustomer.NameEmployeeCustomer = me.masterData.NameEmployeeCustomer;
                  newItemCustomer.AttentionCustomer = me.masterData.AttentionCustomer;
                  newItemCustomer.GenderCustomer = me.masterData.GenderCustomer;



                }
              }
            });
            LocalStorageLibrary.setByKey("Customer", listCustomer);
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
