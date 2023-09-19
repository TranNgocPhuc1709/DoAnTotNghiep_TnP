import BaseDropDownInput from "../base_drop_down_input/BaseDropDownInput";
import ICombobox from "./ICombobox";

export default class Combobox extends BaseDropDownInput {
    /**
     * Create Constructor
     */
    constructor(combo?: ICombobox) {
        super('qlch-combobox', combo);
        const me= this;
        me.selectOnly = combo?.selectOnly ?? false;
    }

    /**
     * Mode chỉ cho chọn - không cho nhập
     */
    selectOnly:boolean = false;
    
}