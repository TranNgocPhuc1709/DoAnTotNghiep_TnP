import Guid from "@library-src/utilities/types/Guid";
import ICashPaymentDetail from "./ICashPaymentDetail";
export default class CashPaymentDetail {
    constructor(cashPaymentDetail?: ICashPaymentDetail) {
        const me = this;
        if (cashPaymentDetail) {
            me.ExplainCashPayment = cashPaymentDetail.ExplainCashPayment;
            me.MoneyCashPayment = cashPaymentDetail.MoneyCashPayment;
            me.CashPaymentsId = cashPaymentDetail.CashPaymentsId;
        }
        me.CashPaymentDetailId = Guid.NewGuid();
    }
    ExplainCashPayment?: string;
    MoneyCashPayment?: number;
    CashPaymentsId?: string;
    CashPaymentDetailId?: string;
}