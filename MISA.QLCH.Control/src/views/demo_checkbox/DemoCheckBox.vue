<template src="./DemoCheckBox.html"></template>
<style lang="scss" scoped src="./DemoCheckBox.scss"></style>
<script lang="ts">
import ECheckbox from "@src/components/qlch_checkbox/ECheckbox.vue"
import Checkbox from "@library-src/models/qlch_control/qlch_checkbox/Checkbox";
import { Ref, ref } from "vue";
export default {
    components: {
        ECheckbox
    },
    setup() {
        const cbkDefault: Ref<Checkbox> = ref(new Checkbox({
            fieldText: "Ngừng theo dõi"
        }));
        const cbkReadOnly: Ref<Checkbox> = ref(new Checkbox({
            fieldText: "Quản trị hệ thống",
            readOnly : true,
            value: true
        }));

        let cbkLoadingDefault = new Checkbox({
            fieldText: "Quản trị hệ thống",
            readOnly : true,
            value: true
        });
        cbkLoadingDefault.isLoadingData = true;
        const cbkLoading: Ref<Checkbox> = ref(cbkLoadingDefault);
        return {
            cbkDefault,
            cbkReadOnly,
            cbkLoading
        }
    },
}
</script>