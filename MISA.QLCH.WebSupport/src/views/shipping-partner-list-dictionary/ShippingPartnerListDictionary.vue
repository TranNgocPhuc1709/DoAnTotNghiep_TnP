<template src="./ShippingPartnerListDictionary.html"></template>
<style lang="scss" scoped src="./ShippingPartnerListDictionary.scss"></style>
<script lang="ts">
import ShippingPartnerListDictionary from './ShippingPartnerListDictionary';
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
    const thisData: Ref<ShippingPartnerListDictionary> = ref(new ShippingPartnerListDictionary());
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
          fieldText: "Mã ĐT giao hàng",
          dataIndex: "Column1",
          width: 120,
        }),
        new Column({
          fieldText: "Tên ĐT giao hàng",
          dataIndex: "Column2",
          width: 260
        }),
        new Column({
          fieldText: "Điện thoại",
          dataIndex: "Column3",
          width: 260
        }),
        new Column({
          fieldText: "Địa chỉ",
          dataIndex: "Column4",
          width: 260
        }),
        new Column({
          fieldText: "Trạng thái",
          dataIndex: "Column5",
          minWidth: 260,
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
          Column1: "DTGH_001",
          Column2: "Shoppe",
          Column3: "0123456789",
          Column4: "Bắc Từ Liêm, Hà Nội",
          Column5: "Đang theo dõi",

        },
        {
          Column1: "DTGH_002",
          Column2: "Lazada",
          Column3: "0123456789",
          Column4: "Nam Từ Liêm, Hà Nội",
          Column5: "Ngừng theo dõi",

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
      const frmDetail = (await import(`../shipping-partner-detail/ShippingPartnerDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
