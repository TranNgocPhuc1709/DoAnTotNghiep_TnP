import IUnit from "./IUnit";
import Guid from '@library-src/utilities/types/Guid';
export default class Unit {
    /**
     *
     */
    constructor(unit?: IUnit) {
        const me = this;
        if (unit) {
            me.CodeUnitList = unit.CodeUnitList;
            me.ExplainUnitList = unit.ExplainUnitList;
            me.StatusUnitList = unit.StatusUnitList;
        }
        me.unitId = Guid.NewGuid();
    }

    /**
     * Giá trị các giá trị của bảng
     */
    CodeUnitList?: string;
    ExplainUnitList?: string;
    StatusUnitList?: string;
    unitId?: string;

}