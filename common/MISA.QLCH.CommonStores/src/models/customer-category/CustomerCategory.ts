import ICustomerCategory from "./ICustomerCategory";
import Guid from '@library-src/utilities/types/Guid';
export default class CustomerCategory {
    /**
     *
     */
    constructor(customerCategory?: ICustomerCategory) {
        const me = this;
        if (customerCategory) {
            me.CodeCustomerCategory = customerCategory.CodeCustomerCategory;
            me.NameCustomerCategory = customerCategory.NameCustomerCategory;
            me.DescribeCustomerCategory = customerCategory.DescribeCustomerCategory;
            me.StatusCustomerCategory = customerCategory.StatusCustomerCategory;
        }
        me.CustomerCategoryId = Guid.NewGuid();
    }

    /**
     * Giá trị các giá trị của bảng
     */
    CodeCustomerCategory?: string;
    NameCustomerCategory?: string;
    DescribeCustomerCategory?: string;
    StatusCustomerCategory?: string;
    CustomerCategoryId?: string;

}