<template src="./LeftMenu.html"></template>
<style lang="scss" scoped src="./LeftMenu.scss"></style>
<script lang="ts">
import Log from '@library-src/utilities/Log';
import { Menu } from '@library-src/models/qlch_menu/Menu';

export default {
    props: {
        pages: {
            type: Array<Menu>,
            required: true
        },

    },

    methods: {
        /**
         * Handler Event Click Router Item
         * @param item itemMenu
         */
        routerClick(item: Menu) {
            const me = this;
            try {
                me.$emit("pageClick", item.fieldText);
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        }
    }

}
</script>
