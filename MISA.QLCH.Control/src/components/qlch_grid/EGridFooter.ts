import Log from "@library-src/utilities/Log";
import IEGridFooter from "./IEGridFooter";

export default class EGridFooter {
    /**
     * Create Constructor
     */
    constructor(gridFooter?: IEGridFooter) {
        const me = this;
        if (gridFooter) {
            if (gridFooter.totalRecord) {
                me.totalRecord = gridFooter.totalRecord;
            }
            if (gridFooter.totalPage) {
                me.totalPage = gridFooter.totalPage;
            }
            if (gridFooter.start) {
                me.start = gridFooter.start;
            }
            if (gridFooter.end) {
                me.end = gridFooter.end;
            }
            if (gridFooter.pageActive) {
                me.pageActive = gridFooter.pageActive;
            }
            if (gridFooter.limit) {
                me.limit = gridFooter.limit;
            }

        }
    };
    /**
     * Tổng số bản ghi
     */
    _totalRecord: number | undefined = 0;
    get totalRecord(): number | undefined {
        return this._totalRecord;
    }

    set totalRecord(totalRecord: number | undefined) {
        const me = this;
        me._totalRecord = totalRecord;
        me.calcInfoDataWhenChange(totalRecord ?? 0);
    }

    /**
     * Tổng số trang được tính toán lại
     */
    totalPage: number = 0;

    /**
     * Record bắt đầu
     */
    start: number = 0;

    /**
     * Record kết thúc
     */
    end: number = 0;

    /**
     * Page đang active
     */
    pageActive: number = 1;

    /**
     * Giới hạn 1 trang
     */
    limit?: number = 15;


    /**
     * tính toán lại các thông tin liên quan dựa vào thanh phần total Record
     * tnphuc - 2022.08.03
     */
    calcInfoDataWhenChange(totalRecord: number) {
        try {
            const limit = this.limit ?? 1;
            this.totalPage = Math.floor(totalRecord / limit) + 1;

            const totalPage = this.totalPage ?? 0;
            if (this.pageActive) {
                const myPageActive = +this.pageActive ?? 1;
                this.start = limit * (myPageActive - 1) + 1;
                if (+this.pageActive <= totalPage) {
                    this.end = (limit * myPageActive) >= totalRecord ? totalRecord : (limit * myPageActive);
                } else {
                    this.end = limit * myPageActive
                }
            }
        } catch (error) {
            Log.ErrorLog(error as Error);
        }
    }
}