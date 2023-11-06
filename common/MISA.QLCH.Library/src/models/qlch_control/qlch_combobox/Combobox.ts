import BaseDropDownInput from "../base_drop_down_input/BaseDropDownInput";
import ICombobox from "./ICombobox";

export default class Combobox extends BaseDropDownInput {
    /**
     * Create Constructor
     */
    constructor(combo?: ICombobox) {
        super('qlch-combobox', combo);
        const me = this;
        me.selectOnly = combo?.selectOnly ?? false;
        if (combo) {
            if (combo?.labelWidth) {
                me.labelWidth = combo.labelWidth
            };
            if (combo?.classType) {
                me.classType = combo.classType
            };
        }
    }

    /**
     * Mode chỉ cho chọn - không cho nhập
     */
    selectOnly: boolean = false;
    /**
    * Độ rộng của thẻ label
    */

    labelWidth?: number;

    // kiểu input

    classType?: "primary" | "secondary" | "tertiary" = "primary";
}