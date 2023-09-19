export default class Convert {
    /**
   * Function chuyển đổi Type Record<string, object> = [object, object]
   * @param record 
   * tnduc - 19.09.2023
   */
    public static recordToArrayValue<T>(record: Record<string, T>) {
        if (!record) {
            return [];
        }
        return Object.values(record);
    }

    /**
     * Function convert Type Record<string, object> = [key, key]
     * tnduc - 19.09.2023 
     */
    public static recordToArrayKey(record: Record<string, any>) {
        if (!record) {
            return [];
        }
        return Object.keys(record);
    }

    /**
     * function chuyển đổi Type Record<string, object> = [{'key': key, 'value': object}]
     * @param record 
     * tnduc - 19.09.2023 
     */
    public static recordToArrayKeyValue<T>(record: Record<string, T>) {
        if (!record) {
            return [];
        }
        return Object.entries(record).map(([key, value]) => ({ key, value }));
    }
}