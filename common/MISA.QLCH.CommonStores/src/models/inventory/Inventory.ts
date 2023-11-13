import Guid from "@library-src/utilities/types/Guid";
import IInventory from "./IInventory";
export default class Inventory {
    constructor(inventory?: IInventory) {
        const me = this;
        if (inventory) {
            me.DateInventory = inventory.DateInventory;
            me.VotesInventory = inventory.VotesInventory;
            me.WarehouseInventory = inventory.WarehouseInventory;
            me.ExplantInventory = inventory.ExplantInventory;
            me.TotalBeginInventory = inventory.TotalBeginInventory;
            me.TotalUpdateInventory = inventory.TotalUpdateInventory;
            me.TotalEndInventory = inventory.TotalEndInventory;

        }
        me.InventoryId = Guid.NewGuid();
    }
    DateInventory?: Date;
    VotesInventory?: string;
    WarehouseInventory?: string;
    ExplantInventory?: string;
    TotalBeginInventory?: number;
    TotalUpdateInventory?: number;
    TotalEndInventory?: number;
    InventoryId?: string;



    //table-grid



}