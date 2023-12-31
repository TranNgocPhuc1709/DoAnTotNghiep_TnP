import Guid from "@library-src/utilities/types/Guid";
import IGoodsOrder from "./IGoodsOrder";
export default class GoodsOrder {
    constructor(goodsOrder?: IGoodsOrder) {
        const me = this;
        if (goodsOrder) {
            me.DateOrder = goodsOrder.DateOrder;
            me.NumberOrder = goodsOrder.NumberOrder;
            me.PersonOrder = goodsOrder.PersonOrder;
            me.SupplierOrder = goodsOrder.SupplierOrder;
            me.FullMoneyOrder = goodsOrder.FullMoneyOrder;
            me.StatusOrder = goodsOrder.StatusOrder;
            me.ExplainOrder = goodsOrder.ExplainOrder;
            me.SupplierNameOrder = goodsOrder.SupplierNameOrder;
            me.PersonOrderName = goodsOrder.PersonOrderName;
            me.TotalOrder = goodsOrder.TotalOrder;
        }
        me.GoodsOrderId = Guid.NewGuid();
    }

    DateOrder?: Date;
    NumberOrder?: string;
    PersonOrder?: string;
    SupplierOrder?: string;
    FullMoneyOrder?: number;
    StatusOrder?: string;
    ExplainOrder?: string;
    SupplierNameOrder?: string;
    PersonOrderName?: string;
    TotalOrder?: number;
    GoodsOrderId?: string;


    // CodeProductOrder?: string;
    // NameProductOrder?: string;
    // UnitProductOrder?: string;
    // NumberProductOrder?: string;
    // UnitPriceOrder?: number;
    // PaymentOrder?: number;

}