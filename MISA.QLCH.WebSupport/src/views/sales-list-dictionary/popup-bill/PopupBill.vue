<template src="./PopupBill.html"></template>
<style scoped src="./PopupBill.scss"></style>

<script lang="ts">
import Log from '@library-src/utilities/Log';
import PopupLibrary from '@library-src/utilities/commons/PopupLibrary';
// import BillDetail from '@store-src/models/bill-main/BillDetail';
import BaseController from 'qlch_base/BaseController';
import EPopup from "qlch_control/EPopup";
// import { Ref, ref } from 'vue/dist/vue.js';
// import Bill from '@store-src/models/bill-main/Bill';
// import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';

export default {
    extends: BaseController,
    components: {
        EPopup,

    },

    props: {
        idRoot: {
            type: String
        },
        BillId: {
            type: String
        }
    },
    // data() {
    //     const lstBillDetail: Ref<Array<BillDetail>> = ref(new Array<BillDetail>());
    //     return {
    //         lstBillDetail
    //     }
    // },
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