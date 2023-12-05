import Guid from "@library-src/utilities/types/Guid";
import ICustomer from "./ICustomer";
export default class Customer {
    constructor(customer?: ICustomer) {
        const me = this;
        if (customer) {
            me.CodeCustomer = customer.CodeCustomer;
            me.NameCustomer = customer.NameCustomer;
            me.TelephoneCustomer = customer.TelephoneCustomer;
            me.EmailCustomer = customer.EmailCustomer;
            me.AddressCustomer = customer.AddressCustomer;
            me.DateBirthCustomer = customer.DateBirthCustomer;
            me.CustomerGroupList = customer.CustomerGroupList;
            me.CodeEmployeeCustomer = customer.CodeEmployeeCustomer;
            me.NameEmployeeCustomer = customer.NameEmployeeCustomer;
            me.AttentionCustomer = customer.AttentionCustomer;
            me.GenderCustomer = customer.GenderCustomer;
        }
        me.CustomerId = Guid.NewGuid();
    }
    CodeCustomer?: string;
    NameCustomer?: string;
    TelephoneCustomer?: string;
    EmailCustomer?: string;
    AddressCustomer?: string;
    DateBirthCustomer?: Date;
    CustomerGroupList?: string;
    CodeEmployeeCustomer?: string;
    NameEmployeeCustomer?: string;
    AttentionCustomer?: string;
    GenderCustomer?: string;
    CustomerId?: string;
}