import NumberFormat from "@library-src/models/qlch_control/number_format/NumberFormat";

export default class FormatNumber {
    /**
     * Hàm render ra định dạng kiểu số cần format
     * @param value Giá trị kiểu số cần format (1234.25)
     * @param format Kiểu số cần lấy định dạng
     * tnduc - 2022.08.29
     */
    static changeNumberFormat(value: number | null | undefined, format: NumberFormat): string {
        if (!value) {
            value = 0;
        }

        let result = "" + value;
        if (format) {

            // Kiểm tra giá trị truyền vào có phải số thập phân hay không ??, nếu không có thì build thêm 4 số 0 vào, tý cắt đi sau
            if (result.indexOf(".") < 0) {
                // final formatting
                result += ".0000";
            }

            // Lấy vị trí phần thập phân
            const decimal_pos = result.indexOf(".");

            // Lần lượt lấy vị trí bên trái và bên phải phần thập phân
            let left_side = result.substring(0, decimal_pos);
            let right_side = result.substring(decimal_pos + 1);

            // format giá trị phân nguyên
            left_side = this.formatNumber(left_side, format);

            // Lấy giá trị phần thập phân, mặc định + thêm 4 số chữ số 0

            right_side += "0000";

            // Dựa vào định dạng bao nhiêu số sau phần thập phân để cắt ký tự đằng sau
            right_side = right_side.substring(0, format.precision);

            if (right_side && right_side.length > 0) {
                right_side = format.decimal + right_side;
            }

            const negative = result.startsWith("-") ? "-" : "";

            // sinh kết quả trả về theo format
            result = format.prefix + negative + left_side + right_side + format.suffix;
        }
        return result;
    }

    /**
     * Format định dạng số theo phần nghìn
     * @param value 123456
     * @param format quantity
     * @return 123,456
     * tnduc - 2022.08.30
     */
    static formatNumber(value: string, format: NumberFormat) {
        return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, format.thousands ?? ".");
    }

    /**
     * Build lại kiểu số dựa vào string theo format truyền vào
     * @param value giá trị cần truyền 123.456,12
     * @return 123456.12
     */
    static getNumberByStringFormat(value: string | null | undefined, format: NumberFormat) {
        let result = 0;
        if (!value) {
            return result;
        }
        if (format.decimal === "." && !isNaN(+value)) {
            return +value;
        }
        value = "" + value;
        const negative = value.startsWith("-") ? -1 : 1;

        if (format) {
            if (value.indexOf(format.decimal) < 0) {
                value = value + format.decimal + "0000";
            }
            // Kiểm tra giá trị truyền vào có kí tự phần thập phân hay không?
            // Lấy vị trí phần thập phân
            const decimal_pos = value.indexOf(format.decimal);

            // Lần lượt lấy vị trí bên trái và bên phải phần thập phân
            const left_side = value.substring(0, decimal_pos).replace(/\D/g, "");
            let right_side = value.substring(decimal_pos + 1).replace(/\D/g, "");
            right_side = right_side.substring(0, format.precision);

            if (right_side && right_side.length > 0) {
                right_side = "." + right_side;
            }
            value = left_side + right_side;
            result = +value * negative;
        }

        return result;
    }
}