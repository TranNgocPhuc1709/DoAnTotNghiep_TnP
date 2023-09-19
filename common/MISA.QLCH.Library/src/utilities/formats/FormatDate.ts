/**
 * The class implements the date format
 */
export default class FormatDate {

    /**
     * Function to convert date value from DB to format string
     * @param dateValue Date Time value passed in
     * @returns string format in dd/mm/yyyy or mm/dd/yyyy format
     */
    static convertDateTimeToStringByFormat(dateValue: Date, dateFormat?: string) {
        function format(m: Intl.DateTimeFormatOptions | undefined) {
           const f = new Intl.DateTimeFormat('en',m);
           let value = f.format(dateValue);
           if (value && value.length <= 1) {
               value = "0" + value;
           }
           return value;
        }

        if (!dateFormat) {
            dateFormat = "dd/mm/yyyy";
        }

        let formatOption = new Array<Intl.DateTimeFormatOptions>({day:"numeric"}, {month: "numeric"}, {year:"numeric"});
        if (dateFormat === "mm/dd/yyyy") {
            formatOption = new Array<Intl.DateTimeFormatOptions>({month: "numeric"}, {day:"numeric"}, {year:"numeric"});
        }

        return formatOption.map(format).join("/");
    }
}