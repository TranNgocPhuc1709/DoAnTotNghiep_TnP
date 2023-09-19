<script lang="ts">
import { ClickOutEvent, MouseUpOutEvent } from "@library-src/utilities/commons/Event";
export default {
    directives: {
        "clickOut": ClickOutEvent,
        "mouseUpOut": MouseUpOutEvent
    },

    props: {
        /**
         * id root của component trên Dom
         * tnduc - 19.09.2023 
         */
        idRoot: {
            type: String,
            require: true
        }
    },
}
</script>