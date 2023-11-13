<template src="./DemoNumber.html"></template>
<style lang="scss" scoped src="./DemoNumber.scss"></style>
<script lang="ts">
import ENumber from '@src/components/qlch_number/ENumber.vue';
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import { Ref, ref } from 'vue';

export default {
    components: {
        ENumber
    },

    setup() {
        const numDefault: Ref<NumberModel> = ref(new NumberModel({
            fieldText: "Số lượng",
            format: new NumberFormat({
                decimal: ".",
                thousands: ",",
                precision: 4
            }),
        }));

        const numReadOnly: Ref<NumberModel> = ref(new NumberModel({
            fieldText: "Số lượng",
            readOnly: true,
        }));

        const numRequire: Ref<NumberModel> = ref(new NumberModel({
            fieldText: "Số lượng",
            require: true
        }));

        const numVBoxDefault: Ref<NumberModel> = ref(new NumberModel({
            fieldText: "Số lượng",
            boxType: "vbox",
        }));

        const numVBoxReadOnly: Ref<NumberModel> = ref(new NumberModel({
            fieldText: "Số lượng",
            readOnly: true,
            boxType: "vbox",
        }));

        const numVBoxRequire: Ref<NumberModel> = ref(new NumberModel({
            fieldText: "Số lượng",
            require: true,
            boxType: "vbox",
        }));

        const numPasswordReadOnly: Ref<NumberModel> = ref(new NumberModel({
            fieldText: "Nhập số lượng cần mua",
            readOnly: true,
        }));

        const numPasswordRequire: Ref<NumberModel> = ref(new NumberModel({
            placeholder: "Nhập số lượng cần mua",
            require: true,
        }));

        const numLoading: Ref<NumberModel> = ref(new NumberModel({
            fieldText: "Số lượng",
            require: true,
        }));

        return {
            numDefault,
            numReadOnly,
            numRequire,
            numVBoxDefault,
            numVBoxReadOnly,
            numVBoxRequire,
            numPasswordReadOnly,
            numPasswordRequire,
            numLoading
        }


    },



}
</script>
