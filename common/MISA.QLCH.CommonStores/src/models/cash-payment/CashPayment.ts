import Guid from "@library-src/utilities/types/Guid";
import ICashPayment from "./ICashPayment";
export default class CashPayment {
    constructor(cashPaymentItem?: ICashPayment) {
        const me = this;
        if (cashPaymentItem) {
            me.DateCashPayment = cashPaymentItem.DateCashPayment
            me.CodeCashPayment = cashPaymentItem.CodeCashPayment
            me.TotalCashPayment = cashPaymentItem.TotalCashPayment
            me.NameObjectCashPayment = cashPaymentItem.NameObjectCashPayment
            me.ReasonCashPayment = cashPaymentItem.ReasonCashPayment
            me.ObjectCashPayment = cashPaymentItem.ObjectCashPayment
            me.ReceiverCashPayment = cashPaymentItem.ReceiverCashPayment
            me.AddressCashPayment = cashPaymentItem.AddressCashPayment
            me.StaffCashPayment = cashPaymentItem.StaffCashPayment
            me.NameStaffCashPayment = cashPaymentItem.NameStaffCashPayment
            me.IncludedCashPayment = cashPaymentItem.IncludedCashPayment
        }
        me.CashPaymentsId = Guid.NewGuid();
    }
    DateCashPayment?: Date;
    CodeCashPayment?: string;
    TotalCashPayment?: number;
    NameObjectCashPayment?: string;
    ReasonCashPayment?: string;
    ObjectCashPayment?: string;
    ReceiverCashPayment?: string;
    AddressCashPayment?: string;
    StaffCashPayment?: string;
    NameStaffCashPayment?: string;
    IncludedCashPayment?: boolean;
    CashPaymentsId?: string;




    //Grid Table
    ExplainCashPayment?: string;
    MoneyCashPayment?: number;
}