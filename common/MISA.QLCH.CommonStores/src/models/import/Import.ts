import Guid from "@library-src/utilities/types/Guid";
import IImport from "./IImport";
export default class Import {
    constructor(importList?: IImport) {
        const me = this;
        if (importList) {
            me.DateImport = importList.DateImport;
            me.ReceiptNumberImport = importList.ReceiptNumberImport;
            me.SupplierImport = importList.SupplierImport;
            me.IntoMoneyImport = importList.IntoMoneyImport;
            me.StaffImport = importList.StaffImport;
            me.ExplainImport = importList.ExplainImport;
            me.SupplierNameImport = importList.SupplierNameImport;
            me.StaffNameImport = importList.StaffNameImport;
            me.DeliverImport = importList.DeliverImport;
            me.TotalImport = importList.TotalImport;
            me.ReceiverImport = importList.ReceiverImport;
            me.AddressImport = importList.AddressImport;
            me.ReasonImport = importList.ReasonImport;
            me.VotesImport = importList.VotesImport;
            me.VotesDateImport = importList.VotesDateImport;
            me.TotalPaymentImport = importList.TotalPaymentImport;

        }
        me.ImportId = Guid.NewGuid();
    }
    DateImport?: Date;
    ReceiptNumberImport?: string;
    SupplierImport?: string;
    IntoMoneyImport?: number;
    StaffImport?: string;
    ExplainImport?: string;
    SupplierNameImport?: string;
    StaffNameImport?: string;
    DeliverImport?: string;
    TotalImport?: number;
    ReceiverImport?: string;
    AddressImport?: string;
    ReasonImport?: string;
    VotesImport?: string;
    VotesDateImport?: Date;
    TotalPaymentImport?: number;
    ImportId?: string;

}