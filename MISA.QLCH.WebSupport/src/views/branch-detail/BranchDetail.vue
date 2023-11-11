<template src="./BranchDetail.html"></template>
<style lang="scss" scoped src="./BranchDetail.scss"></style>
<script lang="ts">
import BranchDetail from './BranchDetail';
import { PropType, Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Guid from '@library-src/utilities/types/Guid';
import Branch from '@store-src/models/branch/Branch';
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
    const thisData: Ref<BranchDetail> = ref(new BranchDetail());
    return { thisData };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm mới cửa hàng";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtCodeBranch": new TextBox({
          fieldText: "Mã cửa hàng",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "CodeBranch"
        }),
        "txtNameBranch": new TextBox({
          fieldText: "Tên cửa hàng",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameBranch"
        }),
        "txtAddressBranch": new TextBox({
          fieldText: "Địa chỉ",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "AddressBranch"
        }),
        "txtPhoneBranch": new TextBox({
          fieldText: "Số ĐT",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "PhoneBranch"
        }),
        "txtStatusBranch": new Combobox({
          fieldText: "Trạng thái",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "Đang kinh doanh",
              display: "Đang kinh doanh"
            },
            {
              value: "Ngừng kinh doanh",
              display: "Ngừng kinh doanh"
            },
          ],
          bindingIndex: "StatusBranch"
        })

      }
    },
    saveData() {
      const me = this;
      let listBranch: Array<Branch> | null = new Array<Branch>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['BranchId'] = Guid.NewGuid();
          listBranch = LocalStorageLibrary.getByKey<Array<Branch>>("branch");
          if (listBranch) {
            listBranch.push(me.masterData);
            LocalStorageLibrary.setByKey("branch", listBranch);
          }
          else {
            listBranch = new Array<Branch>({ ...me.masterData });
            LocalStorageLibrary.setByKey("branch", listBranch);
          }
        }
        if (me.masterData.editMode == 2) {
          listBranch = LocalStorageLibrary.getByKey<Array<Branch>>("branch");
          if (listBranch) {
            listBranch.forEach(newItemBranch => {
              if (me.masterData) {
                if (newItemBranch.BranchId == me.masterData.BranchId) {
                  newItemBranch.CodeBranch = me.masterData.CodeBranch;
                  newItemBranch.NameBranch = me.masterData.NameBranch;
                  newItemBranch.AddressBranch = me.masterData.AddressBranch;
                  newItemBranch.PhoneBranch = me.masterData.PhoneBranch;
                  newItemBranch.StatusBranch = me.masterData.StatusBranch;
                }
              }
            });
            LocalStorageLibrary.setByKey("branch", listBranch);
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
