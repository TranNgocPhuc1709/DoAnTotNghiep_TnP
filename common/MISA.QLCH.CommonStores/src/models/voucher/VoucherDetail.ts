import Guid from "@library-src/utilities/types/Guid";
import IVoucherDetail from "./IVoucherDetail";
export default class VoucherDetail {
    constructor(voucherDetail?: IVoucherDetail) {
        const me = this;
        if (voucherDetail) {
            me.TotalVoucherDetail = voucherDetail.TotalVoucherDetail;

        }
        me.VoucherDetailId = Guid.NewGuid();
    }
    TotalVoucherDetail?: number;
    VoucherDetailId?: string
}