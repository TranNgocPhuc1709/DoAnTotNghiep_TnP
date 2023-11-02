import BaseControl from "../base_control/BaseControl";
import IButton from "./IButton";

export default class Button extends BaseControl {
    /**
     * Create Constructor
     */
    constructor(button?: IButton) {
        super("qlch-btn", button);
        const me = this;
        if (button?.classType) {
            me.classType = button?.classType;
        }
        if (button?.classIconLeft) {
            me.classIconLeft = button?.classIconLeft;
        }
        if (button?.classIconRight) {
            me.classIconRight = button?.classIconRight;
        }

        if (button?.styleButton) {
            me.styleButton = button?.styleButton;
        }

        if (button?.value) {
            me.value = button.value;
        }

    }

    /**
     * ClassType is the format of button
     */
    classType?: "primary" | "secondary" | "tertiary" | "normal" | "SaveBtn" | "CollectMoneyBtn" = "primary";

    /**
     * class contains the icon on the left
     */
    classIconLeft?: string = "";

    /**
     * class contains the icon on the right
     */
    classIconRight?: string = "";

    /**
     * Css Inline cho Button
     */
    styleButton?: string = "";

    /**
     * Gía trị của nút (Nút thể hiện cho trạng thái save nào của database)
     */
    value?: any;
}