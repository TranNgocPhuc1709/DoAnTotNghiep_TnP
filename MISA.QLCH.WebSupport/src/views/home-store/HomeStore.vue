<template src="./HomeStore.html"></template>
<style lang="scss"  src="./HomeStore.scss"></style>
<script lang="ts">
import { Ref, ref } from 'vue';
import Log from "@library-src/utilities/Log";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import router from '@src/router';
import Checkbox from '@library-src/models/qlch_control/qlch_checkbox/Checkbox';
import ECheckbox from "qlch_control/ECheckbox";
import Button from '@library-src/models/qlch_control/qlch_button/Button';
import EButton from "qlch_control/EButton";
// import TextBox from '@library-src/models/qlch_control/qlch_text_box/TextBox';
import ETextBox from "qlch_control/ETextBox";
import TextBox from '@library-src/models/qlch_control/qlch_text_box/TextBox';
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import ENumber from "qlch_control/ENumber";

export default {
    components: {
        ECombobox,
        ECheckbox,
        EButton,
        ETextBox,
        ENumber
    },
    data() {
        return {
            billCount: 1,
            bills: [1],
            // Mảng chứa thông tin sản phẩm
        };
    },
    setup() {
        const disableFormLogOut: Ref<boolean> = ref(false);
        const isActive: Ref<boolean> = ref(false);
        const disableFormMoreAction: Ref<boolean> = ref(false);
        const txtQuanTySearch: Ref<TextBox> = ref(new TextBox({
            fieldText: "",
            require: false,
            type: "number",
            placeholder: "0",
            classType: "tertiary"
        }));
        const txtPurchased: Ref<TextBox> = ref(new TextBox({
            fieldText: "",
            require: false,
            type: "number",
            classType: "secondary",
            placeholder: "0"
        }));
        const txtPrice: Ref<NumberModel> = ref(new NumberModel({
            classType: "primary",
            format: new NumberFormat({
                decimal: ".",
                thousands: ",",
                precision: 0
            }),
        }));

        const txtPriceLast: Ref<TextBox> = ref(new TextBox({
            fieldText: "",
            require: false,
            type: "number",
            classType: "secondary",
            placeholder: "0"
        }));

        const txtPayments: Ref<TextBox> = ref(new TextBox({
            fieldText: "",
            require: false,
            type: "number",
            classType: "secondary",
            placeholder: "0"
        }));
        const txtNotice: Ref<TextBox> = ref(new TextBox({
            fieldText: "",
            require: false,
            type: "text",
            classType: "secondary",
            placeholder: "Ghi chú"
        }));
        const cbbCheckPoint: Ref<Combobox> = ref(new Combobox({
            require: true,
            boxType: 'vbox',
            classType: "tertiary",
            data: [
                {
                    value: 1,
                    display: "Tiền mặt"
                },
                {
                    value: 2,
                    display: "Chuyển khoản"
                },
            ]
            // require: true
        }));
        const cbbPayments: Ref<Combobox> = ref(new Combobox({
            require: true,
            boxType: 'vbox',
            classType: "tertiary",
            data: [
                {
                    value: 1,
                    display: "17954697 - ACB"
                },
                {
                    value: 2,
                    display: "Chuyển khoản"
                },
            ]
            // require: true
        }));
        const cbbSearchProduct: Ref<Combobox> = ref(new Combobox({
            require: false,
            boxType: 'vbox',
            classType: "secondary",
            placeholder: "Nhập tên hàng hóa, mã hàng hóa",

            data: [
                {
                    value: 1,
                    display: "SP1"
                },
                {
                    value: 2,
                    display: "SP2"
                },
            ]
            // require: true
        }));
        const cbbAgentSales: Ref<Combobox> = ref(new Combobox({
            require: false,
            boxType: 'vbox',
            classType: "secondary",
            placeholder: "Nhân Viên Bán Hàng",

            data: [
                {
                    value: 1,
                    display: "SP1"
                },
                {
                    value: 2,
                    display: "SP2"
                },
            ]
            // require: true
        }));
        const cbbSelectCustomer: Ref<Combobox> = ref(new Combobox({
            require: false,
            boxType: 'vbox',
            classType: "secondary",
            placeholder: "Tên khách hàng",
            data: [
                {
                    value: 1,
                    display: "Trần Phúc"
                },
                {
                    value: 2,
                    display: "Chuyển khoản"
                },
            ]
            // require: true
        }));
        const txtUnit: Ref<Combobox> = ref(new Combobox({
            require: false,
            boxType: 'vbox',
            classType: "tertiary",
            data: [
                {
                    value: 1,
                    display: "Tiền mặt"
                },
                {
                    value: 2,
                    display: "Chuyển khoản"
                },
            ]
            // require: true
        }));
        const cbkBill: Ref<Checkbox> = ref(new Checkbox({
            fieldText: "In hóa đơn"
        }));
        const cbkOrder: Ref<Checkbox> = ref(new Checkbox({
            fieldText: "Đặt hàng"
        }));
        const btnTemporarySave: Button = new Button({
            fieldText: "Lưu Tạm",
            classType: "SaveBtn"
        });
        const btnCollectMoney: Button = new Button({
            fieldText: "Tính tiền",
            classType: "CollectMoneyBtn"
        });

        const displayItemWarehouse: Ref<boolean> = ref(false)
        return {
            displayItemWarehouse,
            disableFormLogOut,
            disableFormMoreAction,
            cbbCheckPoint,
            cbkBill,
            cbkOrder,
            btnTemporarySave,
            btnCollectMoney,
            cbbSearchProduct,
            cbbAgentSales,
            txtQuanTySearch,
            txtPurchased,
            txtPrice,
            txtPriceLast,
            cbbSelectCustomer,
            txtPayments,
            txtNotice,
            isActive,
            txtUnit,
            cbbPayments
        }
    },
    created() {
        try {
            const me = this;
            me.cbbCheckPoint.value = 1;
            me.cbbPayments.value = 1;

        } catch (error) {
            Log.ErrorLog(error as Error);
        }
    },
    watch: {
        bills: {
            handler(newBills) {
                // Kiểm tra nếu không còn bill-item, thêm tự động một bill-item mới
                if (newBills.length === 0) {
                    this.addNewBill();
                }
            },
            deep: true
        }
    },
    methods: {
        addNewBill() {
            try {
                const me = this;
                me.billCount++;
                // Tăng số lượng bill
                me.bills.push(me.billCount)
                // Thêm hóa đơn mới vào danh sách với số thứ tự tăng dần
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        deleteBill(index: number) {
            try {
                const me = this;
                me.bills.splice(index, 1);
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        ShowFormLogOut() {
            try {
                const me = this;
                me.disableFormLogOut = !me.disableFormLogOut
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        LogOutClickOut() {
            const me = this;
            try {
                if (me.disableFormLogOut) {
                    me.disableFormLogOut = false;
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        LogOutActive() {
            const me = this;
            try {
                if (me.isActive) {
                    me.isActive = false;
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        LogOut() {
            localStorage.clear();
            router.push({ path: '/login' })

        },
        ShowFormMoreAction() {
            try {
                const me = this;
                me.disableFormMoreAction = !me.disableFormMoreAction
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        MoreActionClickOut() {
            const me = this;
            try {
                if (me.disableFormMoreAction) {
                    me.disableFormMoreAction = false;
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        routerManage() {
            router.push({ path: '/home' })
        },
        handleProductSearchClick() {
            const me = this;
            me.isActive = !this.isActive;
        }

    }

}
</script>