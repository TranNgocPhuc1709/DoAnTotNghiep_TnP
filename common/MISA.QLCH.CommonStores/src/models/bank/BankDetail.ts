import Guid from "@library-src/utilities/types/Guid";
import IBankDetail from "./IBankDetail";
export default class BankDetail {
    constructor(bankDetail: IBankDetail) {
        const me = this;
        if (bankDetail) {
            me.CodeAccountDetail = bankDetail.CodeAccountDetail;
            me.NameAccountDetail = bankDetail.NameAccountDetail;
            me.BankId = bankDetail.BankId;

        }
        me.BankDetailId = Guid.NewGuid();
    }
    NameAccountDetail?: string
    CodeAccountDetail?: string
    BankId?: string
    BankDetailId?: string
}