<template src="./VoucherDetail.html"></template>
<style lang="scss" scoped src="./VoucherDetail.scss"></style>
<script lang="ts">
import VoucherDetail from './VoucherDetail';
import { PropType, Ref, ref } from 'vue';
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import EDate from "qlch_control/EDate";
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import ENumber from "qlch_control/ENumber";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import Voucher from '@store-src/models/voucher/Voucher';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Guid from '@library-src/utilities/types/Guid';


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
    ECombobox

  },

  setup() {
    const thisData: Ref<VoucherDetail> = ref(new VoucherDetail());
    return { thisData };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Thêm mới Voucher";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtPublisherVoucher": new TextBox({
          fieldText: "Nhà phát hành",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "PublisherVoucher"
        }),
        "txtNameVoucher": new TextBox({
          fieldText: "Tên Voucher",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "NameVoucher"
        }),
        "txtDayBeginVoucher": new DateModel({
          fieldText: "Ngày bắt đầu",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DayBeginVoucher"
        }),
        "txtDayEndVoucher": new DateModel({
          fieldText: "Ngày kết thúc",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DayEndVoucher"
        }),
        "txtDescribeVoucher": new TextBox({
          fieldText: "Mô tả",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "DescribeVoucher"
        }),
        "txtPriceVoucher": new NumberModel({
          fieldText: "Mệnh giá Voucher",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 2
          }),
          bindingIndex: "PriceVoucher"
        }),
        "txtTotalNumberVoucher": new TextBox({
          fieldText: "Tổng số lượng Voucher được sử dụng",
          require: false,
          maxLength: 255,
          type: "number",
          labelWidth: labelWidth,
          bindingIndex: "TotalNumberVoucher"
        }),
        "txtTotalPriceVoucher": new NumberModel({
          fieldText: "Tổng giá trị voucher đã sử dụng",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          format: new NumberFormat({
            decimal: ".",
            thousands: ",",
            precision: 2
          }),
          bindingIndex: "TotalPriceVoucher"
        }),
        "txtStatusVoucher": new Combobox({
          fieldText: "Trạng thái",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          data: [
            {
              value: "Đang hoạt động",
              display: "Đang hoạt động"
            },
            {
              value: "Ngừng hoạt động",
              display: "Ngừng hoạt động"
            },
          ],
          bindingIndex: "StatusVoucher"
        }),
      }
    },

    saveData() {
      const me = this;
      let listVoucher: Array<Voucher> | null = new Array<Voucher>;
      if (me.masterData) {
        if (me.masterData.editMode == 1 || me.masterData.editMode == 4) {
          me.masterData['VoucherId'] = Guid.NewGuid();
          listVoucher = LocalStorageLibrary.getByKey<Array<Voucher>>("voucher");
          if (listVoucher) {
            listVoucher.push(me.masterData);
            LocalStorageLibrary.setByKey("voucher", listVoucher);
          }
          else {
            listVoucher = new Array<Voucher>({ ...me.masterData });
            LocalStorageLibrary.setByKey("voucher", listVoucher);
          }
        }
        if (me.masterData.editMode == 2) {
          listVoucher = LocalStorageLibrary.getByKey<Array<Voucher>>("voucher");
          if (listVoucher) {
            listVoucher.forEach(newItemVoucher => {
              if (me.masterData) {
                if (newItemVoucher.VoucherId == me.masterData.VoucherId) {
                  newItemVoucher.PublisherVoucher = me.masterData.PublisherVoucher;
                  newItemVoucher.NameVoucher = me.masterData.NameVoucher;
                  newItemVoucher.DayBeginVoucher = me.masterData.DayBeginVoucher;
                  newItemVoucher.DayEndVoucher = me.masterData.DayEndVoucher;
                  newItemVoucher.DescribeVoucher = me.masterData.DescribeVoucher;
                  newItemVoucher.PriceVoucher = me.masterData.PriceVoucher;
                  newItemVoucher.TotalNumberVoucher = me.masterData.TotalNumberVoucher;
                  newItemVoucher.TotalPriceVoucher = me.masterData.TotalPriceVoucher;
                  newItemVoucher.StatusVoucher = me.masterData.StatusVoucher;

                }
              }
            });
            LocalStorageLibrary.setByKey("voucher", listVoucher);
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
