import Guid from "@library-src/utilities/types/Guid";
import IBill from "./IBill";
export default class Bill {
    constructor(billItem?: IBill) {
        const me = this;
        if (billItem) {
            me.DateBill = billItem.DateBill;
            me.TotalMoneyBill = billItem.TotalMoneyBill;
            me.NumberBill = billItem.NumberBill;
            me.numVoucherTotalPrice = billItem.numVoucherTotalPrice;
            me.collectedMoney = billItem.collectedMoney;
            me.refundDetail = billItem.refundDetail;
            me.NoticeBill = billItem.NoticeBill;
            me.CustomerName = billItem.CustomerName;
            me.SalesAgent = billItem.SalesAgent;
            me.ObjectSalesAgent = billItem.ObjectSalesAgent;
            me.Payments = billItem.Payments;
            me.TotalSalesBill = billItem.TotalSalesBill;
            me.TotalPurchaseBill = billItem.TotalPurchaseBill;
            me.NameStore = billItem.NameStore;
        }
        me.BillId = Guid.NewGuid();
    }
    DateBill?: String;
    NumberBill?: string;
    TotalMoneyBill?: number;
    numVoucherTotalPrice?: number;
    collectedMoney?: number;
    refundDetail?: number;
    NoticeBill?: string;
    CustomerName?: string;
    SalesAgent?: string;
    ObjectSalesAgent?: string;
    Payments?: number;
    TotalSalesBill?: number;
    TotalPurchaseBill?: number; //Tổng số tiền nhập hàng
    NameStore?: string; // Tên cửa hàng
    BillId?: string;
}