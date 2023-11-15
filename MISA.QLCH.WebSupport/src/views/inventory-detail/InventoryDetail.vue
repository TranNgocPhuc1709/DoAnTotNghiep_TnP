<template src="./InventoryDetail.html"></template>
<style lang="scss" scoped src="./InventoryDetail.scss"></style>
<script lang="ts">
import InventoryDetail from '@store-src/models/inventory/InventoryDetail';
import { PropType, Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import EDate from "qlch_control/EDate";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import ENumber from "qlch_control/ENumber";
import Inventory from '@store-src/models/inventory/Inventory';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Guid from '@library-src/utilities/types/Guid';
import Button from '@library-src/models/qlch_control/qlch_button/Button';
import EButton from "qlch_control/EButton";

export default {

  extends: BaseDictionaryDetailController,
  props: {
    masterData: {
      type: Object as PropType<Record<string, any>>,
      require: true
    }
  },
  components: {
    BaseDictionaryDetailView,
    ETextBox,
    EDate,
    ENumber,
    ECombobox,
    EButton
  },

  /**
     * tnphuc - 19.09.2023 
     */
  data() {
    const lstInventoryDetail: Ref<Array<InventoryDetail>> = ref(new Array<InventoryDetail>());
    const txtCodeProductInventory: Ref<Combobox> = ref(new Combobox({
      fieldText: "",
      require: false,
      maxLength: 255,
      data: [
        {
          value: "A123",
          display: "A123"
        },
        {
          value: "B123",
          display: "B123"
        }
      ],
      classType: "secondary"
    }));
    const txtNameProductInventory: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    const txtUnitProductInventory: Ref<Combobox> = ref(new Combobox({
      fieldText: "",
      require: false,
      maxLength: 255,
      data: [
        {
          value: "Chiếc",
          display: "Chiếc"
        },
        {
          value: "Bộ",
          display: "Bộ"
        }
      ],
      classType: "secondary"
    }));
    const txtBeginInventory: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    const txtUpdateInventory: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    const txtEndInventory: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      classType: "thirty",
      format: new NumberFormat({
        decimal: ".",
        thousands: ",",
        precision: 0
      }),
    }));
    const txtReasonInventory: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    const txtStatusInventory: Ref<Combobox> = ref(new Combobox({
      fieldText: "",
      require: false,
      maxLength: 255,
      data: [
        {
          value: "Nhập kho",
          display: "Nhập kho"
        },
        {
          value: "Xuất kho",
          display: "Xuất kho"
        }
      ],
      classType: "secondary"
    }));
    return {
      txtCodeProductInventory,
      txtNameProductInventory,
      txtUnitProductInventory,
      txtBeginInventory,
      txtUpdateInventory,
      txtEndInventory,
      txtReasonInventory,
      txtStatusInventory,
      lstInventoryDetail
    };
  },

  created() {
    try {
      console.log(this.masterData);
      //lấy giá trị khóa phụ trong masterData
      const me = this;
      if (me.masterData) {
        const privateKey = me.masterData['InventoryId'];
        if (privateKey) {
          const localStorageInventoryDetail = LocalStorageLibrary.getByKey<Array<InventoryDetail>>("inventoryDetail");
          if (localStorageInventoryDetail && localStorageInventoryDetail.length > 0) {
            me.lstInventoryDetail = localStorageInventoryDetail.filter(item => {
              return item.InventoryId == privateKey;
            })
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

  },

  setup() {
    const thisData: Ref<InventoryDetail> = ref(new InventoryDetail());
    const btnAddListTable: Button = new Button({
      fieldText: "Thêm dòng",
      classType: "primary"
    });
    const btnDelListTable: Button = new Button({
      fieldText: "Xóa dòng",
      classType: "secondary"
    });
    return {
      thisData,
      btnAddListTable,
      btnDelListTable
    };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm mới phiếu kiểm kê kho";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtDateInventory": new DateModel({
          fieldText: "Ngày kiểm kê",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DateInventory"
        }),
        "txtVotesInventory": new TextBox({
          fieldText: "Số phiếu kiểm kê",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "VotesInventory"
        }),
        "txtWarehouseInventory": new Combobox({
          fieldText: "Kho kiểm kê",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "Kho 1",
              display: "Kho 1"
            },
            {
              value: "Kho 2",
              display: "Kho 2"
            }
          ],
          bindingIndex: "WarehouseInventory"
        }),
        "txtExplantInventory": new TextBox({
          fieldText: "Diễn giải",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "ExplantInventory"
        }),
        // "txtStatusInventory": new TextBox({
        //   fieldText: "Trạng thái",
        //   require: false,
        //   maxLength: 255,
        //   labelWidth: labelWidth,
        //   bindingIndex: "StatusInventory"
        // }),
        "txtTotalBeginInventory": new NumberModel({
          fieldText: "Tổng số lượng ban đầu",
          readOnly: true,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "TotalBeginInventory"
        }),
        "txtTotalUpdateInventory": new NumberModel({
          fieldText: "Tổng số lượng kiểm kê",
          readOnly: true,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "TotalUpdateInventory"
        }),
        "txtTotalEndInventory": new NumberModel({
          fieldText: "Tổng số lượng chênh lệch",
          readOnly: false,
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 0
          }),
          bindingIndex: "TotalEndInventory"
        })
      }
    },

    AddListTable() {
      try {
        const me = this;
        if (me.lstInventoryDetail?.length > 0) {
          me.lstInventoryDetail.push(new InventoryDetail());
        } else {
          me.lstInventoryDetail = new Array<InventoryDetail>({});
        }
      } catch (error) {
        console.log(error);
      }
    },
    DelListTable(item: InventoryDetail) {
      const me = this;
      if (item && me.lstInventoryDetail?.length > 0) {
        me.lstInventoryDetail = me.lstInventoryDetail.filter(detail => {
          return detail.InventoryDetailId != item.InventoryDetailId;
        })
      }
    },

    saveData() {
      const me = this;
      console.log(me.lstInventoryDetail);
      let listInventory: Array<Inventory> | null = new Array<Inventory>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['InventoryId'] = Guid.NewGuid();
          listInventory = LocalStorageLibrary.getByKey<Array<Inventory>>("inventoryList");
          if (listInventory) {
            listInventory.push(me.masterData);
            LocalStorageLibrary.setByKey("inventoryList", listInventory);
          }
          else {
            listInventory = new Array<Inventory>({ ...me.masterData });
            LocalStorageLibrary.setByKey("inventoryList", listInventory);
          }

          //cất detail
          //gán khoá phụ cho detail
          if (me.lstInventoryDetail?.length > 0) {
            me.lstInventoryDetail.forEach(detailItem => {
              if (me.masterData) {
                detailItem.InventoryId = me.masterData['InventoryId'];
              }
            });
            //end gán khoá phụ

            let listInventoryDetail: Array<InventoryDetail> | null = new Array<InventoryDetail>;
            listInventoryDetail = LocalStorageLibrary.getByKey<Array<InventoryDetail>>("inventoryDetail");
            if (listInventoryDetail) {
              listInventoryDetail.push(...me.lstInventoryDetail);
              LocalStorageLibrary.setByKey("inventoryDetail", listInventoryDetail);
            }
            else {
              listInventoryDetail = new Array<InventoryDetail>(...me.lstInventoryDetail);
              LocalStorageLibrary.setByKey("inventoryDetail", listInventoryDetail);
            }
          }
          //end cất detail
        }
        if (me.masterData.editMode == 2) {
          listInventory = LocalStorageLibrary.getByKey<Array<Inventory>>("inventoryList");
          if (listInventory) {
            listInventory.forEach(newItemInventory => {
              if (me.masterData) {
                if (newItemInventory.InventoryId == me.masterData.InventoryId) {
                  newItemInventory.DateInventory = me.masterData.DateInventory;
                  newItemInventory.VotesInventory = me.masterData.VotesInventory;
                  newItemInventory.WarehouseInventory = me.masterData.WarehouseInventory;
                  newItemInventory.ExplantInventory = me.masterData.ExplantInventory;
                  newItemInventory.TotalBeginInventory = me.masterData.TotalBeginInventory;
                  newItemInventory.TotalUpdateInventory = me.masterData.TotalUpdateInventory;
                  newItemInventory.TotalEndInventory = me.masterData.TotalEndInventory;
                }
              }
            });
            LocalStorageLibrary.setByKey("inventoryList", listInventory);
          }

          //cất detail
          //gán khoá phụ cho detail
          if (me.lstInventoryDetail?.length > 0) {
            me.lstInventoryDetail.forEach(detailItem => {
              if (me.masterData) {
                detailItem.InventoryId = me.masterData['InventoryId'];
              }
            });
            //end gán khoá phụ

            let listInventoryDetail: Array<InventoryDetail> | null = new Array<InventoryDetail>;
            listInventoryDetail = LocalStorageLibrary.getByKey<Array<InventoryDetail>>("inventoryDetail");
            if (listInventoryDetail) {
              listInventoryDetail = listInventoryDetail.filter(item => {
                if (me.masterData) {
                  return item.InventoryId != me.masterData['InventoryId'];
                }
              });
              listInventoryDetail.push(...me.lstInventoryDetail);
              LocalStorageLibrary.setByKey("inventoryDetail", listInventoryDetail);
            }
            else {
              listInventoryDetail = new Array<InventoryDetail>(...me.lstInventoryDetail);
              LocalStorageLibrary.setByKey("inventoryDetail", listInventoryDetail);
            }
          } else {
            let listInventoryDetail: Array<InventoryDetail> | null = new Array<InventoryDetail>;
            listInventoryDetail = LocalStorageLibrary.getByKey<Array<InventoryDetail>>("inventoryDetail");
            if (listInventoryDetail) {
              listInventoryDetail = listInventoryDetail.filter(item => {
                if (me.masterData) {
                  return item.InventoryId != me.masterData['InventoryId'];
                }
              });
              listInventoryDetail.push(...me.lstInventoryDetail);
              LocalStorageLibrary.setByKey("inventoryDetail", listInventoryDetail);
            }
          }
        }
      }
    },

    /**
    * Sau khi đóng form xong thì xử lý thêm gì ở master thì Override function này ở master
    */
    afterCloseForm() { },
  }

}
</script>
