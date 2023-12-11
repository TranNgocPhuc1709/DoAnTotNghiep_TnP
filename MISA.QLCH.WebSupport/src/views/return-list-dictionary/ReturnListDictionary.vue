<template src="./ReturnListDictionary.html"></template>
<style lang="scss" scoped src="./ReturnListDictionary.scss"></style>
<script lang="ts">
import ReturnListDictionary from './ReturnListDictionary';
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
import Return from '@store-src/models/return/Return';
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
  setup() {
    const thisData: Ref<ReturnListDictionary> = ref(new ReturnListDictionary());
    const cbbReturn: Ref<Combobox> = ref(new Combobox({
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
      cbbReturn,
      dtBeginRequire,
      dtEndRequire,
      btnGetData,
      btnPrintData
    };
  },
  created() {
    try {
      const me = this;
      me.cbbReturn.value = 1;
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
          fieldText: "Ngày trả hàng",
          dataIndex: "DateReturn",
          width: 80,
        }),
        new Column({
          fieldText: "Số phiếu xuất",
          dataIndex: "BillNumberReturn",
          width: 260
        }),
        new Column({
          fieldText: "Nhà cung cấp",
          dataIndex: "NameSupplierReturn",
          width: 260
        }),
        new Column({
          fieldText: "Tổng tiền",
          dataIndex: "TotalMoneyReturn",
          width: 260
        }),
        new Column({
          fieldText: "Diễn giải",
          dataIndex: "ExplantReturn",
          minWidth: 260,
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
      if (!LocalStorageLibrary.getByKey<Array<Return>>("returnItem")) {
        return new Array<Return>;
      }
      else {
        return LocalStorageLibrary.getByKey<Array<Return>>("returnItem");
      }
    },
    /**
     * Thực hiện chức năng xóa trên Toolbar
     * @param listSelectedRecord 
     */
    afterDelete(listMasterData: Array<Record<string, any>>) {
      LocalStorageLibrary.setByKey("returnItem", listMasterData);
    },

    /**
     * Set PrimaryKey cho object master
     */
    getPrimaryKeyMaster() {
      console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
      return "ReturnId";
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
      const frmDetail = (await import(`../return-detail/ReturnDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
