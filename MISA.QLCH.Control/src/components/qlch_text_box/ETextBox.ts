export default class ETextBox {
    /**
     * khởi tạo constructor
     */
    constructor() { }

    /**
     * Thuộc tính render ra type của thẻ input
     * Phải sử dụng thuộc tính riêng bởi vì xử lý trò ẩn hiện con mắt trong TH input type password
     */
    inputType: "text" | "password" | "number" = "text";

    classType?: "primary" | "secondary" | "tertiary" = "primary";

    /**
     * Class icon con mắt đóng mở trong TH show, hide password
     */
    classIconEyeStatus: "i-eye-hide" | "i-eye-show" = "i-eye-hide";
}