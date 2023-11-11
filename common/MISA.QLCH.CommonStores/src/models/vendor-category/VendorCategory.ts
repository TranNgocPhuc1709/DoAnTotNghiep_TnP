import Guid from "@library-src/utilities/types/Guid";
import IVendorCategory from "./IVendorCategory";
export default class VendorCategory {
    /**
     *
     */
    constructor(vendorCategory?: IVendorCategory) {
        const me = this;
        if (vendorCategory) {
            me.CodeVendorCategory = vendorCategory.CodeVendorCategory;
            me.NameVendorCategory = vendorCategory.NameVendorCategory;
            me.DescribeVendorCategory = vendorCategory.DescribeVendorCategory;
            me.StatusVendorCategory = vendorCategory.StatusVendorCategory;

        }
        me.VendorCategoryId = Guid.NewGuid();
    }

    /**
     * Giá trị các giá trị của bảng
     */
    CodeVendorCategory?: string;
    NameVendorCategory?: string;
    DescribeVendorCategory?: string;
    StatusVendorCategory?: string;
    VendorCategoryId?: string;

}