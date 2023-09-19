<template src="./DemoButton.html"></template>
<style lang="scss" scoped src="./DemoButton.scss"></style>

<script lang="ts">
import EButton from "@src/components/qlch_button/EButton.vue";
import Common from "@library-src/utilities/commons/Function";
import Log from "@library-src/utilities/Log";
import Button from "@library-src/models/qlch_control/qlch_button/Button";
import { Ref, ref } from "vue";
export default {
    components: {
        EButton
    },

    setup() {
        const btnDefaultPrimary: Button = new Button({
            fieldText: "Default",
            classType: "primary"
        });

        const btnDefaultSecondary: Button = new Button({
            fieldText: "Default",
            classType: "secondary"
        });

        const btnDefaultTertiary: Button = new Button({
            fieldText: "Default",
            classType: "tertiary"
        });

        const btnIconLeftPrimary: Button = new Button({
            fieldText: "Lưu",
            classType: "primary",
            classIconLeft: "i-save"
        });

        const btnIconLeftSecondary: Button = new Button({
            fieldText: "Lưu và thêm mới",
            classType: "secondary",
            classIconLeft: "i-add"
        });

        const btnIconLeftTertiary: Button = new Button({
            fieldText: "Hủy bỏ",
            classType: "tertiary",
            classIconLeft: "i-cancel"
        });

        const btnIconRightPrimary: Button = new Button({
            fieldText: "Lưu",
            classType: "primary",
            classIconRight: "i-save"
        });

        const btnIconRightSecondary: Button = new Button({
            fieldText: "Lưu và thêm mới",
            classType: "secondary",
            classIconRight: "i-add"
        });

        const btnIconRightTertiary: Button = new Button({
            fieldText: "Hủy bỏ",
            classType: "tertiary",
            classIconRight: "i-cancel"
        });

        const btnReadOnlyPrimary: Button = new Button({
            fieldText: "ReadOnly",
            classType: "primary",
            readOnly: true
        });

        const btnReadOnlySecondary: Button = new Button({
            fieldText: "ReadOnly",
            classType: "secondary",
            readOnly: true
        });

        const btnReadOnlyTertiary: Button = new Button({
            fieldText: "ReadOnly",
            classType: "tertiary",
            readOnly: true
        })

        const btnLoadingPrimary: Ref<Button> = ref(new Button({
            fieldText: "Click Here",
            classType: "primary",
            classIconLeft: "i-save"
        }));

        const btnLoadingSecondary: Ref<Button> = ref(new Button({
            fieldText: "Click Here",
            classType: "secondary",
            classIconLeft: "i-add"
        }));

        const btnLoadingTertiary: Ref<Button> = ref(new Button({
            fieldText: "Click Here",
            classType: "tertiary",
            classIconLeft: "i-cancel"
        }));


        return {
            btnDefaultPrimary,
            btnDefaultSecondary,
            btnDefaultTertiary,
            btnIconLeftPrimary,
            btnIconLeftSecondary,
            btnIconLeftTertiary,
            btnIconRightPrimary,
            btnIconRightSecondary,
            btnIconRightTertiary,
            btnReadOnlyPrimary,
            btnReadOnlySecondary,
            btnReadOnlyTertiary,
            btnLoadingPrimary,
            btnLoadingSecondary,
            btnLoadingTertiary
        }
    },

    methods: {
        /**
         * Sự kiện click vào btn show loading
         * tnduc - 2022.08.25
         * @param control 
         */
        async btnLoading_Click(control: Button) {
            try {
                if (!control) {
                    return;
                }
                control.isLoadingData = true; //If you want to interfere with data editing in setup(), use ref

                await Common.getTimeOut(3000, "");
            } catch (error) {
                Log.ErrorLog(error as Error);
            } finally {
                if (control) {
                    control.isLoadingData = false;
                }
            }
        }
    }
}
</script>