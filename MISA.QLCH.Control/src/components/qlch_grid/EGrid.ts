import Column from "@library-src/models/qlch_control/qlch_grid/qlch_column/Column";
import EGridFooter from "./EGridFooter";
import FilterModel from "@library-src/models/qlch_control/qlch_filter/FilterModel";
import FilterControl from "./FilterControl";

export default class EGrid {
    /**
     * Create constructor
     */
    constructor() {};

    /**
     * chân grid
     */
    footer?:EGridFooter;

    /**
     * Chỉ định cột đang được resize
     */
    columnResize?:Column;

    /**
     * Dữ liệu filter trên Grid
     */
    filterData: Record<string,FilterModel> = {};
    
    /**
     * Quản lý control filter trên grid
     */
    filterControl: Record<string,FilterControl> = {};

    

    /**
     * v-model của sự kiện check all
     */
    isCheckAll: boolean = false;
}