<template src="./UnitListDictionary.html"></template>
<style lang="scss" scoped src="./UnitListDictionary.scss"></style>
<script lang="ts">
import UnitListDictionary from './UnitListDictionary';
import { Ref, ref } from 'vue';
import BaseDictionaryListView from 'qlch_base/BaseDictionaryListView';
import BaseDictionaryListController from 'qlch_base/BaseDictionaryListController';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';

export default {

  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
  },
  setup() {
    const thisData: Ref<UnitListDictionary> = ref(new UnitListDictionary());
    return { thisData };
  },
  methods: {

    /**
     * Tạo dòng mặc định
     */
    getTemplateRecord() {
      console.log("DEV: Override Function getTemplateRecord return new model()");
      return {};
    },

    /**
     * build danh sách cột cho grid chính
     */
    buildGridMasterColumn(): Array<Column> {
      console.log("DEV: Override Function buildGridMasterColumn return list Column in Grid");
      return Array(
        new Column({
          fieldText: "Đơn Vị Tính",
          dataIndex: "CodeUnitList",
          width: 120,
        }),
        new Column({
          fieldText: "Diễn Giải",
          dataIndex: "ExplainUnitList",
          width: 260
        }),
        new Column({
          fieldText: "Trạng Thái",
          dataIndex: "StatusUnitList",
          width: 260,
          flex: 1
        }),
      )
    },

    /**
     * Load dữ liệu master lên grid
     * @param param 
     */
    loadMasterData(param: ParamPaging) {
      console.log("Dev: Override function loadMasterData with param: " + JSON.stringify(param));
      return [
        {
          CodeUnitList: "Bó",
          ExplainUnitList: "Bó",
          StatusUnitList: "Đang theo dõi",
        },


      ];
    },

    /**
     * Set PrimaryKey cho object master
     */
    getPrimaryKeyMaster() {
      console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
      return "CodeUnitList";
    },

    /**
     * Khai báo import component detail
     * Override lại function after close form
     */
    async createComponent() {
      console.log("DEV: Override Function createComponent Vue component Detail");
      const frmDetail = (await import(`../unit-detail/UnitDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
