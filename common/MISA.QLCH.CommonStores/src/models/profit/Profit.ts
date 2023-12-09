import Guid from "@library-src/utilities/types/Guid";
import IProfit from "./IProfit";
export default class Profit {
    constructor(profit?: IProfit) {
        const me = this;
        if (profit) {
            me.TotalRevenue = profit.TotalRevenue;
            me.TotalSales = profit.TotalSales;
            me.TotalOtherRevenue = profit.TotalOtherRevenue;
            me.TotalExpense = profit.TotalExpense;
            me.TotalCostPrice = profit.TotalCostPrice;
            me.TotalOtherCosts = profit.TotalOtherCosts;
            me.TotalProfit = profit.TotalProfit;


        }
        me.ProfitId = Guid.NewGuid();
    }
    TotalRevenue?: number; //Tổng doanh thu
    TotalSales?: number; // Tổng hóa đơn bán hàng
    TotalOtherRevenue?: number; // Tổng thu khác
    TotalExpense?: number; // Tổng chi phí
    TotalCostPrice?: number; //Tổng chi phí giá vốn
    TotalOtherCosts?: number; //Tổng chi khác
    TotalProfit?: number; // Tổng lợi nhuận

    ProfitId?: string;
}