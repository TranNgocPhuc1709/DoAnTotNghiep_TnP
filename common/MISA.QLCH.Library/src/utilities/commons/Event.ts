import ElementLibrary from "./ElementLibrary";
import IHTMLElement from "./IHTMLElement";

/**
 * Khai báo sự kiện click ngoài item
 * tnduc - 19.09.2023 
 */
export const ClickOutEvent = {
    beforeMount: (el: IHTMLElement, binding: { value: (event?: Event) => void}) => {
        el.clickOutsideEvent = (event:Event) => {
            if (!(el == event.target || el.contains(event.target as Node))) {
                binding.value(event);
            }
        };
        ElementLibrary.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted: (el: IHTMLElement) => {
        ElementLibrary.removeEventListener("click", el.clickOutsideEvent);
    },
};

/**
 * Khai báo sự kiện nhấc chuột lên khi con trỏ ra khỏi vùng chứa item
 * tnduc - 19.09.2023 
 */
export const MouseUpOutEvent = {
    beforeMount: (el: IHTMLElement, binding: { value: (event?: Event) => void}) => {
        el.clickOutsideEvent = (event:Event) => {
            if (!(el == event.target || el.contains(event.target as Node))) {
                binding.value(event);
            }
        };
        ElementLibrary.addEventListener("mouseup", el.clickOutsideEvent);
    },
    unmounted: (el: IHTMLElement) => {
        ElementLibrary.removeEventListener("mouseup", el.clickOutsideEvent);
    },
};