import Guid from "@library-src/utilities/types/Guid";
import ICashReceiptDetail from "./ICashReceiptDetail";
export default class CashReceiptDetail {
    constructor(cashReceiptDetail?: ICashReceiptDetail) {
        const me = this;
        if (cashReceiptDetail) {
            me.ExplainCashReceipt = cashReceiptDetail.ExplainCashReceipt;
            me.MoneyCashDetail = cashReceiptDetail.MoneyCashDetail;
            me.CashReceiptId = cashReceiptDetail.CashReceiptId;
        }
        me.CashReceiptDetailId = Guid.NewGuid();
    }
    ExplainCashReceipt?: string;
    MoneyCashDetail?: number;
    CashReceiptId?: string;
    CashReceiptDetailId?: string;
}