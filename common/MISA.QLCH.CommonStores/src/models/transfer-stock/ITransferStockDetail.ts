export default interface ITransferStockDetail {
    CodeProductTransfer?: string; //Mã sản phẩm
    NameProductTransfer?: string; // Tên sản phẩm
    UnitTransfer?: string; // Đơn vị tính
    WareHouseExportTransfer?: string; // Kho xuất
    WareHouseImportTransfer?: string; //Kho nhập
    QuantityTransfer?: number // Số lượng
    UnitPriceProduct?: number; // Đơn giá
    IntoMoneyProduct?: number; // Thành tiền
    TransferStockId?: string; // Khoá phụ


}