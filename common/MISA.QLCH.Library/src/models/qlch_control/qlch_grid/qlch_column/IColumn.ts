import { ControlType } from "@library-src/utilities/enums/TypeControl";
import IBaseControl from "@library-src/models/qlch_control/base_control/IBaseControl";
import FilterModel from "@library-src/models/qlch_control/qlch_filter/FilterModel";

export default interface IColumn extends IBaseControl{
    /**
     * Kiểu hiển thị (số, text, combo, check, ...)
     */
    type?: ControlType;

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
    minWidth?: number;

    /**
     * Thuộc tính flex của cột (flex trong css)
     */
    flex?: number;

    /**
     * Xác định xem column có gán filter hay không? 
     */
    isFilter?: boolean;

    /**
     * Đối tượng Filter
     */
    filter?: FilterModel;

    
}