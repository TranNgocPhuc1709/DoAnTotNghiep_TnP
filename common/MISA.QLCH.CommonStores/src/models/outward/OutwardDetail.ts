import Guid from "@library-src/utilities/types/Guid";
import IOutwardDetail from "./IOutwardDetail";
export default class OutwardDetail {
    constructor(outwardDetail?: IOutwardDetail) {
        const me = this;
        if (outwardDetail) {
            me.CodeProductOutWard = outwardDetail.CodeProductOutWard;
            me.NameProductOutWard = outwardDetail.NameProductOutWard;
            me.WarehouseProductOutWard = outwardDetail.WarehouseProductOutWard;
            me.UnitProductOutWard = outwardDetail.UnitProductOutWard;
            me.NumberProductOutWard = outwardDetail.NumberProductOutWard;
            me.UnitPriceOutWard = outwardDetail.UnitPriceOutWard;
            me.PaymentOutWard = outwardDetail.PaymentOutWard;
            me.PurchaseOutWard = outwardDetail.PurchaseOutWard;
            me.OutwardId = outwardDetail.OutwardId;
        }
        me.OutWardDetailId = Guid.NewGuid();
    }
    CodeProductOutWard?: string;
    NameProductOutWard?: string;
    WarehouseProductOutWard?: string;
    UnitProductOutWard?: string;
    NumberProductOutWard?: number;
    UnitPriceOutWard?: number;
    PaymentOutWard?: number;
    PurchaseOutWard?: number;
    OutwardId?: string;
    OutWardDetailId?: string;
}