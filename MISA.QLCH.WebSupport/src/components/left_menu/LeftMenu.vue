<template src="./LeftMenu.html"></template>
<style lang="scss" scoped src="./LeftMenu.scss"></style>
<script lang="ts">
import Log from '@library-src/utilities/Log';
import { Menu } from '@library-src/models/qlch_menu/Menu';
import router from '@src/router';

export default {
    props: {
        pages: {
            type: Array<Menu>,
            required: true
        },

    },
    data() {
        const MenuChildren = new Array<Menu>();
        const oldMenu = new Menu();
        return {
            DropRightMenuRevenueVisible: false,
            MenuChildren,
            oldMenu
        }

    },

    methods: {
        /**
         * Handler Event Click Router Item
         * @param item itemMenu
         */
        routerClick(item: Menu) {
            debugger
            const me = this;
            try {
                me.$emit("pageClick", item);
                if (item.routerLink) {
                    me.MenuChildren = new Array<Menu>();
                    router.push({ path: item.routerLink });
                    me.oldMenu = item;
                }
                else if (me.MenuChildren && me.MenuChildren.length && me.oldMenu && me.oldMenu.fieldText == item.fieldText) {
                    me.MenuChildren = new Array<Menu>();
                    me.oldMenu = item;
                }
                else if (item.children) {
                    me.MenuChildren = item.children;
                    me.oldMenu = item;
                }
            }
            catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        OnClickDropRevenueFormRight() {
            try {
                const me = this
                me.DropRightMenuRevenueVisible = !me.DropRightMenuRevenueVisible;
            }
            catch (error) {
                Log.ErrorLog(error as Error);
            }
        }
    }
}
</script>
