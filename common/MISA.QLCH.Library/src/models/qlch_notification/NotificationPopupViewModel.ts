import INotificationPopupViewModel from "./INotificationPopupViewModel";
import ToolBarItemsView from '@library-src/models/qlch_base/tool_bar_items_view/ToolBarItemsView';

export default class NotificationPopupViewModel {
    /**
     *
     */
    constructor(model: INotificationPopupViewModel) {
        if (model) {
            const me = this;
            me.message = model.message;
            me.messageHTML = model.messageHTML;
            me.icon = model.icon;
            me.toolBarItems = model.toolBarItems;

        }
    }

    /**
     * Nội dung thông báo
     */
    message?: string;

    /**
     * Nội dung thông báo
     */
    messageHTML?: string;

    /**
     * Icon hiển thị
     */
    icon?: "error"|"question"|"warning"|"info" = "info";

    /**
     * Danh sách nút sử dụng trên toolBar
     */
    toolBarItems?: Array<ToolBarItemsView>;
}