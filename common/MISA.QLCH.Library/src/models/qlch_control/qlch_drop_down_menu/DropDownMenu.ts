import BaseControl from "../base_control/BaseControl";
import IDropDownMenu from "./IDropDownMenu";
import DropDownMenuChild from "./children/DropDownMenuChild";
import { EditMode } from "@library-src/utilities/enums/EditMode";

export default class DropDownMenu extends BaseControl {

    /**
     * Create Constructor
     */
    constructor(input?: IDropDownMenu) {
        super('qlch-drop-down', input);
        const me = this;
        if (input?.classType) {
            me.classType = input?.classType;
        }
        if (input?.classIconLeft) {
            me.classIconLeft = input?.classIconLeft;
        }
        if (input?.classIconRight) {
            me.classIconRight = input?.classIconRight;
        }
        if (input?.children && input?.children.length > 0) {
            me.children = input?.children;
        }

        if (input?.styleButton) {
            me.styleButton = input?.styleButton;
        }

        if (input?.value) {
            me.value = input?.value;
        }
    }

    /**
     * ClassType is the format of button
     */
    classType?: "primary" | "secondary" | "tertiary" = "primary";

    classIconLeft?: string = "";

    classIconRight?: string = "";

    /**
     * Class arrow pointing up and down
     */
    clsArrowStatus?: "arrow-down" | "arrow-up" = "arrow-down";

    /**
     * Attribute that identifies the child item in the DropDown Menu
     */
    children?: Array<DropDownMenuChild>;

    /**
     * Style cho thẻ button
     */
    styleButton?: string;

    /**
     * Giá trị của nút
     */
    value?: any = EditMode.View;
}