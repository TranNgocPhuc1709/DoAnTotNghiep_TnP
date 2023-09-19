<template src="./EDate.html"></template>
<style lang="scss" scoped src="./EDate.scss"></style>
<script lang="ts">
import BaseDropDownInput from "@src/components/base/BaseDropDownInput.vue"
import Log from "@library-src/utilities/Log";
import EButton from "@src/components/qlch_button/EButton.vue";
import Button from "@library-src/models/qlch_control/qlch_button/Button";
import DateModel from "@library-src/models/qlch_control/qlch_date/DateModel";
import { Ref, ref } from "vue";
import EDate from "./EDate";
import FormatDate from "@library-src/utilities/formats/FormatDate";
import DayInMouthModel from "@library-src/models/qlch_control/qlch_date/DayInMouthModel";
export default {
    extends: BaseDropDownInput,
    components: {
        EButton
    },

    emits: ['update:modelValue'],

    setup() {
        /**
         * Declare btn ToDay
         */
        const btnToDay: Button = new Button({
            fieldText: "Hôm nay",
            classType: "secondary"
        });

        const thisData: Ref<EDate> = ref(new EDate());

        return {
            btnToDay,
            thisData
        }

    },

    props: {
        modelValue: {
            type: Date
        },
        control: {
            type: DateModel,
            require: true
        }
    },

    /**
     * Hook Vue
     * tnduc - 2022.10.14
     * @returns 
     */
    created() {
        const me = this;
        try {
            me.displayValueInInputBox(me.modelValue);
            me.buildPlaceholderByFormat();
            me.setStatusControlByModel(me.control,me.modelValue);
        } catch (error) {
            Log.ErrorLog(error as Error);
        }
    },

    methods: {
        /**
         * Display the value from the model to the input box
         * tnduc - 19.09.2023 
         */
        displayValueInInputBox(bindingValue: Date | undefined) {
            const me = this;
            if (bindingValue) {
                me.thisData.displayValue = FormatDate.convertDateTimeToStringByFormat(bindingValue);
            }

        },

        /**
         * Build thông tin Placeholder mặc định theo định dạng thiết lập
         * tnduc - 19.09.2023 
         */
        buildPlaceholderByFormat() {
            const me = this;
            if (!me.control || me.control.placeholder || !me.control.formatDate) {
                return;
            }
            me.control.placeholder = me.control.formatDate.toUpperCase();
        },

        /**
         * Click event outside the combobox
         * tnduc - 19.09.2023 
         */
        dateTimeClickOut() {
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
         * Event Click on the icon to display the calendar for the user to choose
         * tnduc - 2022.10.13
         */
        itemCalendarIconClick() {
            const me = this;
            try {
                if (!me.control) {
                    return;
                }

                if (!me.validateControlBeforeHandlerEvent(me.control)) {
                    return;
                }
                me.displayBoxItem(!me.thisData.isShowBoxItem);

                if (me.modelValue) {
                    me.thisData.currentDate = new Date(me.modelValue.getTime());
                } else {
                    me.thisData.currentDate = new Date();
                }

                me.buildListDayInMouth(me.thisData.currentDate);

            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * The event shows a form to quickly select the year and month
         * tnduc - 19.09.2023 s
         */
        clickChooseQuickMouthYear() {
            try {
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * build display calendar
         * tnduc - 2022.10.17
         */
        buildListDayInMouth(currentDate?: Date) {
            const me = this;
            if (!me.control) {
                return;
            }

            if (!me.thisData.isShowBoxItem) {
                return;
            }


            if (!currentDate) {
                currentDate = new Date;
            }
            me.thisData.currentDate = currentDate;

            const currYear = currentDate.getFullYear();
            const currMonth = currentDate.getMonth();
            let currTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`;
            if (me.control.timeFormatDefault == "StartDay") {
                currTime = "00:00:00:000";
            } else if (me.control.timeFormatDefault == "EndDay") {
                currTime = "23:59:59:999";
            }

            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(),
                lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(),
                lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(),
                lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
            me.thisData.listDayInMouth = new Array<DayInMouthModel>();
            for (let i = firstDayOfMonth; i > 0; i--) {
                const lastYear = (currMonth - 1 > 0) ? currYear : (currYear - 1);
                const lastMouth = currMonth - 1 > 0 ? currMonth - 1 : currMonth - 1 + 12;
                const valueDate = new Date(`${lastYear} ${lastMouth + 1} ${lastDateOfLastMonth - i + 1} ${currTime}`);
                const inactive = !me.checkIsTheTimeValueValid(valueDate);


                me.thisData.listDayInMouth.push({
                    display: "" + (lastDateOfLastMonth - i + 1),
                    cls: "inactive",
                    inactive: inactive,
                    value: valueDate,
                });
            }

            for (let i = 1; i <= lastDateOfMonth; i++) {

                let dateActive = new Date();
                if (me.modelValue) {
                    dateActive = new Date(me.modelValue.getTime());
                }
                let classDayInMouth = i === dateActive.getDate() && currMonth === dateActive.getMonth() && currYear === dateActive.getFullYear() ? "active" : "";
                const valueDate = new Date(`${currYear} ${currMonth + 1} ${i} ${currTime}`);
                const inactive = !me.checkIsTheTimeValueValid(valueDate);
                if (inactive) {
                    classDayInMouth += " inactive";
                }
                me.thisData.listDayInMouth.push({
                    display: "" + i,
                    cls: classDayInMouth,
                    inactive: inactive,
                    value: valueDate,
                });
            }

            const number_week = me.getNumberWeekInMouth(currYear, currMonth + 1);

            for (let i = lastDayOfMonth; i < (6 + 7 * (6 - number_week)); i++) {
                const nextYear = (currMonth + 1 - 12) > 0 ? (currYear + 1) : currYear;
                const nextMouth = (currMonth + 1 - 12) > 0 ? (currMonth + 1 - 12) : (currMonth + 1);

                const valueDate = new Date(`${nextYear} ${nextMouth + 1} ${i - lastDayOfMonth + 1} ${currTime}`);
                const inactive = !me.checkIsTheTimeValueValid(valueDate);

                me.thisData.listDayInMouth.push({
                    display: "" + (i - lastDayOfMonth + 1),
                    cls: "inactive",
                    inactive: inactive,
                    value: valueDate
                });
            }
            me.thisData.calendarMouth = `EDateResource.${months[currMonth]}`;

            me.thisData.calendarYear = "" + currYear;
        },

        /**
         * Check if the time value is valid
         * tnduc - 2022.11.02
         */
        checkIsTheTimeValueValid(anyDate: Date) {
            const me = this;

            if (!anyDate) {
                return false;
            }

            /**
             * 1. Check if the time is within the allowed range? Greater than minDate and less than maxDate
             */
            if (me.thisData.minDate) {
                if (anyDate.getTime() - me.thisData.minDate.getTime() < 0) {
                    return false;
                }
            }

            if (me.thisData.maxDate) {
                if (anyDate.getTime() - me.thisData.maxDate.getTime() > 0) {
                    return false;
                }
            }

            return true;
        },

        /**
         * Get the number of weeks displayed in any 1 month (Applicable to the week starting from Sunday)
         * tnduc - 2022.10.17
         */
        getNumberWeekInMouth(year: number, month: number) {
            const firstOfMonth = new Date(year, month - 1, 1);
            const lastOfMonth = new Date(year, month, 0);

            const used = firstOfMonth.getDay() + lastOfMonth.getDate();

            return Math.ceil(used / 7);
        },

        /**
         * make display set for box item
         * tnduc - 2022.10.13
         */
        displayBoxItem(show: boolean) {
            const me = this;
            me.thisData.isShowBoxItem = show;
            if (show) {
                me.$nextTick(() => {
                    if (me.control) {
                        me.calculatorPositionFloatLeftItemID(me.control.id, me.control.id + `-parent-box-item`);
                    }
                });
            }
        },

        /**
         * Today's search button click event
         * tnduc - 19.09.2023 
         */
        btnToDayClick() {
            const me = this;
            try {
                me.updateModelValueAndReBuildViewCalendar(new Date());
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * click event on selected date on calendar
         * tnduc - 2022.10.17
         */
        btnAnyDayClick(dayItem: DayInMouthModel) {
            const me = this;
            try {
                if (!dayItem || dayItem.inactive || !dayItem.value) {
                    return;
                }
                me.updateModelValueAndReBuildViewCalendar(dayItem.value);
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Binding model Value
         * @param value Giá trị binding
         * tnduc - 19.09.2023 
         */
        updateModelValueAndReBuildViewCalendar(value: Date) {
            const me = this;
            if (!me.validateControlBeforeHandlerEvent(me.control)) {
                return;
            }
            if (value) {
                me.$emit('update:modelValue', value);
                me.displayValueInInputBox(value);
                me.displayBoxItem(false);
            }
        },

        /**
         * User input event in input box
         * @param e 
         * tnduc - 19.09.2023 
         */
        blurEvent(e: Event) {
            const me = this;
            try {
                const keySearch = (e.target as HTMLInputElement).value;
                me.updateValueInput(keySearch);
                me.setStatusControlByModel(me.control, me.modelValue);
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Update the value to the input box after the user enters the input
         * @param keySearch 
         * tnduc - 19.09.2023 
         */
        updateValueInput(keySearch: string) {
            const me = this;
            if (!me.control) {
                return;
            }
            keySearch = keySearch.replace(/\D/g, "");

            if (keySearch && keySearch.length == 8) { //<=>29121994 = 29/12/1994
                const formatDate = me.control.formatDate;
                let day = +(keySearch.substring(0, 2));
                let mouth = +keySearch.substring(2, 4);
                const year = +keySearch.substring(4);
                if (formatDate == "mm/dd/yyyy") {
                    mouth = +keySearch.substring(0, 2);
                    day = +keySearch.substring(2, 4);
                }

                let minYear = 1753;
                let maxYear = 9999;
                if (me.thisData.minDate) {
                    minYear = me.thisData.minDate.getFullYear();
                }

                if (me.thisData.maxDate) {
                    maxYear = me.thisData.maxDate.getFullYear();
                }
                if (day <= 31 && mouth > 0 && mouth <= 13 && year >= minYear && year <= maxYear) {
                    const result = new Date(year, mouth - 1, day);
                    me.updateModelValueAndReBuildViewCalendar(result);
                    return;
                }
            }
            me.displayValueInInputBox(me.modelValue);
            me.$forceUpdate();
        },

        /**
         * change the month on the history
         * @param status 
         * tnduc - 19.09.2023 
         */
        changeMouthClick(status: "up" | "down") {
            const me = this;
            try {
                if (!me.thisData.currentDate) {
                    me.thisData.currentDate = new Date();
                }

                const newDate = new Date(me.thisData.currentDate.getTime());
                if (status == "up") {
                    newDate.setMonth(me.thisData.currentDate.getMonth() + 1);
                } else if (status == "down") {
                    newDate.setMonth(me.thisData.currentDate.getMonth() - 1);
                }

                if (me.checkIsTheTimeValueValid(newDate)) {
                    me.buildListDayInMouth(newDate);
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
    }
}
</script>
