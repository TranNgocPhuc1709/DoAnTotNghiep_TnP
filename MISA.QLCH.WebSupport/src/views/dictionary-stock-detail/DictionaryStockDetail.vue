<template src="./DictionaryStockDetail.html"></template>
<style lang="scss" scoped src="./DictionaryStockDetail.scss"></style>
<script lang="ts">
import DictionaryStockDetail from './DictionaryStockDetail';
import { PropType, Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import Guid from '@library-src/utilities/types/Guid';
import DictionaryStock from '@store-src/models/dictionary-stock/DictionaryStock';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';

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
    const thisData: Ref<DictionaryStockDetail> = ref(new DictionaryStockDetail());
    return { thisData };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm mới kho";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtCodeStore": new TextBox({
          fieldText: "Mã kho",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "CodeStore"
        }),
        "txtNameStore": new TextBox({
          fieldText: "Tên kho",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameStore"
        }),
        "txtExplainStore": new TextBox({
          fieldText: "Diễn giải",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ExplainStore"
        }),
        "txtStatusStore": new Combobox({
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
          bindingIndex: "StatusStore"
        })
      }
    },

    saveData() {
      const me = this;
      let listDictionaryStock: Array<DictionaryStock> | null = new Array<DictionaryStock>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['DictionaryStockId'] = Guid.NewGuid();
          listDictionaryStock = LocalStorageLibrary.getByKey<Array<DictionaryStock>>("dictionaryStock");
          if (listDictionaryStock) {
            listDictionaryStock.push(me.masterData);
            LocalStorageLibrary.setByKey("dictionaryStock", listDictionaryStock);
          }
          else {
            listDictionaryStock = new Array<DictionaryStock>({ ...me.masterData });
            LocalStorageLibrary.setByKey("dictionaryStock", listDictionaryStock);
          }
        }
        if (me.masterData.editMode == 2) {
          listDictionaryStock = LocalStorageLibrary.getByKey<Array<DictionaryStock>>("dictionaryStock");
          if (listDictionaryStock) {
            listDictionaryStock.forEach(newItemDictionaryStock => {
              if (me.masterData) {
                if (newItemDictionaryStock.DictionaryStockId == me.masterData.DictionaryStockId) {
                  newItemDictionaryStock.CodeStore = me.masterData.CodeStore;
                  newItemDictionaryStock.NameStore = me.masterData.NameStore;
                  newItemDictionaryStock.ExplainStore = me.masterData.ExplainStore;
                  newItemDictionaryStock.StatusStore = me.masterData.StatusStore;
                }
              }
            });
            LocalStorageLibrary.setByKey("dictionaryStock", listDictionaryStock);
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
