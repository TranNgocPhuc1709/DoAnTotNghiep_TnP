<template src="./ImportListDictionary.html"></template>
<style lang="scss" scoped src="./ImportListDictionary.scss"></style>
<script lang="ts">
import ImportListDictionary from './ImportListDictionary';
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
import Import from '@store-src/models/import/Import';
import PopupLibrary from '@library-src/utilities/commons/PopupLibrary';
import NotificationPopupViewModel from '@library-src/models/qlch_notification/NotificationPopupViewModel';
import ToolBarItemsView from '@library-src/models/qlch_base/tool_bar_items_view/ToolBarItemsView';

export default {

  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
    ECombobox,
    EDate,
    EButton
  },
  setup() {
    const thisData: Ref<ImportListDictionary> = ref(new ImportListDictionary());
    const cbbImport: Ref<Combobox> = ref(new Combobox({
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
      cbbImport,
      dtBeginRequire,
      dtEndRequire,
      btnGetData,
      btnPrintData
    };
  },
  created() {
    try {
      const me = this;

      me.cbbImport.value = 1;


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
          fieldText: "Ngày nhập",
          dataIndex: "DateImport",
          width: 80,
        }),
        new Column({
          fieldText: "Số phiếu nhập",
          dataIndex: "ReceiptNumberImport",
          width: 260
        }),
        new Column({
          fieldText: "Nhà cung cấp",
          dataIndex: "SupplierNameImport",
          width: 260
        }),
        new Column({
          fieldText: "Thành tiền",
          dataIndex: "TotalPaymentImport",
          width: 260
        }),
        new Column({
          fieldText: "Nhân viên mua hàng",
          dataIndex: "StaffNameImport",
          minWidth: 260,
          flex: 1
        }),
        new Column({
          fieldText: "Diễn giải",
          dataIndex: "ExplainImport",
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
      if (!LocalStorageLibrary.getByKey<Array<Import>>("importList")) {
        return new Array<Import>;
      }
      else {
        return LocalStorageLibrary.getByKey<Array<Import>>("importList");
      }
    },
    /**
        * Thực hiện chức năng xóa trên Toolbar
        * @param listSelectedRecord 
        */
    afterDelete(listMasterData: Array<Record<string, any>>) {
      LocalStorageLibrary.setByKey("importList", listMasterData);
    },
    /**
     * Set PrimaryKey cho object master
     */
    getPrimaryKeyMaster() {
      console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
      return "ImportId";
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
      const frmDetail = (await import(`../import-detail/ImportDetail.vue`)).default;
      return frmDetail;
    },
  }

}
</script>
