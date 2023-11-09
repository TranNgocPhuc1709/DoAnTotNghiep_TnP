<template src="./CategoryItemListDictionary.html"></template>
<style lang="scss" scoped src="./CategoryItemListDictionary.scss"></style>
<script lang="ts">
import CategoryItemListDictionary from './CategoryItemListDictionary';
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
    const thisData: Ref<CategoryItemListDictionary> = ref(new CategoryItemListDictionary());
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
          fieldText: "Mã Nhóm Hàng Hóa",
          dataIndex: "CodeGroupCategory",
          width: 120,
        }),
        new Column({
          fieldText: "Tên Nhóm Hàng Hóa",
          dataIndex: "NameGroupCategory",
          width: 260
        }),
        new Column({
          fieldText: "Mô Tả",
          dataIndex: "DescribeCategory",
          width: 260
        }),
        new Column({
          fieldText: "Trạng Thái",
          dataIndex: "StatusCategory",
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
          CodeGroupCategory: "001",
          NameGroupCategory: "Dép Lê",
          DescribeCategory: "Hàng Mới Về",
          StatusCategory: "Đang Kinh Doanh",
        },

      ];
    },

    /**
     * Set PrimaryKey cho object master
     */
    getPrimaryKeyMaster() {
      console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
      return "CodeGroupCategory";
    },

    /**
     * Khai báo import component detail
     * Override lại function after close form
     */
    async createComponent() {
      console.log("DEV: Override Function createComponent Vue component Detail");
      const frmDetail = (await import(`../category-item-detail/CategoryItemDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
