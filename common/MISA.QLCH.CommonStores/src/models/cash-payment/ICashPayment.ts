export default interface ICashPayment {
    DateCashPayment?: Date;
    CodeCashPayment?: string;
    TotalCashPayment?: number;
    NameObjectCashPayment?: string;
    ReasonCashPayment?: string;
    ObjectCashPayment?: string;
    ReceiverCashPayment?: string;
    AddressCashPayment?: string;
    StaffCashPayment?: string;
    NameStaffCashPayment?: string;
    IncludedCashPayment?: boolean;


    //Grid Table
    ExplainCashPayment?: string;
    MoneyCashPayment?: number;
}