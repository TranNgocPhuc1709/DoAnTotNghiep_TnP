<script lang="ts">
import BaseInput from "@src/components/base/BaseInput.vue";
import Log from "@library-src/utilities/Log";
import BaseDropDownInput from "@library-src/models/qlch_control/base_drop_down_input/BaseDropDownInput";
export default {
    extends: BaseInput,

    props: {
        control: {
            type: BaseDropDownInput,
            require: true
        }
    },


    data() {
        return {
            /**
             * Timeout interval when use search action
             */
            timeoutQuerySearchInput: 0 as number | undefined | NodeJS.Timeout
        }
    },

    methods: {
        /**
         * Keyboard input event on input . tag
         * tnphuc - 19.09.2023 
         */
        onKeyDown(e: KeyboardEvent) {
            const me = this;
            try {
                const keyCode = e.key;
                if (keyCode == "ArrowDown") {
                    me.pressKeyArrowDow(e);
                }

                if (keyCode == "ArrowUp") {
                    me.pressKeyArrowUp(e);
                }
                if (keyCode == "Tab") {
                    me.pressKeyTab(e);
                }

                if (keyCode == "Enter") {
                    me.pressKeyEnter(e);
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Handling users pressKeyArrowDow
         * @param e Event
         * tnphuc - 2022.09.05
         */
        pressKeyArrowDow(e: KeyboardEvent) {
            if (!e.key) {
                return;
            }
        },

        /**
         * Handling users pressKeyArrowUp
         * @param e Event
         * tnphuc - 2022.09.05
         */
        pressKeyArrowUp(e: KeyboardEvent) {
            if (!e.code) {
                return
            }
        },

        /**
         * Handling users pressKeyTab
         * @param e Event
         * tnphuc - 2022.09.05
         */
        pressKeyTab(e: KeyboardEvent) {
            if (!e.code) {
                return
            }
        },

        /**
         * Handling users pressKeyEnter
         * @param e Event
         * tnphuc - 2022.09.05
         */
        pressKeyEnter(e: KeyboardEvent) {
            if (!e.code) {
                return
            }
        }
    }
}
</script>