import IBaseInput from "../base_input/IBaseInput";

export default interface IBaseDropDownInput extends IBaseInput{
    /**
     * Information field in data displayed on text input
     */
    displayField?:string;

    /**
     * The information field in the data identifies the Key Query within the for
     */
    valueField?: string;

    /**
     * Data cho combobox
     */
    data?:Array<Record<string,any>>;
}