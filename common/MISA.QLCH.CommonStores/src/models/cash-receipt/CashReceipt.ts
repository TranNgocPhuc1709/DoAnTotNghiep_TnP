import Guid from "@library-src/utilities/types/Guid";
import ICashReceipt from "./ICashReceipt";
export default class CashReceipt {
    constructor(cashReceiptItem?: ICashReceipt) {
        const me = this;
        if (cashReceiptItem) {
            me.DateCashReceipt = cashReceiptItem.DateCashReceipt;
            me.CodeCashReceipt = cashReceiptItem.CodeCashReceipt;
            me.TotalMoneyCashReceipt = cashReceiptItem.TotalMoneyCashReceipt;
            me.NameObjectCashReceipt = cashReceiptItem.NameObjectCashReceipt;
            me.ExplantCashReceipt = cashReceiptItem.ExplantCashReceipt;
            me.ObjectCashReceipt = cashReceiptItem.ObjectCashReceipt;
            me.PayerCashReceipt = cashReceiptItem.PayerCashReceipt;
            me.AddressPayerCashReceipt = cashReceiptItem.AddressPayerCashReceipt;
            me.RevenueOfficerCashReceipt = cashReceiptItem.RevenueOfficerCashReceipt;
            me.NameRevenueOfficerCashReceipt = cashReceiptItem.NameRevenueOfficerCashReceipt;
            me.IncludedCashReceipt = cashReceiptItem.IncludedCashReceipt;
        }
        me.CashReceiptId = Guid.NewGuid();
    }
    DateCashReceipt?: Date;
    CodeCashReceipt?: string;
    TotalMoneyCashReceipt?: number;
    NameObjectCashReceipt?: string;
    ExplantCashReceipt?: string;
    ObjectCashReceipt?: string;
    PayerCashReceipt?: string;
    AddressPayerCashReceipt?: string;
    RevenueOfficerCashReceipt?: string;
    NameRevenueOfficerCashReceipt?: string;
    IncludedCashReceipt?: boolean;
    CashReceiptId?: string;


    //Grid Table
    ExplainCashReceipt?: string;
    MoneyCashDetail?: number;

}