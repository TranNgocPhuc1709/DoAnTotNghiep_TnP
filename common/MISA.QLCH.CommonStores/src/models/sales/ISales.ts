export default interface ISales {
    DateSales?: Date; //Ngày
    TimeSales?: string; //Giờ đặt hàng
    BillNumberSales?: number; //Số đơn hàng
    TotalBillSales?: number; //Tổng tiền
    GoodsMoneySales?: number;//Tiền Hàng
    MoneyPromotionSales?: number; // Khuyến mại
    SalesAgent?: string //Người bán hàng
    NoticeSales?: string; //Chú ý

    //customer
    NameCustomerSales?: string;
    PhoneCustomerSales?: number;
    AddressCustomerSales?: string;

    //footer-bill
    MoneyPaidSales?: number;
    RefundsSales?: number;


}