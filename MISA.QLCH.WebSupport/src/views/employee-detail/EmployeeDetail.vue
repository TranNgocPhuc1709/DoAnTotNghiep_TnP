<template src="./EmployeeDetail.html"></template>
<style lang="scss" scoped src="./EmployeeDetail.scss"></style>
<script lang="ts">
import EmployeeDetail from './EmployeeDetail';
import { PropType, Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import EDate from "qlch_control/EDate";
import Log from '@library-src/utilities/Log';
import BaseInput from '@library-src/models/qlch_control/base_input/BaseInput';
// import Checkbox from '@library-src/models/qlch_control/qlch_checkbox/Checkbox';
// import ECheckbox from "qlch_control/ECheckbox";

// import Log from '@library-src/utilities/Log';
import Employee from '@store-src/models/employee/Employee';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Guid from '@library-src/utilities/types/Guid';

export default {

  extends: BaseDictionaryDetailController,
  props: {
    masterData: {
      type: Object as PropType<Record<string, any>>,
      require: true
    }
  },
  components: {
    BaseDictionaryDetailView,
    ETextBox,
    ECombobox,
    EDate,
    // ECheckbox
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
    const navbar1Selected: Ref<boolean> = ref(false);
    const navbar2Selected: Ref<boolean> = ref(false);
    const navbar3Selected: Ref<boolean> = ref(false);
    //Xử lý checkbox


    return {
      thisData,
      disabledFormInfo,
      disabledFormRole,
      disabledFormContactInfo,
      disabledFormAccessTime,
      disabledAccessTimeFormItem,
      disablePassWord,
      disableECombobox,
      navbar1Selected,
      navbar2Selected,
      navbar3Selected
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
              value: "Nam",
              display: "Nam"
            },
            {
              value: "Nữ",
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
          type: "number",
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
              value: "Nhân viên chính thức",
              display: "Nhân viên chính thức"
            },
            {
              value: "Nhân viên thử việc",
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
          type: "number",
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
          type: "password",
          labelWidth: labelWidth,
          bindingIndex: "ConfirmPasswordEmployee"
        }),
        // "txtWorkWithSystem": new Checkbox({
        //   fieldText: "Cho phép làm việc với phần mềm",
        //   bindingIndex: "WorkWithSystem",
        // }),
        // "txtSystemAdministrator ": new Checkbox({
        //   fieldText: "Vai trò quản trị hệ thống",
        //   bindingIndex: "SystemAdministrator ",
        // }),
        // "txtSystemSales": new Checkbox({
        //   fieldText: "Vai trò bán hàng",
        //   bindingIndex: "SystemSales",
        // }),

        "txtUsageSystem": new Combobox({
          fieldText: "",
          maxLength: 255,
          labelWidth: labelWidth,
          placeholder: "Lựa chọn vai trò người dùng",
          data: [
            {
              value: "Nhân viên bán hàng",
              display: "Nhân viên bán hàng"
            },
            {
              value: "Nhân viên thủ kho",
              display: "Nhân viên thủ kho"
            },
            {
              value: "Quản trị hệ thống",
              display: "Quản trị hệ thống"
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
        // "txtColumn34": new Checkbox({
        //   fieldText: "Truy cập theo khung giờ",
        //   bindingIndex: "Column34"
        // }),
        // "txtColumn35": new Checkbox({
        //   fieldText: "Truy cập tự do",
        //   bindingIndex: "Column35"
        // }),
      }
    },

    ShowTaskInfo() {
      try {
        const me = this;
        me.disabledFormInfo = true;
        me.disabledFormRole = false;
        me.disabledFormContactInfo = false;
        me.disabledFormAccessTime = false;

        me.navbar1Selected = true;
        me.navbar2Selected = false;
        me.navbar3Selected = false;
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

        me.navbar1Selected = false;
        me.navbar2Selected = true;
        me.navbar3Selected = false;
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

        me.navbar1Selected = false;
        me.navbar2Selected = false;
        me.navbar3Selected = true;
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
    // CheckPassword() {
    //   const me = this;
    //   if (me.masterData) {
    //     const Password = me.masterData['PasswordEmployee'];
    //     const ConfirmPassword = me.masterData['ConfirmPasswordEmployee'];
    //     if (Password != ConfirmPassword) {
    //       alert('Lỗi: Hai giá trị không khớp.');
    //     }
    //   }
    // },

    saveData() {
      const me = this;
      let listEmployee: Array<Employee> | null = new Array<Employee>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['EmployeeId'] = Guid.NewGuid();
          listEmployee = LocalStorageLibrary.getByKey<Array<Employee>>("employee");
          if (listEmployee) {
            listEmployee.push(me.masterData);
            LocalStorageLibrary.setByKey("employee", listEmployee);
          }
          else {
            listEmployee = new Array<Employee>({ ...me.masterData });
            LocalStorageLibrary.setByKey("employee", listEmployee);
          }
        }
        if (me.masterData.editMode == 2) {
          listEmployee = LocalStorageLibrary.getByKey<Array<Employee>>("employee");
          if (listEmployee) {
            listEmployee.forEach(newItemEmployee => {
              if (me.masterData) {
                if (newItemEmployee.EmployeeId == me.masterData.EmployeeId) {
                  newItemEmployee.CodeEmployee = me.masterData.CodeEmployee;
                  newItemEmployee.NameEmployee = me.masterData.NameEmployee;
                  newItemEmployee.GenderEmployee = me.masterData.GenderEmployee;
                  newItemEmployee.BirthEmployee = me.masterData.BirthEmployee;
                  newItemEmployee.TelephoneEmployee = me.masterData.TelephoneEmployee;
                  newItemEmployee.StatusEmployee = me.masterData.StatusEmployee;
                  newItemEmployee.PasswordEmployee = me.masterData.PasswordEmployee;
                  newItemEmployee.IdCardEmployee = me.masterData.IdCardEmployee;
                  newItemEmployee.DateCardEmployee = me.masterData.DateCardEmployee;
                  newItemEmployee.AddressCardEmployee = me.masterData.AddressCardEmployee;
                  newItemEmployee.MaritalEmployee = me.masterData.MaritalEmployee;
                  newItemEmployee.ConfirmPasswordEmployee = me.masterData.ConfirmPasswordEmployee;
                  newItemEmployee.UsageSystem = me.masterData.UsageSystem;
                  newItemEmployee.HomePhone = me.masterData.HomePhone;
                  newItemEmployee.AddressHome = me.masterData.AddressHome;
                  newItemEmployee.NationEmployee = me.masterData.NationEmployee;
                  newItemEmployee.DistrictEmployee = me.masterData.DistrictEmployee;
                  newItemEmployee.ProvinceEmployee = me.masterData.ProvinceEmployee;
                  newItemEmployee.WardsEmployee = me.masterData.WardsEmployee;
                  newItemEmployee.AddressPresent = me.masterData.AddressPresent;
                  newItemEmployee.NationPresent = me.masterData.NationPresent;
                  newItemEmployee.DistrictPresent = me.masterData.DistrictPresent;
                  newItemEmployee.ProvincePresent = me.masterData.ProvincePresent;
                  newItemEmployee.WardsPresent = me.masterData.WardsPresent;
                  newItemEmployee.EmergencyEmployee = me.masterData.EmergencyEmployee;
                  newItemEmployee.RelationshipEmployee = me.masterData.RelationshipEmployee;
                  newItemEmployee.PhoneEmergency = me.masterData.PhoneEmergency;
                  newItemEmployee.LandlinePhone = me.masterData.LandlinePhone;
                  newItemEmployee.EmailHome = me.masterData.EmailHome;
                  newItemEmployee.AddressEmergency = me.masterData.AddressEmergency;
                }
              }
            });
            LocalStorageLibrary.setByKey("employee", listEmployee);
          }
        }
      }
    },


    //TnP 31/12 start sự kiện tắt 2 ô password
    // onClickCheckPass() {
    //   try {
    //     const me = this;
    //     const ShowCheckBoxPass = me.bindingControl["txtPasswordEmployee"];
    //     if (ShowCheckBoxPass) {
    //       me.disablePassWord = true
    //     }
    //     if (!ShowCheckBoxPass) {
    //       me.disablePassWord = false;
    //     }
    //   } catch (error) {
    //     Log.ErrorLog(error as Error);
    //   }
    // },




    // onClickRole() {
    //   try {
    //     const me = this;
    //     const ShowCheckBoxRole = me.bindingControl["txtSystemAdministrator"];
    //     if (ShowCheckBoxRole) {
    //       me.disableECombobox = false
    //     }
    //     else {
    //       me.disableECombobox = true
    //     }
    //   } catch (error) {
    //     Log.ErrorLog(error as Error);
    //   }
    // },

    //TnP 31/12 end

    /**
    * Sau khi đóng form xong thì xử lý thêm gì ở master thì Override function này ở master
    */
    afterCloseForm() { },
  }

}
</script>
