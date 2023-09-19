import IBaseControl from "../base_control/IBaseControl";
import DropDownMenuChild from "./children/DropDownMenuChild";

export default interface IDropDownMenu extends IBaseControl {
    /**
     * ClassType is the format of button
     */
    classType?: "primary" | "secondary" | "tertiary";

    classIconLeft?: string;

    classIconRight?: string;

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
    value?: any;
}