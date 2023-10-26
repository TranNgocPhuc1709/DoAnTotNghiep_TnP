import BaseControl from "../base_control/BaseControl";
import ICheckbox from "./ICheckbox";

export default class Checkbox extends BaseControl {
    /**
     * Create Constructor
     */
    constructor(checkbox: ICheckbox) {
        super('qlch-checkbox', checkbox);
        const me = this;
        if (checkbox) {
            if (checkbox.value) {
                me.value = checkbox.value;
            }

        }
    }

    /**
     * Giá trị binding v-model
     */
    value: boolean = false;

}