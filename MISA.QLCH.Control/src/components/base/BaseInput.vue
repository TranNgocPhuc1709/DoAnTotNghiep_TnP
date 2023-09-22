<script lang="ts">
import BaseControl from "@src/components/base/BaseControl.vue";
import ElementLibrary from "@library-src/utilities/commons/ElementLibrary";
import { ErrorControlType } from "@library-src/utilities/enums/ErrorControlType";
import Log from "@library-src/utilities/Log";
import BaseInput from "@library-src/models/qlch_control/base_input/BaseInput";


export default {
    extends: BaseControl,

    props: {
        control: {
            type: BaseInput,
            require: true
        }
    },

    methods: {
        /**
         * Hover input event, recalculate the display of an empty field warning
         * tnphuc - 19.09.2023 
         */
        onHoverWarning() {
            try {
                const me = this;
                if (!me.control) {
                    return;
                }

                if (!me.control.isValidateSuccess) {
                    me.$nextTick(() => {
                        if (me.control) {
                            me.calculatorPositionFloatLeftItemID(me.control.idWarning, me.control.idWarningInformation)
                        }
                    });
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Focus this control
         * tnphuc - 2022.09.16
         */
        focusInputControl() {
            const me = this;
            if (!me.control) {
                return;
            }
            ElementLibrary.focusInputControl(me.control.id);
            return;
        },

        /**
         * Setup control to default
         * tnphuc - 2022.08.24
         */
        activeControl(control: BaseInput) {
            if (!control) {
                return;
            }
            control.isActive = true;
        },

        /**
         * Function kiểm tra trạng thái control có thoả mãn không?
         * @param modelValue Gái trị đầu vào
         * tnphuc - 19.09.2023 
         */
        setStatusControlByModel(control?: BaseInput, modelValue?: any) {
            if (!control) {
                return false;
            }
            control.isValidateSuccess = true;
            control.errorType = ErrorControlType.None;
            if (control.require) {
                if (!modelValue) {
                    control.errorType = ErrorControlType.Require;
                    control.isValidateSuccess = false;
                    control.contentWarning = "Trường này không được để trống!";
                    control.styleWarning = "width: 200px"
                    return false;
                }
            }
            return true;
        },


        /**
         * Check control is satisfied to emit Event out or not?
         * @returns True ? Pass : Fail
         * tnphuc - 2022.08.23
         */
        validateControlBeforeHandlerEvent(control: BaseInput) {
            if (!control) {
                return false;
            }

            if (control.readOnly || control.isLoadingData) {
                return false;
            }

            return true;
        },
    }
}
</script>