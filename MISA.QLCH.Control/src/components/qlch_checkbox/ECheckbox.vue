<template src="./ECheckbox.html"></template>
<style lang="scss" scoped src="./ECheckbox.scss"></style>
<script lang="ts">
import Checkbox from '@library-src/models/qlch_control/qlch_checkbox/Checkbox';
import BaseControl from '../base/BaseControl.vue';
import Log from '@library-src/utilities/Log';

export default {
    extends: BaseControl,
    props: {
        control: {
            type: Checkbox,
            require: true
        },
        modelValue: {
            type: Boolean
        }
    },
    emits: ['update:modelValue'],
    methods: {
        /**
         * Thay đổi dữ liệu checkBox
         * tnphuc - 19.09.2023 
         */
        onChange() {
            const me = this;
            try {
                if (!me.validateControlBeforeHandlerEvent(me.control)) {
                    return;
                }
                me.$emit('update:modelValue', !me.modelValue);
            } catch (error) {
                Log.ErrorLog(error as Error)

            }
        }
    }
}
</script>