import { Addition, Operator } from "@library-src/utilities/enums/Filter";

export default class FilterModel {
    /**
     * Khởi tạo constructor
     */
    constructor(property: string) {
        const me = this;
        me.property = property

    }

    /**
     * Dữ liệu filter
     */
    value: any;

    /**
     * Toán tử so sánh (Mặc định Like)
     */
    operator = Operator.Like;

    /**
     * Toán tử nối giữa hai condition (AND - OR) (Mặc định And)
     */
    addition = Addition.AND;

    /**
     * Trường thông tin query
     */
    property = "";

    /**
     * Group
     */
    group = "";
}