<template src="./BankAccountDetail.html"></template>
<style lang="scss" scoped src="./BankAccountDetail.scss"></style>
<script lang="ts">
import BankAccountDetail from './BankAccountDetail';
import { PropType, Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Guid from '@library-src/utilities/types/Guid';
import BankAccount from '@store-src/models/bank-account/BankAccount';
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
    const thisData: Ref<BankAccountDetail> = ref(new BankAccountDetail());
    return { thisData };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm mới phương thức thanh toán";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtNameCardBank": new TextBox({
          fieldText: "Tên thẻ",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameCardBank"
        }),
        "txtExplainBank": new TextBox({
          fieldText: "Diễn giải",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ExplainBank"
        }),
        "txtStatusBank": new Combobox({
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
          bindingIndex: "StatusBank"
        }),
      }
    },
    saveData() {
      const me = this;
      let listBankAccount: Array<BankAccount> | null = new Array<BankAccount>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['BankAccountId'] = Guid.NewGuid();
          listBankAccount = LocalStorageLibrary.getByKey<Array<BankAccount>>("BankAccount");
          if (listBankAccount) {
            listBankAccount.push(me.masterData);
            LocalStorageLibrary.setByKey("BankAccount", listBankAccount);
          }
          else {
            listBankAccount = new Array<BankAccount>({ ...me.masterData });
            LocalStorageLibrary.setByKey("BankAccount", listBankAccount);
          }
        }
        if (me.masterData.editMode == 2) {
          listBankAccount = LocalStorageLibrary.getByKey<Array<BankAccount>>("BankAccount");
          if (listBankAccount) {
            listBankAccount.forEach(newItemBankAccount => {
              if (me.masterData) {
                if (newItemBankAccount.BankAccountId == me.masterData.BankAccountId) {
                  newItemBankAccount.NameCardBank = me.masterData.NameCardBank;
                  newItemBankAccount.ExplainBank = me.masterData.ExplainBank;
                  newItemBankAccount.StatusBank = me.masterData.StatusBank;
                }
              }
            });
            LocalStorageLibrary.setByKey("BankAccount", listBankAccount);
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
