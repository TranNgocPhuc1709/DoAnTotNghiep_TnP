<template src="./CustomercategoryDetail.html"></template>
<style lang="scss" scoped src="./CustomercategoryDetail.scss"></style>
<script lang="ts">
import CustomercategoryDetail from './CustomercategoryDetail';
import { PropType, Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Guid from '@library-src/utilities/types/Guid';
import CustomerCategory from '@store-src/models/customer-category/CustomerCategory';

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
    ETextBox
  },

  setup() {
    const thisData: Ref<CustomercategoryDetail> = ref(new CustomercategoryDetail());
    return { thisData };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm mới nhóm khách hàng";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtCodeCustomerCategory": new TextBox({
          fieldText: "Mã Nhóm KH",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "CodeCustomerCategory"
        }),
        "txtNameCustomerCategory": new TextBox({
          fieldText: "Tên Nhóm KH",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameCustomerCategory"
        }),
        "txtDescribeCustomerCategory": new TextBox({
          fieldText: "Mô tả",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DescribeCustomerCategory"
        }),

      }
    },
    saveData() {
      const me = this;
      let listCustomerCategory: Array<CustomerCategory> | null = new Array<CustomerCategory>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['CustomerId'] = Guid.NewGuid();
          listCustomerCategory = LocalStorageLibrary.getByKey<Array<CustomerCategory>>("customerCategory");
          if (listCustomerCategory) {
            listCustomerCategory.push(me.masterData);
            LocalStorageLibrary.setByKey("customerCategory", listCustomerCategory);
          }
          else {
            listCustomerCategory = new Array<CustomerCategory>({ ...me.masterData });
            LocalStorageLibrary.setByKey("customerCategory", listCustomerCategory);
          }
        }
        if (me.masterData.editMode == 2) {
          listCustomerCategory = LocalStorageLibrary.getByKey<Array<CustomerCategory>>("customerCategory");
          if (listCustomerCategory) {
            listCustomerCategory.forEach(newItemCustomerCategory => {
              if (me.masterData) {
                if (newItemCustomerCategory.CustomerId == me.masterData.CustomerId) {
                  newItemCustomerCategory.CodeCustomerCategory = me.masterData.CodeCustomerCategory;
                  newItemCustomerCategory.NameCustomerCategory = me.masterData.NameCustomerCategory;
                  newItemCustomerCategory.DescribeCustomerCategory = me.masterData.DescribeCustomerCategory;
                  newItemCustomerCategory.StatusCustomerCategory = me.masterData.StatusCustomerCategory;
                }
              }
            });
            LocalStorageLibrary.setByKey("customerCategory", listCustomerCategory);
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
