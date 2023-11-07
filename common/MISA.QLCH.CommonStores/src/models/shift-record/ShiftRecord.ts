import IShiftRecord from "./IShiftRecord";

export default class ShiftRecord {
    /**
     *
     */
    constructor(shiftRecord?: IShiftRecord) {
        if (shiftRecord) {
            const me = this;
            me.ShiftName = shiftRecord.ShiftName;
            me.ShiftTimeStart = shiftRecord.ShiftTimeStart;
            me.ShiftTimeStartEnd = shiftRecord.ShiftTimeStartEnd;
            me.ShiftStatus = shiftRecord.ShiftStatus;
        }
    }

    /**
     * Giá trị các giá trị của bảng
     */
    ShiftName?: string;
    ShiftTimeStart?: string;
    ShiftTimeStartEnd?: string;
    ShiftStatus?: string;

}