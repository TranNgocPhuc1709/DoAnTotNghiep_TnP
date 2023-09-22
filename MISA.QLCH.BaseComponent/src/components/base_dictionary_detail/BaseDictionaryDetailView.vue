<template src="./BaseDictionaryDetailView.html"></template>
<style lang="scss" scoped src="./BaseDictionaryDetailView.scss"></style>
<script lang="ts">
import EButton from "qlch_control/EButton";
import DictionaryDetailViewModel from '@library-src/models/qlch_base/dictionary_detail_view_model/DictionaryDetailViewModel';
import Button from "@library-src/models/qlch_control/qlch_button/Button";
import { Ref, ref } from "vue";
import Log from "@library-src/utilities/Log";
import ToolBarItemsView from "@library-src/models/qlch_base/tool_bar_items_view/ToolBarItemsView";
import BaseDictionaryDetailView from "./BaseDictionaryDetailView";
import EPopup from "qlch_control/EPopup";
import BaseView from "@src/components/base/BaseView.vue";
export default {
    extends: BaseView,
    components: {
        EButton,
        EPopup
    },
    props: {
        propView: {
            type: DictionaryDetailViewModel
        },

        styleFrom: {
            type: String
        }
    },
    emits: ['toolbarClick', 'closeFormClick'],
    setup() {
        const btnHelp: Ref<Button> = ref(new Button({
            fieldText: "Trợ giúp",
            classIconLeft: "i-help",
            classType: "normal"
        }));

        const thisData: Ref<BaseDictionaryDetailView> = ref(new BaseDictionaryDetailView());

        return {
            btnHelp,
            thisData
        }
    },

    methods: {
        /**
         * Thực hiện click button close in form
         * tnphuc - 19.09.2023 
         */
        onCloseClick() {
            const me = this;
            try {
                me.$emit("closeFormClick");
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Sự kiện click vào các nút chức năng
         * @param item 
         * tnphuc - 19.09.2023 
         */
        onClickItem(item: ToolBarItemsView) {
            const me = this;
            try {
                if (item) {
                    me.$emit("toolbarClick", item);
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
    }
}
</script>