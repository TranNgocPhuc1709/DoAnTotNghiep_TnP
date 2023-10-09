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
   * Child Menu
   */

  children?: Array<Menu>;

  /**
   * child Heading
   */
  // headingText?: string;
}