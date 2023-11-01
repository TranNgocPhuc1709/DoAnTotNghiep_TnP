<template src="./MonetaryFlowListDictionary.html"></template>
<style lang="scss" scoped src="./MonetaryFlowListDictionary.scss"></style>
<script lang="ts">
import MonetaryFlowListDictionary from './MonetaryFlowListDictionary';
import { Ref, ref } from 'vue';
import BaseDictionaryListView from 'qlch_base/BaseDictionaryListView';
import BaseDictionaryListController from 'qlch_base/BaseDictionaryListController';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import Button from '@library-src/models/qlch_control/qlch_button/Button';
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import ECombobox from "qlch_control/ECombobox";
import EDate from "qlch_control/EDate";
import Log from '@library-src/utilities/Log';
import EButton from "qlch_control/EButton";

export default {

  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
    EDate,
    EButton,
    ECombobox

  },
  setup() {
    const thisData: Ref<MonetaryFlowListDictionary> = ref(new MonetaryFlowListDictionary());
    const cbbMonetaryFlow: Ref<Combobox> = ref(new Combobox({
      require: true,
      data: [
        {
          value: 1,
          display: "Khác"
        },
        {
          value: 2,
          display: "Hôm nay"
        },
        {
          value: 3,
          display: "Tuần trước"
        },

      ]
      // require: true
    }));
    const dtBeginRequire: DateModel = new DateModel({
      fieldText: "Từ ngày",
      labelWidth: 60
    });
    const dtEndRequire: DateModel = new DateModel({
      fieldText: "Đến ngày",
      labelWidth: 60
    });

    const btnGetData: Button = new Button({
      fieldText: "Lấy dữ liệu",
      classType: "secondary",
      // classIconLeft: "i-add"
    });
    const btnExportData: Button = new Button({
      fieldText: "Xuất File Excel",
      classType: "secondary",

      // classIconLeft: "i-add"
    });
    const btnPrintData: Button = new Button({
      fieldText: "In Dữ Liệu",
      classType: "secondary",

      // classIconLeft: "i-add"
    });
    return {
      thisData,
      cbbMonetaryFlow,
      dtBeginRequire,
      dtEndRequire,
      btnGetData,
      btnExportData,
      btnPrintData

    };
  },
  created() {
    try {
      const me = this;
      me.cbbMonetaryFlow.value = 1;

    } catch (error) {
      Log.ErrorLog(error as Error);
    }
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
          fieldText: "Ngày mở ca",
          dataIndex: "Column1",
          width: 200,
        }),
        new Column({
          fieldText: "Giờ mở ca",
          dataIndex: "Column2",
          width: 100
        }),
        new Column({
          fieldText: "Ngày đóng ca",
          dataIndex: "Column3",
          width: 200
        }),
        new Column({
          fieldText: "Giờ đóng ca",
          dataIndex: "Column4",
          width: 100
        }),
        new Column({
          fieldText: "Ca làm việc",
          dataIndex: "Column5",
          minWidth: 120,

        }),
        new Column({
          fieldText: "Thu ngân",
          dataIndex: "Column6",
          width: 260
        }),
        new Column({
          fieldText: "Tiền đầu ca",
          dataIndex: "Column7",
          width: 180
        }),
        new Column({
          fieldText: "Tiền thu trong ca",
          dataIndex: "Column8",
          width: 180
        }),
        new Column({
          fieldText: "Tiền cuối ca",
          dataIndex: "Column9",
          width: 180
        }),
        new Column({
          fieldText: "Tiền bàn giao",
          dataIndex: "Column10",
          width: 180
        }),
        new Column({
          fieldText: "Chênh lệch",
          dataIndex: "Column11",
          width: 180
        }),
        new Column({
          fieldText: "Người nhận bàn giao",
          dataIndex: "Column12",
          width: 260
        }),
        new Column({
          fieldText: "Két tiền",
          dataIndex: "Column13",
          width: 260
        }),
        new Column({
          fieldText: "Ghi chú",
          dataIndex: "Column14",
          width: 260,
          flex: 1
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
          Column1: "25/7/2023",
          Column2: "07:00",
          Column3: "25/7/2023",
          Column4: "12:00",
          Column5: "Ca sáng",
          Column6: "TnP",
          Column7: "0",
          Column8: "120000",
          Column9: "120000",
          Column10: "120000",
          Column11: "0",
          Column12: "Misa",
          Column13: "Két cửa hàng",
          Column14: "Chuyển ca"
        },
        {
          Column1: "30/8/2023",
          Column2: "12:00",
          Column3: "30/8/2023",
          Column4: "17:00",
          Column5: "Ca chiều",
          Column6: "TnP",
          Column7: "0",
          Column8: "220000",
          Column9: "220000",
          Column10: "220000",
          Column11: "0",
          Column12: "Lisa",
          Column13: "Két cửa hàng",
          Column14: "Thay ca"
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
      const frmDetail = (await import(`../monetary-flow-detail/MonetaryFlowDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
