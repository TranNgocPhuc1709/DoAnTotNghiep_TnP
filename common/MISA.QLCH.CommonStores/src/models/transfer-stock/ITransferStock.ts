export default interface ITransferStock {
    ObjectTransfer?: string;
    NameObjectTransfer?: string;
    VoteTransfer?: string; // Số phiếu
    DateTransfer?: Date;
    NoteTransfer?: string; // Diễn giải
    TotalQuantityTransfer?: number; // Tổng số lượng
    TotalPriceTransfer?: number; // Tổng tiền

}