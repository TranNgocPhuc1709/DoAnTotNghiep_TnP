export default interface IHome {
    TotalProceeds?: number; // Tổng tiền thu trong ngày (TTtn)
    TotalSell?: number; //Tổng tiền bán hàng (BH) 
    TotalAnother?: number; //Tổng thu khác (TK)
    TotalRevenue?: number; // Tổng doanh thu ước tính (DTut)
    NumberInvoiceCompleted?: number; // Số hóa đơn hoàn thành (số HĐht) 
    TotalInvoiceCompleted?: number; //Tổng tiền số hóa đơn hoàn thành (HĐht)
    NumberInvoiceStore?: number; // Số hóa đơn tại cửa hàng (số TCH)
    TotalNumberInvoiceStore?: number; //Tổng số tiền hóa đơn tại cửa hàng (TCH)
    TotalInvoiceStore?: number; // Tổng hóa đơn tại cửa hàng (HĐ)
}