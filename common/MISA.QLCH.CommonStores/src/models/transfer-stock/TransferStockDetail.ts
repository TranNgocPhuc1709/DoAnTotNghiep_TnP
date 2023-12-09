import Guid from "@library-src/utilities/types/Guid";
import ITransferStockDetail from "./ITransferStockDetail";
export default class TransferStockDetail {
    constructor(transferStockDetail?: ITransferStockDetail) {
        const me = this;
        if (transferStockDetail) {
            me.CodeProductTransfer = transferStockDetail.CodeProductTransfer;
            me.NameProductTransfer = transferStockDetail.NameProductTransfer;
            me.UnitTransfer = transferStockDetail.UnitTransfer;
            me.WareHouseExportTransfer = transferStockDetail.WareHouseExportTransfer;
            me.WareHouseImportTransfer = transferStockDetail.WareHouseImportTransfer;
            me.QuantityTransfer = transferStockDetail.QuantityTransfer;
            me.UnitPriceProduct = transferStockDetail.UnitPriceProduct;
            me.IntoMoneyProduct = transferStockDetail.IntoMoneyProduct;
            me.TransferStockId = transferStockDetail.TransferStockId;


        }
        me.TransferStockDetailId = Guid.NewGuid();
    }
    CodeProductTransfer?: string; //Mã sản phẩm
    NameProductTransfer?: string; // Tên sản phẩm
    UnitTransfer?: string; // Đơn vị tính
    WareHouseExportTransfer?: string; // Kho xuất
    WareHouseImportTransfer?: string; //Kho nhập
    QuantityTransfer?: number // Số lượng
    UnitPriceProduct?: number; // Đơn giá
    IntoMoneyProduct?: number; // Thành tiền
    TransferStockId?: string; // Khoá phụ
    TransferStockDetailId?: string; // Khóa chính
}