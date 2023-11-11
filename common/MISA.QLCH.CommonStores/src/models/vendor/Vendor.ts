import Guid from "@library-src/utilities/types/Guid";
import IVendor from "./IVendor";
export default class Vendor {
    constructor(vendor?: IVendor) {
        const me = this;
        if (vendor) {
            me.CodeVendor = vendor.CodeVendor;
            me.NameVendor = vendor.NameVendor;
            me.GroupVendor = vendor.GroupVendor;
            me.TelephoneVendor = vendor.TelephoneVendor;
            me.AddressVendor = vendor.AddressVendor;
            me.FullNameVendor = vendor.FullNameVendor;
            me.EmailVendor = vendor.EmailVendor;
            me.PhoneContactVendor = vendor.PhoneContactVendor;
            me.TitleVendor = vendor.TitleVendor;
            me.AddressItemVendor = vendor.AddressItemVendor;
            me.StatusVendor = vendor.StatusVendor;
        }
        me.VendorId = Guid.NewGuid();
    }

    /**
     * Giá trị các giá trị của bảng
     */
    CodeVendor?: string;
    NameVendor?: string;
    GroupVendor?: string;
    TelephoneVendor?: number;
    AddressVendor?: string;
    FullNameVendor?: string;
    EmailVendor?: string;
    PhoneContactVendor?: number;
    TitleVendor?: string;
    AddressItemVendor?: string;
    StatusVendor?: string;
    VendorId?: string;
}