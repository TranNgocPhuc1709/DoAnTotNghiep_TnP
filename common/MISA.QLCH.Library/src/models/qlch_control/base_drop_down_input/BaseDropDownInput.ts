import BaseInput from "../base_input/BaseInput";
import IBaseDropDownInput from "./IBaseDropDownInput";

export default class BaseDropDownInput extends BaseInput {
    /**
     * Create Constructor
     */
    constructor(nameControl: string, input?: IBaseDropDownInput) {
        super(nameControl, input);
        const me = this;
        if (input) {

            if (input?.displayField) {
                me.displayField = input.displayField;
            }

            if (input?.valueField) {
                me.valueField = input.valueField;
            }

            if (input?.data && input?.data?.length > 0) {
                me.data = input.data;
            }

        }
    }

    /**
     * Flags to determine if data is loading or not?
     */
    isLoadingItemData?: boolean = false;

    /**
    * Previous value of control
    */
    oldValue?: any;

    /**
     * Present value
     */
    value?: any;

    /**
     * Data
     */
    dataDisplay?: Array<Record<string, any>>;

    /**
     * Initial data , only used and initialized when typeData is local
     */
    data?: Array<Record<string, any>>;

    /**
     * Information field in data displayed on text input
     */
    displayField = "display";

    /**
     * The information field in the data identifies the Key Query within the for
     */
    valueField = "value";
}