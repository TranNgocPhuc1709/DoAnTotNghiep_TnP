<template src="./ENotification.html"></template>
<style lang="scss" scoped src="./ENotification.scss"></style>
<script lang="ts">
import EPopup from "@src/components/qlch_popup/EPopup.vue";
import ENotification from './ENotification';
import { Ref, ref } from 'vue';
import NotificationPopupViewModel from "@library-src/models/qlch_notification/NotificationPopupViewModel";
import BaseControl from "@src/components/base/BaseControl.vue";
import EButton from "@src/components/qlch_button/EButton.vue";
import Log from "@library-src/utilities/Log";
import PopupLibrary from "@library-src/utilities/commons/PopupLibrary";
import ToolBarItemsView from "@library-src/models/qlch_base/tool_bar_items_view/ToolBarItemsView";
export default {
  extends: BaseControl,
  components: {
    EButton,
    EPopup
  },

  props: {
    propView: {
      type: NotificationPopupViewModel
    },
    styleFrom: {
      type: String
    }
  },

  setup() {
    const thisData: Ref<ENotification> = ref(new ENotification());
    return { thisData };
  },

  methods: {

    /**
     * Đóng thông báo
     * tnduc - 19.09.2023 
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

    /**
     * Sự kiện click vào nút chức năng
     * @param item nút mà người dùng vừa thao tác, sau đó đóng form
     * tnduc - 19.09.2023 
     */
    onClickItem(item: ToolBarItemsView) {
      try {
        const me = this;
        if (item) {
          me.onSelectAction(item);
        }

        if (me.idRoot) {
          PopupLibrary.closePopup(me.idRoot);
        }
      } catch (error) {
        Log.ErrorLog(error as Error)
      }
    },

    /**
     * Sự kiện click vào nút chức năng, các form cần callback thì override lại dùng
     * @param item nút mà người dùng vừa thao tác, sau đó đóng form
     * tnduc - 19.09.2023 
     */
    onSelectAction(item: ToolBarItemsView) {
      if (item) {

      }
    }
  }


}
</script>
