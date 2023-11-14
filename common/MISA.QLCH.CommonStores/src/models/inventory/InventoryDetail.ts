import Guid from "@library-src/utilities/types/Guid";
import IInventoryDetail from "./IInventoryDetail";
export default class InventoryDetail {
    constructor(inventoryDetail?: IInventoryDetail) {
        const me = this;
        if (inventoryDetail) {
            me.CodeProductInventory = inventoryDetail.CodeProductInventory;
            me.NameProductInventory = inventoryDetail.NameProductInventory;
            me.UnitProductInventory = inventoryDetail.UnitProductInventory;
            me.BeginInventory = inventoryDetail.BeginInventory;
            me.UpdateInventory = inventoryDetail.UpdateInventory;
            me.EndInventory = inventoryDetail.EndInventory;
            me.ReasonInventory = inventoryDetail.ReasonInventory;
            me.StatusInventory = inventoryDetail.StatusInventory;
            me.InventoryId = inventoryDetail.InventoryId;
        }
        me.InventoryDetailId = Guid.NewGuid();
    }
    CodeProductInventory?: string;
    NameProductInventory?: string;
    UnitProductInventory?: string;
    BeginInventory?: number;
    UpdateInventory?: number;
    EndInventory?: number;
    ReasonInventory?: string;
    StatusInventory?: string;
    InventoryDetailId?: string;
    InventoryId?: string;
}