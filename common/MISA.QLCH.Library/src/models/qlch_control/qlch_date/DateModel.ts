import BaseDropDownInput from "../base_drop_down_input/BaseDropDownInput";
import IDateModel from "./IDateModel";

export default class DateModel extends BaseDropDownInput {
    /**
     * Create Constructor
     */
    constructor(date?: IDateModel) {
        super('qlch-date', date);
        if (date) {
            if (date.value) {
                this.value = date.value;
            }

            if (date.timeFormatDefault) {
                this.timeFormatDefault = date.timeFormatDefault;
            }

            if (date.formatDate) {
                this.formatDate = date.formatDate;
            }
        }
    }

    /**
     * Giá trị binding value
     */
    declare value?: Date;

    /**
     * Time value of Date Time control as user chooses
     */
    timeFormatDefault: "StartDay" | "EndDay" | "Now" = "Now";

    // Date Format
    formatDate: "dd/mm/yyyy" | "mm/dd/yyyy" = "dd/mm/yyyy";
}