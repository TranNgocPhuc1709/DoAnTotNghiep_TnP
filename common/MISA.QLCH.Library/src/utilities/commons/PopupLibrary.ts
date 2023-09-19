
import { Component, createApp } from 'vue';
import Guid from '@library-src/utilities/types/Guid';
import ElementLibrary from '@library-src/utilities/commons/ElementLibrary';
import Constant from '@library-src/utilities/constants/Constant';

export default class PopupLibrary {
    /**
     * Function tạo popup bất kỳ
     * @param component: Component cần khởi tạo
     * @param props : Tham số props cho component
     * tnduc - 19.09.2023 
     */
    public static createPopup(component: Component, props: Record<string, any>) {
        const app = ElementLibrary.getAppIdSelector();
        const content: HTMLElement = ElementLibrary.createElement('div');
        const idContent = `qlch-body-detail-${Guid.NewGuid()}`;
        content.setAttribute("id", idContent);
        content.setAttribute("class", "qlch-bg-detail d-flex");
        props['idRoot'] = idContent;
        if (content && app) {
            app.appendChild(content);
            if (component) {
                const frmDetail = createApp(component, props);
                if (frmDetail) {
                    frmDetail.mount(content);
                    ElementLibrary.setDisableTabIndexBy(app);
                    ElementLibrary.setEnableTabIndexBy(content);
                    ElementLibrary.addClassForElement(app, 'prevent-select');
                    ElementLibrary.removeClassForAllChildElement(app, 'allow-select');
                    ElementLibrary.addClassForElement(content, 'allow-select');
                    // ElementLibrary.setFocusDefault(content);
                }
            }
        }
    }

    /**
     * Tạo màn đen che parent khi show popup
     * @param idDom 
     * tnduc - 19.09.2023 
     */
    public static createNewMask(idDom: string) {
        const me = this;
        const frmDetail = ElementLibrary.getElementById(idDom);
        const frmParent = ElementLibrary.getAppIdSelector();
        let maskElement = ElementLibrary.getMaskIdSelector();

        if (!frmDetail || !frmParent) {
            return;
        }

        me.createZIndexFormDetail(frmDetail, frmParent);

        if (!maskElement) {
            maskElement = ElementLibrary.createNewMask();
        }

        if (maskElement) {
            me.setNewZIndexNewMask(maskElement, frmDetail, frmParent, 0);
        }
    }

    /**
     * đóng popup
     * @param idDom 
     * tnduc - 19.09.2023 
     */
    public static closePopup(idDom: string) {
        const me = this;
        const frmParent = ElementLibrary.getAppIdSelector();
        const frmDetail = ElementLibrary.getElementById(idDom);
        if (frmParent && frmDetail) {
            const mask = ElementLibrary.getMaskIdSelector();
            if (mask) {
                me.setNewZIndexNewMask(mask, frmDetail, frmParent, 1000);
            }
            frmParent.removeChild(frmDetail);
            me.setActiveSelectedAndTabIndexInLastedChild(frmParent);
        }
    }

    /**
     * Set lại trạng thái cho phép người dùng ân tab và bôi đên text trên form là con có tab index lớn nhất
     * tnduc - 19.09.2023 
     */
    private static setActiveSelectedAndTabIndexInLastedChild(frmParent: HTMLElement) {
        // const me = this;
        const elementLasted = ElementLibrary.getElementHasMaxValueNumberStyleBy(frmParent, "zIndex");
        if (elementLasted) {
            ElementLibrary.setEnableTabIndexBy(elementLasted);
            ElementLibrary.removeClassForElement(elementLasted, 'prevent-select');
            ElementLibrary.addClassForElement(elementLasted, 'allow-select');
            // ElementLibrary.setFocusDefault(elementLasted);
        }
    }


    /**
     * Set lại z-index cho các formDetail
     * @param frmDetail 
     * @param frmParent
     * tnduc - 19.09.2023 
     */
    private static createZIndexFormDetail(frmDetail: HTMLElement, frmParent: HTMLElement) {
        const allChild = ElementLibrary.getAllNodeChildBy(frmParent);
        if (allChild && allChild.length > 0) {
            let zIndexFrmDetail = null;
            let indexElementDivDetail = 0;
            for (let index = 0; index < allChild.length; index++) {
                const frm = allChild[index] as Element;
                if (frm) {
                    if (frm.id === Constant.qlchMaskId) {
                        continue;
                    }
                    const zIndex = (indexElementDivDetail + 1) * 1000;
                    frm.setAttribute("style", "z-index: " + zIndex);
                    if (frm.id === frmDetail.id) {
                        zIndexFrmDetail = zIndex;
                    }
                    indexElementDivDetail++;
                }
            };
            return zIndexFrmDetail;
        }

        return null

    }

    /**
     * Set z-index cho mask
     * tnduc - 19.09.2023 
     */
    private static setNewZIndexNewMask(mask: HTMLElement, frmDetail: HTMLElement, frmParent: HTMLElement, minusMore: number) {
        const me = this;
        let zIndexFrmDetail: number | null = +frmDetail.style.zIndex;

        if (!zIndexFrmDetail) {
            zIndexFrmDetail = me.createZIndexFormDetail(frmDetail, frmParent);
        }

        if (zIndexFrmDetail) {
            let zIndexMask = +zIndexFrmDetail - 500 - minusMore;
            zIndexMask = zIndexMask <= 500 ? -1 : zIndexMask;
            mask.setAttribute("style", "z-index: " + zIndexMask);
        }
    }
}