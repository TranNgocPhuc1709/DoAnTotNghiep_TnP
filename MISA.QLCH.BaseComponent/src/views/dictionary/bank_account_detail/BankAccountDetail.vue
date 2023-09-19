<template src="./BankAccountDetail.html"></template>
<style lang="scss" scoped src="./BankAccountDetail.scss"></style>
<script lang="ts">
import BaseDictionaryDetailController from "@src/components/base_dictionary_detail/BaseDictionaryDetailController.vue";
import BaseDictionaryDetailView from "@src/components/base_dictionary_detail/BaseDictionaryDetailView.vue";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import { } from "vue";

export default {

    extends: BaseDictionaryDetailController,

    components: {
        BaseDictionaryDetailView,
        ETextBox
    },



    methods: {
        /**
         * Khai báo tiêu đề cho form
         */
        getTitleForm() {
            return "Tài khoản ngân hàng";
        },

        /**
         * Khởi tạo control binding trên form
         */
        buildBindingControl() {
            const labelWidth = 100;
            return {
                "txtAccountNumber": new TextBox({
                    fieldText: "Số tài khoản",
                    require: true,
                    maxLength: 255,
                    labelWidth: labelWidth,
                    bindingIndex: "AccountNumber"
                }),
                "txtBankName": new TextBox({
                    fieldText: "Tên ngân hàng",
                    require: true,
                    maxLength: 255,
                    labelWidth: labelWidth,
                    bindingIndex: "BankName"
                }),
                "txtAccountHolder": new TextBox({
                    fieldText: "Chủ tài khoản",
                    maxLength: 255,
                    labelWidth: labelWidth,
                    bindingIndex: "AccountHolder"
                }),
                "txtDescription": new TextBox({
                    fieldText: "Diễn giải",
                    maxLength: 255,
                    labelWidth: labelWidth,
                    bindingIndex: "Description"
                }),
            }
        },

        /**
         * Sau khi đóng form xong thì xử lý thêm gì ở master thì Override function này ở master
         */
        afterCloseForm() { },
    }
}
</script>