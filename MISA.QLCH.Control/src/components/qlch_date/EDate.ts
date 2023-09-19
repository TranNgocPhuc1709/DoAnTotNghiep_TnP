import DayInMouthModel from "@library-src/models/qlch_control/qlch_date/DayInMouthModel";

export default class EDate {
    /**
     * Created Constructor
     */
    constructor() { }
    /**
     * Flag to display text on input
     */
    displayValue?: string = "";

    /**
     * Calendar month
     */
    calendarMouth?: string = "";

    /**
     * Calendar year - build with string
     */
    calendarYear?: string = "";

    /**
     * Current value displayed on calendar popup
     */
    currentDate?: Date;

    /**
     * Minimum value displayed on control
     */
    minDate: Date = new Date("1753-01-01 00:00:00:000");

    /**
     * Maximum value displayed on control
     */
    maxDate: Date = new Date("9999-12-31 23:59:59:999");

    /**
     * List of data showing dates on a month selector screen
     */
    listDayInMouth?: Array<DayInMouthModel>;

    isShowBoxItem: boolean = false;
}