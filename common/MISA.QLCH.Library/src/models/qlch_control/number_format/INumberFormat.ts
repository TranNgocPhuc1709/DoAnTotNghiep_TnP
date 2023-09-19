export default interface INumberFormat {
    /**
    * The symbol follows
    */
    prefix?: string;

    /**
     * Symbols that follow
     */
    suffix?: string;

    /**
     * Thousands separator symbol
     */
    thousands?: string;

    /**
     * Decimal separator symbol
     */
    decimal?: string;

    /**
     * Number of decimal places
     */
    precision?: number;
}