
import BaseControl from "@library-src/models/qlch_control/base_control/BaseControl";
import IDropDownMenuChild from "./IDropDownMenuChild";
export default class DropDownMenuChild extends BaseControl {
    /**
     * Create Constructor
     */
    constructor(dropDownChild?: IDropDownMenuChild) {
        super('qlch-drop-down-children', dropDownChild);

        const me = this;

        if (dropDownChild?.classIcon) {
            me.classIcon = dropDownChild.classIcon;
        }

        if (dropDownChild?.type) {
            me.type = dropDownChild.type;
        }

        if (dropDownChild?.itemCode) {
            me.itemCode = dropDownChild.itemCode;
        }

        me.value = dropDownChild?.value;

        me.shortName = dropDownChild?.shortName

    }

    /**
     * The class does not have an icon to the left of the item
     */
    classIcon?: string;

    /**
     * Type menu item style or line
     */
    type?: "line" | "item" = "item";

    /**
     * Item Code of Menu item
     */
    itemCode?: string;

    /**
     * Giành cho TH cần sử dụng value trong dropdown
     */
    value?: any;

    /**
     * Tên viết tắt
     */
    shortName?: string;
}