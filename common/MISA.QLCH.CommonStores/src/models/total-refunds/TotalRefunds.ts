import Guid from "@library-src/utilities/types/Guid";
import ITotalRefunds from "./ITotalRefunds";
export default class TotalRefunds {
    constructor(totalRefunds?: ITotalRefunds) {
        const me = this;
        if (totalRefunds) {
            me.refundDetail = totalRefunds.refundDetail
        }
        me.TotalRefundsId = Guid.NewGuid();
    }
    refundDetail?: number;
    TotalRefundsId?: string;
}