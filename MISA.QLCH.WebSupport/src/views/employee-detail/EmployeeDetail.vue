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

  setup() {
    const thisData: Ref<EmployeeDetail> = ref(new EmployeeDetail());
    const disabledFormInfo: Ref<boolean> = ref(true);
    const disabledFormRole: Ref<boolean> = ref(false);
    const disabledFormContactInfo: Ref<boolean> = ref(false);
    const disabledFormAccessTime: Ref<boolean> = ref(false);
    const disabledAccessTimeFormItem: Ref<boolean> = ref(false);

    return {
      thisData,
      disabledFormInfo,
      disabledFormRole,
      disabledFormContactInfo,
      disabledFormAccessTime,
      disabledAccessTimeFormItem

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
        "txtColumn1": new TextBox({
          fieldText: "Mã nhân viên",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column1"
        }),
        "txtColumn2": new TextBox({
          fieldText: "Tên nhân viên",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column2"
        }),
        "txtColumn3": new Combobox({
          fieldText: "Giới tính",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column3",
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
        "txtColumn4": new DateModel({
          fieldText: "Ngày sinh",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column4"
        }),
        "txtColumn5": new TextBox({
          fieldText: "Số điện thoại",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column5"
        }),
        "txtColumn6": new Combobox({
          fieldText: "Trạng thái làm việc",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column6",
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
        "txtColumn7": new TextBox({
          fieldText: "Mật khẩu",
          type: "password",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          styleInput: "padding-left: 35px",
          bindingIndex: "Column7",
        }),
        "txtColumn8": new TextBox({
          fieldText: "Số CMND",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column8"
        }),
        "txtColumn9": new DateModel({
          fieldText: "Ngày Cấp CMND",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column9"
        }),
        "txtColumn10": new TextBox({
          fieldText: "Nơi Cấp CMND",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column10"
        }),
        "txtColumn11": new Combobox({
          fieldText: "Tình trạng hôn nhân",
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: 1,
              display: "Độc thân"
            },
            {
              value: 2,
              display: "Đã kết hôn"
            }
          ],
          bindingIndex: "Column11"
        }),
        "txtColumn12": new TextBox({
          fieldText: "Xác nhận mật khẩu",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column12"
        }),
        "txtColumn13": new Checkbox({
          fieldText: "Cho phép làm việc với phần mềm",
          bindingIndex: "Column13",
        }),
        "txtColumn14": new Checkbox({
          fieldText: "Vai trò quản trị hệ thống",
          bindingIndex: "Column14",
        }),
        "txtColumn15": new Checkbox({
          fieldText: "Vai trò quản lý chuỗi",
          bindingIndex: "Column15",

        }),
        "txtColumn16": new Combobox({
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
          bindingIndex: "Column15",
        }),
        "txtColumn17": new TextBox({
          fieldText: "ĐT nhà riêng",
          labelWidth: labelWidth,
          bindingIndex: "Column17"
        }),
        "txtColumn18": new TextBox({
          fieldText: "Địa chỉ",
          labelWidth: labelWidth,
          bindingIndex: "Column18"
        }),
        "txtColumn19": new TextBox({
          fieldText: "Quốc gia",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column19"
        }),
        "txtColumn20": new TextBox({
          fieldText: "Quận/Huyện",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column20"
        }),
        "txtColumn21": new TextBox({
          fieldText: "Tỉnh/Thành Phố",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column21"
        }),
        "txtColumn22": new TextBox({
          fieldText: "Xã/Phường",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column22"
        }),
        "txtColumn23": new TextBox({
          fieldText: "Địa chỉ",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column23"
        }),
        "txtColumn24": new TextBox({
          fieldText: "Quốc gia",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column24"
        }),
        "txtColumn25": new TextBox({
          fieldText: "Quận/Huyện",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column25"
        }),
        "txtColumn26": new TextBox({
          fieldText: "Tỉnh/Thành Phố",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column26"
        }),
        "txtColumn27": new TextBox({
          fieldText: "Xã/Phường",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column27"
        }),
        "txtColumn28": new TextBox({
          fieldText: "Họ và tên",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column28"
        }),
        "txtColumn29": new TextBox({
          fieldText: "Quan hệ",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column29"
        }),
        "txtColumn30": new TextBox({
          fieldText: "ĐT di động",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column30"
        }),
        "txtColumn31": new TextBox({
          fieldText: "ĐT nhà riêng",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column31"
        }),
        "txtColumn32": new TextBox({
          fieldText: "Email",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column32"
        }),
        "txtColumn33": new TextBox({
          fieldText: "Địa chỉ",
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column33"
        }),
        "txtColumn34": new Combobox({
          fieldText: "Quyền truy cập",
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: 1,
              display: "Truy cập tự do"
            },
            {
              value: 2,
              display: "Truy cập theo khung giờ"
            }],
          bindingIndex: "Column34"
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


    /**
    * Sau khi đóng form xong thì xử lý thêm gì ở master thì Override function này ở master
    */
    afterCloseForm() { },
  }

}
</script>
