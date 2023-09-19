import ToolBarItemsView from "@library-src/models/qlch_base/tool_bar_items_view/ToolBarItemsView"
export default interface IDictionaryDetailViewModel {
    /**
     * Danh sách nút sử dụng trên toolBar
     */
    toolBarItems?: Array<ToolBarItemsView>;

    /**
     * Tiêu đề form
     */
    title?: string;
}