export default interface IBill {
    DateBill?: string;
    NumberBill?: string;
    TotalMoneyBill?: number;
    numVoucherTotalPrice?: number
    collectedMoney?: number;
    refundDetail?: number;
    NoticeBill?: string;
    CustomerName?: string;

    SalesAgent?: string;
}