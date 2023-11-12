export default interface IInward {
    DayInward?: Date;
    VotesInward?: string;
    ObjectInward?: string;
    TotalMoneyInward?: number;
    ExplantInward?: string;
    DeliverInward?: string;
    NameObjectInward?: string;
    TotalInward?: string;


    // table

    CodeProductInward?: string;
    NameProductInward?: string;
    WarehouseProductInward?: string;
    UnitProductInward?: string;
    NumberProductInward?: number;
    UnitPriceInward?: number;
    PaymentInward?: number;

    //Array
    InwardArray?: Array<[]>;
}