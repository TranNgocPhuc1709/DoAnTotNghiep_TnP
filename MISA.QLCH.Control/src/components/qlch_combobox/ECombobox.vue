<template src="./ECombobox.html"></template>
<style lang="scss" scoped src="./ECombobox.scss"></style>
<script lang="ts">
import BaseDropDownInput from '@src/components/base/BaseDropDownInput.vue';
import ECombobox from './ECombobox';
import { Ref, ref } from 'vue';
import Log from '@library-src/utilities/Log';
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ElementLibrary from '@library-src/utilities/commons/ElementLibrary';

export default {
    extends: BaseDropDownInput,

    setup() {
        const thisData: Ref<ECombobox> = ref(new ECombobox());
        return { thisData };
    },

    emits: ['update:modelValue', 'onLoadDataBy', 'blur'],

    props: {
        modelValue: null as any,
        control: {
            type: Combobox,
            require: true
        }
    },

    /**
    * Lifecycle hook Vue
    * tnphuc - 2022.08.23
    */
    created() {
        const me = this;
        try {
            me.resetData();
            me.bindingValue(me.modelValue);
            me.setStatusControlByModel(me.control, me.modelValue);
        } catch (error) {
            Log.ErrorLog(error as Error);
        }
    },

    methods: {
        /**
        * After the user enters the data, it will only take 0.2 seconds to search and emit the event to the outside
        * tnphuc - 19.09.2023 
        */
        onInput(e: Event) {
            const me = this;
            try {

                const keySearch = (e.target as HTMLInputElement).value;
                me.findDataBy(keySearch);
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        /**
        * Handler Event Blur
        * tnphuc - 2022.08.08
        */
        onBlur() {
            const me = this;
            try {
                if (!me.control) {
                    return;
                }
                me.activeControl(me.control);
                me.setStatusControlByModel(me.control, me.modelValue);

                me.$emit('blur');
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
        * Event sự kiện Focus vào control
        * tnphuc - 2022.08.24
        */
        onFocus() {
            const me = this;
            try {

                if (!me.control) {
                    return;
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Event Click on item drop down combobox
         * tnphuc - 2022.09.14
         */
        onItemArrowClick() {
            const me = this;
            try {
                if (!me.control) {
                    return;
                }
                me.displayBoxItem(!me.thisData.isShowBoxItem);
                if (me.control.data && me.control.data.length > 0) {
                    me.control.dataDisplay = me.control.data;
                }

            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        /**
         * Reset Data
         * tnphuc - 2022.09.16
         */
        resetData() {
            const me = this;
            if (!me.control) {
                return;
            }
            me.control.dataDisplay = me.control.data;
        },

        /**
        * Initialize v-model for inherited classes
        * tnphuc - 2022.07.19
        */
        clickItemInBox(item: Record<string, any>) {
            try {
                const me = this;
                if (!me.control) {
                    return;
                }

                if (me.control.readOnly) {
                    me.$forceUpdate();
                    return;
                }

                me.updateValue(item);
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
        * Initialize v-model for inherited classes
        * tnphuc - 2022.07.19
        */
        updateValue(item: Record<string, any>) {
            const me = this;
            me.displayBoxItem(false);
            me.bindingValueWithItem(item);


            if (me.control) {
                if (!me.validateControlBeforeHandlerEvent(me.control)) {
                    return;
                }

                me.$emit('update:modelValue', item[me.control.valueField]);
            }
        },



        /**
         * Tìm kiếm dữ liệu dựa trên key truyền vào
         * @param keySearch Key tìm kiếm
         * tnphuc - 19.09.2023 
         */
        findDataBy(keySearch: string) {
            const me = this;
            if (me.timeoutQuerySearchInput) {
                clearTimeout(me.timeoutQuerySearchInput);
            }
            me.timeoutQuerySearchInput = setTimeout(() => {
                if (!me.control) {
                    return;
                }
                me.filterDataDisplayBy(keySearch);
            }, 200);

        },



        /**
         * User event enter enter, Get active item to set up combo
         * @param e 
         * tnphuc - 19.09.2023 
         */
        pressKeyEnter(e: KeyboardEvent) {
            const me = this;
            if (!me.control || !e.key) {
                return;
            }
            if (me.control && me.control.dataDisplay && me.control.dataDisplay.length > 0) {
                const item = me.control.dataDisplay.find(t => t['active']);
                if (item) {
                    me.updateValue(item);
                }
            }
        },

        /**
         * Handling users pressing down key
         * @param e Event
         * tnphuc - 2022.09.05
         */
        pressKeyArrowDow(e: KeyboardEvent) {
            const me = this;
            if (!me.control) {
                return;
            }

            if (me.control && me.control.dataDisplay) {
                me.displayBoxItem(true);

                me.thisData.indexBoxItemInFocus++;

                if (me.thisData.indexBoxItemInFocus > me.control.dataDisplay.length - 1) {
                    me.thisData.indexBoxItemInFocus = 0;
                }

                const boxItemFocus = me.control.dataDisplay[me.thisData.indexBoxItemInFocus];
                if (boxItemFocus) {
                    me.control.dataDisplay.forEach(item => {
                        me.setActiveBoxItem(item, false);
                    });
                    me.setActiveBoxItem(boxItemFocus, true);
                }

            }
            e.preventDefault();
        },

        /**
         * 
         * @param e Click phím Tab
         * tnphuc - 19.09.2023 
         */
        pressKeyTab(e: KeyboardEvent) {
            const me = this;
            const keyCode = e.key;
            if (keyCode == "Tab") {
                me.displayBoxItem(false);
            }
        },

        /**
         * Handling user press up key
         * @param e Event
         * tnphuc - 2022.09.05
         */
        pressKeyArrowUp(e: KeyboardEvent) {
            const me = this;
            if (!me.control) {
                return;
            }
            if (me.control && me.control.dataDisplay) {
                me.displayBoxItem(true);

                me.thisData.indexBoxItemInFocus--;

                if (me.thisData.indexBoxItemInFocus < 0) {
                    me.thisData.indexBoxItemInFocus = me.control.dataDisplay.length - 1;
                }

                const boxItemFocus = me.control.dataDisplay[me.thisData.indexBoxItemInFocus];
                if (boxItemFocus) {
                    me.control.dataDisplay.forEach(item => {
                        me.setActiveBoxItem(item, false);
                    });
                    me.setActiveBoxItem(boxItemFocus, true);
                }
            }
            e.preventDefault();
        },
        /**
         * Sự kiện hover vào item in box
         * @param item 
         * @returns 
         * tnphuc - 19.09.2023 
         */
        hoverItem(item: Record<string, any>) {
            const me = this;
            try {
                if (!me.control) {
                    return;
                }

                if (me.control.readOnly) {
                    me.$forceUpdate();
                    return;
                }

                if (item && me.control.dataDisplay && me.control.dataDisplay.length > 0) {
                    me.thisData.indexBoxItemInFocus = me.control.dataDisplay.findIndex(t => {
                        if (me.control) {
                            t[me.control.valueField] === item[me.control.valueField]
                        }
                    });
                    me.control.dataDisplay.forEach(item => {
                        item['active'] = false;
                    });
                    item['active'] = true;
                }

            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Find the first item that satisfies the condition, set it to active
         * tnphuc - 2022.09.16
         */
        activeItemByValue() {
            const me = this;
            if (!me.control || !(me.control.dataDisplay && me.control.dataDisplay.length > 0)) {
                return;
            }
            let boxItemFocus: Record<string, any> = {};
            me.thisData.indexBoxItemInFocus = -1;
            me.control.dataDisplay.forEach(item => {
                me.setSelectedBoxItem(item, false);
                me.setActiveBoxItem(item, false);
            });

            if (me.modelValue) {
                for (let index = 0; index < me.control.dataDisplay.length; index++) {
                    const itemBox = me.control.dataDisplay[index];
                    if (itemBox && itemBox[me.control.valueField] === me.modelValue) {
                        boxItemFocus = itemBox;
                        me.thisData.indexBoxItemInFocus = index;
                        break;
                    }

                }
            }
            me.setSelectedBoxItem(boxItemFocus, true);

        },

        /**
         * Active item in Box
         * tnphuc - 19.09.2023 
         */
        setActiveBoxItem(item: Record<string, any>, active: boolean) {
            const me = this;
            item['active'] = active;
            if (active) {
                me.calculatorScrollPosition(item);
            }
        },

        /**
         * active item in Box
         * tnphuc - 19.09.2023 
         */
        setSelectedBoxItem(item: Record<string, any>, selected: boolean) {
            const me = this;
            item['selected'] = selected;
            if (selected) {
                me.calculatorScrollPosition(item)
            }
        },
        /**
         * Perform scroll position calculation when item is hidden by scroll
         * tnphuc - 2022.09.19
         */
        calculatorScrollPosition(item: Record<string, any>) {
            const me = this;
            if (!me.control) {
                return;
            }
            const idItem = me.control.id + `-item-` + item[me.control.valueField];
            const idParentBoxItem = me.control.id + `-parent-box-item`;
            if (idItem && idParentBoxItem) {
                const htmlItem = ElementLibrary.getElementById(idItem);
                const htmlParentBoxItem = ElementLibrary.getElementById(idParentBoxItem);
                if (htmlItem && htmlParentBoxItem) {
                    const domItem = htmlItem.getBoundingClientRect();
                    const domParentBoxItem = htmlParentBoxItem.getBoundingClientRect();
                    if (domItem && domParentBoxItem) {
                        const bottomItem = domItem.bottom;
                        const bottomParentBoxItem = domParentBoxItem.bottom;

                        const topItem = domItem.top;
                        const topParentBoxItem = domParentBoxItem.top;

                        if (bottomItem > bottomParentBoxItem + 0.5) {
                            htmlParentBoxItem.scrollTop = htmlParentBoxItem.scrollTop + bottomItem - bottomParentBoxItem + 0.5;
                        } else if (topItem < topParentBoxItem + 0.5) {
                            htmlParentBoxItem.scrollTop = htmlParentBoxItem.scrollTop + topItem - topParentBoxItem - 0.5;
                        }
                    }
                }
            }
        },



        /**
         * Cập nhật giao diện khi search dữ liệu
         * @param key Key search
         * tnphuc - 19.09.2023 
         */
        filterDataDisplayBy(key: string) {
            const me = this;
            if (!me.control) {
                return;
            }
            if (me.control.dataDisplay && me.control.dataDisplay.length > 0) {
                if (!(me.thisData.oldKeySearch && key && key.indexOf(me.thisData.oldKeySearch) > -1)) {
                    me.resetData();
                }

                const dataResult = me.control.dataDisplay.filter(item => {
                    if (!me.control) {
                        return;
                    }
                    const itemConvert = "" + item[me.control.displayField];
                    if (itemConvert.toLowerCase().indexOf(key.toLowerCase()) > -1) {
                        return item;
                    }
                });
                if (dataResult && dataResult.length > 0) {
                    me.control.dataDisplay = dataResult;

                    me.displayBoxItem(key ? true : false);
                } else {
                    me.displayBoxItem(false);
                }

                me.updateDisplayInputBy(key);
            }
        },


        /**
         * reset the value of the control after the DOM is updated
         * tnphuc - 19.09.2023 
         */
        updateDisplayInputBy(key: string) {
            const me = this;
            me.thisData.displayValue = key;
            if (key !== me.thisData.oldKeySearch) {
                me.thisData.oldKeySearch = key;
            }
        },

        /**
         * binding value in combobox
         * tnphuc - 19.09.2023 
         */
        bindingValue(value: any) {
            const me = this;
            if (!me.control) {
                return;
            }
            if (me.control && me.control.data && me.control.data.length > 0) {
                const objItem = me.control.data.find(element => {
                    if (me.control) {
                        return element[me.control.valueField] === value;
                    }
                });

                if (objItem) {
                    me.thisData.displayValue = "" + objItem[me.control.displayField] ?? "";
                }
            }

        },

        /**
         * binding value in combobox
         * tnphuc - 19.09.2023 
         */
        bindingValueWithItem(value: Record<string, any>) {
            const me = this;
            if (!value || !me.control) {
                return;
            }

            if (value[me.control.displayField]) {
                me.thisData.displayValue = "" + value[me.control.displayField];
            }
        },



        /**
         * Click event outside the combobox
         * tnphuc - 2022.09.15
         */
        comboboxClickOut() {
            const me = this;
            try {
                if (me.thisData.isShowBoxItem) {
                    me.displayBoxItem(false);
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Hide and show BoxItem details
         * tnphuc - 19.09.2023 
         */
        displayBoxItem(show: boolean) {
            const me = this;
            if (!me.control) {
                return;
            }
            const oldIsShowBoxItem = me.thisData.isShowBoxItem;
            me.thisData.isShowBoxItem = show;
            if (show && !oldIsShowBoxItem) {
                me.$nextTick(() => {
                    if (!me.control) {
                        return;
                    }
                    me.calculatorPositionFloatLeftItemID(me.control.id, me.control.id + `-parent-box-item`);
                    me.activeItemByValue();
                });
            }
        },
    }

}
</script>