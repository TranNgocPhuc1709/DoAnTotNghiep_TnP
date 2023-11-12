import Guid from "@library-src/utilities/types/Guid";
import IBank from "./IBank";
export default class Bank {
    constructor(bank?: IBank) {
        const me = this;
        if (bank) {
            me.CodeAccount = bank.CodeAccount;
            me.NameAccount = bank.NameAccount;
            me.OwnerAccount = bank.OwnerAccount;
            me.ExplainAccount = bank.ExplainAccount;
            me.StatusAccount = bank.StatusAccount;

        }
        me.BankId = Guid.NewGuid();
    }
    CodeAccount?: string;
    NameAccount?: string;
    OwnerAccount?: string;
    ExplainAccount?: string;
    StatusAccount?: string;
    BankId?: string;
}