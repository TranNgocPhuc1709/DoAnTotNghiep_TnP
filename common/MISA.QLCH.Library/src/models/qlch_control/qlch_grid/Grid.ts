import BaseControl from "../base_control/BaseControl";
import IGrid from "./IGrid";
import Column from "./qlch_column/Column";
import ParamPaging from "@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging"
export default class Grid extends BaseControl {
    /**
     * create constructor
     */

    constructor(grid?: IGrid) {
        super('qlch-grid', grid);
        const me = this;

        if (grid) {
            if (grid.isNotShowFooter) {
                me.isNotShowFooter = true;
            }
            if (grid.columns) {
                me.columns = grid.columns;
            }
            if (grid.data) {
                me.data = grid.data;
            }
            if (grid.primaryKey) {
                me.primaryKey = grid.primaryKey;
            }

        }
    };

    /**
     * Danh sách cột trên Grid
     */
    columns?: Array<Column>;

    /**
     * Data dữ liệu hiển thị trên Grid
     */
    data?: Array<Record<string, any>>;

    /**
     * Khoá chính của dữ liệu
     */
    primaryKey?: string;

    /**
    * Dòng đang được chọn cho Grid
    */
    listSelectedRecord: Array<Record<string, any>> = [];

    // Ẩn Footer
    isNotShowFooter?: boolean = false;

    /**
     * Tham số paging của grid
     */
    pagingParam?: ParamPaging;

}