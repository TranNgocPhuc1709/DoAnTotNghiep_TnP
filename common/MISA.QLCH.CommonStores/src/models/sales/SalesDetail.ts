import Guid from "@library-src/utilities/types/Guid";
import ISalesDetail from "./ISalesDetail";
export default class SalesDetail {
    constructor(salesDetail?: ISalesDetail) {
        const me = this;
        if (salesDetail) {
            me.CodeProductSales = salesDetail.CodeProductSales;
            me.NameProductSales = salesDetail.NameProductSales;
            me.UnitSales = salesDetail.UnitSales;
            me.quantitySales = salesDetail.quantitySales;
            me.UnitPriceSales = salesDetail.UnitPriceSales;
            me.TotalUnitPriceSales = salesDetail.TotalUnitPriceSales;
            me.AllTotalMoneySales = salesDetail.AllTotalMoneySales;
            me.SalesId = salesDetail.SalesId;

        }
        me.SalesDetailId = Guid.NewGuid();
    }
    CodeProductSales?: string;
    NameProductSales?: string;
    UnitSales?: string;
    quantitySales?: number;
    UnitPriceSales?: number;
    TotalUnitPriceSales?: number;
    AllTotalMoneySales?: number;

    SalesId?: string;
    SalesDetailId?: string;
}