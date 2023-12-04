import Guid from "@library-src/utilities/types/Guid";
import IBillDetail from "./IBillDetail";
export default class BillDetail {
    constructor(billDetailItem?: IBillDetail) {
        const me = this;
        if (billDetailItem) {
            me.CodeProductBill = billDetailItem.CodeProductBill;
            me.NameProductBill = billDetailItem.NameProductBill;
            me.UnitProductBill = billDetailItem.UnitProductBill;
            me.QuantityBill = billDetailItem.QuantityBill;
            me.UnitPriceBill = billDetailItem.UnitPriceBill;
            me.IntoMoneyBill = billDetailItem.IntoMoneyBill;
            me.BillId = billDetailItem.BillId;


        }
        me.BillDetailId = Guid.NewGuid();
    }
    CodeProductBill?: string;
    NameProductBill?: string;
    UnitProductBill?: string;
    QuantityBill?: number;
    UnitPriceBill?: number;
    IntoMoneyBill?: number;
    BillId?: string;
    BillDetailId?: string;
}