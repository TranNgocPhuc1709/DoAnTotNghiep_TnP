import IBaseDropDownInput from "../base_drop_down_input/IBaseDropDownInput";

export default interface ICombobox extends IBaseDropDownInput {

    /**
     * Mode chỉ cho chọn - không cho nhập
     */
    selectOnly?: boolean;
    labelWidth?: number;
    classType?: "primary" | "secondary";
}