<template src="./VendorDetail.html"></template>
<style lang="scss" scoped src="./VendorDetail.scss"></style>
<script lang="ts">
import VendorDetail from './VendorDetail';
import { PropType, Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Guid from '@library-src/utilities/types/Guid';
import Vendor from '@store-src/models/vendor/Vendor';
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
    ECombobox
  },

  setup() {
    const thisData: Ref<VendorDetail> = ref(new VendorDetail());
    return { thisData };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm mới nhà cung cấp";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 128;
      return {
        "txtCodeVendor": new TextBox({
          fieldText: "Mã Nhà Cung Cấp",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "CodeVendor"
        }),
        "txtNameVendor": new TextBox({
          fieldText: "Tên Nhà Cung Cấp",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameVendor"
        }),
        "txtGroupVendor": new Combobox({
          fieldText: "Nhóm Nhà Cung Cấp",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "GroupVendor",
          data: [
            {
              value: 1,
              display: "Nhà CC001"
            },
            {
              value: 2,
              display: "Nhà CC002"
            },
            {
              value: 3,
              display: "Nhà CC003"
            },
          ]

        }),
        "txtTelephoneVendor": new TextBox({
          fieldText: "Số Điện Thoại",
          require: false,
          maxLength: 255,
          type: "number",
          labelWidth: labelWidth,
          bindingIndex: "TelephoneVendor"
        }),
        "txtAddressVendor": new TextBox({
          fieldText: "Địa chỉ",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "AddressVendor"
        }),
        "txtFullNameVendor": new TextBox({
          fieldText: "Họ Và Tên",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "FullNameVendor"
        }),
        "txtEmailVendor": new TextBox({
          fieldText: "Email",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "EmailVendor"
        }),
        "txtPhoneContactVendor": new TextBox({
          fieldText: "Số ĐT",
          require: false,
          maxLength: 255,
          type: "number",
          labelWidth: labelWidth,
          bindingIndex: "PhoneContactVendor"
        }),
        "txtTitleVendor": new TextBox({
          fieldText: "Chức Danh",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "TitleVendor"
        }),
        "txtAddressItemVendor": new TextBox({
          fieldText: "Địa chỉ",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "AddressItemVendor"
        }),
        "txtStatusVendor": new Combobox({
          fieldText: "Trạng thái",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "Ngừng cung cấp",
              display: "Ngừng cung cấp"
            },
            {
              value: "Cung cấp",
              display: "Cung cấp"
            },
          ],
          bindingIndex: "StatusVendor"
        }),
      }
    },

    saveData() {
      const me = this;
      let listVendor: Array<Vendor> | null = new Array<Vendor>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['VendorId'] = Guid.NewGuid();
          listVendor = LocalStorageLibrary.getByKey<Array<Vendor>>("Vendor");
          if (listVendor) {
            listVendor.push(me.masterData);
            LocalStorageLibrary.setByKey("Vendor", listVendor);
          }
          else {
            listVendor = new Array<Vendor>({ ...me.masterData });
            LocalStorageLibrary.setByKey("Vendor", listVendor);
          }
        }
        if (me.masterData.editMode == 2) {
          listVendor = LocalStorageLibrary.getByKey<Array<Vendor>>("Vendor");
          if (listVendor) {
            listVendor.forEach(newItemVendor => {
              if (me.masterData) {
                if (newItemVendor.VendorId == me.masterData.VendorId) {
                  newItemVendor.CodeVendor = me.masterData.CodeVendor;
                  newItemVendor.NameVendor = me.masterData.NameVendor;
                  newItemVendor.GroupVendor = me.masterData.GroupVendor;
                  newItemVendor.TelephoneVendor = me.masterData.TelephoneVendor;
                  newItemVendor.AddressVendor = me.masterData.AddressVendor;
                  newItemVendor.FullNameVendor = me.masterData.FullNameVendor;
                  newItemVendor.EmailVendor = me.masterData.EmailVendor;
                  newItemVendor.PhoneContactVendor = me.masterData.PhoneContactVendor;
                  newItemVendor.TitleVendor = me.masterData.TitleVendor;
                  newItemVendor.AddressItemVendor = me.masterData.AddressItemVendor;
                  newItemVendor.StatusVendor = me.masterData.StatusVendor;
                }
              }
            });
            LocalStorageLibrary.setByKey("Vendor", listVendor);
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
