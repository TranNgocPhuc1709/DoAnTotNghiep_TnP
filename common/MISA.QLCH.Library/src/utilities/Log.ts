export default class Log {
    /**
     * Error Log
     * @param error Information Log
     * tnduc - 2022.08.22
     */
    public static ErrorLog(error: Error) {
        console.error(error.stack);
    }

    /**
     * Info Log
     * @param message Information Log
     * tnduc - 2022.08.22
     */
    public static InfoLog(message: any) {
        console.trace(message);
    }
}