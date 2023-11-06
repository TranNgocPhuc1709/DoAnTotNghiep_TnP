import BaseInput from "../base_input/BaseInput";
import ITextBox from "./ITextBox";

export default class TextBox extends BaseInput {
    /**
    * Khởi tạo class
    */
    constructor(textBox?: ITextBox) {
        super("qlch-text-field", textBox);
        const me = this;
        if (textBox) {
            if (textBox?.type) {
                me.type = textBox.type;
            }
            if (textBox?.value) {
                me.value = textBox.value;
            }
            if (textBox?.labelWidth) {
                me.labelWidth = textBox.labelWidth
            };
            if (textBox?.classType) {
                me.classType = textBox.classType
            };
        }
    }

    /**
     * Type Input String hoặc dạng password
     */
    type: "text" | "password" | "number" = "text";

    // định dạng ô input

    classType?: "primary" | "secondary" | "tertiary" = "primary";

    /**
     * Giá trị trước đó của control
     */
    oldValue?: string;

    /**
     * Giá trị hiện tại
     */
    value?: string;

    /**
     * Độ rộng của thẻ label
     */
    labelWidth?: number;
}