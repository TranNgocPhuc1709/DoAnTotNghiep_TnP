<template src="./ETextBox.html"></template>
<style lang="scss" scoped src="./ETextBox.scss"></style>
<script lang="ts">
import TextBox from '@library-src/models/qlch_control/qlch_text_box/TextBox';
import BaseInput from '../base/BaseInput.vue';
import ETextBox from './ETextBox';
import { Ref, ref } from 'vue';
import Log from '@library-src/utilities/Log';
import ElementLibrary from '@library-src/utilities/commons/ElementLibrary';
export default {
    extends: BaseInput,
    props: {
        modelValue: {
            type: String
        },
        control: {
            type: TextBox,
            require: true
        }
    },
    setup() {
        const thisData: Ref<ETextBox> = ref(new ETextBox());
        return {
            thisData,
        }
    },
    emits: ['update:modelValue', 'blur', 'enter'],

    /**
   * Lifecycle hook Vue
   * tnduc - 2022.08.23
   */
    created() {
        const me = this;
        try {
            if (!me.control) {
                return;
            }

            me.thisData.inputType = me.control.type;

            me.setStatusControlByModel(me.control, me.modelValue);
        } catch (error) {
            Log.ErrorLog(error as Error);
        }
    },

    methods: {
        /**
         * Show Hide Password, Áp dụng cho tất cả control type="password"
         * tnduc - 2022.08.23
         */
         onMouseUpChangeType(show: boolean) {
            const me = this;
            try {
                if (!me.control || me.control.readOnly) {
                    return;
                }

                if (show) {
                    me.thisData.inputType = "text";
                    me.thisData.classIconEyeStatus = "i-eye-show"
                } else {
                    me.thisData.inputType = "password";
                    me.thisData.classIconEyeStatus = "i-eye-hide"
                }

                const inputDom = ElementLibrary.getElementById(me.control.id);
                if (inputDom) {
                    inputDom.style.paddingRight = "25px";
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Reset trạng thái hiển thị password
         * tnduc - 19.09.2023 
         */
        resetDisplayTypePassword(){
            const me = this;
            me.onMouseUpChangeType(false);
        },

        /**
         * Khởi tạo v-model cho các class kế thừa
         * tnduc - 2022.07.19
         */
        onInput(e: Event) {
            const me = this;
            try {
                if (!me.control) {
                    return;
                }

                if (!me.validateControlBeforeHandlerEvent(me.control)) {
                    return;
                }
                me.$emit('update:modelValue', (e.target as HTMLInputElement).value);
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Khởi tạo sự kiện blur trên input
         * tnduc - 2022.08.08
         */
        onBlur() {
            const me = this;
            try {
                if (!me.control) {
                    return;
                }
                const input: HTMLInputElement | null = ElementLibrary.getElementById(me.control.id) as HTMLInputElement | null;
                if (!input) {
                    return;
                }

                me.activeControl(me.control);
                me.setStatusControlByModel(me.control, me.modelValue);
                me.$emit('blur');
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Event sự kiện Focus vào control
         * tnduc - 2022.08.24
         */
        onFocus() {
            const me = this;
            try {

                if (!me.control) {
                    return;
                }

            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Sự kiện người dùng sử dụng bàn phím
         * tnduc - 19.09.2023 
         */
        onKeyDown(e: KeyboardEvent) {
            try {
                const me = this;
                if (!me.control) {
                    return;
                }

                if (!me.validateControlBeforeHandlerEvent(me.control)) {
                    return;
                }

                const keyCode = e.key;

                /**
                 * Xử lý nút Enter
                 */
                if (keyCode == "Enter") {
                    me.$emit('enter');
                }
            } catch (error) {
                Log.InfoLog(error as Error);
            }
        }


    },
}
</script>
