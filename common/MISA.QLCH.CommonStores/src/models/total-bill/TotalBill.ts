import Guid from "@library-src/utilities/types/Guid";
import ITotalBill from "./ITotalBill";
export default class TotalBill {
    constructor(totalBill?: ITotalBill) {
        const me = this;
        if (totalBill) {
            me.collectedMoney = totalBill.collectedMoney;
        }
        me.TotalBillId = Guid.NewGuid();
    }
    collectedMoney?: number;
    TotalBillId?: string;
}