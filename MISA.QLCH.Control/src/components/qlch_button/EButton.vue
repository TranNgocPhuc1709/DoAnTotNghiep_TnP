<template src="./EButton.html" />
<style lang="scss" scoped src="./EButton.scss"></style>
<style lang="scss" scoped src="@library-src/styles/qlch_styles/theme/DefaultTheme.scss"></style>
<style lang="scss" scoped src="@library-src/styles/qlch_styles/theme/DarkTheme.scss"></style>
<style lang="scss" scoped src="@library-src/styles/qlch_styles/Main.scss"></style>
<style lang="scss" scoped src="@library-src/styles/qlch_styles/Layout.scss"></style>
<style lang="scss" scoped src="@library-src/styles/qlch_styles/Icon.scss"></style>

<script lang="ts">
import BaseControl from "@src/components/base/BaseControl.vue";
import Log from "@library-src/utilities/Log";
import Button from "@library-src/models/qlch_control/qlch_button/Button";
export default {
    extends: BaseControl,

    props: {
        control: {
            type: Button,
        }
    },


    methods: {
        /**
         * Action Click Button
         * tnphuc - 19.09.2023 
         */
        click() {
            try {
                const me = this;
                if (me.validateControlBeforeHandlerEvent(me.control)) {
                    me.$emit("click");
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        }
    },

    emits: {
        click: null
    }
}
</script>
