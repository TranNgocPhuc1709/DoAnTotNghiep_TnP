<template src="./EDropDownMenu.html"></template>
<style lang="scss" scoped src="./EDropDownMenu.scss"></style>
<script lang="ts">
import BaseControl from '@src/components/base/BaseControl.vue';
import Log from '@library-src/utilities/Log';
import DropDownMenu from '@library-src/models/qlch_control/qlch_drop_down_menu/DropDownMenu';
import DropDownMenuChild from '@library-src/models/qlch_control/qlch_drop_down_menu/children/DropDownMenuChild';
import { Ref, ref } from 'vue';
import EDropDownMenu from './EDropDownMenu';
import ElementLibrary from '@library-src/utilities/commons/ElementLibrary';
export default {
    extends: BaseControl,

    props: {
        control: {
            type: DropDownMenu,
            require: true
        }
    },

    setup() {
        const thisData: Ref<EDropDownMenu> = ref(new EDropDownMenu());
        return {
            thisData
        }

    },

    emits: ['buttonClick', 'arrowClick', 'itemChildClick'],

    /**
   * Hook
   * tnduc - 2022.09.05
   */
    mounted() {
        const me = this;
        try {
            if (me.control) {
                const divParent: HTMLElement | null = ElementLibrary.getElementById(me.control.id);
                if (divParent) {
                    const domButton: DOMRect = divParent.getBoundingClientRect();
                    divParent.style.width = domButton.width + "px";
                }
            }
        } catch (error) {
            Log.ErrorLog(error as Error);
        }
    },

    methods: {
        /**
         * Event Click Out Box Item
         * tnduc - 2022.09.07
         */
        boxDetailClickOut(event: Event) {
            const me = this;
            try {
                if (!me.control) {
                    return;
                }
                const idElement = (event.target as HTMLElement).id;
                const idArrowBg = me.control.id + `-arrow-bg`;
                const idArrowItem = me.control.id + `-arrow-item`;
                if (idElement != idArrowItem && idElement != idArrowBg) {
                    me.displayDropDownPanel(false);
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Emit Event Button Click
         * tnduc - 2022.09.06
         */
        buttonClick() {
            const me = this;
            try {
                if (!me.validateControlBeforeHandlerEvent(me.control)) {
                    return;
                }
                me.$emit("buttonClick");
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Click event on hidden dropdown item shows drop down panel
         * @returns 
         * tnduc - 2022.09.07
         */
        itemArrowClick() {
            const me = this;
            try {
                if (!me.control) {
                    return;
                }

                if (!me.validateControlBeforeHandlerEvent(me.control)) {
                    return;
                }
                me.displayDropDownPanel(!me.thisData.isShowBoxDetail);

                me.$emit("arrowClick");

            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Click event on child item in Drop menu
         * @returns void
         * tnduc - 2022.09.07
         */
        itemChildClick(itemChild: DropDownMenuChild) {
            const me = this;
            try {
                if (!itemChild) {
                    return;
                }
                if (!me.validateControlBeforeHandlerEvent(me.control)) {
                    return;
                }
                if (itemChild.type !== "line") {
                    me.$emit("itemChildClick", itemChild);
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Bật tắt DropDown Menu
         * @param e Event
         * @returns void
         * tnduc - 2022.09.06
         */
        displayDropDownPanel(show: boolean) {
            const me = this;
            if (!me.control) {
                return;
            }
            me.thisData.isShowBoxDetail = show;
            if (me.thisData.isShowBoxDetail) {
                me.control.clsArrowStatus = "arrow-up";
                me.$nextTick(() => {
                    if (me.control){
                        me.calculatorPositionFloatLeftItemID(me.control.id, me.control.id + '-box-item');
                    }
                });
            } else {
                me.control.clsArrowStatus = "arrow-down";
            }
        }
    }

}
</script>
