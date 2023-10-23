<template src="./InwardListDictionary.html"></template>
<style lang="scss" scoped src="./InwardListDictionary.scss"></style>
<script lang="ts">
import InwardListDictionary from './InwardListDictionary';
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
    const thisData: Ref<InwardListDictionary> = ref(new InwardListDictionary());
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
          fieldText: "Ngày",
          dataIndex: "Column1",
          width: 120,
        }),
        new Column({
          fieldText: "Số phiếu nhập",
          dataIndex: "Column2",
          width: 260
        }),
        new Column({
          fieldText: "Đối tượng",
          dataIndex: "Column3",
          width: 260
        }),
        new Column({
          fieldText: "Tổng tiền",
          dataIndex: "Column4",
          width: 260
        }),
        new Column({
          fieldText: "Diễn giải ",
          dataIndex: "Column5",
          minWidth: 260,
          flex: 1
        }),
        new Column({
          fieldText: "Lý do",
          dataIndex: "Column6",
          width: 160
        }),
        new Column({
          fieldText: "Loại chứng từ",
          dataIndex: "Column7",
          width: 160
        })
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
          Column1: "17/9/2023",
          Column2: "PNH123",
          Column3: "Công Ty Cổ Phần MiSA",
          Column4: "100000",
          Column5: "Hàng mới nhập",
          Column6: "hết hàng",
          Column7: "Phiếu nhập hàng"
        },
        {
          Column1: "20/9/2023",
          Column2: "PNH100002",
          Column3: "Công Ty Cổ Phần Giải Pháp Hà Minh",
          Column4: "200000",
          Column5: "Hàng mới nhập",
          Column6: "hết hàng",
          Column7: "Phiếu nhập hàng"
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
      const frmDetail = (await import(`../inward-detail/InwardDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
