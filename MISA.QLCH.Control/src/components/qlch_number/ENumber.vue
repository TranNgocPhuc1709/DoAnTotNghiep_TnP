<template src="./ENumber.html"></template>
<style lang="scss" scoped src="./ENumber.scss"></style>
<script lang="ts">
import BaseInput from '@src/components/base/BaseInput.vue';
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import ENumber from './ENumber';
import { Ref, ref } from 'vue';
import Log from '@library-src/utilities/Log';
import FormatNumber from '@library-src/utilities/formats/FormatNumber';
import ElementLibrary from '@library-src/utilities/commons/ElementLibrary';

export default {
    extends: BaseInput,

    props: {
        modelValue: {
            type: Number
        },
        control: {
            type: NumberModel,
            require: true
        }
    },

    setup() {
        const thisData: Ref<ENumber> = ref(new ENumber());
        return {
            thisData,
        }
    },

    watch: {
        // whenever question changes, this function will run
        modelValue(newValue: number, oldValue: number) {
            const me = this;
            if (newValue != oldValue && me.control) {
                if (me.checkIsValidValue(newValue)) {
                    me.thisData.formatValue = FormatNumber.changeNumberFormat(me.modelValue, me.control.format) ?? "";
                }
                else {
                    me.updateValueAndDisplay(oldValue);
                }
            }
        }
    },

    emits: ['blur', 'update:modelValue'],

    /**
     * LifeCycleHook của Vue
     * tnphuc - 2022.08.29
     */
    created() {
        const me = this;
        try {
            if (!me.control) {
                return;
            }
            me.thisData.formatValue = FormatNumber.changeNumberFormat(me.modelValue, me.control.format) ?? "";
            const maxValue = FormatNumber.changeNumberFormat(Number.MAX_SAFE_INTEGER, me.control.format) ?? ""
            if (maxValue) {
                me.control.maxLength = maxValue.length;
            }
            me.setStatusControlByModel(me.control, me.modelValue);

        } catch (error) {
            Log.ErrorLog(error as Error)
        }
    },
    methods: {
        /**
          * Khởi tạo v-model cho các class kế thừa
          * tnphuc - 2022.07.19
          */
        onInput(e: Event) {
            const me = this;
            try {
                if (!me.control || me.control.readOnly) {
                    return;
                }

                const value = (e.target as HTMLInputElement).value ?? "0";
                let valueData = FormatNumber.getNumberByStringFormat(value, me.control.format);
                if (me.thisData.isFocus) {
                    valueData = Math.trunc(valueData);
                    me.thisData.isFocus = false;
                }
                me.updateValueAndDisplay(valueData);

                /**
                 * Lấy vị trí con trỏ tại thời điểm hiện tại
                 */
                const inputSelection = me.getInputSelectionStart();
                // Sử dụng $nextTick ở đây đc hiểu là sẽ chạy function callback khi DOM được cập nhật, do bản chất DOM trong Vue được xử lý bất đồng bộ. Đọc Readme.md
                me.$nextTick(() => {
                    me.recalculateMousePointer(value, me.thisData.formatValue, inputSelection);
                });

            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Kiểm tra xem gía trị có thoả mãn không
         * @param value 
         * tnphuc - 19.09.2023 
         */
        checkIsValidValue(value: number) {
            const me = this;
            if (!me.control) {
                return false;
            }
            if (me.control.minValue > me.control.maxValue) {
                return true;
            }

            let result = false;
            if (value >= me.control.minValue && value <= me.control.maxValue) {
                result = true;
            }
            return result;
        },

        /**
         * Lấy vị trí của con trỏ chuột dùng để tính toán hành vi click nút người dùng
         * tnphuc - 2022.08.30
         */
        getInputSelectionStart() {
            const me = this;
            const input = me.getHTMLInputElement();
            if (input) {
                return input.selectionStart ?? 0;
            }

            return me.thisData.formatValue.length;
        },

        /**
        * Khởi tạo sự kiện blur trên input
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
                me.$emit('blur', me.modelValue);
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
        * Event sự kiện Focus vào control
        * Chỉ cho phép focus vào phần nguyên hoặc toàn bộ số (nếu định dạng số không có phần thập phân)
        * tnphuc - 2022.08.24
        */
        onFocus() {
            const me = this;
            try {

                if (!me.control) {
                    return;
                }

                const input = me.getHTMLInputElement();
                const numberFormat = me.control.format;
                if (input && numberFormat) {
                    const decimalPosition = me.thisData.formatValue.indexOf(numberFormat.decimal) > 0 ? me.thisData.formatValue.indexOf(numberFormat.decimal) : me.thisData.formatValue.length;
                    input.setSelectionRange(0, decimalPosition);
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },



        /**
         * Sự kiện nhập bàn phím trên thẻ input
         * tnphuc - 19.09.2023 
         */
        onKeyDown(e: KeyboardEvent) {
            try {
                const me = this;
                if (!me.control) {
                    return;
                }

                const keyCode = e.key;

                /**
                 * Xử lý nút lên xuống, backspace, del(2 nút)
                 */

                if (keyCode == "." || keyCode == ",") {
                    me.pressKeyDecimalSeparator(e);
                }
                else if (keyCode == "Backspace") {
                    me.pressKeyBackspace(e);
                    return;
                } else if (keyCode == "Delete") {
                    me.pressKeyDelete(e);
                    return;
                } else if (keyCode == "ArrowDown" || keyCode == "ArrowUp") {
                    me.pressKeyArrowDowOrUp(e);
                } else {
                    me.pressKeyNumberEvent(e);
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }

        },

        /**
         * Xử lý người dùng nhấn phím lên xuống
         * @param e Event
         * tnphuc - 2022.09.05
         */
        pressKeyArrowDowOrUp(e: KeyboardEvent) {
            const me = this;
            if (!me.control) {
                e.preventDefault();
                return;
            }
            const keyCode = e.key;
            const value = (e.target as HTMLInputElement).value;
            let valueData = FormatNumber.getNumberByStringFormat(value, me.control.format);
            const step = me.control.step ?? 1;
            if (keyCode == "ArrowDown") {
                if (valueData > 0 && valueData < step) {
                    valueData = valueData * -1
                } else {
                    valueData = +(valueData - step).toFixed(me.control.format.precision); // Sửa lỗi kiểu ntn: 63.29 + 1 = 64.28999999999999 :((
                }

            } else if (keyCode == "ArrowUp") {
                if (valueData > -step && valueData < 0) {
                    valueData = valueData * -1
                } else {
                    valueData = +(valueData + step).toFixed(me.control.format.precision); // Sửa lỗi kiểu ntn: 63.29 + 1 = 64.28999999999999 :((
                }
            }
            me.updateValueAndDisplay(valueData);
        },

        /**
         * Update v-model và format giá trị
         * tnphuc - 19.09.2023 
         */
        updateValueAndDisplay(value: number) {
            const me = this;
            if (!me.control) {
                return;
            }

            if (!me.validateControlBeforeHandlerEvent(me.control)) {
                return;
            }

            me.thisData.formatValue = FormatNumber.changeNumberFormat(value, me.control.format) ?? "";
            me.$forceUpdate(); // Bắt buộc Force render ở đấy vì qua function format nó hiểu là không thay đổi giá trị :(( Đọc README.md
            me.$emit('update:modelValue', value);
        },

        /**
         * Sự kiện người dùng nhập nút backSpace
         * @param e Event
         * tnphuc - 2022.09.05
         */
        pressKeyBackspace(e: KeyboardEvent) {
            const me = this;
            if (!me.control) {
                e.preventDefault();
                return;
            }
            const numberFormat = me.control.format;

            if (numberFormat) {

                // Nếu bôi đen toàn bộ thì coi như xóa hết
                const input = this.getHTMLInputElement();
                if (!input) {
                    return;
                }
                const cursorPosition = me.getCursorPosition(input);
                const inputValue = (e.target as HTMLInputElement).value;
                if (cursorPosition.end - cursorPosition.start == inputValue.length) {
                    const numberIntegerDigits = numberFormat.precision <= 0 ? inputValue.length + 1 : inputValue.length - numberFormat.precision;
                    input.setSelectionRange(0, numberIntegerDigits - 1); // nếu bôi đen toàn bộ số thì coi như bắt đầu từ phần nguyên
                    me.thisData.isFocus = true;
                } else {
                    me.thisData.isFocus = false;
                }


                const presentCaretPos = me.getInputSelectionStart();
                const decimalPointPosition = me.thisData.formatValue.indexOf(numberFormat.decimal);
                if (decimalPointPosition >= 0) {
                    //TH con trỏ chuột đang đứng ngay liền sau dấu ngăn cách phần thập phân thì dịch con trỏ lên 1 đơn vị
                    if (presentCaretPos == decimalPointPosition + 1) {
                        const input = me.getHTMLInputElement();
                        if (input) {
                            input.setSelectionRange(decimalPointPosition, decimalPointPosition);
                            e.preventDefault();
                            return;
                        }
                    }
                }
            }
        },

        /**
         * Sự kiện người dùng nhập nút delete
         * @param event
         * @returns 
         * tnphuc - 2022.09.05
         */
        pressKeyDelete(e: KeyboardEvent) {
            const me = this;
            if (!me.control) {
                e.preventDefault();
                return;
            }
            const numberFormat = me.control.format;

            if (numberFormat) {
                const input = this.getHTMLInputElement();
                if (!input) {
                    e.preventDefault();
                    return;
                }

                const cursorPosition = me.getCursorPosition(input);
                const inputValue = (e.target as HTMLInputElement).value;
                if (cursorPosition.end - cursorPosition.start == inputValue.length) {
                    const numberIntegerDigits = numberFormat.precision <= 0 ? inputValue.length + 1 : inputValue.length - numberFormat.precision;
                    input.setSelectionRange(0, numberIntegerDigits - 1); // nếu bôi đen toàn bộ số thì coi như bắt đầu từ phần nguyên
                    me.thisData.isFocus = true;
                } else {
                    me.thisData.isFocus = false;
                }

                //TH con trỏ chuột đang đứng ngay liền sau dấu ngăn cách phần thập phân thì dịch con trỏ lên 1 đơn vị
                const presentCaretPos = me.getInputSelectionStart();
                const decimalPointPosition = me.thisData.formatValue.indexOf(numberFormat.decimal);
                if (presentCaretPos == decimalPointPosition) {
                    const input = me.getHTMLInputElement();
                    if (input) {
                        input.setSelectionRange(presentCaretPos + 1, presentCaretPos + 1);
                        e.preventDefault();
                        return;
                    }
                }
            } else {
                e.preventDefault();
                return;
            }
        },

        /**
         * Lấy vị trí con trỏ chuột hiện tại
         * tnphuc - 19.09.2023 
         */
        getCursorPosition(input: any) {
            let cursorPosition = { "start": 1, "end": 1 };
            if (input) {

                cursorPosition.start = input.selectionStart ?? 1;
                cursorPosition.end = input.selectionEnd ?? 1;
            }
            return cursorPosition;
        },

        /**
         * Tính toán con trỏ chuột khi người dùng gõ phím , hoặc . trên bàn phím
         * Xử lý: Nếu người dùng nhập phím ,hoặc . thì con trỏ chuột tự động dịch về phần thập phân và không chạy qua các function format nữa
         * tnphuc - 2022.08.31
         */
        pressKeyDecimalSeparator(e: KeyboardEvent) {
            const me = this;
            /**
             * Ngăn chặn cách xử lý mặc định của trình duyệt để không bay sang sự kiện input nữa
             */
            const input = me.getHTMLInputElement();
            if (input && me.control) {
                const numberFormat = me.control.format;

                if (numberFormat) {
                    const caretPosGuess = me.thisData.formatValue.indexOf(numberFormat.decimal);
                    input.setSelectionRange(caretPosGuess + 1, caretPosGuess + 1);
                }
                e.preventDefault();
                return;
            } else {
                e.preventDefault();
                return;
            }
        },

        /**
         * Tính toán lại con trỏ chuột khi người dùng bắt đầu nhập ở phần thập phân của số
         * Nghiệp vụ: Khi người dùng nhập bất kì số gì trong phần thập phân thì coi là ghi đè kí tự đó chứ không phải chèn vào giữa, nên phải set selection lùi lại 1 nhịp để bôi đen
         * tnphuc - 2022.08.31
         */
        pressKeyNumberEvent(e: KeyboardEvent) {
            const me = this;
            if (!me.control) {
                return;
            }
            /**
             * Tính toán lại vị trí con trỏ chuột khi người dùng bắt đầu gõ qua phần thập phân của số
             */
            const keyCode = e.key;
            const regexNumber = new RegExp(`\\d`, "g");
            if (regexNumber.test(keyCode)) {
                const caretPos = me.getInputSelectionStart();
                const numberFormat = me.control.format;
                if (numberFormat && numberFormat.precision > 0) {
                    const numberIntegerDigits = me.thisData.formatValue.length - numberFormat.precision;
                    if (numberIntegerDigits <= caretPos) {
                        const input = me.getHTMLInputElement();
                        if (input) {
                            const value = me.thisData.formatValue.length;
                            if (caretPos >= me.thisData.formatValue.length) {
                                input.setSelectionRange(value - 1, value);
                            } else {
                                input.setSelectionRange(caretPos, caretPos + 1);
                            }
                        }
                    }
                }
            }
        },

        /**
         * Query đến Input Dom element
         * tnphuc - 19.09.2023 
         */
        getHTMLInputElement() {
            const me = this;
            if (!me.control) {
                return;
            }
            // initial caret position 
            const divParent = ElementLibrary.getElementById(me.control.id + `-parent`);
            if (divParent) {

                /**
                 * Query đến thẻ input đầu tiên trong Div parent
                 */
                const listInput = divParent.getElementsByTagName("input");

                if (listInput.length > 0) {
                    return listInput[0];
                }
            }
            return;
        },

        /**
         * Tính toán lại control chuột trên ô input
         * tnphuc - 2022.08.30
         */
        recalculateMousePointer(oldValue: string, newValue: string, inputSelection: number) {
            const me = this;
            if (!me.control) {
                return;
            }

            const originalLen = oldValue.length;
            const updatedLen = newValue.length;
            /**
             * Query đến thẻ input đầu tiên trong Div parent
             */
            const input = me.getHTMLInputElement();

            if (input) {
                /**
                 * Mặc định con trỏ chuột đứng đằng trước kí tự ngăn cách phần thập phân
                 */
                let caretPos = updatedLen - originalLen + inputSelection;

                /**
                 * Xác định con trỏ chuột hiện tại đang nằm trước hay sau kí tự phân tách phần nghìn
                 */
                const numberFormat = me.control.format;
                if (numberFormat) {

                    /**
                     * TH con trỏ chuột đứng đằng sau kí tự ngăn cách phần thập phân
                     * Check = cách kiểm tra nếu vị trí hiện tại con trỏ chuột nằm ngoài phần nguyên của số
                     * Tức: lấy tổng số kí tự newValue trừ đi số chữ số phần thập phân trong thiết lập
                     */
                    const numberIntegerDigits = oldValue.length - numberFormat.precision;
                    if (numberIntegerDigits < inputSelection) {
                        caretPos = inputSelection; // Công thức cho con trỏ chuột đối với phần thập phân
                    }

                    /**
                     * TH nếu người dùng nhập kí tự không phải số vào control thì bỏ qua
                     */
                    const regexNotNumber = new RegExp(`[^0-9${numberFormat.decimal}${numberFormat.thousands}\-]`, "g");
                    if (regexNotNumber.test(oldValue)) {
                        caretPos = inputSelection - 1;
                    }

                }
                if (caretPos >= updatedLen) {
                    input.setSelectionRange(updatedLen, updatedLen);
                } else {
                    input.setSelectionRange(caretPos, caretPos);
                }
            }
        }
    }



}
</script>
