<template src="./Main.html"></template>
<style lang="scss" scoped src="./Main.scss"></style>
<script lang="ts">
import { Menu } from '@library-src/models/qlch_menu/Menu';
import Main from './Main';
import Log from '@library-src/utilities/Log';
import LeftMenu from '@src/components/left_menu/LeftMenu.vue';

//tnp
import ECombobox from "qlch_control/ECombobox";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import { Ref, ref } from 'vue';
export default {
    components: {
        LeftMenu, ECombobox,
    },

    setup() {
        const pages: Array<Menu> = new Array(
            // {
            //     routerLink: "/invoice",
            //     fieldText: "Display Demo"
            // },
            {
                routerLink: "/home",
                fieldText: "Trang Chủ"
            },
            {
                routerLink: "/product",
                fieldText: "Sản Phẩm"
            }
        );
        const cbbStore: Ref<Combobox> = ref(new Combobox({
            require: true,


            data: [
                {
                    value: 1,
                    display: "CH1"
                },
                {
                    value: 2,
                    display: "CH2"
                },
                {
                    value: 3,
                    display: "CH3"
                },

            ]
            // require: true
        }));
        return {
            pages,
            cbbStore
        }
    },

    data() {

        const thisData = new Main();
        return {
            thisData,
            DropdownUserVisible: false
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
            me.cbbStore.value = 1;

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
        },
        toggleDropdownUser() {
            const me = this
            me.DropdownUserVisible = !me.DropdownUserVisible;
        }
    }
}
</script>
