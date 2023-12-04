import Guid from "@library-src/utilities/types/Guid";
import ISales from "./ISales";
export default class Sales {
    constructor(salesItem?: ISales) {
        const me = this;
        if (salesItem) {
            me.DateSales = salesItem.DateSales;
            me.TimeSales = salesItem.TimeSales;
            me.BillNumberSales = salesItem.BillNumberSales;
            me.TotalBillSales = salesItem.TotalBillSales;
            me.GoodsMoneySales = salesItem.GoodsMoneySales;
            me.MoneyPromotionSales = salesItem.MoneyPromotionSales;
            me.SalesAgent = salesItem.SalesAgent;
            me.NoticeSales = salesItem.NoticeSales;
            me.PhoneCustomerSales = salesItem.PhoneCustomerSales;
            me.NameCustomerSales = salesItem.NameCustomerSales;
            me.AddressCustomerSales = salesItem.AddressCustomerSales;
            me.MoneyPaidSales = salesItem.MoneyPaidSales;
            me.RefundsSales = salesItem.RefundsSales;
        }
        me.SalesId = Guid.NewGuid();
    }
    DateSales?: Date;
    TimeSales?: string;
    BillNumberSales?: number;
    TotalBillSales?: number;
    GoodsMoneySales?: number;
    MoneyPromotionSales?: number;
    SalesAgent?: string;
    NoticeSales?: string;

    //Customer
    PhoneCustomerSales?: number;
    NameCustomerSales?: string;
    AddressCustomerSales?: string;

    //Footer
    MoneyPaidSales?: number;
    RefundsSales?: number;

    SalesId?: string;
}