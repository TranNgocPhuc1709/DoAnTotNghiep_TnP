export default class ENumber {
    constructor() { }

    /**
     * Dữ liệu hiển thị trong ô input
     */
    formatValue = "";

    /**
     * Giá trị trước đó của control
     */
    oldValue?: number = 0;


    // Có đang focus all input hay không?
    isFocus?: boolean = false;
}