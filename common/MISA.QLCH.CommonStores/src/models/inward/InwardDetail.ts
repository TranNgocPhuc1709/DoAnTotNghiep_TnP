import Guid from "@library-src/utilities/types/Guid";
import IInwardDetail from "./IInwardDetail";
export default class InwardDetail {
    constructor(inwardDetail?: IInwardDetail) {
        const me = this;
        if (inwardDetail) {
            me.CodeProductInward = inwardDetail.CodeProductInward;
            me.NameProductInward = inwardDetail.NameProductInward;
            me.WarehouseProductInward = inwardDetail.WarehouseProductInward;
            me.UnitProductInward = inwardDetail.UnitProductInward;
            me.NumberProductInward = inwardDetail.NumberProductInward;
            me.UnitPriceInward = inwardDetail.UnitPriceInward;
            me.PaymentInward = inwardDetail.PaymentInward;
            me.InwardId = inwardDetail.InwardId;

        }
        me.InwardDetailId = Guid.NewGuid();

    }
    CodeProductInward?: string;
    NameProductInward?: string;
    WarehouseProductInward?: string;
    UnitProductInward?: string;
    NumberProductInward?: number;
    UnitPriceInward?: number;
    PaymentInward?: number;
    InwardId?: string;
    InwardDetailId?: string;


}