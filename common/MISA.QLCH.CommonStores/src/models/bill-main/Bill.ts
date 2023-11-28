import Guid from "@library-src/utilities/types/Guid";
import IBill from "./IBill";
export default class Bill {
    constructor(billItem?: IBill) {
        const me = this;
        if (billItem) {
            me.TotalMoneyBill = billItem.TotalMoneyBill
        }
        me.BillId = Guid.NewGuid();
    }
    TotalMoneyBill?: number;
    BillId?: string;
}