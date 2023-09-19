import IBaseControl from "@library-src/models/qlch_control/base_control/IBaseControl";

export default interface IDropDownMenuChild extends IBaseControl {
    /**
     * The class does not have an icon to the left of the item
     */
    classIcon?: string;

    /**
     * Type menu item style or line
     */
    type?: "line" | "item";

    /**
     * Item Code of Menu item
     */
    itemCode: string;

    /**
     * Giành cho TH cần sử dụng value trong dropdown
     */
    value?: any;

    /**
     * Tên viết tắt
     */
    shortName?: string;
}