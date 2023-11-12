<template src="./ShiftRecordDetail.html"></template>
<style lang="scss" scoped src="./ShiftRecordDetail.scss"></style>
<script lang="ts">
import ShiftRecordDetail from './ShiftRecordDetail';
import { PropType, Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import ShiftRecord from '@store-src/models/shift-record/ShiftRecord';
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
    ECombobox
  },

  setup() {
    const thisData: Ref<ShiftRecordDetail> = ref(new ShiftRecordDetail());
    return { thisData };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm mới ca làm việc";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtShiftName": new TextBox({
          fieldText: "Tên ca",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ShiftName"
        }),
        "txtShiftTimeStart": new Combobox({
          fieldText: "Giờ bắt đầu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ShiftTimeStart",
          data: [
            {
              value: "07:00",
              display: "07:00"
            },
            {
              value: "12:00",
              display: "12:00"
            },
            {
              value: "18:00",
              display: "18:00"
            },
          ]
        }),
        "txtShiftTimeStartEnd": new Combobox({
          fieldText: "Giờ kết thúc",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ShiftTimeStartEnd",
          data: [
            {
              value: "12:00",
              display: "12:00"
            },
            {
              value: "18:00",
              display: "18:00"
            },
            {
              value: "22:00",
              display: "22:00"
            },
          ]
        }),
        "txtShiftStatus": new Combobox({
          fieldText: "Trạng thái",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ShiftStatus",
          data: [
            {
              value: "Đang hoạt động",
              display: "Đang hoạt động"
            },
            {
              value: "Ngừng hoạt động",
              display: "Ngừng hoạt động"
            }
          ]
        })
      }
    },
    saveData() {
      const me = this;
      let listShiftRecord: Array<ShiftRecord> | null = new Array<ShiftRecord>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['shiftId'] = Guid.NewGuid();
          listShiftRecord = LocalStorageLibrary.getByKey<Array<ShiftRecord>>("ShiftRecord");
          if (listShiftRecord) {
            listShiftRecord.push(me.masterData);
            LocalStorageLibrary.setByKey("ShiftRecord", listShiftRecord);
          }
          else {
            listShiftRecord = new Array<ShiftRecord>({ ...me.masterData });
            LocalStorageLibrary.setByKey("ShiftRecord", listShiftRecord);
          }
        }
        if (me.masterData.editMode == 2) {
          listShiftRecord = LocalStorageLibrary.getByKey<Array<ShiftRecord>>("ShiftRecord");
          if (listShiftRecord) {
            listShiftRecord.forEach(newItemRecord => {
              if (me.masterData) {
                if (newItemRecord.shiftId == me.masterData.shiftId) {
                  newItemRecord.ShiftName = me.masterData.ShiftName;
                  newItemRecord.ShiftTimeStart = me.masterData.ShiftTimeStart;
                  newItemRecord.ShiftTimeStartEnd = me.masterData.ShiftTimeStartEnd;
                  newItemRecord.ShiftStatus = me.masterData.ShiftStatus;
                }
              }
            });
            LocalStorageLibrary.setByKey("ShiftRecord", listShiftRecord);
          }
        }
      }
    },
    /**
    * Sau khi đóng form xong thì xử lý thêm gì ở master thì Override function này ở master
    */
    afterCloseForm() { },
  }

}
</script>
