import Guid from "@library-src/utilities/types/Guid";
import IVoucher from "./IVoucher";
export default class Voucher {
    constructor(voucherItem?: IVoucher) {
        const me = this;
        if (voucherItem) {
            me.PublisherVoucher = voucherItem.PublisherVoucher;
            me.NameVoucher = voucherItem.NameVoucher;
            me.DayBeginVoucher = voucherItem.DayBeginVoucher;
            me.DayEndVoucher = voucherItem.DayEndVoucher;
            me.DescribeVoucher = voucherItem.DescribeVoucher;
            me.PriceVoucher = voucherItem.PriceVoucher;
            me.TotalNumberVoucher = voucherItem.TotalNumberVoucher;
            me.TotalPriceVoucher = voucherItem.TotalPriceVoucher;
            me.StatusVoucher = voucherItem.StatusVoucher;
        }
        me.VoucherId = Guid.NewGuid();
    }
    PublisherVoucher?: string;
    NameVoucher?: string;
    DayBeginVoucher?: Date;
    DayEndVoucher?: Date;
    DescribeVoucher?: string;
    PriceVoucher?: number;
    TotalNumberVoucher?: number;
    TotalPriceVoucher?: number;
    StatusVoucher?: string;

    VoucherId?: string;
}