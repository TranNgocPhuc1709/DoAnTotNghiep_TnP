<template src="./ProductListDictionary.html"></template>
<style lang="scss" scoped src="./ProductListDictionary.scss"></style>
<script lang="ts">
import ProductListDictionary from './ProductListDictionary';
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
    const thisData: Ref<ProductListDictionary> = ref(new ProductListDictionary());
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
          fieldText: "Mã Sản Phẩm",
          dataIndex: "Column1",
          // type: ControlType.Date,
          width: 120,
        }),
        new Column({
          fieldText: "Tên Sản Phẩm",
          dataIndex: "Column2",
          width: 260
        }),
        new Column({
          fieldText: "Nhóm Sản Phẩm",
          dataIndex: "Column3",
          width: 160
        }),
        new Column({
          fieldText: "Đơn Vị Tính",
          dataIndex: "Column4",
          width: 100
        }),
        new Column({
          fieldText: "Giá bán",
          dataIndex: "Column12",
          minWidth: 180,
          flex: 1
        }),
        new Column({
          fieldText: "Hiển thị trên trang bán hàng",
          dataIndex: "Column6",
          width: 180

        }),
        new Column({
          fieldText: "Trạng thái",
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
          Column1: "AN01",
          Column2: "Áo Nam Polo",
          Column3: "Quần Áo",
          Column4: "Chiếc",
          Column5: "Giá",
          Column6: "Có",
          Column7: "Đang kinh doanh"
        },
        {
          Column1: "AN02",
          Column2: "Áo khoác nỉ",
          Column3: "Quần Áo",
          Column4: "Chiếc",
          Column5: "Giá",
          Column6: "Không",
          Column7: "Ngừng kinh doanh"
        },
        {
          Column1: "GD01",
          Column2: "Giày Jordan",
          Column3: "Giày dép",
          Column4: "đôi",
          Column5: "giá",
          Column6: "Có",
          Column7: "Đang kinh doanh"
        }
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
      const frmDetail = (await import(`../product-detail/ProductDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
