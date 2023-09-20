export default class LocalStorageLibrary {

    /**
     * Lấy dữ liệu trong local storage
     * 
     */
    public static getByKey<T>(key: string) {
        const valueString = localStorage.getItem(key);
        if (valueString) {
            return JSON.parse(valueString) as T;
        }
        return null;
    }


    public static setByKey(key: string, value: Record<string, any>) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}