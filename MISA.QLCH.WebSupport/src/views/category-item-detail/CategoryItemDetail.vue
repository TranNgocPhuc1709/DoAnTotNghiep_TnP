<template src="./CategoryItemDetail.html"></template>
<style lang="scss" scoped src="./CategoryItemDetail.scss"></style>
<script lang="ts">
import CategoryItemDetail from './CategoryItemDetail';
import { PropType, Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Guid from '@library-src/utilities/types/Guid';
// import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
// import ECombobox from "qlch_control/ECombobox";
import CategoryItem from '@store-src/models/category-item/CategoryItem';

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
    // ECombobox

  },
  setup() {
    const thisData: Ref<CategoryItemDetail> = ref(new CategoryItemDetail());
    return {
      thisData,
    };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm mới nhóm hàng hóa";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 155;
      return {
        "txtCodeGroupCategory": new TextBox({
          fieldText: "Mã Nhóm Hàng Hóa",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "CodeGroupCategory"
        }),
        "txtNameGroupCategory": new TextBox({
          fieldText: "Tên Nhóm Hàng Hóa",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameGroupCategory"
        }),
        "txtDescribeCategory": new TextBox({
          fieldText: "Mô Tả",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DescribeCategory"
        })
      }
    },
    saveData() {

      const me = this;
      let listCategory: Array<CategoryItem> | null = new Array<CategoryItem>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['CategoryItemId'] = Guid.NewGuid();
          listCategory = LocalStorageLibrary.getByKey<Array<CategoryItem>>("CategoryItem");
          if (listCategory) {
            listCategory.push(me.masterData);
            LocalStorageLibrary.setByKey("CategoryItem", listCategory);
          }
          else {
            listCategory = new Array<CategoryItem>({ ...me.masterData });
            LocalStorageLibrary.setByKey("CategoryItem", listCategory);
          }
        }
        if (me.masterData.editMode == 2) {
          listCategory = LocalStorageLibrary.getByKey<Array<CategoryItem>>("CategoryItem");
          if (listCategory) {
            listCategory.forEach(newItemRecord => {
              if (me.masterData) {
                if (newItemRecord.CategoryItemId == me.masterData.CategoryItemId) {
                  newItemRecord.CodeGroupCategory = me.masterData.CodeGroupCategory;
                  newItemRecord.NameGroupCategory = me.masterData.NameGroupCategory;
                  newItemRecord.DescribeCategory = me.masterData.DescribeCategory;
                  newItemRecord.StatusCategory = me.masterData.StatusCategory;
                }
              }
            });
            LocalStorageLibrary.setByKey("CategoryItem", listCategory);
          }
        }
        // if (me.masterData.editMode == 4) {
        //   listCategory = LocalStorageLibrary.getByKey<Array<CategoryItem>>("CategoryItem");
        //   if (listCategory) {
        //     listCategory.push(me.masterData);
        //     LocalStorageLibrary.setByKey("CategoryItem", listCategory);
        //   }
        //   else {
        //     listCategory = new Array<CategoryItem>({ ...me.masterData });
        //     LocalStorageLibrary.setByKey("CategoryItem", listCategory);
        //   }
        // }
      }
    },

    /**
    * Sau khi đóng form xong thì xử lý thêm gì ở master thì Override function này ở master
    */
    afterCloseForm() { },
  }

}
</script>
