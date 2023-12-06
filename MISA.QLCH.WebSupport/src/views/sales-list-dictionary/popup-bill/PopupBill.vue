<template src="./PopupBill.html"></template>
<style scoped src="./PopupBill.scss"></style>

<script lang="ts">
import Log from '@library-src/utilities/Log';
import PopupLibrary from '@library-src/utilities/commons/PopupLibrary';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Bill from '@store-src/models/bill-main/Bill';
import BillDetail from '@store-src/models/bill-main/BillDetail';
// import BillDetail from '@store-src/models/bill-main/BillDetail';
import BaseController from 'qlch_base/BaseController';
import EPopup from "qlch_control/EPopup";
import { Ref, ref } from 'vue';
// import { Ref, ref } from 'vue/dist/vue.js';
// import Bill from '@store-src/models/bill-main/Bill';
// import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';

export default {
    extends: BaseController,
    components: {
        EPopup,

    },

    props: {
        idRoot: {
            type: String
        },
        itemBill: {
            type: Bill
        }
    },
    data() {
        const lstBillDetail: Ref<Array<BillDetail>> = ref(new Array<BillDetail>());

        return {
            lstBillDetail
        }
    },
    created() {
        try {
            const me = this;
            me.lstBillDetail = LocalStorageLibrary.getByKey<Array<BillDetail>>("BillItemDetail") ?? new Array<BillDetail>();
            if (me.lstBillDetail) {
                me.lstBillDetail = me.lstBillDetail.filter(item => {
                    if (me.itemBill) {
                        return item.BillId == me.itemBill['BillId'];
                    }
                });
            }
        } catch (error) {
            Log.ErrorLog(error as Error);
        }
    },
    methods: {
        /**
     * Đóng thông báo
     * tnphuc - 19.09.2023 
     */
        onCloseClick() {
            const me = this;
            try {
                if (me.idRoot) {
                    PopupLibrary.closePopup(me.idRoot);
                }
            } catch (error) {
                Log.ErrorLog(error as Error)
            }
        },
        formatCurrency(value: any) {
            // Định dạng giá trị tiền tệ
            const formattedValue = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'VND', // Điều này có thể được thay đổi thành đơn vị tiền tệ của bạn
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(value);
            const currencySymbol = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'VND',
            }).formatToParts(1).find(part => part.type === 'currency')?.value;
            if (currencySymbol) {
                return formattedValue.replace(new RegExp(currencySymbol, 'g'), '').trim();
            }

            return formattedValue.trim();
        },
    }
}
</script>