<template src="./DemoDate.html"></template>
<style lang="scss" scoped src="./DemoDate.scss"></style>
<script lang="ts">
import EDate from "@src/components/qlch_date/EDate.vue"
import Log from "@library-src/utilities/Log";
import DateModel from "@library-src/models/qlch_control/qlch_date/DateModel";
import { Ref, ref } from "vue";
export default {
    components: {
        EDate
    },

    setup() {
        const dtDefault: Ref<DateModel> = ref(new DateModel({
            fieldText: "DemoDateResource.OutwardDate",
            value: new Date
        }));


        const dtRequire: DateModel = new DateModel({
            fieldText: "DemoDateResource.OutwardDate",
            require: true,
        });

        const dtReadOnly: DateModel = new DateModel({
            fieldText: "DemoDateResource.OutwardDate",
            readOnly: true,
        });

        const dtLoading: Ref<DateModel> = ref(new DateModel({
            fieldText: "DemoDateResource.OutwardDate",
        }));

        return {
            dtDefault, 
            dtRequire,
            dtReadOnly,
            dtLoading
        }
    },
    /**
   * Hook
   */
    created() {
        try {
            this.dtLoading.isLoadingData = true;
        } catch (error) {
            Log.ErrorLog(error as Error)
        }
    }
}
</script>
