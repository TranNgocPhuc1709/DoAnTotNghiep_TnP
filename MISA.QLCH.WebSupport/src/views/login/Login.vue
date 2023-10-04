<template src="./Login.html"></template>
<style lang="scss" scoped src="./Login.scss"></style>
<script lang="ts">
import Login from './Login';
import { Ref, ref } from 'vue';
import EButton from "qlch_control/EButton";
import ETextBox from "qlch_control/ETextBox";
import TextBox from '@library-src/models/qlch_control/qlch_text_box/TextBox';
import Button from '@library-src/models/qlch_control/qlch_button/Button';
import Log from '@library-src/utilities/Log';
import BaseInput from '@library-src/models/qlch_control/base_input/BaseInput';
import FormLibrary from '@library-src/utilities/commons/FormLibrary';
import NotificationPopupViewModel from '@library-src/models/qlch_notification/NotificationPopupViewModel';
import ToolBarItemsView from '@library-src/models/qlch_base/tool_bar_items_view/ToolBarItemsView';
import PopupLibrary from '@library-src/utilities/commons/PopupLibrary';
import MisaCopyright from 'qlch_control/MisaCopyright';
import ElementLibrary from '@library-src/utilities/commons/ElementLibrary';
import router from '@src/router';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import ContextModel from '@store-src/models/context/ContextModel';
import Guid from '@library-src/utilities/types/Guid';
import Constant from '@library-src/utilities/constants/Constant';
import Function from '@library-src/utilities/commons/Function';

// import { useStore } from 'vuex';
export default {

  components: {
    EButton,
    ETextBox,
    MisaCopyright
  },

  setup() {
    const thisData: Ref<Login> = ref(new Login());
    const btnLogin: Ref<Button> = ref(new Button({
      fieldText: "ĐĂNG NHẬP",
      classType: "primary"
    }));
    const websiteMISA = import.meta.env.QLCH_WebsiteMISA;
    // const store = useStore(); // Access the Vuex store
    return {
      thisData,
      btnLogin,
      websiteMISA,

    };
  },

  data() {
    const me = this;
    const bindingControl: Record<string, BaseInput> = me.buildBindingControl();
    return {
      bindingControl
    }
  },

  methods: {

    /**
     * Building binding control
     */

    buildBindingControl() {

      return {
        "txtUserName": new TextBox({
          placeholder: "Tên mã nhân viên / số điện thoại",
          styleInput: "padding-left: 35px",
          require: true

        }),
        "txtPassword": new TextBox({
          placeholder: "Nhập mật khẩu",
          type: "password",
          styleInput: "padding-left: 35px",
          require: true
        })
      }
    },

    /**
     * Sự kiện click btn Login
     */

    async onClickLogin() {

      try {
        const me = this;
        if (!FormLibrary.validFormByBindingControl(me.bindingControl)) {
          return
        }

        me.onOffFormLoading(true);
        await Function.getTimeOut(3000, '');

        if (me.validateLogin()) {
          const newContext = new ContextModel({ token: Guid.NewGuid() }); // Tạo token lưu trên local store
          LocalStorageLibrary.setByKey(Constant.tokenContext, newContext);
          router.push({ path: '/' })
        }
        else {
          me.onOffFormLoading(false)
        }

      } catch (error) {
        Log.ErrorLog(error as Error)
      }
    },

    onOffFormLoading(on: boolean) {
      const me = this;
      const txtUserName = me.bindingControl[`txtUserName`];
      const txtPassword = me.bindingControl[`txtPassword`];
      const ebutton = me.btnLogin;

      txtUserName.readOnly = on;
      txtPassword.readOnly = on;
      ebutton.isLoadingData = on;

    },

    /**
     * Sự kiện click vào nút quên mật khẩu
     */
    onClickForgotPassword() {
      try {
        const me = this;
        me.showInformationPending();
      } catch (error) {
        Log.ErrorLog(error as Error)
      }
    },

    /**
     * Sự kiện click nút đăng ký
     */
    onClickRegister() {
      try {
        const me = this;
        me.showInformationPending();
      } catch (error) {
        Log.ErrorLog(error as Error)
      }
    },

    /**
     * Kiểm tra xác thực login
     */
    validateLogin() {
      const me = this;
      const userName = (me.bindingControl['txtUserName'] as TextBox).value;
      const password = (me.bindingControl['txtPassword'] as TextBox).value;

      if (userName && password) {

      }
      if (userName !== "admin") {
        me.showErrorLoginFail('txtUserName');
        return false;
      }

      if (password !== "12345678a") {
        me.showErrorLoginFail('txtPassword');
        return false;
      }

      return true;
    },

    /**
     * Show cảnh báo tính năng đang phát triển
     */
    async showInformationPending() {
      const infoNotification = new NotificationPopupViewModel({
        icon: "info",
        message: "Yêu cầu đang phát triển. Vui lòng thử lại sau!",
        toolBarItems: Array(
          new ToolBarItemsView({
            name: "btnOK",
            control: new Button({
              fieldText: "Đồng ý"
            })
          })
        )
      })

      const component = (await import(`qlch_control/ENotification`)).default;
      if (component && component.methods) {
        component.methods["onSelectAction"] = (item: ToolBarItemsView) => {
          Log.InfoLog(JSON.stringify(item));
        };
      };
      if (component) {
        PopupLibrary.createPopup(component, { "propView": infoNotification, "styleFrom": "min-width: 400px" });
      };
    },

    /**
     * Show cảnh báo login thất bại
     * @param controlName 
     */
    async showErrorLoginFail(controlName: string) {
      Log.InfoLog(controlName);
      let message = "Đăng nhập thất bại. Vui lòng thử lại";
      switch (controlName) {
        case "txtUserName":
          message = "Tên đăng nhập không chính xác!"
          break;
        case "txtPassword":
          message = "Mật khẩu không chính xác!"
          break;

        default:
          break;
      }
      const infoNotification = new NotificationPopupViewModel({
        icon: "error",
        message: message,
        toolBarItems: Array(
          new ToolBarItemsView({
            name: "btnOK",
            control: new Button({
              fieldText: "Đồng ý"
            })
          })
        )
      })

      const component = (await import(`qlch_control/ENotification`)).default;
      if (component && component.methods) {
        const me = this;
        component.methods["onSelectAction"] = (item: ToolBarItemsView) => {
          if (item) {
            const control = (me.bindingControl[controlName] as TextBox);
            if (control) {
              ElementLibrary.focusInputControl(control.id);
            }
          }
        };
      };
      if (component) {
        PopupLibrary.createPopup(component, { "propView": infoNotification, "styleFrom": "min-width: 400px" });
      };
    }

  }

}
</script>
