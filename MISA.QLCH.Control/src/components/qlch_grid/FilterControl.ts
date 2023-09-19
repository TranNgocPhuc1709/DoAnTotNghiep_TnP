import IFilterControl from "./IFilterControl";
import DropDownMenu from "@library-src/models/qlch_control/qlch_drop_down_menu/DropDownMenu";

export default class FilterControl {
    /**
     * Create Constructor
     */
    constructor(filterControl?: IFilterControl) {
        const me = this;
        if (filterControl) {
            if (filterControl.input) {
                me.input = filterControl.input
            }

            if (filterControl.button) {
                me.button = filterControl.button
            }
        }

    };

    input?: Record<string,any>;
    button?: DropDownMenu
}