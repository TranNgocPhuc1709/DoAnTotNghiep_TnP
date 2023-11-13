import Guid from "@library-src/utilities/types/Guid";
import IReturn from "./IReturn";
export default class Return {
    constructor(returnItem?: IReturn) {
        const me = this;
        if (returnItem) {
            me.DateReturn = returnItem.DateReturn;
            me.BillNumberReturn = returnItem.BillNumberReturn;
            me.SupplierReturn = returnItem.SupplierReturn;
            me.TotalMoneyReturn = returnItem.TotalMoneyReturn;
            me.ExplantReturn = returnItem.ExplantReturn;
            me.NameSupplierReturn = returnItem.NameSupplierReturn;
            me.ReceiverReturn = returnItem.ReceiverReturn;
            me.AddressSupplierReturn = returnItem.AddressSupplierReturn;
            me.TotalQuantityReturn = returnItem.TotalQuantityReturn;
            me.ReasonReturn = returnItem.ReasonReturn;
            me.RevenueOfficerReturn = returnItem.RevenueOfficerReturn;
            me.RevenueOfficerNameReturn = returnItem.RevenueOfficerNameReturn;
            me.ReceiptNumberReturn = returnItem.ReceiptNumberReturn;
            me.CollectionDateReturn = returnItem.CollectionDateReturn;

        }
        me.ReturnId = Guid.NewGuid();
    }
    DateReturn?: Date;
    BillNumberReturn?: string;
    SupplierReturn?: string
    TotalMoneyReturn?: number;
    ExplantReturn?: string;
    NameSupplierReturn?: string;
    ReceiverReturn?: string;
    AddressSupplierReturn?: string;
    TotalQuantityReturn?: number;
    ReasonReturn?: string;
    RevenueOfficerReturn?: string;
    RevenueOfficerNameReturn?: string;
    ReceiptNumberReturn?: string;
    CollectionDateReturn?: Date;
    ReturnId?: string;


    //Grid
    CodeProductReturn?: string;
    NameProductReturn?: string;
    WarehouseProductReturn?: string;
    UnitProductReturn?: string;
    NumberProductReturn?: string;
    UnitPriceReturn?: number;
    PaymentReturn?: number;
}