import IDictionaryDetailViewModel from "./IDictionaryDetailViewModel";
import ToolBarItemsView from "@library-src/models/qlch_base/tool_bar_items_view/ToolBarItemsView"

export default class DictionaryDetailViewModel {

    constructor(detail: IDictionaryDetailViewModel) {
        const me = this;
        if (detail) {
            me.toolBarItems = detail.toolBarItems;
            me.title = detail.title;
        }
    }

    /**
     * Danh sách nút sử dụng trên toolBar
     */
    toolBarItems?: Array<ToolBarItemsView>;

    /**
     * Tiêu đề form
     */
    title?: string;
}