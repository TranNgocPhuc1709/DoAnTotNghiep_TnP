export default interface IBillDetail {
    CodeProductBill?: string;
    NameProductBill?: string;
    UnitProductBill?: string;
    QuantityBill?: number;
    UnitPriceBill?: number;
    IntoMoneyBill?: number;
    PurchaseBill?: number; // Giá mua
    IntoPurchaseMoneyBill?: number; //Tổng tiền giá mua
    Inventory?: number; //Kho
    BillId?: string;
}