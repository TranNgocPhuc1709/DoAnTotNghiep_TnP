import BaseControl from "@library-src/models/qlch_control/base_control/BaseControl";
import IColumn from "./IColumn";
import { ControlType } from "@library-src/utilities/enums/TypeControl";

export default class Column extends BaseControl {
    /**
     * Create Constructor
     */
    constructor(column?: IColumn) {
        super('qlch-column', column);
        const me = this;
        if (column) {
            if (column.type) {
                me.type = column.type;
            }

            if (column.dataIndex) {
                me.dataIndex = column.dataIndex;
            }

            if (column.width) {
                me.width = column.width;
            }

            if (column.minWidth) {
                me.minWidth = column.minWidth;
            }

            if (column.flex) {
                me.flex = column.flex;
            }
            if (column.isFilter != undefined && column.isFilter != null) {
                me.isFilter = column.isFilter;
            }
        }

        me.initDefaultData();

    };

    /**
     * Kiểu hiển thị (số, text, combo, check, ...)
     */
    type?: ControlType = ControlType.TextBox;

    /**
     * Tên trường binding dữ liệu lên grid
     */
    dataIndex?: string;

    /**
     * Độ rộng của cột
     */
    width?: number;

    /**
     * Độ rộng tối thiểu của cột
     */
    minWidth: number = 100;

    /**
     * Thuộc tính flex của cột (flex trong css)
     */
    flex?: number;

    /**
     * Xác định xem column có gán filter hay không? 
     */
    isFilter?: boolean = true;

    /**
     * Vị trí bắt đầu khi thay đổi width trên column
     */
    startX: number = 0;

    /**
     * Độ rộng của cột khi bắt đầu resize
     */
    startWidth: number = 0;

    /**
     * Khởi tạo dữ liệu mặc định cho control
     */
    initDefaultData() {
        const me = this;
        if (!me.width && !me.flex) {
            me.flex = 1;
        }
    }
}