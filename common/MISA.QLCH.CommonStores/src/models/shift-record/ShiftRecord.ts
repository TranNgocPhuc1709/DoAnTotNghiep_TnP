import IShiftRecord from "./IShiftRecord";
import Guid from '@library-src/utilities/types/Guid';
export default class ShiftRecord {
    /**
     *
     */
    constructor(shiftRecord?: IShiftRecord) {
        const me = this;
        if (shiftRecord) {
            me.ShiftName = shiftRecord.ShiftName;
            me.ShiftTimeStart = shiftRecord.ShiftTimeStart;
            me.ShiftTimeStartEnd = shiftRecord.ShiftTimeStartEnd;
            me.ShiftStatus = shiftRecord.ShiftStatus;
        }
        me.shiftId = Guid.NewGuid();
    }

    /**
     * Giá trị các giá trị của bảng
     */
    ShiftName?: string;
    ShiftTimeStart?: string;
    ShiftTimeStartEnd?: string;
    ShiftStatus?: string;
    shiftId?: string;

}