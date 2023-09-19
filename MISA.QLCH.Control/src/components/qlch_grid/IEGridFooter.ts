export default interface IEGridFooter {
    /**
     * Tổng số bản ghi
     */
    totalRecord?: number,

    /**
     * Tổng số trang được tính toán lại
     */
    totalPage?: number,

    /**
     * Record bắt đầu
     */
    start?: number,

    /**
     * Record kết thúc
     */
    end?: number,

    /**
     * Page đang active
     */
    pageActive?: number,

    /**
     * Giới hạn 1 trạng
     */
    limit?: number
}