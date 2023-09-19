<template src="./DemoDropDownMenu.html"></template>
<style lang="scss" scoped src="./DemoDropDownMenu.scss"></style>
<script lang="ts">
import EDropDownMenu from '@src/components/qlch_drop_down_menu/EDropDownMenu.vue';
import Common from '@library-src/utilities/commons/Function';
import Log from '@library-src/utilities/Log';
import DropDownMenu from '@library-src/models/qlch_control/qlch_drop_down_menu/DropDownMenu';
import DropDownMenuChild from '@library-src/models/qlch_control/qlch_drop_down_menu/children/DropDownMenuChild';
import { Ref, ref } from 'vue';

export default {
    components:{
        EDropDownMenu
    },
    setup() {
        const dropDefault: Ref<DropDownMenu> = ref(
            new DropDownMenu({
                fieldText: "Tiện ích",
                classType: "primary",
                classIconLeft: "i-utility-white",
                children: [
                    new DropDownMenuChild({
                        classIcon: "i-image",
                        fieldText: "Cập nhật ảnh",
                        itemCode: "imgUpdate"
                    }),
                    new DropDownMenuChild({
                        classIcon: "i-double-image",
                        fieldText: "Cập nhật ảnh nhanh",
                        itemCode: "imgUpdateQuick"
                    }),
                    new DropDownMenuChild({
                        type: "line",
                        itemCode: "line"
                    }),
                    new DropDownMenuChild({
                        classIcon: "i-play",
                        fieldText: "Đang kinh doanh",
                        itemCode: "business"
                    }),
                    new DropDownMenuChild({
                        classIcon: "i-pause",
                        fieldText: "Ngừng kinh doanh",
                        itemCode: "stopBusiness"
                    })
                ]
            })
        );

        const dropReadOnly: Ref<DropDownMenu> = ref(
            new DropDownMenu({
                fieldText: "Tiện ích",
                classType: "primary",
                classIconLeft: "i-utility-white",
                readOnly: true,

            })
        );

        const dropLoading: Ref<DropDownMenu> = ref(

            new DropDownMenu({
                fieldText: "Click Here",
                classType: "primary",
                classIconLeft: "i-utility-white",
                children: [
                    new DropDownMenuChild({
                        classIcon: "i-image",
                        fieldText: "Cập nhật ảnh",
                        itemCode: "imgUpdate"
                    }),
                    new DropDownMenuChild({
                        classIcon: "i-double-image",
                        fieldText: "Cập nhật ảnh nhanh",
                        itemCode: "imgUpdateQuick"
                    }),
                    new DropDownMenuChild({
                        type: "line",
                        itemCode: "line"
                    }),
                    new DropDownMenuChild({
                        classIcon: "i-play",
                        fieldText: "Đang kinh doanh",
                        itemCode: "business"
                    }),
                    new DropDownMenuChild({
                        classIcon: "i-pause",
                        fieldText: "Ngừng kinh doanh",
                        itemCode: "stopBusiness"
                    })
                ]
            })
        );

        return {
            dropDefault,
            dropReadOnly,
            dropLoading
        }
    },

    methods: {
        /**
         * Event Click vaò button Save
         */
        async btnLoadingClick(control: DropDownMenu) {
            try {
                if (!control) {
                    return;
                }
                control.isLoadingData = true;
                await Common.getTimeOut(3000, "");
                control.isLoadingData = false;
            } catch (error) {
                Log.ErrorLog(error as Error)
            }
            finally{
                if (control && control.isLoadingData){
                    control.isLoadingData = true;
                }
            }
        }
    }
}
</script>
