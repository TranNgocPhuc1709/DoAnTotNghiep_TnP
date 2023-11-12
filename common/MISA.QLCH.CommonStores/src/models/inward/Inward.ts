import Guid from "@library-src/utilities/types/Guid";
import IInward from "./IInward";
export default class Inward {
    constructor(inward?: IInward) {
        const me = this;
        if (inward) {
            me.DayInward = inward.DayInward;
            me.VotesInward = inward.VotesInward;
            me.ObjectInward = inward.ObjectInward;
            me.TotalMoneyInward = inward.TotalMoneyInward;
            me.ExplantInward = inward.ExplantInward;
            me.DeliverInward = inward.DeliverInward;
            me.NameObjectInward = inward.NameObjectInward;
            me.TotalInward = inward.TotalInward;
            // me.InwardArray = me.InwardArray || [];

        }
        me.InwardId = Guid.NewGuid();


    }
    DayInward?: Date;
    VotesInward?: string;
    ObjectInward?: string;
    TotalMoneyInward?: number;
    ExplantInward?: string;
    DeliverInward?: string;
    NameObjectInward?: string;
    TotalInward?: string;
    InwardId?: string;
    // InwardArray?: Array<[]>;

    // table

    CodeProductInward?: string;
    NameProductInward?: string;
    WarehouseProductInward?: string;
    UnitProductInward?: string;
    NumberProductInward?: number;
    UnitPriceInward?: number;
    PaymentInward?: number;



}