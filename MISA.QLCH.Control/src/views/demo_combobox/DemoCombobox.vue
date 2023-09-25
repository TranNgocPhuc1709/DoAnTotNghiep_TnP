<template src="./DemoCombobox.html"></template>
<style lang="scss" scoped src="./DemoCombobox.scss"></style>
<script lang="ts">
import ECombobox from "@src/components/qlch_combobox/ECombobox.vue";
import Common from "@library-src/utilities/commons/Function";
import Log from "@library-src/utilities/Log";
import Combobox from "@library-src/models/qlch_control/qlch_combobox/Combobox";
import { Ref, ref } from "vue";
export default {
    components: {
        ECombobox
    },

    setup() {
        const cbbDefault: Ref<Combobox> = ref(new Combobox({
            fieldText: "Nhóm hàng hóa",
            // data: [
            //     {
            //         value: 1,
            //         display: "G1"
            //     },
            //     {
            //         value: 2,
            //         display: "G2"
            //     },
            //     {
            //         value: 3,
            //         display: "G3"
            //     },
            //     {
            //         value: "4",
            //         display: "G4"
            //     },
            //     {
            //         value: 5,
            //         display: "G5"
            //     },
            //     {
            //         value: 6,
            //         display: "E1"
            //     },
            //     {
            //         value: 7,
            //         display: "E2"
            //     },
            //     {
            //         value: 8,
            //         display: "E3"
            //     },
            //     {
            //         value: 9,
            //         display: "E4"
            //     },
            //     {
            //         value: 10,
            //         display: "E6"
            //     },
            //     {
            //         value: 11,
            //         display: "F1"
            //     },
            //     {
            //         value: 12,
            //         display: "F2"
            //     },
            //     {
            //         value: 13,
            //         display: "F3"
            //     },
            //     {
            //         value: 14,
            //         display: "F4"
            //     },
            //     {
            //         value: 15,
            //         display: "F5"
            //     }
            // ]
        }));


        const cbbRequire: Ref<Combobox> = ref(new Combobox({
            fieldText: "Nhóm hàng hóa",
            require: true,
            data: [
                {
                    value: 1,
                    display: "G1"
                },
                {
                    value: 2,
                    display: "G2"
                },
                {
                    value: 3,
                    display: "G3"
                },
                {
                    value: "4",
                    display: "G4"
                },
                {
                    value: 5,
                    display: "G5"
                },
                {
                    value: 6,
                    display: "E1"
                },
                {
                    value: 7,
                    display: "E2"
                },
                {
                    value: 8,
                    display: "E3"
                },
                {
                    value: 9,
                    display: "E4"
                },
                {
                    value: 10,
                    display: "E6"
                },
                {
                    value: 11,
                    display: "F1"
                },
                {
                    value: 12,
                    display: "F2"
                },
                {
                    value: 13,
                    display: "F3"
                },
                {
                    value: 14,
                    display: "F4"
                },
                {
                    value: 15,
                    display: "F5"
                }
            ]
            // require: true
        }));

        const cbbReadOnly: Combobox = new Combobox({
            fieldText: "Nhóm hàng hóa",
            readOnly: true,
            data: [
                {
                    value: 1,
                    display: "G1"
                },
                {
                    value: 2,
                    display: "G2"
                },
                {
                    value: 3,
                    display: "G3"
                },
                {
                    value: "4",
                    display: "G4"
                },
                {
                    value: 5,
                    display: "G5"
                },
                {
                    value: 6,
                    display: "E1"
                },
                {
                    value: 7,
                    display: "E2"
                },
                {
                    value: 8,
                    display: "E3"
                },
                {
                    value: 9,
                    display: "E4"
                },
                {
                    value: 10,
                    display: "E6"
                },
                {
                    value: 11,
                    display: "F1"
                },
                {
                    value: 12,
                    display: "F2"
                },
                {
                    value: 13,
                    display: "F3"
                },
                {
                    value: 14,
                    display: "F4"
                },
                {
                    value: 15,
                    display: "F5"
                }
            ]
        });

        const cbbLoading: Ref<Combobox> = ref(new Combobox({
            fieldText: "Nhóm hàng hóa",
            data: [
                {
                    value: 1,
                    display: "G1"
                },
                {
                    value: 2,
                    display: "G2"
                },
                {
                    value: 3,
                    display: "G3"
                },
                {
                    value: 4,
                    display: "G4"
                },
                {
                    value: 5,
                    display: "G5"
                },
                {
                    value: 6,
                    display: "E1"
                },
                {
                    value: 7,
                    display: "E2"
                },
                {
                    value: 8,
                    display: "E3"
                },
                {
                    value: 9,
                    display: "E4"
                },
                {
                    value: 10,
                    display: "E6"
                },
                {
                    value: 11,
                    display: "F1"
                },
                {
                    value: 12,
                    display: "F2"
                },
                {
                    value: 13,
                    display: "F3"
                },
                {
                    value: 14,
                    display: "F4"
                },
                {
                    value: 15,
                    display: "F5"
                }
            ]
        }));

        return {
            cbbDefault,
            cbbRequire,
            cbbReadOnly,
            cbbLoading

        }
    },

    /**
     * Hook
     */
    created() {
        const me = this;
        try {
            me.cbbLoading.isLoadingData = true;
            me.cbbDefaultLoadItemData(me.cbbDefault);
            me.cbbDefault.isLoadingData = true;
            me.cbbDefault.value = 5;
        } catch (error) {
            Log.ErrorLog(error as Error)
        }
    },

    methods: {
        /**
         * Sự kiện load data cho combobox
         * @param control 
         */
        async cbbDefaultLoadItemData(control: Combobox) {
            try {
                control.isLoadingItemData = true;
                await Common.getTimeOut(3000, "");
                control.data = [
                    {
                        value: 1,
                        display: "G1"
                    },
                    {
                        value: 2,
                        display: "G12"
                    },
                    {
                        value: 3,
                        display: "G123"
                    },
                    {
                        value: "hello",
                        display: "G2"
                    },
                    {
                        value: 5,
                        display: "G26"
                    }
                ];
            } catch (error) {
                Log.ErrorLog(error as Error);
            } finally {
                control.isLoadingItemData = false;
            }
        }
    }
}
</script>
