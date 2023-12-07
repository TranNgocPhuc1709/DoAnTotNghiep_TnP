import Guid from "@library-src/utilities/types/Guid";
import IProduct from "./IProduct";
export default class Product {


    constructor(product?: IProduct) {
        const me = this;
        if (product) {
            me.CodeProductList = product.CodeProductList;
            me.NameProductList = product.NameProductList;
            me.GroupProductList = product.GroupProductList;
            me.UnitProductList = product.UnitProductList;
            me.PurchasePriceProductList = product.PurchasePriceProductList;
            me.ShowDisplayProduct = product.ShowDisplayProduct;
            me.ProductInventory = product.ProductInventory;
            // me.ProductMinInventory = product.ProductMinInventory;
            // me.ProductMaxInventory = product.ProductMaxInventory;
            me.PriceProductList = product.PriceProductList;
            me.StatusProductList = product.StatusProductList;
        }
        me.ProductId = Guid.NewGuid();
    }
    CodeProductList?: string;
    NameProductList?: string;
    GroupProductList?: string;
    UnitProductList?: string;
    PurchasePriceProductList?: number;
    ShowDisplayProduct?: string;
    ProductInventory?: number;
    // ProductMinInventory?: number;
    // ProductMaxInventory?: number;
    PriceProductList?: number;
    StatusProductList?: string;
    ProductId?: string;
}