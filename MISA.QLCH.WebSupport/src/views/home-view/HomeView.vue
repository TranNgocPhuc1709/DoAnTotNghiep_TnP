<template src="./HomeView.html"></template>
<style src="./HomeView.scss"></style>
<script lang="ts">
import ECombobox from "qlch_control/ECombobox";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import { Ref, ref } from 'vue';
import Log from "@library-src/utilities/Log";
import PopupLibrary from "@library-src/utilities/commons/PopupLibrary";

export default {
    components: {
        ECombobox
    },
    setup() {
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
            cbbAllChart
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

        } catch (error) {
            Log.ErrorLog(error as Error);
        }
    },

    methods: {
        async showPopUpPrice() {
            const component = (await import(`./popup-detail/PopupDetail.vue`)).default;

            if (component) {
                PopupLibrary.createPopup(component, {});
            };
        },
        async showPopUpValueRevenue() {
            const component = (await import(`./popup-show-revenue-value/PopupShowPopUpValueRevenue.vue`)).default;

            if (component) {
                PopupLibrary.createPopup(component, {});
            };
        },
        async showPopUpCOD() {
            const component = (await import(`./popup-COD/PopupCod.vue`)).default;
            if (component) {
                PopupLibrary.createPopup(component, {});
            };
        },
        async showPopUpDeposit() {
            const component = (await import(`./popup-deposit/Popup-Deposit.vue`)).default;
            if (component) {
                PopupLibrary.createPopup(component, {});
            };
        },
        async showPopUpOther() {
            const component = (await import(`./show-popup-other/ShowPopUpOther.vue`)).default;
            if (component) {
                PopupLibrary.createPopup(component, {});
            };
        },
        async showPopUpValueBills() {
            const component = (await import(`./show-popup-value-bills/PopUpValueBills.vue`)).default;
            if (component) {
                PopupLibrary.createPopup(component, {});
            };
        },
        async showPopUpUpdate() {
            const component = (await import(`./show-popup-update/PopUpUpdate.vue`)).default;
            if (component) {
                PopupLibrary.createPopup(component, {});
            };
        },
        async showPopUpStore() {
            const component = (await import(`./show-popup-store/PopUpStore.vue`)).default;
            if (component) {
                PopupLibrary.createPopup(component, {});
            };
        },
        async showPopUpDeliver() {
            const component = (await import(`./show-popup-deliver/PopUpDeliver.vue`)).default;
            if (component) {
                PopupLibrary.createPopup(component, {});
            };
        },
    }

}
</script>