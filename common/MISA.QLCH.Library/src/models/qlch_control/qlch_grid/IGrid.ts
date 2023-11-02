import IBaseControl from "../base_control/IBaseControl";
import Column from "./qlch_column/Column";

export default interface IGrid extends IBaseControl {
    [x: string]: any;
    /**
     * Danh sách cột trên Grid
     */
    columns?: Array<Column>;

    /**
     * Data dữ liệu hiển thị trên Grid
     */
    data?: Array<Record<string, any>>;

    /**
     * Khoá chính của dữ liệu
     */
    primaryKey?: string;

    // Ẩn Footer
    isShowFooter?: boolean
}