import Guid from "@library-src/utilities/types/Guid";
import IGoodsOrderDetail from "./IGoodsOrderDetail";
export default class GoodsOrderDetail {
    constructor(goodsOrderDetail?: IGoodsOrderDetail) {
        const me = this;
        if (goodsOrderDetail) {
            me.CodeProductOrder = goodsOrderDetail.CodeProductOrder;
            me.NameProductOrder = goodsOrderDetail.NameProductOrder;
            me.UnitProductOrder = goodsOrderDetail.UnitProductOrder;
            me.NumberProductOrder = goodsOrderDetail.NumberProductOrder;
            me.UnitPriceOrder = goodsOrderDetail.UnitPriceOrder;
            me.PaymentOrder = goodsOrderDetail.PaymentOrder;
            me.GoodsOrderId = goodsOrderDetail.GoodsOrderId;
        }
        me.GoodsOrderDetailId = Guid.NewGuid();
    }



    CodeProductOrder?: string;
    NameProductOrder?: string;
    UnitProductOrder?: string;
    NumberProductOrder?: string;
    UnitPriceOrder?: number;
    PaymentOrder?: number;
    GoodsOrderId?: string;
    GoodsOrderDetailId?: string;
}