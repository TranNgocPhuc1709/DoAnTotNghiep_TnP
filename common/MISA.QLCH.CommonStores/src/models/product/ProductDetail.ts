import Guid from "@library-src/utilities/types/Guid";
import IProductDetail from "./IProductDetail";
export default class ProductDetail {
    [x: string]: any;
    constructor(productList?: IProductDetail) {
        const me = this;
        if (productList) {
            me.NumberProductList = productList.NumberProductList;
            me.CodeProductList = productList.CodeProductList;
            me.NameProductList = productList.NameProductList;
            me.QuantityProductList = productList.QuantityProductList;
            me.UnitProductList = productList.UnitProductList;
            me.PriceProductList = productList.PriceProductList;
            me.TotalProductList = productList.TotalProductList;
            me.BillId = productList.BillId;
            me.ProductId = productList.ProductId;
        }
        me.ProductDetailId = Guid.NewGuid();


    }
    NumberProductList?: number;
    CodeProductList?: string;
    NameProductList?: string;
    QuantityProductList?: number;
    UnitProductList?: string;
    PriceProductList?: number;
    TotalProductList?: number;
    ProductId?: string;
    ProductDetailId?: string;
    BillId?: string;
}