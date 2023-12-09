import Guid from "@library-src/utilities/types/Guid";
import ITransferStock from "./ITransferStock";
export default class TransferStock {
    constructor(transferStock?: ITransferStock) {
        const me = this;
        if (transferStock) {
            me.ObjectTransfer = transferStock.ObjectTransfer;
            me.NameObjectTransfer = transferStock.NameObjectTransfer;
            me.VoteTransfer = transferStock.VoteTransfer;
            me.DateTransfer = transferStock.DateTransfer;
            me.NoteTransfer = transferStock.NoteTransfer;
            me.TotalQuantityTransfer = transferStock.TotalQuantityTransfer;
            me.TotalPriceTransfer = transferStock.TotalPriceTransfer;
        }
        me.TransferStockId = Guid.NewGuid();
    }
    ObjectTransfer?: string;
    NameObjectTransfer?: string;
    VoteTransfer?: string; // Số phiếu
    DateTransfer?: Date;
    NoteTransfer?: string; // Diễn giải
    TotalQuantityTransfer?: number; // Tổng số lượng
    TotalPriceTransfer?: number; // Tổng tiền
    TransferStockId?: string;
}