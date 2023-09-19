import Grid from "@library-src/models/qlch_control/qlch_grid/Grid";
import ToolBarItemsView from "@library-src/models/qlch_base/tool_bar_items_view/ToolBarItemsView";

export default interface IDictionaryListViewModel {
    /**
     * Danh sách nút sử dụng trên toolBar
     */
    toolBarItems?: Array<ToolBarItemsView>,

    /**
     * Bảng danh mục chính
     */
    gridMaster?: Grid,

    /**
     * Bảng chi tiết
     */
    gridDetail?: Grid
}