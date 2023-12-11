<template src="./HomeView.html"></template>
<style src="./HomeView.scss"></style>
<script lang="ts">
import ECombobox from "qlch_control/ECombobox";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import { Ref, ref } from 'vue';
import Log from "@library-src/utilities/Log";
// import PopupLibrary from "@library-src/utilities/commons/PopupLibrary";
import LocalStorageLibrary from "@library-src/utilities/window/local-storage/LocalStorageLibrary";
import CashReceiptDetail from "@store-src/models/cash-receipt/CashReceiptDetail";
import Bill from "@store-src/models/bill-main/Bill";
import CashReceipt from "@store-src/models/cash-receipt/CashReceipt";

export default {
    components: {
        ECombobox
    },
    data() {
        const TotalProceeds: Ref<number> = ref(0);
        const TotalAnother: Ref<number> = ref(0);
        const TotalSell: Ref<number> = ref(0);
        const NumberInvoiceCompleted: Ref<number> = ref(0);
        const TotalInvoiceCompleted: Ref<number> = ref(0);
        const TotalRevenue: Ref<number> = ref(0);
        const TotalInvoiceStore: Ref<number> = ref(0);
        const NumberInvoiceStore: Ref<number> = ref(0);
        const TotalNumberInvoiceStore: Ref<number> = ref(0);


        const lstBill: Ref<Array<Bill>> = ref(new Array<Bill>());
        const lstCashReceiptMain: Ref<Array<CashReceipt>> = ref(new Array<CashReceipt>());
        const itemBill: Ref<Bill> = ref(new Bill());
        return {
            // timePresent: new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' }),
            timePresent: new Date().toLocaleDateString(),
            TotalProceeds,
            lstBill,
            itemBill,
            TotalSell,
            NumberInvoiceCompleted,
            TotalInvoiceCompleted,
            TotalRevenue,
            lstCashReceiptMain,
            TotalAnother,
            TotalInvoiceStore,
            NumberInvoiceStore,
            TotalNumberInvoiceStore


        }
    },
    setup() {
        const lstCashReceipt = LocalStorageLibrary.getByKey<Array<CashReceiptDetail>>("cashReceiptDetail") ?? new Array<CashReceiptDetail>();
        const cbbCostBill: Ref<Combobox> = ref(new Combobox({
            require: true,
            data: [
                {
                    value: 1,
                    display: "Tháng này"
                },
                {
                    value: 2,
                    display: "Tháng trước"
                },
                {
                    value: 3,
                    display: "Quý này"
                },
                {
                    value: 4,
                    display: "Quý trước"
                },
                {
                    value: 5,
                    display: "Năm nay"
                },
                {
                    value: 6,
                    display: "Năm trước"
                },
                {
                    value: 7,
                    display: "Tháng 1"
                },

                {
                    value: 8,
                    display: "Tháng 2"
                },

                {
                    value: 9,
                    display: "Tháng 3"
                },

                {
                    value: 10,
                    display: "Tháng 4"
                },

                {
                    value: 11,
                    display: "Tháng 5"
                },

                {
                    value: 12,
                    display: "Tháng 6"
                },

                {
                    value: 13,
                    display: "Tháng 7"
                },

                {
                    value: 14,
                    display: "Tháng 8"
                },
                {
                    value: 15,
                    display: "Tháng 9"
                },
                {
                    value: 16,
                    display: "Tháng 10"
                },
                {
                    value: 17,
                    display: "Tháng 11"
                },
                {
                    value: 18,
                    display: "Tháng 12"
                }



            ]

            // require: true
        }));
        const cbbMonth: Ref<Combobox> = ref(new Combobox({
            require: true,
            data: [
                {
                    value: 1,
                    display: "Tháng này"
                },
                {
                    value: 2,
                    display: "Tháng trước"
                },
                {
                    value: 7,
                    display: "Tháng 1"
                },

                {
                    value: 8,
                    display: "Tháng 2"
                },

                {
                    value: 9,
                    display: "Tháng 3"
                },

                {
                    value: 10,
                    display: "Tháng 4"
                },

                {
                    value: 11,
                    display: "Tháng 5"
                },

                {
                    value: 12,
                    display: "Tháng 6"
                },

                {
                    value: 13,
                    display: "Tháng 7"
                },

                {
                    value: 14,
                    display: "Tháng 8"
                },
                {
                    value: 15,
                    display: "Tháng 9"
                },
                {
                    value: 16,
                    display: "Tháng 10"
                },
                {
                    value: 17,
                    display: "Tháng 11"
                },
                {
                    value: 18,
                    display: "Tháng 12"
                }

            ]
            // require: true
        }));
        const cbbChart: Ref<Combobox> = ref(new Combobox({
            require: true,
            data: [
                {
                    value: 1,
                    display: "Tỷ trọng doanh thu hàng hóa"
                },
                {
                    value: 2,
                    display: "Hàng hóa bán chạy"
                }
            ]
            // require: true
        }));
        const cbbChartDate: Ref<Combobox> = ref(new Combobox({
            require: true,
            data: [
                {
                    value: 1,
                    display: "Hôm nay"
                },
                {
                    value: 2,
                    display: "Hôm qua"
                },
                {
                    value: 7,
                    display: "Tuần này"
                },

                {
                    value: 8,
                    display: "Tuần trước"
                },

                {
                    value: 9,
                    display: "Tháng này"
                },

                {
                    value: 10,
                    display: "Tháng trước"
                },

                {
                    value: 11,
                    display: "Quý này"
                },
                {
                    value: 12,
                    display: "Quý trước"
                },
                {
                    value: 13,
                    display: "Năm nay"
                },
                {
                    value: 14,
                    display: "Năm trước"
                },
                {
                    value: 15,
                    display: "Tháng 1"
                },

                {
                    value: 16,
                    display: "Tháng 2"
                },

                {
                    value: 17,
                    display: "Tháng 3"
                },

                {
                    value: 18,
                    display: "Tháng 4"
                },

                {
                    value: 19,
                    display: "Tháng 5"
                },

                {
                    value: 20,
                    display: "Tháng 6"
                },

                {
                    value: 21,
                    display: "Tháng 7"
                },

                {
                    value: 22,
                    display: "Tháng 8"
                },
                {
                    value: 23,
                    display: "Tháng 9"
                },
                {
                    value: 24,
                    display: "Tháng 10"
                },
                {
                    value: 25,
                    display: "Tháng 11"
                },
                {
                    value: 26,
                    display: "Tháng 12"
                }

            ]
            // require: true
        }));
        const cbbRevenue: Ref<Combobox> = ref(new Combobox({
            require: true,
            data: [
                {
                    value: 1,
                    display: "Doanh thu theo thời gian"
                },
                {
                    value: 2,
                    display: "Lợi nhuận hàng hóa theo thời gian"
                },
                {
                    value: 3,
                    display: "Doanh thu, chi phí, lợi nhuận theo thời gian"
                }
            ]
            // require: true
        }));
        const cbbAllChart: Ref<Combobox> = ref(new Combobox({
            require: true,
            data: [
                {
                    value: 1,
                    display: "Tháng này"
                },
                {
                    value: 2,
                    display: "Tháng trước"
                },

            ]
            // require: true
        }));
        return {
            cbbCostBill,
            cbbMonth,
            cbbChart,
            cbbChartDate,
            cbbRevenue,
            cbbAllChart,
            lstCashReceipt
        }
    },
    created() {
        try {
            const me = this;
            me.cbbCostBill.value = 2;
            me.cbbMonth.value = 2;
            me.cbbChart.value = 1;
            me.cbbChartDate.value = 10;
            me.cbbRevenue.value = 1;
            me.cbbAllChart.value = 2;


            me.lstBill = LocalStorageLibrary.getByKey<Array<Bill>>("itemBill") ?? new Array<Bill>();
            me.lstCashReceiptMain = LocalStorageLibrary.getByKey<Array<CashReceipt>>("cashReceipt") ?? new Array<CashReceipt>();
            // me.TotalProceeds = 0;
            for (let index = 0; index < me.lstBill.length; index++) {
                const element = me.lstBill[index];
                if (element) {
                    me.TotalSell = me.lstBill.map(element => element.collectedMoney ?? 0).reduce((acc, val) => acc + val, 0);;
                    me.NumberInvoiceCompleted = me.lstBill.length;
                    me.TotalInvoiceCompleted = me.lstBill.map(element => element.collectedMoney ?? 0).reduce((acc, val) => acc + val, 0);;
                    me.TotalRevenue = me.TotalInvoiceCompleted;
                    me.TotalInvoiceStore = me.TotalRevenue;
                    me.NumberInvoiceStore = me.NumberInvoiceCompleted;
                    me.TotalNumberInvoiceStore = me.TotalInvoiceCompleted;
                }


            }
            for (let index = 0; index < me.lstCashReceiptMain.length; index++) {
                const element = me.lstCashReceiptMain[index];
                if (element) {
                    me.TotalAnother = me.lstCashReceiptMain.map(element => element.TotalMoneyCashReceipt ?? 0).reduce((acc, val) => acc + val, 0);;
                }
            }
            me.TotalProceeds = me.TotalSell + me.TotalAnother;


        } catch (error) {
            Log.ErrorLog(error as Error);
        }
    },

    methods: {
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
        GetData() {
            try {
                const me = this;
                me.cbbCostBill.value = 2;
                me.cbbMonth.value = 2;
                me.cbbChart.value = 1;
                me.cbbChartDate.value = 10;
                me.cbbRevenue.value = 1;
                me.cbbAllChart.value = 2;


                me.lstBill = LocalStorageLibrary.getByKey<Array<Bill>>("itemBill") ?? new Array<Bill>();
                me.lstCashReceiptMain = LocalStorageLibrary.getByKey<Array<CashReceipt>>("cashReceipt") ?? new Array<CashReceipt>();
                // me.TotalProceeds = 0;
                for (let index = 0; index < me.lstBill.length; index++) {
                    const element = me.lstBill[index];
                    if (element) {
                        me.TotalSell = me.lstBill.map(element => element.collectedMoney ?? 0).reduce((acc, val) => acc + val, 0);;
                        me.NumberInvoiceCompleted = me.lstBill.length;
                        me.TotalInvoiceCompleted = me.lstBill.map(element => element.collectedMoney ?? 0).reduce((acc, val) => acc + val, 0);;
                        me.TotalRevenue = me.TotalInvoiceCompleted;
                        me.TotalInvoiceStore = me.TotalRevenue;
                        me.NumberInvoiceStore = me.NumberInvoiceCompleted;
                        me.TotalNumberInvoiceStore = me.TotalInvoiceCompleted;
                    }


                }
                for (let index = 0; index < me.lstCashReceiptMain.length; index++) {
                    const element = me.lstCashReceiptMain[index];
                    if (element) {
                        me.TotalAnother = me.lstCashReceiptMain.map(element => element.TotalMoneyCashReceipt ?? 0).reduce((acc, val) => acc + val, 0);;
                    }
                }
                me.TotalProceeds = me.TotalSell + me.TotalAnother;


            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        // async showPopUpPrice() {
        //     const component = (await import(`./popup-detail/PopupDetail.vue`)).default;

        //     if (component) {
        //         PopupLibrary.createPopup(component, {});
        //     };
        // },
        // async showPopUpValueRevenue() {
        //     const component = (await import(`./popup-show-revenue-value/PopupShowPopUpValueRevenue.vue`)).default;

        //     if (component) {
        //         PopupLibrary.createPopup(component, {});
        //     };
        // },
        // async showPopUpCOD() {
        //     const component = (await import(`./popup-COD/PopupCod.vue`)).default;
        //     if (component) {
        //         PopupLibrary.createPopup(component, {});
        //     };
        // },
        // async showPopUpDeposit() {
        //     const component = (await import(`./popup-deposit/Popup-Deposit.vue`)).default;
        //     if (component) {
        //         PopupLibrary.createPopup(component, {});
        //     };
        // },
        // async showPopUpOther() {
        //     const component = (await import(`./show-popup-other/ShowPopUpOther.vue`)).default;
        //     if (component) {
        //         PopupLibrary.createPopup(component, {});
        //     };
        // },
        // async showPopUpValueBills() {
        //     const component = (await import(`./show-popup-value-bills/PopUpValueBills.vue`)).default;
        //     if (component) {
        //         PopupLibrary.createPopup(component, {});
        //     };
        // },
        // async showPopUpUpdate() {
        //     const component = (await import(`./show-popup-update/PopUpUpdate.vue`)).default;
        //     if (component) {
        //         PopupLibrary.createPopup(component, {});
        //     };
        // },
        // async showPopUpStore() {
        //     const component = (await import(`./show-popup-store/PopUpStore.vue`)).default;
        //     if (component) {
        //         PopupLibrary.createPopup(component, {});
        //     };
        // },
        // async showPopUpDeliver() {
        //     const component = (await import(`./show-popup-deliver/PopUpDeliver.vue`)).default;
        //     if (component) {
        //         PopupLibrary.createPopup(component, {});
        //     };
        // },
    }

}
</script>