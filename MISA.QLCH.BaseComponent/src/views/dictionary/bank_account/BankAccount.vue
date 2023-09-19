<template src="./BankAccount.html"></template>
<style lang="scss" scoped src="./BankAccount.scss"></style>
<script lang="ts">
import BaseDictionaryListView from '@src/components/base_dictionary/BaseDictionaryListView.vue';
import BaseDictionaryListController from '@src/components/base_dictionary/BaseDictionaryListController.vue';
import EButton from 'qlch_control/EButton';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import Log from '@library-src/utilities/Log';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
export default {

    extends: BaseDictionaryListController,

    components: {
        BaseDictionaryListView,
        EButton
    },
    methods: {

        /**
         * Tạo dòng mặc định
         */
        getTemplateRecord() {
            return {
                SortOrder: "0",
                AccountNumber: "",
                BankName: "",
                AccountHolder: "",
                Description: "",
                Status: "Ngừng theo dõi"
            };
        },

        /**
         * build danh sách cột cho grid chính
         */
        buildGridMasterColumn(): Array<Column> {
            return Array(
                new Column({
                    fieldText: "Thứ tự hiển thị",
                    dataIndex: "SortOrder",
                    width: 120,

                }),
                new Column({
                    fieldText: "Số tài khoản",
                    dataIndex: "AccountNumber",
                    width: 260
                }),
                new Column({
                    fieldText: "Tên ngân hàng",
                    dataIndex: "BankName",
                    width: 260
                }),
                new Column({
                    fieldText: "Chủ tài khoản",
                    dataIndex: "AccountHolder",
                    width: 260
                }),
                new Column({
                    fieldText: "Diễn giải",
                    dataIndex: "Description",
                    minWidth: 260,
                    flex: 1
                }),
                new Column({
                    fieldText: "Trạng thái",
                    dataIndex: "Status",
                    width: 160
                })
            )
        },

        /**
         * Set PrimaryKey cho object master
         */
        getPrimaryKeyMaster() {
            return "BankName";
        },

        /**
         * Khai báo import component detail
         * Override lại function after close form
         */
        async createComponent() {
            const me = this;
            const bankAccountDetail = (await import(`@src/views/dictionary/bank_account_detail/BankAccountDetail.vue`)).default;
            if (bankAccountDetail && bankAccountDetail.methods) {
                bankAccountDetail.methods.afterCloseForm = () => {
                    Log.InfoLog(JSON.stringify(me.viewControl?.gridMaster?.data));
                };
            }
            return bankAccountDetail;
        },

        /**
     * Load dữ liệu master lên grid
     * @param param 
     */
        loadMasterData(param: ParamPaging) {
            console.log("Dev: Override function loadMasterData with param: " + JSON.stringify(param));
            return [
                {
                    SortOrder: "Value 11",
                    AccountNumber: "Value 21",
                    BankName: "Value 31",
                    AccountHolder: "Value 41",
                    Description: "Value 51",
                    Status: "Value 61"
                },
                {
                    SortOrder: "Value 12",
                    AccountNumber: "Value 22",
                    BankName: "Value 32",
                    AccountHolder: "Value 42",
                    Description: "Value 52",
                    Status: "Value 62"
                },
                {
                    SortOrder: "Value 13",
                    AccountNumber: "Value 23",
                    BankName: "Value 33",
                    AccountHolder: "Value 43",
                    Description: "Value 53",
                    Status: "Value 63"
                },
                {
                    SortOrder: "Value 14",
                    AccountNumber: "Value 24",
                    BankName: "Value 34",
                    AccountHolder: "Value 44",
                    Description: "Value 54",
                    Status: "Value 64"
                },
                {
                    SortOrder: "Value 15",
                    AccountNumber: "Value 25",
                    BankName: "Value 35",
                    AccountHolder: "Value 45",
                    Description: "Value 55",
                    Status: "Value 65"
                }
            ];
        },
    }
}
</script>