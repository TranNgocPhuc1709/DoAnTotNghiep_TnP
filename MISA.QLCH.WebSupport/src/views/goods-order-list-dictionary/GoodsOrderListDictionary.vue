<template src="./GoodsOrderListDictionary.html"></template>
<style lang="scss" scoped src="./GoodsOrderListDictionary.scss"></style>
<script lang="ts">
import GoodsOrderListDictionary from './GoodsOrderListDictionary';
import { Ref, ref } from 'vue';
import BaseDictionaryListView from 'qlch_base/BaseDictionaryListView';
import BaseDictionaryListController from 'qlch_base/BaseDictionaryListController';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import Log from '@library-src/utilities/Log';
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import EDate from "qlch_control/EDate";
import Button from '@library-src/models/qlch_control/qlch_button/Button';
import EButton from "qlch_control/EButton";
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import GoodsOrder from '@store-src/models/goods-order/GoodsOrder';
import PopupLibrary from '@library-src/utilities/commons/PopupLibrary';
import ToolBarItemsView from '@library-src/models/qlch_base/tool_bar_items_view/ToolBarItemsView';
import NotificationPopupViewModel from '@library-src/models/qlch_notification/NotificationPopupViewModel';

export default {

  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
    ECombobox,
    EDate,
    EButton
  },
  data() {
    return {
      gridMasterColumns: [] as Column[],
      fullMoneyOrders: [] as number[], // Array to store FullMoneyOrder values
    };
  },
  setup() {
    const thisData: Ref<GoodsOrderListDictionary> = ref(new GoodsOrderListDictionary());
    const cbbGoodsOrder: Ref<Combobox> = ref(new Combobox({
      require: true,
      data: [
        {
          value: 1,
          display: "Tháng này"
        },
        {
          value: 2,
          display: "Tháng trước"
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
    const btnPrintData: Button = new Button({
      fieldText: "In dữ liệu",
      classType: "secondary",
      // classIconLeft: "i-add"
    });

    return {
      thisData,
      cbbGoodsOrder,
      dtBeginRequire,
      dtEndRequire,
      btnGetData,
      btnPrintData


    };
  },
  created() {
    try {
      const me = this;
      me.cbbGoodsOrder.value = 1;
      me.gridMasterColumns = me.buildGridMasterColumn();
      me.gridMasterColumns.forEach(column => {
        if (column.dataIndex === 'FullMoneyOrder') {
          // Gán giá trị tiền tệ
        }
      });
    } catch (error) {
      Log.ErrorLog(error as Error);
    }
  },
  methods: {
    formatCurrency(amount: number) {
      // Format the amount as currency (example: 100,000)
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD', // Adjust the currency code as needed
      }).format(amount);
    },
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
          fieldText: "Ngày đặt hàng",
          dataIndex: "DateOrder",
          width: 80,
        }),
        new Column({
          fieldText: "Số phiếu",
          dataIndex: "NumberOrder",
          width: 260
        }),
        new Column({
          fieldText: "Người đặt",
          dataIndex: "PersonOrderName",
          width: 260
        }),
        new Column({
          fieldText: "Nhà cung cấp",
          dataIndex: "SupplierNameOrder",
          width: 260
        }),
        new Column({
          fieldText: "Tổng tiền",
          dataIndex: "FullMoneyOrder",
          minWidth: 260,
          flex: 1
        }),
        new Column({
          fieldText: "Trạng thái",
          dataIndex: "StatusOrder",
          width: 160
        }),
        new Column({
          fieldText: "Diễn giải",
          dataIndex: "ExplainOrder",
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
      if (!LocalStorageLibrary.getByKey<Array<GoodsOrder>>("goodsOrder")) {
        return new Array<GoodsOrder>;
      }
      else {
        return LocalStorageLibrary.getByKey<Array<GoodsOrder>>("goodsOrder");
      }
    },

    /**
     * Set PrimaryKey cho object master
     */
    getPrimaryKeyMaster() {
      console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
      return "GoodsOrderId";
    },

    afterDelete(listMasterData: Array<Record<string, any>>) {
      LocalStorageLibrary.setByKey("goodsOrder", listMasterData);
    },

    async showInformationPending() {
      const infoNotification = new NotificationPopupViewModel({
        icon: "info",
        message: "Yêu cầu đang phát triển. Vui lòng thử lại sau!",
        toolBarItems: Array(
          new ToolBarItemsView({
            name: "btnOK",
            control: new Button({
              fieldText: "Đồng ý"
            })
          })
        )
      })

      const component = (await import(`qlch_control/ENotification`)).default;
      if (component && component.methods) {
        component.methods["onSelectAction"] = (item: ToolBarItemsView) => {
          Log.InfoLog(JSON.stringify(item));
        };
      };
      if (component) {
        PopupLibrary.createPopup(component, { "propView": infoNotification, "styleFrom": "min-width: 400px" });
      };
    },
    onClickUpdate() {
      try {
        const me = this;
        me.showInformationPending();
      } catch (error) {
        Log.ErrorLog(error as Error)
      }
    },




    /**
     * Khai báo import component detail
     * Override lại function after close form
     */
    async createComponent() {
      console.log("DEV: Override Function createComponent Vue component Detail");
      const frmDetail = (await import(`../goods-order-detail/GoodsOrderDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
