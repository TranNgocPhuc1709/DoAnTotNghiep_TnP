import IBaseInput from "../base_input/IBaseInput";

export default interface ITextBox extends IBaseInput{
    /**
     * Type Input String hoặc dạng password
     */
    type?: "text"|"password";

    
    /**
     * Giá trị binding model
     */
    value?: string;

    /**
     * Độ rộng của thẻ label
     */
    labelWidth?: number;
}