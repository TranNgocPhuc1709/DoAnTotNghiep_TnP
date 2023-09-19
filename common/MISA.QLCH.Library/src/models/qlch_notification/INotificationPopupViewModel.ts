import ToolBarItemsView from '@library-src/models/qlch_base/tool_bar_items_view/ToolBarItemsView';
export default interface INotificationPopupViewModel {
    /**
     * Nội dung thông báo
     */
    message?: string,

    /**
     * Nội dung thông báo
     */
    messageHTML?: string;

    /**
     * Icon hiển thị
     */
    icon?: "error" | "question" | "warning" | "info",

    /**
     * Danh sách nút sử dụng trên toolBar
     */
    toolBarItems?: Array<ToolBarItemsView>;
}