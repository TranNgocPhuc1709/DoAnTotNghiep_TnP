import Constant from "@library-src/utilities/constants/Constant";
import BaseInput from "../base_input/BaseInput";
import NumberFormat from "../number_format/NumberFormat";
import INumberModel from "./INumberModel";

export default class NumberModel extends BaseInput {

    /**
     * Create constructor
     */
    constructor(number: INumberModel) {
        super("qlch-number-field", number);
        const me = this;
        if (number?.maxLength && number.maxLength <= Constant.maxLengthNumberFormat) {
            me.maxLength = number?.maxLength;
        } else {
            me.maxLength = Constant.maxLengthNumberFormat; // chỉ cho phép tối đa 29 kí tự do function number
        }
        if (number?.format) {
            me.format = number?.format;
        }

        if (number?.step) {
            me.step = number?.step ?? 1;
        }

        me.value = number?.value ?? 0;
        me.minValue = number?.minValue ?? Number.MIN_SAFE_INTEGER;
        me.maxValue = number?.maxValue ?? Number.MAX_SAFE_INTEGER;

    }
    /**
     * The value range changes the control value every time the user clicks up and down
     */
    step?: number = 1;

    /**
     * Number format by setting
     */
    format: NumberFormat = new NumberFormat();

    /**
     * Giá trị binding model
     */
    value: number = 0;

    /**
     * Giá trị nhỏ nhất
     */
    minValue: number = Number.MIN_SAFE_INTEGER;

    /**
     * Giá trị lớn nhất
     */
    maxValue: number = Number.MAX_SAFE_INTEGER;
}