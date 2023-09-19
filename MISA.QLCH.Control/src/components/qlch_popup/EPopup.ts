import Guid from "@library-src/utilities/types/Guid";

export default class EPopup {
    /**
     *
     */
    constructor() {
        const me = this;
        me.id = `qlch-detail-form-` + Guid.NewGuid();
        me.idParent = `qlch-parent-detail-form-` + Guid.NewGuid();
    }


    id: string = "qlch-detail-form";

    idParent: string = "qlch-parent-detail-form";

    /**
     * Trạng thái có đang di chuyển form theo vị trí con chuột không?
     */
    formMove?: boolean;

    /**
     * Vị trí bắt đầu con trỏ khi thay đổi vị trí của form (trên trục X)
     */
    startX: number = 0;

    /**
     * Vị trí bắt đầu con trỏ khi thay đổi vị trí của form (trên trục Y)
     */
    startY: number = 0;

    /**
     * Vị trí trục Y ban đầu của form
     */
    startTop: number = 0;

    /**
     * Vị trí trục X ban đầu của form
     */
    startLeft: number = 0;

    /**
     * Chiều cao form ban đầu
     */
    originalHeight: number = 0;

    /**
     * Độ rộng form ban đầu
     */
    originalWidth: number = 0;

    /**
     * Vị trí Top form ban đầu
     */
    originalTopLocation: number = 0;

    /**
     * vị trí left form ban đầu
     */
    originalLeftLocation: number = 0;

    /**
     * Có phải trạng thái hiện thị là popup fill không
     */
    isPopupFill: boolean = false;

}