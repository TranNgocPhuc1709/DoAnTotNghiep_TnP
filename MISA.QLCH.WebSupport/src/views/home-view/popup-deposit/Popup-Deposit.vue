<template src="./Popup-Deposit.html"></template>
<style scoped src="./Popup-Deposit.scss"></style>

<script lang="ts">
import Log from '@library-src/utilities/Log';
import PopupLibrary from '@library-src/utilities/commons/PopupLibrary';
import BaseController from 'qlch_base/BaseController';
import EPopup from "qlch_control/EPopup";

export default {
    extends: BaseController,
    components: {
        EPopup,
    },

    props: {
        idRoot: {
            type: String
        }
    },

    methods: {
        /**
     * Đóng thông báo
     * tnphuc - 19.09.2023 
     */
        onCloseClick() {
            const me = this;
            try {
                if (me.idRoot) {
                    PopupLibrary.closePopup(me.idRoot);
                }
            } catch (error) {
                Log.ErrorLog(error as Error)
            }
        },
    }
}
</script>