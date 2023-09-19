import FilterModel from "@library-src/models/qlch_control/qlch_filter/FilterModel";
import IParamPaging from "./IParamPaging";

export default class ParamPaging {
    constructor(param?: IParamPaging) {
        const me = this;
        me.filter = param?.filter;
        me.start = param?.start ?? 1;
        me.limit = param?.limit ?? 15;
        me.page = param?.page ?? 1;
    }
    /**
     * Bộ lọc
     */
    filter?: Array<FilterModel>;

    /**
     * vị trí Bản ghi bắt đầu
     */
    start: number = 1;

    /**
     * Giới hạn bản ghi / 1 trang
     */
    limit: number = 15;

    /**
     * Số page
     */
    page: number = 1;
}