import Guid from "@library-src/utilities/types/Guid";
import IBankAccount from "./IBankAccount";
export default class BankAccount {
    constructor(bankAccount?: IBankAccount) {
        const me = this;
        if (bankAccount) {
            me.NameCardBank = bankAccount.NameCardBank;
            me.ExplainBank = bankAccount.ExplainBank;
            me.StatusBank = bankAccount.StatusBank;
        }
        me.BankId = Guid.NewGuid();
    }
    NameCardBank?: string;
    ExplainBank?: string;
    StatusBank?: string;
    BankId?: string;
}