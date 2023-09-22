<template src="./EPopup.html"></template>
<style scoped lang="scss" src="./EPopup.scss"></style>
<script lang="ts">
import Log from '@library-src/utilities/Log';
import { Ref, ref } from 'vue';
import BaseControl from "@src/components/base/BaseControl.vue";
import ElementLibrary from '@library-src/utilities/commons/ElementLibrary';
import PopupLibrary from '@library-src/utilities/commons/PopupLibrary';
import EPopup from './EPopup';

export default {
    extends: BaseControl,

    props: {
        styleFrom: {
            type: String
        }
    },

    setup() {
        const thisData: Ref<EPopup> = ref(new EPopup());
        return {
            thisData
        }
    },

    /**
     * Hook - Trước khi show 1 detail thì kiểm tra xem có thẻ div có id qlch-mask chưa? có rồi thì không tạo thêm nữa tránh đen màn hình
     * Chỉ chỉnh sửa index cho nó đè các item div khác thôi
     */
    beforeMount() {
        const me = this;
        try {
            if (me.idRoot) {
                PopupLibrary.createNewMask(me.idRoot);
            }
        } catch (error) {
            Log.ErrorLog(error as Error);
        }
    },

    /**
     * Hook - Gọi hàm này khi tất cả dữ liệu trên Dom đã khởi tạo xong
     * tnphuc - 19.09.2023 
     */
    mounted() {
        try {
            const me = this;
            window.addEventListener('resize', me.onResizeBrowser);
            me.setOriginLocationInForm();
        } catch (error) {
            Log.ErrorLog(error as Error);
        }
    },

    /**
     * Hook - Gọi hàm này khi Dom đã thực hiện xóa element
     * tnphuc - 19.09.2023 
     */
    beforeUnmount() {
        try {
            const me = this;
            window.removeEventListener('resize', me.onResizeBrowser);
        } catch (error) {
            Log.ErrorLog(error as Error);
        }
    },

    emits: ['onCloseClick'],

    methods: {

        /**
         * Function gán lại vị trí form ban đầu
         * tnphuc - 19.09.2023 
         */
        setOriginLocationInForm() {
            const me = this;
            const popup = ElementLibrary.getElementById(me.thisData.id);
            if (popup) {
                me.thisData.originalWidth = popup.offsetWidth;
                me.thisData.originalHeight = popup.offsetHeight;
                me.thisData.originalTopLocation = popup.offsetTop;
                me.thisData.originalLeftLocation = popup.offsetLeft;
            }
        },

        /**
         * Thực hiện click button close in form
         * tnphuc - 19.09.2023 
         */
        onCloseClick() {
            const me = this;
            try {
                me.$emit("onCloseClick");
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Thực hiện mở rộng form full màn hình
         * tnphuc - 19.09.2023 
         */
        onMaximizeClick() {
            const me = this;
            try {
                me.setNewPopupLocation(!me.thisData.isPopupFill);
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Hiển thị popup dạng fill màn hình hay không
         * @param isPopupFill Có fill hay không?
         * tnphuc - 19.09.2023 
         */
        setNewPopupLocation(isPopupFill: boolean) {
            const me = this;
            const popup = ElementLibrary.getElementById(me.thisData.id);
            if (!popup) {
                return;
            }
            if (isPopupFill) {
                me.setFillLocationPopup(popup);
            } else {
                me.setOriginLocationPopup(popup);
            }
            me.thisData.isPopupFill = isPopupFill;

        },

        /**
         * Set vị trí form phủ kín màn hình
         * tnphuc - 19.09.2023 
         */
        setFillLocationPopup(popup: HTMLElement) {
            popup.style.width = "100%";
            popup.style.height = "100%";
            popup.style.top = "0";
            popup.style.left = "0";
            popup.style.position = "fixed";
        },

        /**
         * Set vị trí form trở về như cũ
         * tnphuc - 19.09.2023 
         */
        setOriginLocationPopup(popup: HTMLElement) {
            const me = this;
            popup.style.width = me.thisData.originalWidth + "px";
            popup.style.height = me.thisData.originalHeight + "px";
            popup.style.top = me.thisData.originalTopLocation + "px";
            popup.style.left = me.thisData.originalLeftLocation + "px";
            me.setLocationFormByResizeBrowser(me.thisData.id, me.thisData.idParent); //Set lại top left của form theo trình duyệt
        },

        /**
         * Sự kiện thay đổi độ lớn trình duyệt
         * tnphuc - 19.09.2023 
         */
        onResizeBrowser() {
            const me = this;
            try {
                if (me.thisData.isPopupFill) {
                    return;
                }
                me.setLocationFormByResizeBrowser(me.thisData.id, me.thisData.idParent);
            } catch (error) {
                Log.ErrorLog(error as Error)
            }
        },

        /**
         * Khai báo sự kiện click con chuột xuống 
         * @param e 
         * tnphuc - 19.09.2023 
         */
        onMouseDown(e: MouseEvent) {
            const me = this;
            try {
                if (me.thisData.isPopupFill) {
                    return;
                }
                me.thisData.startX = e.pageX;
                me.thisData.startY = e.pageY;
                const form = document.getElementById(me.thisData.id);
                if (form) {
                    me.thisData.startTop = form.offsetTop;
                    me.thisData.startLeft = form.offsetLeft;
                    me.thisData.formMove = true;
                }
            } catch (error) {
                me.clearFormMove();
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Khai báo sự kiện nhả con trỏ chuột trên from
         * @param e 
         * tnphuc - 19.09.2023 
         */
        onMouseUp() {
            const me = this;
            try {
                me.clearFormMove();
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Khai báo sự kiện khi người dùng nhấc con chuột ra khỏi vùng đang chỉ định
         * tnphuc - 19.09.2023 
         */
        onMouseUpOut() {
            const me = this;
            try {
                me.clearFormMove();
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Khai báo sự kiện di chuyển con chuột trên from
         * @param e 
         * tnphuc - 19.09.2023 
         */
        onMouseMove(e: MouseEvent) {
            const me = this;
            try {
                if (me.thisData.formMove) {
                    const form = document.getElementById(me.thisData.id);
                    const parentForm = document.getElementById(me.thisData.idParent);
                    if (form && parentForm) {
                        parentForm.style.display = "block";
                        parentForm.style.position = "absolute";
                        form.style.position = "fixed";
                        let left = me.thisData.startLeft + (e.pageX - me.thisData.startX);
                        if (left + form.offsetWidth > window.innerWidth) {
                            left = window.innerWidth - form.offsetWidth;
                        }
                        if (left < 0) {
                            left = 0;
                        }

                        let top = me.thisData.startTop + (e.pageY - me.thisData.startY);
                        if (top + form.offsetHeight > window.innerHeight) {
                            top = window.innerHeight - form.offsetHeight;
                        }
                        if (top < 0) {
                            top = 0;
                        }
                        form.style.left = left + "px";
                        form.style.top = top + "px";
                        me.thisData.originalTopLocation = top;
                        me.thisData.originalLeftLocation = left;
                    }
                }
            } catch (error) {
                me.clearFormMove();
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Setup vị trí mới cho form sau khi di chuyển
         * tnphuc - 19.09.2023 
         */
        clearFormMove() {
            const me = this;
            me.thisData.formMove = false;
        },

        /**
         * 
         * @param formId ID form cần set giá trị
         * @param parentFormId 
         * tnphuc - 19.09.2023 
         */
        setLocationFormByResizeBrowser(formId: string, parentFormId: string) {
            const form = document.getElementById(formId);
            const parentForm = document.getElementById(parentFormId);
            if (!form || !parentForm) {
                return;
            }
            if (form.offsetLeft < 0 || form.offsetTop < 0 || form.offsetLeft + form.offsetWidth > window.innerWidth || form.offsetTop + form.offsetHeight > window.innerHeight) {
                parentForm.style.display = "block";
                parentForm.style.position = "absolute";
                form.style.position = "fixed";

                let left = form.offsetLeft < 0 ? 0 : form.offsetLeft;
                if (form.offsetLeft + form.offsetWidth > window.innerWidth) {
                    left = window.innerWidth - form.offsetWidth;
                }
                form.style.left = left + "px";

                let top = form.offsetHeight < 0 ? 0 : form.offsetHeight;
                if (form.offsetTop + form.offsetHeight > window.innerHeight) {
                    top = window.innerHeight - form.offsetHeight;
                }
                form.style.top = top + "px";

                const me = this;
                me.thisData.originalLeftLocation = left;
                me.thisData.originalTopLocation = top;
            }
        }
    }
}
</script>