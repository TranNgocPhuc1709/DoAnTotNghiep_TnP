import { Menu } from "./Menu";

export interface IMenu {
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
   * Con của Menu
   */

  children?: Array<Menu>;
}