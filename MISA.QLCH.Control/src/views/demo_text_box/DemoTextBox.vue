<template src="./DemoTextBox.html"></template>
<style lang="scss" scoped src="./DemoTextBox.scss"></style>
<script lang="ts">
import ETextBox from '@src/components/qlch_text_box/ETextBox.vue';
import Log from '@library-src/utilities/Log';
import TextBox from '@library-src/models/qlch_control/qlch_text_box/TextBox';
import { Ref, ref } from 'vue';

export default {
    components: {ETextBox},
    setup() {
        /**
         * Property dùng cho Page
         */
        const txtDefault: Ref<TextBox> = ref(new TextBox({
            fieldText: "Tên hàng hóa",
        }));

        const txtReadOnly: Ref<TextBox> = ref(new TextBox({
            fieldText: "Tên hàng hóa",
            readOnly: true,
        }));

        const txtRequire: Ref<TextBox> = ref(new TextBox({
            fieldText: "Tên hàng hóa",
            require: true
        }));

        const txtVBoxDefault: Ref<TextBox> = ref(new TextBox({
            fieldText: "Tên hàng hóa",
            boxType: "vbox",
        }));

        const txtVBoxReadOnly: Ref<TextBox> = ref(new TextBox({
            fieldText: "Tên hàng hóa",
            readOnly: true,
            boxType: "vbox",
        }));

        const txtVBoxRequire: Ref<TextBox> = ref(new TextBox({
            fieldText: "Tên hàng hóa",
            require: true,
            boxType: "vbox",
        }));

        const txtPasswordReadOnly: Ref<TextBox> = ref(new TextBox({
            fieldText: "Nhập mật khẩu",
            readOnly: true,
            type: "password"
        }));

        const txtPasswordRequire: Ref<TextBox> = ref(new TextBox({
            placeholder: "Nhập mật khẩu",
            require: true,
            type: "password"
        }));

        const txtLoading: Ref<TextBox> = ref(new TextBox({
            fieldText: "Tên hàng hóa",
            
        }));

        return {
            txtDefault,
            txtReadOnly,
            txtRequire,
            txtVBoxDefault,
            txtVBoxReadOnly,
            txtVBoxRequire,
            txtPasswordReadOnly,
            txtPasswordRequire,
            txtLoading,
        }
    },

    /**
     * Hook
     */
     created() {
        const me =this;
        try {
            me.txtLoading.isLoadingData = true;
        } catch (error) {
            Log.ErrorLog(error as Error)
        }
    },
}
</script>
