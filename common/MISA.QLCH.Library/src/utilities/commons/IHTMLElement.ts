/**
 * The custom HTML Element class serves to declare more events that HTML Element does not support
 * tnphuc - 19.09.2023 
 */
export default interface IHTMLElement extends HTMLElement {
    clickOutsideEvent: (event: Event) => void;
}