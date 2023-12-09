import Guid from "@library-src/utilities/types/Guid";
import IOutward from "./IOutward";
export default class Outward {
    constructor(outwardItem?: IOutward) {
        const me = this;
        if (outwardItem) {
            me.DayOutward = outwardItem.DayOutward;
            me.DeliveryOutward = outwardItem.DeliveryOutward;
            me.ObjectOutward = outwardItem.ObjectOutward;
            me.TotalMoneyOutward = outwardItem.TotalMoneyOutward;
            me.ExplainOutward = outwardItem.ExplainOutward;
            me.DeliverOutward = outwardItem.DeliverOutward;
            me.ObjectNameOutward = outwardItem.ObjectNameOutward;
            me.TotalQuantityOutward = outwardItem.TotalQuantityOutward;
            me.OutwardId = outwardItem.OutwardId;

        }
        else {
            me.OutwardId = Guid.NewGuid();
        }
    }
    DayOutward?: Date;
    DeliveryOutward?: string;
    ObjectOutward?: string;
    TotalMoneyOutward?: number;
    ExplainOutward?: string;
    DeliverOutward?: string;
    ObjectNameOutward?: string;
    TotalQuantityOutward?: string;
    OutwardId?: string;

    //Grid-table
    // CodeProductOutWard?: string;
    // NameProductOutWard?: string;
    // WarehouseProductOutWard?: string;
    // UnitProductOutWard?: string;
    // NumberProductOutWard?: string;
    // UnitPriceOutWard?: number;
    // PaymentOutWard?: number;

}