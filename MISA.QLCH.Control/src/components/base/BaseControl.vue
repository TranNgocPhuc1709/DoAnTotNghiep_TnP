<script lang="ts">
import BaseControl from '@library-src/models/qlch_control/base_control/BaseControl';

import { ClickOutEvent, MouseUpOutEvent } from "@library-src/utilities/commons/Event";
import ElementLibrary from '@library-src/utilities/commons/ElementLibrary';

export default {
    directives: {
        "clickOut": ClickOutEvent,
        "mouseUpOut": MouseUpOutEvent
    },
    props: {
        control: {
            type: BaseControl,
            require: true
        },

        /**
         * id root của component trên Dom
         */
        idRoot: {
            type: String
        }
    },

    methods: {
        /**
         * Check if control is eligible to emit External Events?
         * tnphuc - 2022.08.23
         */
        validateControlBeforeHandlerEvent(control?: BaseControl) {
            if (!control) {
                return false;
            }

            if (control.readOnly || control.isLoadingData) {
                return false;
            }

            return true;
        },

        /**
         * Calculate the Position popup according to the top right left bottom of the browser for the default TH align left
         * tnphuc - 2022.09.07
         */
        calculatorPositionFloatLeftItemID(idParent: string, idItem: string) {
            const widthBrowser = window.innerWidth;
            const heightBrowser = window.innerHeight;
            const controlParent: HTMLElement | null = ElementLibrary.getElementById(idParent);

            if (controlParent) {
                const controlItem: HTMLElement | null = ElementLibrary.getElementById(idItem);
                if (controlItem) {
                    const domControlItem: DOMRect = controlItem.getBoundingClientRect();
                    const domControlParent: DOMRect = controlParent.getBoundingClientRect();
                    if ((domControlParent.left + domControlItem.width) >= widthBrowser) {
                        controlItem.style.left = (widthBrowser - domControlParent.left - domControlItem.width - 1) + "px"; // Thêm -1 px để không phải làm tròn khi left quá lẻ
                    } else {
                        controlItem.style.left = "0";
                    }

                    if ((domControlParent.bottom + domControlItem.height) >= heightBrowser) {
                        controlItem.style.top = -domControlItem.height + "px";
                    } else {
                        controlItem.style.top = "110%";
                    }
                }
            }
        }
    }

}
</script>

