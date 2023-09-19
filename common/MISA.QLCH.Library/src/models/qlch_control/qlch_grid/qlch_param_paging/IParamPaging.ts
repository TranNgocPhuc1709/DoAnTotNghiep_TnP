import FilterModel from "@library-src/models/qlch_control/qlch_filter/FilterModel";

export default interface IParamPaging {
    /**
     * Bộ lọc
     */
    filter?: Array<FilterModel>;

    /**
     * vị trí Bản ghi bắt đầu
     */
    start?: number;

    /**
     * Giới hạn bản ghi / 1 trang
     */
    limit?: number;

    /**
     * Số page
     */
    page?: number;
}