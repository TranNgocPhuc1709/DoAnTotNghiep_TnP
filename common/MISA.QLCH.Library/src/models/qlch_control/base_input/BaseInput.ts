import { ErrorControlType } from "@library-src/utilities/enums/ErrorControlType";
import BaseControl from "../base_control/BaseControl";
import IBaseInput from "./IBaseInput";

export default class BaseInput extends BaseControl {
    /**
     * Create Constructor
     */
    constructor(nameControl: string, input?: IBaseInput) {
        super(nameControl, input);
        const me = this;
        if (input) {

            me.boxType = "hbox";
            if (input?.boxType) {
                me.boxType = input.boxType;
            }

            if (input?.classLabel) {
                me.classLabel = input?.classLabel;
            }
            me.require = false;
            if (input?.require) {
                me.require = true;
            }

            if (input?.placeholder) {
                me.placeholder = input?.placeholder;
            }
            if (input?.maxLength) {
                me.maxLength = input?.maxLength;
            }

            if (input?.styleInput) {
                me.styleInput = input?.styleInput;
            }
        }
        me.idWarning = me.id + '-warning';

        me.idWarningInformation = me.id + '-warning-information';
    }

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
    require?: boolean = false;

    /**
     * placeholder For input
     */
    placeholder?: string;

    /**
     * Max length value for control input
     */
    maxLength?: number = 255;

    /**
     * The id used for the require alert control
     */
    idWarning!: string;

    /**
     * Id sử dụng hiển thị nội dung cảnh báo
     */
    idWarningInformation!: string;

    /**
     * Error type shows warning at control
     */
    errorType?: ErrorControlType = ErrorControlType.Require;

    /**
     * Show error warning when validating control
     */
    isShowWarningDescription?: boolean = false;


    /**
     * Warning content Require
     */
    contentWarning?: string = "Trường này không được để trống!";

    /**
     * custom style cho thẻ input
     */
    styleInput?:string="";

    /**
     * custom Style cảnh báo
     */
    styleWarning?:string="";
}