import Guid from "@library-src/utilities/types/Guid";
import IStock from "./IStock";
export default class Stock {
    constructor(stock?: IStock) {
        const me = this;
        if (stock) {
            me.CodeProductStock = stock.CodeProductStock;
            me.NameProductStock = stock.NameProductStock;
            me.UnitProductStock = stock.UnitProductStock;
            me.GroupProductStock = stock.GroupProductStock;
            me.PriceProductStock = stock.PriceProductStock;
            me.InventoryNumberStock = stock.InventoryNumberStock;
            me.TotalInward = stock.TotalInward;
            me.TotalOutward = stock.TotalOutward;
        }
        me.StockId = Guid.NewGuid();
    }
    CodeProductStock?: string;
    NameProductStock?: string;
    UnitProductStock?: string;
    GroupProductStock?: string;
    PriceProductStock?: number;
    InventoryNumberStock?: number;
    TotalInward?: number; //Tổng nhập kho
    TotalOutward?: number; // Tổng xuất kho
    StockId?: string;
}