<template src="./UnitDetail.html"></template>
<style lang="scss" scoped src="./UnitDetail.scss"></style>
<script lang="ts">
import UnitDetail from './UnitDetail';
import { PropType, Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Guid from '@library-src/utilities/types/Guid';
import Unit from '@store-src/models/unit/Unit';
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";

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
    const thisData: Ref<UnitDetail> = ref(new UnitDetail());
    return { thisData };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm mới đơn vị tính";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtCodeUnitList": new TextBox({
          fieldText: "Đơn Vị Tính",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "CodeUnitList",

        }),
        "txtExplainUnitList": new TextBox({
          fieldText: "Diễn Giải",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ExplainUnitList",
        }),
        "txtStatusUnitList": new Combobox({
          fieldText: "Trạng thái",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "Đang hoạt động",
              display: "Đang hoạt động"
            },

            {
              value: "Ngừng hoạt động",
              display: "Ngừng hoạt động"
            }
          ],
          bindingIndex: "StatusUnitList",
        }),
      }
    },

    saveData() {
      const me = this;
      let listUnit: Array<Unit> | null = new Array<Unit>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['unitId'] = Guid.NewGuid();
          listUnit = LocalStorageLibrary.getByKey<Array<Unit>>("Unit");
          if (listUnit) {
            listUnit.push(me.masterData);
            LocalStorageLibrary.setByKey("Unit", listUnit);
          }
          else {
            listUnit = new Array<Unit>({ ...me.masterData });
            LocalStorageLibrary.setByKey("Unit", listUnit);
          }
        }
        if (me.masterData.editMode == 2) {
          listUnit = LocalStorageLibrary.getByKey<Array<Unit>>("Unit");
          if (listUnit) {
            listUnit.forEach(newItemUnit => {
              if (me.masterData) {
                if (newItemUnit.unitId == me.masterData.unitId) {
                  newItemUnit.CodeUnitList = me.masterData.CodeUnitList;
                  newItemUnit.ExplainUnitList = me.masterData.ExplainUnitList;
                  newItemUnit.StatusUnitList = me.masterData.StatusUnitList;
                }
              }
            });
            LocalStorageLibrary.setByKey("Unit", listUnit);
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
