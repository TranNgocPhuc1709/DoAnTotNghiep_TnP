import INumberFormat from "./INumberFormat";

export default class NumberFormat {

    /**
     * Create Constructor
     */
    constructor(format?: INumberFormat) {
        if (format) {
            if (format.prefix) {
                this.prefix = format.prefix;
            }

            if (format.suffix) {
                this.suffix = format.suffix;
            }

            if (format.thousands) {
                this.thousands = format.thousands;
            }

            if (format.decimal) {
                this.decimal = format.decimal;
            }

            this.precision = format.precision ?? 0;
        }
    }

    /**
    * The symbol follows
    */
    prefix: string = "";

    /**
     * Symbols that follow
     */
    suffix: string = "";

    /**
     * Dấu ngăn cách phần nghìn
     */
    thousands: string = ",";

    /**
     * Dấu ngăn cách phần thập phân
     */
    decimal: string = ".";

    /**
     * Number of decimal places
     */
    precision: number = 0;
}