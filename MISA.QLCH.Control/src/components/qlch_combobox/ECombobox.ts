
export default class ECombobox {
    /**
     * Create Constructor
     */
    constructor() {

    }

    /**
     * Text displayed on input combobox
     */
    displayValue?: string = "";

    /**
     * old search key information to increase search performance
     */
    oldKeySearch?: string;

    /**
     * Which box item is the query focusing on?
     */
    indexBoxItemInFocus = -1;


    isShowBoxItem: boolean = false;

    classType?: "primary" | "secondary" | "tertiary" = "primary";
}