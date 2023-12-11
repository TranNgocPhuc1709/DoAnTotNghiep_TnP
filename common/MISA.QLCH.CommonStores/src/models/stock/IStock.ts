export default interface IStock {
    CodeProductStock?: string;
    NameProductStock?: string;
    UnitProductStock?: string;
    GroupProductStock?: string;
    PriceProductStock?: number;
    InventoryNumberStock?: number;

    TotalInward?: number; //Tổng nhập kho
    TotalOutward?: number; // Tổng xuất kho
}