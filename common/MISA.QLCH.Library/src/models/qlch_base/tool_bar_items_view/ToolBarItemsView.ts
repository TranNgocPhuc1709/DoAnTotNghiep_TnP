import IToolBarItemsView from './IToolBarItemsView'
import Button from '@library-src/models/qlch_control/qlch_button/Button'
import DropDownMenu from '@library-src/models/qlch_control/qlch_drop_down_menu/DropDownMenu'
import DropDownMenuChild from '@library-src/models/qlch_control/qlch_drop_down_menu/children/DropDownMenuChild';
export default class ToolBarItemsView {
    /**
     *
     */
    constructor(toolBar: IToolBarItemsView) {
        const me = this;
        me.control = toolBar.control;
        me.name = toolBar.name;
    };

    /**
     * Button in toolbar
     */
    control ?: Button | DropDownMenu | DropDownMenuChild;

    /**
     * Tên định danh
     */
    name ?: string;

}