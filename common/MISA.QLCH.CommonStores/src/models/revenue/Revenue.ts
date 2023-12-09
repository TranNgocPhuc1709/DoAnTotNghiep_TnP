import Guid from "@library-src/utilities/types/Guid";
import IRevenue from "./IRevenue";
export default class Revenue {
    constructor(revenue?: IRevenue) {
        const me = this;
        if (revenue) {
            me.DayRevenue = revenue.DayRevenue;
            me.NumberRevenue = revenue.NumberRevenue;
            me.TypeRevenue = revenue.TypeRevenue;
            me.ReceivedRevenue = revenue.ReceivedRevenue;
            me.SpendingRevenue = revenue.SpendingRevenue;
            me.SalesRevenue = revenue.SalesRevenue;
            me.NoteRevenue = revenue.NoteRevenue;


        }
        me.RevenueId = Guid.NewGuid();
    }
    DayRevenue?: string; // Ngày
    NumberRevenue?: string; // Số
    TypeRevenue?: string; // Kiểu
    ReceivedRevenue?: number; //Tiền thu
    SpendingRevenue?: number; // Tiền chi
    SalesRevenue?: string; // Nhân viên thu chi
    NoteRevenue?: string; // Diễn Giải

    RevenueId?: string;
}