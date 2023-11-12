<template src="./BankDetail.html"></template>
<style lang="scss" scoped src="./BankDetail.scss"></style>
<script lang="ts">
import BankDetail from './BankDetail';
import { PropType, Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import Bank from '@store-src/models/bank/Bank';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
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
    ECombobox
  },

  setup() {
    const thisData: Ref<BankDetail> = ref(new BankDetail());
    return { thisData };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm tài khoản ngân hàng";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtCodeAccount": new TextBox({
          fieldText: "Số tài khoản",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "CodeAccount"
        }),
        "txtNameAccount": new TextBox({
          fieldText: "Tên ngân hàng",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameAccount"
        }),
        "txtOwnerAccount": new TextBox({
          fieldText: "Chủ tài khoản",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "OwnerAccount"
        }),
        "txtExplainAccount": new TextBox({
          fieldText: "Diễn giải",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ExplainAccount"
        }),
        "txtStatusAccount": new Combobox({
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
          bindingIndex: "StatusAccount"
        })
      }
    },
    saveData() {
      const me = this;
      let listBank: Array<Bank> | null = new Array<Bank>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['BankId'] = Guid.NewGuid();
          listBank = LocalStorageLibrary.getByKey<Array<Bank>>("Bank");
          if (listBank) {
            listBank.push(me.masterData);
            LocalStorageLibrary.setByKey("Bank", listBank);
          }
          else {
            listBank = new Array<Bank>({ ...me.masterData });
            LocalStorageLibrary.setByKey("Bank", listBank);
          }
        }
        if (me.masterData.editMode == 2) {
          listBank = LocalStorageLibrary.getByKey<Array<Bank>>("Bank");
          if (listBank) {
            listBank.forEach(newItemBank => {
              if (me.masterData) {
                if (newItemBank.BankId == me.masterData.BankId) {
                  newItemBank.CodeAccount = me.masterData.CodeAccount;
                  newItemBank.NameAccount = me.masterData.NameAccount;
                  newItemBank.OwnerAccount = me.masterData.OwnerAccount;
                  newItemBank.ExplainAccount = me.masterData.ExplainAccount;
                  newItemBank.StatusAccount = me.masterData.StatusAccount;
                }
              }
            });
            LocalStorageLibrary.setByKey("Bank", listBank);
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
