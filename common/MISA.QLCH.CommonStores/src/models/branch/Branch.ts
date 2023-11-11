import Guid from "@library-src/utilities/types/Guid";
import IBranch from "./IBranch";
export default class Branch {
    constructor(branch?: IBranch) {
        const me = this;
        if (branch) {
            me.CodeBranch = branch.CodeBranch;
            me.NameBranch = branch.NameBranch;
            me.AddressBranch = branch.AddressBranch;
            me.PhoneBranch = branch.PhoneBranch;
            me.StatusBranch = branch.StatusBranch;
        }
        me.BranchId = Guid.NewGuid();
    }
    CodeBranch?: string;
    NameBranch?: string;
    AddressBranch?: string;
    PhoneBranch?: string;
    StatusBranch?: string;
    BranchId?: string;
}