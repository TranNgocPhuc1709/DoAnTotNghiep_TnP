import { IMenu } from "./IMenu";

export class Menu {
    /**
     *
     */
    constructor(iMenu?: IMenu) {
        const me = this;
        if (iMenu) {
            me.routerLink = iMenu.routerLink;
            me.fieldText = iMenu.fieldText;
            me.iconClass = iMenu.iconClass;
            me.children = iMenu.children;
            // me.headingText = iMenu.headingText;
        }

        if (!me.routerLink) {
            me.routerLink = "#";
        }
    }

    /**
     * Link redirect
     */
    routerLink?: string;

    /**
     * Display Text
     */
    fieldText?: string;

    /**
     * Class's Icon
     */
    iconClass?: string;

    /**
     * Children item
     */

    children?: Array<Menu>

    /**Heading children */

    // headingText?: string;


}