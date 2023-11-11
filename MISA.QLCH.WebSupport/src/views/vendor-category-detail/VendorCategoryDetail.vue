<template src="./VendorCategoryDetail.html"></template>
<style lang="scss" scoped src="./VendorCategoryDetail.scss"></style>
<script lang="ts">
import VendorCategoryDetail from './VendorCategoryDetail';
import { PropType, Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import VendorCategory from '@store-src/models/vendor-category/VendorCategory';
import Guid from '@library-src/utilities/types/Guid';
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
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
    const thisData: Ref<VendorCategoryDetail> = ref(new VendorCategoryDetail());
    return { thisData };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm mới nhóm nhà cung cấp";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtCodeVendorCategory": new TextBox({
          fieldText: "Mã nhóm NCC",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "CodeVendorCategory"
        }),
        "txtNameVendorCategory": new TextBox({
          fieldText: "Tên nhóm NCC",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameVendorCategory"
        }),
        "txtDescribeVendorCategory": new TextBox({
          fieldText: "Mô tả",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DescribeVendorCategory"
        }),
        "txtStatusVendorCategory": new Combobox({
          fieldText: "Trạng thái",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "Đang hoạt động",
              display: "Đang hoạt động"
            },
            {
              value: "Ngừng hoạt động",
              display: "Ngừng hoạt động"
            }
          ],
          bindingIndex: "StatusVendorCategory"
        }),

      }
    },
    saveData() {
      const me = this;
      let listVendorCategory: Array<VendorCategory> | null = new Array<VendorCategory>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['VendorCategoryId'] = Guid.NewGuid();
          listVendorCategory = LocalStorageLibrary.getByKey<Array<VendorCategory>>("VendorCategory");
          if (listVendorCategory) {
            listVendorCategory.push(me.masterData);
            LocalStorageLibrary.setByKey("VendorCategory", listVendorCategory);
          }
          else {
            listVendorCategory = new Array<VendorCategory>({ ...me.masterData });
            LocalStorageLibrary.setByKey("VendorCategory", listVendorCategory);
          }
        }
        if (me.masterData.editMode == 2) {
          listVendorCategory = LocalStorageLibrary.getByKey<Array<VendorCategory>>("VendorCategory");
          if (listVendorCategory) {
            listVendorCategory.forEach(newItemVendorCategory => {
              if (me.masterData) {
                if (newItemVendorCategory.VendorCategoryId == me.masterData.VendorCategoryId) {
                  newItemVendorCategory.CodeVendorCategory = me.masterData.CodeVendorCategory;
                  newItemVendorCategory.NameVendorCategory = me.masterData.NameVendorCategory;
                  newItemVendorCategory.DescribeVendorCategory = me.masterData.DescribeVendorCategory;
                  newItemVendorCategory.StatusVendorCategory = me.masterData.StatusVendorCategory;
                }
              }
            });
            LocalStorageLibrary.setByKey("VendorCategory", listVendorCategory);
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
