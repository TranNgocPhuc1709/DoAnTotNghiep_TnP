
import IBaseInput from "../base_input/IBaseInput";
import NumberFormat from "../number_format/NumberFormat";

export default interface INumber extends IBaseInput {
    /**
     * The value range changes the control value every time the user clicks up and down
     */
    step?: number;

    /**
     * Number format by setting
     */
    format?: NumberFormat;

    /**
     * Giá trị binding model
     */
    value?: number;

    /**
     * Giá trị nhỏ nhất
     */
    minValue?: number;

    /**
     * Giá trị lớn nhất
     */
    maxValue?: number;

    /**
     * Độ dài label
     */
    labelWidth?: number;

    classType?: "primary" | "secondary" | "thirty";
}