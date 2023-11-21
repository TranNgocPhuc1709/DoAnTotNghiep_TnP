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
import DictionaryStock from '@store-src/models/dictionary-stock/DictionaryStock';
import Product from '@store-src/models/product/Product';
import ImportDetail from '@store-src/models/import/ImportDetail';
import ReturnDetail from '@store-src/models/return/ReturnDetail';
import InwardDetail from '@store-src/models/inward/InwardDetail';
import OutwardDetail from '@store-src/models/outward/OutwardDetail';

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
    const lstCodeProductInventory = LocalStorageLibrary.getByKey<Array<Product>>("Product") ?? new Array<Product>();
    const txtCodeProductInventory: Ref<Combobox> = ref(new Combobox({
      fieldText: "",
      require: false,
      maxLength: 255,
      data: lstCodeProductInventory,
      valueField: "CodeProductList",
      displayField: "CodeProductList",
      classType: "secondary"
    }));
    const txtNameProductInventory: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    const txtUnitProductInventory: Ref<TextBox> = ref(new TextBox({
      fieldText: "",
      require: false,
      maxLength: 255,
      classType: "tertiary"
    }));
    const txtBeginInventory: Ref<NumberModel> = ref(new NumberModel({
      fieldText: "",
      readOnly: true,
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
      readOnly: true,
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
      const lstWarehouseInventory = LocalStorageLibrary.getByKey<Array<DictionaryStock>>("dictionaryStock") ?? new Array<DictionaryStock>();
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
          data: lstWarehouseInventory,
          valueField: "NameStore",
          displayField: "NameStore",
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
          readOnly: true,
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

    ShowPaymentInventory(value: number, item: InventoryDetail) {
      const me = this;
      if (item.BeginInventory) {
        item.EndInventory = item.BeginInventory - value;
      }

      // Tính các giá trị tổng 
      if (me.masterData) {
        me.masterData['TotalBeginInventory'] = 0;
        me.masterData['TotalUpdateInventory'] = 0;
        me.masterData['TotalEndInventory'] = 0;
      }

      for (let index = 0; index < me.lstInventoryDetail.length; index++) {
        const element = me.lstInventoryDetail[index];
        if (me.masterData && element) {

          me.masterData['TotalBeginInventory'] += element.BeginInventory ?? 0;
          me.masterData['TotalUpdateInventory'] += element.UpdateInventory ?? 0;
          me.masterData['TotalEndInventory'] += element.EndInventory ?? 0;
        }
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
      // Tính các giá trị tổng 
      if (me.masterData) {
        me.masterData['TotalBeginInventory'] = 0;
        me.masterData['TotalUpdateInventory'] = 0;
        me.masterData['TotalEndInventory'] = 0;
      }

      for (let index = 0; index < me.lstInventoryDetail.length; index++) {
        const element = me.lstInventoryDetail[index];
        if (me.masterData && element) {

          me.masterData['TotalBeginInventory'] += element.BeginInventory ?? 0;
          me.masterData['TotalUpdateInventory'] += element.UpdateInventory ?? 0;
          me.masterData['TotalEndInventory'] += element.EndInventory ?? 0;
        }
      }
    },

    ShowNameProduct(value: any, item: InventoryDetail) {
      const me = this;
      const listProduct = LocalStorageLibrary.getByKey<Array<Product>>("Product");
      if (listProduct && listProduct.length > 0 && me.masterData) {
        // const vendorCode = me.masterData['SupplierOrder'];
        if (value) {
          let rowProductByProductCode = new Product();
          for (let index = 0; index < listProduct.length; index++) {
            const rowProductDetail = listProduct[index];
            if (rowProductDetail.CodeProductList == value) {
              rowProductByProductCode = rowProductDetail;
              break;
            }
          }
          if (rowProductByProductCode) {
            item.NameProductInventory = rowProductByProductCode.NameProductList;
            item.UnitProductInventory = rowProductByProductCode.UnitProductList;
          }
        }
      }

      //Lấy số lượng hàng trong kho (Thêm Hàng Hóa)
      const listImportDetail = LocalStorageLibrary.getByKey<Array<ImportDetail>>("importDetail");
      if (listImportDetail && listImportDetail.length > 0 && me.masterData) {
        const WareHouse = me.masterData['WarehouseInventory'];
        item.BeginInventory = 0;
        for (let index = 0; index < listImportDetail.length; index++) {
          const element = listImportDetail[index];
          if (element.CodeProductImport == value && element.WarehouseProductImport == WareHouse && element.NumberProductImport) {
            item.BeginInventory += element.NumberProductImport;

          }
        }
      }

      //Lấy số lượng hàng trong kho (Trả lại Hàng Hóa)
      const listReturnDetail = LocalStorageLibrary.getByKey<Array<ReturnDetail>>("returnDetail");
      if (listReturnDetail && listReturnDetail.length > 0 && me.masterData) {
        const WareHouseReturn = me.masterData['WarehouseInventory'];
        // item.BeginInventory = 0;
        for (let index = 0; index < listReturnDetail.length; index++) {
          const elementReturn = listReturnDetail[index];
          if (item.BeginInventory && elementReturn.CodeProductReturn == value && elementReturn.WarehouseProductReturn == WareHouseReturn && elementReturn.NumberProductReturn) {
            item.BeginInventory -= elementReturn.NumberProductReturn;
          }
        }
      }

      //Thêm hàng mới (Nhập kho)
      const listInwardDetail = LocalStorageLibrary.getByKey<Array<InwardDetail>>("inwardDetail");
      if (listInwardDetail && listInwardDetail.length > 0 && me.masterData) {
        const WareHouseInward = me.masterData['WarehouseInventory'];
        // item.BeginInventory = 0;
        for (let index = 0; index < listInwardDetail.length; index++) {
          const elementInward = listInwardDetail[index];
          if (item.BeginInventory && elementInward.CodeProductInward == value && elementInward.WarehouseProductInward == WareHouseInward && elementInward.NumberProductInward) {
            item.BeginInventory += elementInward.NumberProductInward;
          }
        }
      }
      //Bớt hàng hóa (Xuất kho)
      const listOutwardDetail = LocalStorageLibrary.getByKey<Array<OutwardDetail>>("outwardDetail");
      if (listOutwardDetail && listOutwardDetail.length > 0 && me.masterData) {
        const WareHouseOutward = me.masterData['WarehouseInventory'];
        // item.BeginInventory = 0;
        for (let index = 0; index < listOutwardDetail.length; index++) {
          const elementOutward = listOutwardDetail[index];
          if (item.BeginInventory && elementOutward.CodeProductOutWard == value && elementOutward.WarehouseProductOutWard == WareHouseOutward && elementOutward.NumberProductOutWard) {
            item.BeginInventory -= elementOutward.NumberProductOutWard;
          }
        }
      }

    },

    SelectWareHouse(item: string) {
      const me = this;
      if (me.lstInventoryDetail) {
        for (let indexListDetail = 0; indexListDetail < me.lstInventoryDetail.length; indexListDetail++) {
          const elementListDetail = me.lstInventoryDetail[indexListDetail]; //Dòng chi tiết
          elementListDetail.BeginInventory = 0;
        }
      }

      //Nhập Hàng Hóa
      const listImportDetail = LocalStorageLibrary.getByKey<Array<ImportDetail>>("importDetail");
      if (listImportDetail && listImportDetail.length > 0) {
        for (let index = 0; index < listImportDetail.length; index++) {
          const element = listImportDetail[index]; ///Dòng Nhập Hàng
          if (element.WarehouseProductImport == item && me.lstInventoryDetail) {
            for (let indexListDetail = 0; indexListDetail < me.lstInventoryDetail.length; indexListDetail++) {
              const elementListDetail = me.lstInventoryDetail[indexListDetail]; //Dòng chi tiết
              if (elementListDetail.CodeProductInventory == element.CodeProductImport && element.NumberProductImport) {
                elementListDetail.BeginInventory = elementListDetail.BeginInventory ?? 0;
                elementListDetail.BeginInventory += element.NumberProductImport;
              }
            }
          }
        }
      }
      //Trả Lại Hàng Hóa
      const listReturnDetail = LocalStorageLibrary.getByKey<Array<ReturnDetail>>("returnDetail");
      if (listReturnDetail && listReturnDetail.length > 0) {
        for (let index = 0; index < listReturnDetail.length; index++) {
          const elementReturn = listReturnDetail[index]; ///Dòng Nhập Hàng
          if (elementReturn.WarehouseProductReturn == item && me.lstInventoryDetail) {
            for (let indexListDetail = 0; indexListDetail < me.lstInventoryDetail.length; indexListDetail++) {
              const elementListReturnDetail = me.lstInventoryDetail[indexListDetail]; //Dòng chi tiết
              if (elementListReturnDetail.CodeProductInventory == elementReturn.CodeProductReturn && elementReturn.NumberProductReturn) {
                elementListReturnDetail.BeginInventory = elementListReturnDetail.BeginInventory ?? 0;
                elementListReturnDetail.BeginInventory -= elementReturn.NumberProductReturn;
              }
            }
          }
        }
      }

      //Nhập kho
      const listInwardDetail = LocalStorageLibrary.getByKey<Array<InwardDetail>>("inwardDetail");
      if (listInwardDetail && listInwardDetail.length > 0) {
        for (let index = 0; index < listInwardDetail.length; index++) {
          const elementInward = listInwardDetail[index]; ///Dòng Nhập Hàng
          if (elementInward.WarehouseProductInward == item && me.lstInventoryDetail) {
            for (let indexListDetail = 0; indexListDetail < me.lstInventoryDetail.length; indexListDetail++) {
              const elementListInwardDetail = me.lstInventoryDetail[indexListDetail]; //Dòng chi tiết
              if (elementListInwardDetail.CodeProductInventory == elementInward.CodeProductInward && elementInward.NumberProductInward) {
                elementListInwardDetail.BeginInventory = elementListInwardDetail.BeginInventory ?? 0;
                elementListInwardDetail.BeginInventory += elementInward.NumberProductInward;
              }
            }
          }
        }
      }

      //Xuất kho
      const listOutwardDetail = LocalStorageLibrary.getByKey<Array<OutwardDetail>>("outwardDetail");
      if (listOutwardDetail && listOutwardDetail.length > 0) {
        for (let index = 0; index < listOutwardDetail.length; index++) {
          const elementOutward = listOutwardDetail[index]; ///Dòng Nhập Hàng
          if (elementOutward.WarehouseProductOutWard == item && me.lstInventoryDetail) {
            for (let indexListDetail = 0; indexListDetail < me.lstInventoryDetail.length; indexListDetail++) {
              const elementListOutwardDetail = me.lstInventoryDetail[indexListDetail]; //Dòng chi tiết
              if (elementListOutwardDetail.CodeProductInventory == elementOutward.CodeProductOutWard && elementOutward.NumberProductOutWard) {
                elementListOutwardDetail.BeginInventory = elementListOutwardDetail.BeginInventory ?? 0;
                elementListOutwardDetail.BeginInventory -= elementOutward.NumberProductOutWard;
              }
            }
          }
        }
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
