<template src="./CustomercategoryListDictionary.html"></template>
<style lang="scss" scoped src="./CustomercategoryListDictionary.scss"></style>
<script lang="ts">
import CustomercategoryListDictionary from './CustomercategoryListDictionary';
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
    const thisData: Ref<CustomercategoryListDictionary> = ref(new CustomercategoryListDictionary());
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
          fieldText: "Mã nhóm khách hàng",
          dataIndex: "Column1",
          width: 150,
        }),
        new Column({
          fieldText: "Tên nhóm khách hàng",
          dataIndex: "Column2",
          width: 260
        }),
        new Column({
          fieldText: "Mô tả",
          dataIndex: "Column3",
          width: 260
        }),
        new Column({
          fieldText: "Trạng thái",
          dataIndex: "Column4",
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
          Column1: "KH001",
          Column2: "Khách Hàng Thân Thiết",
          Column3: "Nhóm được ưu tiên thứ 2",
          Column4: "Đang theo dõi",
        },
        {
          Column1: "KH002",
          Column2: "Khách Hàng V.I.P",
          Column3: "Nhóm được ưu tiên hàng đầu",
          Column4: "Ngừng theo dõi",
        },
      ];
    },

    /**
     * Set PrimaryKey cho object master
     */
    getPrimaryKeyMaster() {
      console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
      return "Column1";
    },

    /**
     * Khai báo import component detail
     * Override lại function after close form
     */
    async createComponent() {
      console.log("DEV: Override Function createComponent Vue component Detail");
      const frmDetail = (await import(`../customercategory-detail/CustomercategoryDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
