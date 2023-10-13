import IBaseDropDownInput from "../base_drop_down_input/IBaseDropDownInput";

export default interface IDateModel extends IBaseDropDownInput {
    /**
     * Giá trị binding value
     */
    value?: Date;

    /**
     * Time value of Date Time control as user chooses
     */
    timeFormatDefault?: "StartDay" | "EndDay" | "Now";

    // Date Format
    formatDate?: "dd/mm/yyyy" | "mm/dd/yyyy";

    //độ dài label
    labelWidth?: number;
}