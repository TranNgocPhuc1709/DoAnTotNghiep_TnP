import Constant from "../constants/Constant";

export default class ElementLibrary {
    /**
     * Set Disable - Ngăn chặn sự kiện tabIndex
     * @param el Dom Element cần set
     * tnduc - 19.09.2023
     */
    public static setDisableTabIndexBy(el: HTMLElement) {
        const focusableElements: NodeListOf<HTMLElement> = el.querySelectorAll("a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])");
        if (focusableElements) {
            focusableElements.forEach(function (el) {
                return el.setAttribute("tabindex", "-1");
            });
        }
    }

    /**
     * Set Disable - Ngăn chặn sự kiện tabIndex
     * @param el Dom Element cần set
     * tnduc - 19.09.2023
     */
    public static setEnableTabIndexBy(el: HTMLElement) {
        const focusableElements: NodeListOf<HTMLElement> = el.querySelectorAll("a, button, input, select, textarea, [tabindex]:is([tabindex='-1'])");
        if (focusableElements) {
            focusableElements.forEach(function (el) {
                return el.setAttribute("tabindex", "0");
            });
        }
    }

    /**
     * Focus vào thẻ đầu tiên tìm thấy trong Element
     * @param el đối tượng Element cần query
     * tnduc - 19.09.2023
     */
    public static setFocusDefault(el: HTMLElement) {
        const focusableElements: NodeListOf<HTMLElement> = el.querySelectorAll("a, button, input, select, textarea, [tabindex]:is([tabindex='-1'])");
        if (focusableElements?.length > 0) {
            focusableElements[0].focus();
        }
    }

    /**
     * Function cho phép thêm mới 1 class Element
     * @param el đối tượng Element cần query
     * @param className Tên class cần add
     * tnduc - 19.09.2023
     */
    public static addClassForElement(el: HTMLElement, className: string) {
        let eClassName = el.getAttribute('class');
        if (!eClassName) {
            el.setAttribute('class', className);
        } else {
            const classNameExists = eClassName.split(Constant.spaceCharacters).find(item => item === className);
            if (!classNameExists) {
                eClassName = eClassName.trim() + Constant.spaceCharacters + className;
                el.setAttribute('class', eClassName.trim());
            }
        }
    }

    /**
     * Function cho phép loại bỏ 1 class Element
     * @param el đối tượng Element cần query
     * @param className Tên class cần add
     * tnduc - 19.09.2023
     */
    public static removeClassForElement(el: HTMLElement, className: string) {
        let eClassName = el.getAttribute('class');
        if (eClassName && eClassName.indexOf(className) >= 0) {
            eClassName = eClassName.replace(new RegExp(className, 'g'), '')
            el.setAttribute('class', eClassName.trim());
        }
    }

    /**
     * Function cho phép loại bỏ 1 class Element
     * @param el đối tượng Element cần query
     * @param className Tên class cần add
     * tnduc - 19.09.2023
     */
    public static removeClassForAllChildElement(el: HTMLElement, className: string) {
        const me = this;
        const allChild = me.getAllNodeChildBy(el);
        if (allChild?.length > 0) {
            allChild.forEach(element => {
                const itemElement = element as HTMLElement;
                let eClassName = itemElement.getAttribute('class');
                if (eClassName && eClassName.indexOf(className) >= 0) {
                    eClassName = eClassName.replace(new RegExp(className, 'g'), '')
                    itemElement.setAttribute('class', eClassName.trim());
                }
            });
        }
    }

    /**
     * Select element has id = "app" in body
     * tnduc - 19.09.2023
     */
    public static getAppIdSelector() {
        const me = this;
        return me.getElementById(Constant.appID);
    }

    /**
     * Select element has id = "qlch-mask" in body
     * tnduc - 19.09.2023
     */
    public static getMaskIdSelector() {
        const me = this;
        return me.getElementById(Constant.qlchMaskId);
    }

    /**
     * Tạo một mask mới trên app
     * tnduc - 19.09.2023
     */
    public static createNewMask() {
        let mask = ElementLibrary.getMaskIdSelector();
        if (mask) {
            return null;
        }
        const me = this;
        mask = me.createElement('div');
        const appElement = ElementLibrary.getAppIdSelector();
        mask.setAttribute("id", Constant.qlchMaskId);
        mask.setAttribute("class", "qlch-mask");

        if (appElement) {
            appElement.appendChild(mask);
        }
        return mask;

    }

    /**
     * Lấy toàn bộ thẻ dev cấp 2 trong div cha
     * @param parentDiv Div cha cần lấy child node
     * tnduc - 19.09.2023
     */
    public static getAllNodeChildBy(parentDiv: HTMLElement) {
        if (parentDiv.childNodes && Array.from(parentDiv.childNodes) && Array.from(parentDiv.childNodes).length > 0) {
            return Array.from(parentDiv.childNodes).filter((node) => node.nodeType === Node.ELEMENT_NODE);
        }
        return [];
    }

    /**
     * Lấy về đối tượng Element có giá trị Attribute lớn nhất
     * @param frmParent Đối tượng Element cha
     * @param elementCSSStyle tên attribute cần set
     * tnduc - 19.09.2023
     */
    public static getElementHasMaxValueNumberStyleBy(frmParent: HTMLElement, elementCSSStyle: string) {
        const me = this;
        const allChild = me.getAllNodeChildBy(frmParent);
        if (allChild?.length > 0) {

            let valueAttributeMax: number = 0;
            let elementHasAttributeMax: HTMLElement | null = null;

            for (let index = 0; index < allChild.length; index++) {
                const elementChild = allChild[index] as HTMLElement;
                if (elementChild) {
                    const valueAttribute = ((elementChild.style) as any)[elementCSSStyle.trim()];
                    const numberAttribute = +valueAttribute;
                    if (numberAttribute && !isNaN(numberAttribute) && numberAttribute > valueAttributeMax) {
                        valueAttributeMax = numberAttribute;
                        elementHasAttributeMax = elementChild;
                    }
                }
            };
            return elementHasAttributeMax;
        }
        return null;
    }


    /**
     * Query Element by Id in DOM
     * @param id tên id cần query
     * @returns HTML Element
     * tnduc - 19.09.2023
     */
    public static getElementById(id: string) {
        return document.getElementById(id.trim());
    }

    /**
     * 
     * @param tag 
     * @returns 
     * tnduc - 19.09.2023
     */
    public static createElement(tag: string) {
        return document.createElement(tag.trim())
    };

    /**
     * Thêm 1 sự kiện vào document
     * @param eventName Tên sự kiện
     * @param func function thực thi
     * tnduc - 19.09.2023
     */
    public static addEventListener<K extends keyof DocumentEventMap>(eventName: K, func: (event: Event) => void) {
        document.addEventListener(eventName.trim(), func);
    }

    /**
     * Loại bỏ 1 sự kiện vào document
     * @param eventName Tên sự kiện
     * @param func function thực thi
     * tnduc - 19.09.2023
     */
    public static removeEventListener<K extends keyof DocumentEventMap>(eventName: K, func: (event: Event) => void) {
        document.removeEventListener(eventName.trim(), func);
    }

    /**
     * Focus vào id html
     * @param id
     * tnduc - 19.09.2023
     */
    public static focusInputControl(id: string) {
        const me = this;
        const input: HTMLElement | null = me.getElementById(id);
        if (input) {
            input.focus();
        }
    }
}