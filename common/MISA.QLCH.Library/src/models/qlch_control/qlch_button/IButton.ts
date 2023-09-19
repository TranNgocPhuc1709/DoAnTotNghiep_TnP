import IBaseControl from "../base_control/IBaseControl";

export default interface IButton extends IBaseControl {
    /**
     * ClassType is the format of button
     */
    classType?: "primary" | "secondary" | "tertiary" | "normal";

    /**
     * class contains the icon on the left
     */
    classIconLeft?: string;

    /**
     * class contains the icon on the right
     */
    classIconRight?: string;

    /**
     * Css Inline cho Button
     */
    styleButton?: string;

    /**
     * Gía trị của nút (Nút thể hiện cho trạng thái save nào của database)
     */
    value?: any;
}