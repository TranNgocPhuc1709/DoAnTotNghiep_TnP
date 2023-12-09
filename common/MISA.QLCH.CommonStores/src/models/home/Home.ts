import Guid from "@library-src/utilities/types/Guid";
import IHome from "./IHome";
export default class Home {
    constructor(home?: IHome) {
        const me = this
        if (home) {
            me.TotalProceeds = home.TotalProceeds;
            me.TotalSell = home.TotalSell;
            me.TotalAnother = home.TotalAnother;
            me.TotalRevenue = home.TotalRevenue;
            me.NumberInvoiceCompleted = home.NumberInvoiceCompleted;
            me.TotalInvoiceCompleted = home.TotalInvoiceCompleted;
            me.NumberInvoiceStore = home.NumberInvoiceStore;
            me.TotalNumberInvoiceStore = home.TotalNumberInvoiceStore;
            me.TotalInvoiceStore = home.TotalInvoiceStore;
        }
        me.HomeId = Guid.NewGuid();
    }
    TotalProceeds?: number; // Tổng tiền thu trong ngày (TTtn)
    TotalSell?: number; //Tổng tiền bán hàng (BH) 
    TotalAnother?: number; //Tổng thu khác (TK)
    TotalRevenue?: number; // Tổng doanh thu ước tính (DTut)
    NumberInvoiceCompleted?: number; // Số hóa đơn hoàn thành (số HĐht) 
    TotalInvoiceCompleted?: number; //Tổng tiền số hóa đơn hoàn thành (HĐht)
    NumberInvoiceStore?: number; // Số hóa đơn tại cửa hàng (số TCH)
    TotalNumberInvoiceStore?: number; //Tổng số tiền hóa đơn tại cửa hàng (TCH)
    TotalInvoiceStore?: number; // Tổng hóa đơn tại cửa hàng (HĐ)

    HomeId?: string;
}