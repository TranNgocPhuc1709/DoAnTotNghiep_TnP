import Guid from "@library-src/utilities/types/Guid";
import IImportDetail from "./IImportDetail";
export default class ImportDetail {
    constructor(importDetail?: IImportDetail) {
        const me = this;
        if (importDetail) {
            me.CodeProductImport = importDetail.CodeProductImport;
            me.NameProductImport = importDetail.NameProductImport;
            me.WarehouseProductImport = importDetail.WarehouseProductImport;
            me.UnitProductImport = importDetail.UnitProductImport;
            me.NumberProductImport = importDetail.NumberProductImport;
            me.UnitPriceImport = importDetail.UnitPriceImport;
            me.PaymentImport = importDetail.PaymentImport;
            me.ImportId = importDetail.ImportId;
        }
        me.ImportDetailId = Guid.NewGuid();
    }
    CodeProductImport?: string;
    NameProductImport?: string;
    WarehouseProductImport?: string;
    UnitProductImport?: string;
    NumberProductImport?: number;
    UnitPriceImport?: number;
    PaymentImport?: number;
    ImportDetailId?: string;
    ImportId?: string;
}