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

export default {
    components: {
        ECombobox,
        ECheckbox,
        EButton
    },
    data() {
        return {
            products: [
                // id: 1,
                // code: 'SP001',
                // name: 'Áo Polo Nam',
                // quantity: 1,
                // price: 100
            ] // Mảng chứa thông tin sản phẩm
        };
    },
    setup() {
        const disableFormLogOut: Ref<boolean> = ref(false)
        const disableFormMoreAction: Ref<boolean> = ref(false)
        const cbbCheckPoint: Ref<Combobox> = ref(new Combobox({
            require: true,
            boxType: 'vbox',
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

    methods: {
        showChosseWarehouse() {
            try {
                const me = this;
                me.displayItemWarehouse = true
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
        }

    }

}
</script>