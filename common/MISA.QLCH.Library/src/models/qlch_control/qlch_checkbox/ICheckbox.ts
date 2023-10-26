import IBaseControl from "../base_control/IBaseControl";

export default interface ICheckbox extends IBaseControl {
    /**
     * Giá trị binding v-model
     */
    value?: boolean
}