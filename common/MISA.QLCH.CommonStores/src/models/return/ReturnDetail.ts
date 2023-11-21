import Guid from "@library-src/utilities/types/Guid";
import IReturnDetail from "./IReturnDetail";
export default class ReturnDetail {
    constructor(returnDetail?: IReturnDetail) {
        const me = this;
        if (returnDetail) {
            me.CodeProductReturn = returnDetail.CodeProductReturn;
            me.NameProductReturn = returnDetail.NameProductReturn;
            me.WarehouseProductReturn = returnDetail.WarehouseProductReturn;
            me.UnitProductReturn = returnDetail.UnitProductReturn;
            me.NumberProductReturn = returnDetail.NumberProductReturn;
            me.UnitPriceReturn = returnDetail.UnitPriceReturn;
            me.PaymentReturn = returnDetail.PaymentReturn;
            me.ReturnId = returnDetail.ReturnId;

        }
        me.ReturnDetailId = Guid.NewGuid();
    }
    CodeProductReturn?: string;
    NameProductReturn?: string;
    WarehouseProductReturn?: string;
    UnitProductReturn?: string;
    NumberProductReturn?: number;
    UnitPriceReturn?: number;
    PaymentReturn?: number;
    ReturnId?: string;
    ReturnDetailId?: string;
}