import IBaseControl from "../base_control/IBaseControl";

export default interface IBaseInput extends IBaseControl {
    /**
     * Block form of labels and input tags
     * hbox: labels and input tag are on the same horizontal row
     * vbox: labels and input tags are on the same vertical line
     */
    boxType?: "hbox" | "vbox";

    /**
     * The class declares the style for the input label
     */
    classLabel?: string;

    /**
    * Required entry
    */
    require?: boolean;

    /**
     * placeholder For input
     */
    placeholder?: string;

    /**
     * Max length value for control input
     */
    maxLength?: number;

    /**
     * custom style cho thẻ input
     */
    styleInput?:string;
}