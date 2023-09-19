<template src="./DemoControl.html"></template>
<style lang="scss" scoped src="./DemoControl.scss"></style>

<script lang="ts">
import Log from '@library-src/utilities/Log';
import { Menu } from '@library-src/models/qlch_menu/Menu';
import LeftMenu from "@src/components/left_menu/LeftMenu.vue";
import DemoControl from './DemoControl';

export default {

    components: {
        LeftMenu
    },

    setup() {
        const pages: Array<Menu> = new Array(
            {
                routerLink: "/control/eshop-button",
                fieldText: "Buttons"
            },
            {
                routerLink: "/control/eshop-combobox",
                fieldText: "Combobox"
            },
            {
                routerLink: "/control/eshop-date",
                fieldText: "Date Picker"
            },
            {
                routerLink: "/control/eshop-drop-down-menu",
                fieldText: "Drop Down Menu"
            },
            {
                routerLink: "/control/eshop-number",
                fieldText: "Number"
            },
            {
                routerLink: "/control/eshop-text-box",
                fieldText: "Text box"
            },
            {
                routerLink: "/control/eshop-checkbox",
                fieldText: "Checkbox"
            },
            {
                routerLink: "/control/eshop-grid",
                fieldText: "Grid"
            },
            {
                routerLink: "/control/eshop-column-chart",
                fieldText: "Column Chart"
            }

        );
        return {
            pages
        }
    },

    data() {
        const thisData = new DemoControl();
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
