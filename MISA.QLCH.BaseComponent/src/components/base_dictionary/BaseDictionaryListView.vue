<template src="./BaseDictionaryListView.html"></template>
<style lang="scss" scoped src="./BaseDictionaryListView.scss"></style>
<script lang="ts">

import Log from "@library-src/utilities/Log";
import ParamPaging from "@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging";
import EButton from "qlch_control/EButton";
import EGrid from "qlch_control/EGrid";
import BaseView from "@src/components/base/BaseView.vue";
import Button from '@library-src/models/qlch_control/qlch_button/Button'
import DropDownMenu from '@library-src/models/qlch_control/qlch_drop_down_menu/DropDownMenu'
import DictionaryListViewModel from "@library-src/models/qlch_base/dictionary_list_view_model/DictionaryListViewModel";
import DropDownMenuChild from "@library-src/models/qlch_control/qlch_drop_down_menu/children/DropDownMenuChild";
import ElementLibrary from "@library-src/utilities/commons/ElementLibrary";
export default {
    extends: BaseView,

    components: {
        EButton,
        EGrid
    },

    emits: ['loadMaster', 'changeSelectedRecordMaster', 'toolbarClick'],

    props: {
        viewControl: {
            type: DictionaryListViewModel
        },
    },

    /**
     * hook set lại giao diện khi dom được render xong
     * tnduc - 19.09.2023 
     */
    mounted() {
        try {
            const me = this;
            if (!me.viewControl || !me.viewControl.id) {
                return;
            }
            const idGridMaster = me.viewControl.id + `-grid-master`
            const gridMaster = ElementLibrary.getElementById(idGridMaster);
            if (gridMaster) {
                const domGridMaster = gridMaster.getBoundingClientRect();
                if (domGridMaster) {
                    gridMaster.style.height = `calc(100vh - ${domGridMaster.top}px - 8px )`;
                    //8px là khoảng cách từ bottom grid mong muốn tới hết view height màn hình
                }
            }
        } catch (error) {
            Log.ErrorLog(error as Error);
        }
    },

    methods: {

        /**
         * Load dữ liệu cho grid master
         * @param paramPaging Tham số phân trang
         * tnduc - 19.09.2023 
         */
        onLoadGridMaster(paramPaging: ParamPaging) {
            try {
                const me = this;
                me.$emit('loadMaster', paramPaging);
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Thay đổi dòng selected trên Grid
         * @param listSelectedRecord 
         * tnduc - 19.09.2023 
         */
        onchangeSelectedRecordMaster(listSelectedRecord: Array<Record<string, any>>) {
            const me = this;
            try {
                if (me.viewControl && me.viewControl.gridMaster) {
                    me.viewControl.gridMaster.listSelectedRecord = listSelectedRecord;
                    me.$emit('changeSelectedRecordMaster', me.viewControl.gridMaster.listSelectedRecord);
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Sự kiện click button trên tool bar
         * @param toolBarControl control đang được click
         * tnduc - 19.09.2023 
         */
        async onClickItem(toolBarControl: Button | DropDownMenu | DropDownMenuChild) {
            const me = this;
            try {
                me.$emit("toolbarClick", toolBarControl);
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
    }
}
</script>