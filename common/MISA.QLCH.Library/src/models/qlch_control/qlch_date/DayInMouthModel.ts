export default class DayInMouthModel {
    /**
     * Create Constructor
     */
    constructor() { };

    /**
     * Giá trị
     */
    value?: Date;

    /**
     * Value Show date on page
     */
    display?: string;

    /**
     * Style CSS
     */
    cls?: string = "";

    /**
     * these are the unsatisfactory values ​​in the DAY control (eg days less than 1753 or days greater than 9999)
     */
    inactive?: boolean = false;




}