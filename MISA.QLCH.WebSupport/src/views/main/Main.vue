<template src="./Main.html"></template>
<style lang="scss" scoped src="./Main.scss"></style>
<script lang="ts">
import { Menu } from '@library-src/models/qlch_menu/Menu';
import Main from './Main';
import Log from '@library-src/utilities/Log';
import LeftMenu from '@src/components/left_menu/LeftMenu.vue';

//tnp
import ECombobox from "qlch_control/ECombobox";
export default {
    components: {
        LeftMenu, ECombobox,
    },

    setup() {
        const pages: Array<Menu> = new Array(
            {
                routerLink: "/invoice",
                fieldText: "Display Demo"
            },
            {
                routerLink: "/product",
                fieldText: "Sản Phẩm"
            },
            {
                routerLink: "/home",
                fieldText: "Trang Chủ"
            }
        );
        return {
            pages
        }
    },

    data() {
        const thisData = new Main();
        return {
            thisData
        };
    },

    created() {
        try {
            const me = this;
            if (me.pages && me.pages.length) {
                me.pages.forEach(itemMenu => {
                    if (window.location.pathname == itemMenu.routerLink) {
                        me.thisData.title = itemMenu.fieldText;
                        return;
                    }
                });
            }
        } catch (error) {
            Log.ErrorLog(error as Error);
        }
    },

    methods: {
        /**
         * Handler Event Click Menu
         */
        changeItemMenu(title: string) {
            const me = this;
            try {
                me.thisData.title = title;
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        }
    }
}
</script>
