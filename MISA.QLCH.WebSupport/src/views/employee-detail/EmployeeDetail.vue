<template src="./EmployeeDetail.html"></template>
<style lang="scss" scoped src="./EmployeeDetail.scss"></style>
<script lang="ts">
import EmployeeDetail from './EmployeeDetail';
import { Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import EDate from "qlch_control/EDate";
import Log from '@library-src/utilities/Log';
import Checkbox from '@library-src/models/qlch_control/qlch_checkbox/Checkbox';
import ECheckbox from "qlch_control/ECheckbox";
import BaseInput from '@library-src/models/qlch_control/base_input/BaseInput';
// import Log from '@library-src/utilities/Log';

export default {

  extends: BaseDictionaryDetailController,

  components: {
    BaseDictionaryDetailView,
    ETextBox,
    ECombobox,
    EDate,
    ECheckbox
  },



  //TnP 31/12 start
  data() {
    const me = this;
    const bindingControl: Record<string, BaseInput> = me.buildBindingControl();
    return {
      bindingControl
    }

  },
  //TnP 31/12 end



  setup() {
    const thisData: Ref<EmployeeDetail> = ref(new EmployeeDetail());
    const disabledFormInfo: Ref<boolean> = ref(true);
    const disabledFormRole: Ref<boolean> = ref(false);
    const disabledFormContactInfo: Ref<boolean> = ref(false);
    const disabledFormAccessTime: Ref<boolean> = ref(false);
    const disabledAccessTimeFormItem: Ref<boolean> = ref(false);
    const disablePassWord: Ref<boolean> = ref(false);
    const disableECombobox: Ref<boolean> = ref(true)
    //Xử lý checkbox


    return {
      thisData,
      disabledFormInfo,
      disabledFormRole,
      disabledFormContactInfo,
      disabledFormAccessTime,
      disabledAccessTimeFormItem,
      disablePassWord,
      disableECombobox


      // isTaskInfoActive: false,
      // disabledFormInfo2: false
    };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm mới nhân viên";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 150;
      return {
        "txtCodeEmployee": new TextBox({
          fieldText: "Mã nhân viên",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "CodeEmployee"
        }),
        "txtNameEmployee": new TextBox({
          fieldText: "Tên nhân viên",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameEmployee"
        }),
        "txtGenderEmployee": new Combobox({
          fieldText: "Giới tính",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "GenderEmployee",
          data: [
            {
              value: 1,
              display: "Nam"
            },
            {
              value: 2,
              display: "Nữ"
            }
          ]
        }),
        "txtBirthEmployee": new DateModel({
          fieldText: "Ngày sinh",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "BirthEmployee"
        }),
        "txtTelephoneEmployee": new TextBox({
          fieldText: "Số điện thoại",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "TelephoneEmployee"
        }),
        "txtStatusEmployee": new Combobox({
          fieldText: "Trạng thái làm việc",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "StatusEmployee",
          data: [
            {
              value: 1,
              display: "Nhân viên chính thức"
            },
            {
              value: 2,
              display: "Nhân viên thử việc"
            }
          ]
        }),
        "txtPasswordEmployee": new TextBox({
          fieldText: "Mật khẩu",
          type: "password",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          styleInput: "padding-left: 35px",
          bindingIndex: "PasswordEmployee",
        }),
        "txtIdCardEmployee": new TextBox({
          fieldText: "Số CMND",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "IdCardEmployee"
        }),
        "txtDateCardEmployee": new DateModel({
          fieldText: "Ngày Cấp CMND",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DateCardEmployee"
        }),
        "txtAddressCardEmployee": new TextBox({
          fieldText: "Nơi Cấp CMND",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "AddressCardEmployee"
        }),
        "txtMaritalEmployee": new Combobox({
          fieldText: "Tình trạng hôn nhân",
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "Độc thân",
              display: "Độc thân"
            },
            {
              value: "Độc thân",
              display: "Đã kết hôn"
            }
          ],
          bindingIndex: "MaritalEmployee"
        }),
        "txtConfirmPasswordEmployee": new TextBox({
          fieldText: "Xác nhận mật khẩu",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ConfirmPasswordEmployee"
        }),
        "txtWorkWithSystem": new Checkbox({
          fieldText: "Cho phép làm việc với phần mềm",
          bindingIndex: "WorkWithSystem",
        }),
        "txtSystemAdministrator ": new Checkbox({
          fieldText: "Vai trò quản trị hệ thống",
          bindingIndex: "SystemAdministrator ",
        }),
        "txtSystemSales": new Checkbox({
          fieldText: "ai trò bán hàng",
          bindingIndex: "SystemSales",
        }),
        "txtUsageSystem": new Combobox({
          maxLength: 255,
          labelWidth: labelWidth,
          placeholder: "Chọn 1 hoặc nhiều vai trò",
          data: [
            {
              value: 1,
              display: "Nhân viên bán hàng"
            },
            {
              value: 2,
              display: "Nhân viên bán hàng Online"
            },
            {
              value: 3,
              display: "Nhân viên Marketing"
            }
          ],
          bindingIndex: "UsageSystem",
        }),
        "txtHomePhone": new TextBox({
          fieldText: "ĐT nhà riêng",
          labelWidth: labelWidth,
          bindingIndex: "HomePhone"
        }),
        "txtAddressHome": new TextBox({
          fieldText: "Địa chỉ",
          labelWidth: labelWidth,
          bindingIndex: "AddressHome"
        }),
        "txtNationEmployee": new TextBox({
          fieldText: "Quốc gia",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NationEmployee"
        }),
        "txtDistrictEmployee": new TextBox({
          fieldText: "Quận/Huyện",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DistrictEmployee"
        }),
        "txtProvinceEmployee": new TextBox({
          fieldText: "Tỉnh/Thành Phố",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ProvinceEmployee"
        }),
        "txtWardsEmployee": new TextBox({
          fieldText: "Xã/Phường",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "WardsEmployee"
        }),
        "txtAddressPresent": new TextBox({
          fieldText: "Địa chỉ",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "AddressPresent"
        }),
        "txtNationPresent": new TextBox({
          fieldText: "Quốc gia",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NationPresent"
        }),
        "txtDistrictPresent": new TextBox({
          fieldText: "Quận/Huyện",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DistrictPresent"
        }),
        "txtProvincePresent": new TextBox({
          fieldText: "Tỉnh/Thành Phố",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ProvincePresent"
        }),
        "txtWardsPresent": new TextBox({
          fieldText: "Xã/Phường",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "WardsPresent"
        }),
        "txtEmergencyEmployee": new TextBox({
          fieldText: "Họ và tên",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "EmergencyEmployee"
        }),
        "txtRelationshipEmployee": new TextBox({
          fieldText: "Quan hệ",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "RelationshipEmployee"
        }),
        "txtPhoneEmergency": new TextBox({
          fieldText: "ĐT di động",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "PhoneEmergency"
        }),
        "txtLandlinePhone": new TextBox({
          fieldText: "ĐT nhà riêng",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "LandlinePhone"
        }),
        "txtEmailHome": new TextBox({
          fieldText: "Email",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "EmailHome"
        }),
        "txtAddressEmergency": new TextBox({
          fieldText: "Địa chỉ",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "AddressEmergency"
        }),
        "txtColumn34": new Checkbox({
          fieldText: "Truy cập theo khung giờ",
          bindingIndex: "Column34"
        }),
        "txtColumn35": new Checkbox({
          fieldText: "Truy cập tự do",
          bindingIndex: "Column35"
        }),


      }
    },

    ShowTaskInfo() {
      try {
        const me = this;
        me.disabledFormInfo = true;
        me.disabledFormRole = false;
        me.disabledFormContactInfo = false;
        me.disabledFormAccessTime = false;
      } catch (error) {
        Log.ErrorLog(error as Error);
      }
    },
    ShowTaskRole() {
      try {
        const me = this;
        me.disabledFormRole = true;
        me.disabledFormInfo = false;
        me.disabledFormContactInfo = false;
        me.disabledFormAccessTime = false;
      } catch (error) {
        Log.ErrorLog(error as Error);
      }
    },
    contactInfo() {
      try {
        const me = this;
        me.disabledFormContactInfo = true;
        me.disabledFormInfo = false;
        me.disabledFormRole = false;
        me.disabledFormAccessTime = false;
      } catch (error) {
        Log.ErrorLog(error as Error);
      }
    },
    accessTime() {
      try {
        const me = this;
        me.disabledFormAccessTime = true;
        me.disabledFormInfo = false;
        me.disabledFormRole = false;
        me.disabledFormContactInfo = false;
      } catch (error) {
        Log.ErrorLog(error as Error);
      }
    },

    //TnP 31/12 start
    onClickCheckPass() {
      try {
        const me = this;
        const ShowCheckBoxPass = me.bindingControl["txtPasswordEmployee"];
        if (ShowCheckBoxPass) {
          me.disablePassWord = true
        }
        if (!ShowCheckBoxPass) {
          me.disablePassWord = false;
        }
      } catch (error) {
        Log.ErrorLog(error as Error);
      }
    },

    onClickRole() {
      try {
        const me = this;
        const ShowCheckBoxRole = me.bindingControl["txtSystemAdministrator"];
        if (ShowCheckBoxRole) {
          me.disableECombobox = false
        }
        else {
          me.disableECombobox = true
        }
      } catch (error) {
        Log.ErrorLog(error as Error);
      }
    },

    //TnP 31/12 end

    /**
    * Sau khi đóng form xong thì xử lý thêm gì ở master thì Override function này ở master
    */
    afterCloseForm() { },
  }

}
</script>
