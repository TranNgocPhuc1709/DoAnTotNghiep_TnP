import ToolBarItemsView from "@library-src/models/qlch_base/tool_bar_items_view/ToolBarItemsView"
import IDictionaryListViewModel from './IDictionaryListViewModel'
import Grid from '@library-src/models/qlch_control/qlch_grid/Grid'
import Guid from "@library-src/utilities/types/Guid";
export default class DictionaryListViewModel {
    /**
     *
     */
    constructor(model?: IDictionaryListViewModel) {
        const me = this;
        if (model) {
            me.toolBarItems = model.toolBarItems;
            me.gridMaster = model.gridMaster;
            me.gridDetail = model.gridDetail;
        }

        me.id = 'qlch-dictionary-list-'+Guid.NewGuid();
    };

    id?: string;

    /**
     * Danh sách nút sử dụng trên toolBar
     */
    toolBarItems?: Array<ToolBarItemsView>;

    /**
     * Bảng danh mục chính
     */
    gridMaster?: Grid;

    /**
     * Bảng chi tiết
     */
    gridDetail?: Grid;

}