<template src="./HomeStore.html"></template>
<style lang="scss"  src="./HomeStore.scss"></style>
<script lang="ts">
import { Ref, ref } from 'vue';
import Log from "@library-src/utilities/Log";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from "qlch_control/ECombobox";
import router from '@src/router';
import Checkbox from '@library-src/models/qlch_control/qlch_checkbox/Checkbox';
import ECheckbox from "qlch_control/ECheckbox";
import Button from '@library-src/models/qlch_control/qlch_button/Button';
import EButton from "qlch_control/EButton";
// import TextBox from '@library-src/models/qlch_control/qlch_text_box/TextBox';
import ETextBox from "qlch_control/ETextBox";
import TextBox from '@library-src/models/qlch_control/qlch_text_box/TextBox';
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import ENumber from "qlch_control/ENumber";
import DateModel from '@library-src/models/qlch_control/qlch_date/DateModel';
import EDate from "qlch_control/EDate";
import Product from '@store-src/models/product/Product';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import Employee from '@store-src/models/employee/Employee';
import Customer from '@store-src/models/customer/Customer';
import BankAccount from '@store-src/models/bank-account/BankAccount';
import Bank from '@store-src/models/bank/Bank';
import Voucher from '@store-src/models/voucher/Voucher';
import ProductDetail from '@store-src/models/product/ProductDetail';
import Bill from '@store-src/models/bill-main/Bill';
import PopupLibrary from '@library-src/utilities/commons/PopupLibrary';
import Guid from '@library-src/utilities/types/Guid';
import BillDetail from '@store-src/models/bill-main/BillDetail';
// import VoucherDetail from '@store-src/models/voucher/VoucherDetail';
// import VoucherDetail from '../voucher-detail/VoucherDetail';
// import BankDetail from '@store-src/models/bank/BankDetail';

export default {

    components: {
        ECombobox,
        ECheckbox,
        EButton,
        ETextBox,
        ENumber,
        EDate
    },
    data() {
        const lstBillDetail: Ref<Array<BillDetail>> = ref(new Array<BillDetail>());
        const lstVoucher = LocalStorageLibrary.getByKey<Array<Voucher>>("voucher");
        const lstBank = LocalStorageLibrary.getByKey<Array<Bank>>("Bank");
        const lstBankAccount = LocalStorageLibrary.getByKey<Array<BankAccount>>("BankAccount");;
        const bill: Ref<Bill> = ref(new Bill());
        return {
            lstBillDetail,
            bill,
            lstVoucher,
            lstBank,
            lstBankAccount
        };
    },
    setup() {
        const disableFormLogOut: Ref<boolean> = ref(false);
        const DisableFormPayment: Ref<boolean> = ref(false);

        const isActive: Ref<boolean> = ref(false);
        const disableFormShowDelivery: Ref<boolean> = ref(false)
        const disableFormMoreAction: Ref<boolean> = ref(false);
        const disableFormShowVoucher: Ref<boolean> = ref(false);
        const lstCbbSearchProduct = LocalStorageLibrary.getByKey<Array<Product>>("Product") ?? new Array<Product>();
        const lstCbbAgentSales = LocalStorageLibrary.getByKey<Array<Employee>>("employee") ?? new Array<Employee>();
        const lstTxtInfoRecipient = LocalStorageLibrary.getByKey<Array<Customer>>("Customer") ?? new Array<Customer>();
        const lstCbbCheckPoint = LocalStorageLibrary.getByKey<Array<BankAccount>>("BankAccount") ?? new Array<BankAccount>();
        const lstCbbPayments = LocalStorageLibrary.getByKey<Array<Bank>>("Bank") ?? new Array<Bank>();
        const lstCbbVoucherItem = LocalStorageLibrary.getByKey<Array<Voucher>>("voucher") ?? new Array<Voucher>();
        const txtQuanTySearch: Ref<NumberModel> = ref(new NumberModel({
            classType: "thirty",
            format: new NumberFormat({
                decimal: ".",
                thousands: ",",
                precision: 0
            }),
        }));
        const txtPurchased: Ref<NumberModel> = ref(new NumberModel({
            classType: "secondary",
            format: new NumberFormat({
                decimal: ".",
                thousands: ",",
                precision: 0
            }),
        }));

        const txtInfoRecipient: Ref<Combobox> = ref(new Combobox({
            fieldText: "Người nhận",
            require: true,
            data: lstTxtInfoRecipient,
            valueField: "NameCustomer",
            displayField: "NameCustomer",
            labelWidth: 120,
            classType: "tertiary",
            placeholder: "Số điện thoại, Tên khách hàng"
        }));

        const txtNumberRecipient: Ref<TextBox> = ref(new TextBox({
            fieldText: "Số điện thoại",
            require: true,
            type: "number",
            classType: "secondary",
            labelWidth: 120,
        }));
        const txtAddressRecipient: Ref<TextBox> = ref(new TextBox({
            fieldText: "Địa chỉ",
            require: true,
            type: "text",
            classType: "secondary",
            labelWidth: 120,
            placeholder: "Số nhà, Tên nhà, Tên xóm,..."
        }));

        const dtDateDelivery: DateModel = new DateModel({
            fieldText: "Ngày giao hàng",
            require: true,
            labelWidth: 120
        });

        const txtDeliveryCharges: Ref<NumberModel> = ref(new NumberModel({
            fieldText: "Phí GH thu khách",
            require: true,
            classType: "secondary",
            labelWidth: 120,
            format: new NumberFormat({
                decimal: ".",
                thousands: ",",
                precision: 3
            }),
        }));

        const txtDeliveryPartner: Ref<Combobox> = ref(new Combobox({
            fieldText: "Đối tác GH",
            require: true,
            data: [
                {
                    value: "Đối tác Shoppe",
                    display: "Đối tác Shoppe"
                }
            ],
            classType: "tertiary",
            labelWidth: 120,

        }));

        const txtDeliveryService: Ref<Combobox> = ref(new Combobox({
            fieldText: "Loại dịch vụ",
            require: true,
            data: [
                {
                    value: "Giao hàng nhanh",
                    display: "Giao hàng nhanh"
                }
            ],
            classType: "tertiary",
            labelWidth: 120,

        }));
        const txtLadingCode: Ref<TextBox> = ref(new TextBox({
            fieldText: "Mã vận đơn",
            require: true,
            type: "text",
            classType: "secondary",
            labelWidth: 120,

        }));

        const btnAcceptForm: Button = new Button({
            fieldText: "Đồng ý",
            classType: "SaveBtn"
        });
        const btnCloseForm: Button = new Button({
            fieldText: "Đóng",
            classType: "CloseBtn"
        });

        const cbbVoucherItem: Ref<Combobox> = ref(new Combobox({
            fieldText: "Voucher",
            require: true,
            data: lstCbbVoucherItem,
            valueField: "NameVoucher",
            displayField: "NameVoucher",
            classType: "tertiary",
            labelWidth: 120,

        }));

        const numVoucherNumber: Ref<NumberModel> = ref(new NumberModel({
            fieldText: "Số lượng",
            classType: "secondary",
            format: new NumberFormat({
                decimal: ".",
                thousands: ",",
                precision: 3
            }),
            labelWidth: 120,
        }));
        const numVoucherPrice: Ref<NumberModel> = ref(new NumberModel({
            fieldText: "Mệnh giá",
            classType: "secondary",
            format: new NumberFormat({
                decimal: ".",
                thousands: ",",
                precision: 3
            }),
            labelWidth: 120,
        }));
        const numVoucherTotalPrice: Ref<NumberModel> = ref(new NumberModel({
            fieldText: "Tổng giá trị",
            classType: "secondary",
            format: new NumberFormat({
                decimal: ".",
                thousands: ",",
                precision: 3
            }),
            labelWidth: 120,
        }));

        const txtPrice: Ref<NumberModel> = ref(new NumberModel({
            classType: "secondary",
            format: new NumberFormat({
                decimal: ".",
                thousands: ",",
                precision: 0
            }),
        }));
        const txtPriceLast: Ref<NumberModel> = ref(new NumberModel({
            classType: "secondary",
            format: new NumberFormat({
                decimal: ".",
                thousands: ",",
                precision: 0
            }),
        }));
        const txtPayments: Ref<NumberModel> = ref(new NumberModel({
            classType: "secondary",
            format: new NumberFormat({
                decimal: ".",
                thousands: ",",
                precision: 0
            }),
        }));
        const txtAllPayments: Ref<NumberModel> = ref(new NumberModel({
            classType: "thirty",
            // readOnly: true,
            format: new NumberFormat({
                decimal: ".",
                thousands: ",",
                precision: 2
            }),
        }));
        const txtPromotion: Ref<NumberModel> = ref(new NumberModel({
            classType: "thirty",
            // readOnly: true,
            format: new NumberFormat({
                decimal: ".",
                thousands: ",",
                precision: 2
            }),
        }));
        const txtNotice: Ref<TextBox> = ref(new TextBox({
            fieldText: "",
            require: false,
            type: "text",
            classType: "secondary",
            placeholder: "Ghi chú"
        }));
        const cbbCheckPoint: Ref<Combobox> = ref(new Combobox({
            require: true,
            boxType: 'vbox',
            classType: "tertiary",
            data: lstCbbCheckPoint,
            valueField: "NameCardBank",
            displayField: "NameCardBank",
            placeholder: "Hình thức thu"
            // require: true
        }));
        const cbbPayments: Ref<Combobox> = ref(new Combobox({
            require: true,
            boxType: 'vbox',
            classType: "tertiary",
            data: lstCbbPayments,
            valueField: "NameAccount",
            displayField: "NameAccount",
            placeholder: "Ngân hàng"

            // require: true
        }));
        const txtAccountNumber: Ref<TextBox> = ref(new TextBox({
            fieldText: "",
            require: false,
            type: "text",
            classType: "secondary",
            placeholder: "Số tài khoản"
        }));
        const cbbSearchProduct: Ref<Combobox> = ref(new Combobox({
            require: false,
            boxType: 'vbox',
            classType: "secondary",
            placeholder: "Nhập tên hàng hóa, mã hàng hóa",
            data: lstCbbSearchProduct,
            valueField: "NameProductList",
            displayField: "NameProductList",
        }));
        const cbbAgentSales: Ref<Combobox> = ref(new Combobox({
            require: false,
            boxType: 'vbox',
            classType: "secondary",
            placeholder: "Nhân Viên Bán Hàng",
            data: lstCbbAgentSales,
            valueField: "NameEmployee",
            displayField: "NameEmployee",

            // require: true
        }));
        const cbbSelectCustomer: Ref<Combobox> = ref(new Combobox({
            require: false,
            boxType: 'vbox',
            classType: "secondary",
            placeholder: "Tên khách hàng",
            data: lstTxtInfoRecipient,
            valueField: "NameCustomer",
            displayField: "NameCustomer",
            // require: true
        }));
        const txtUnit: Ref<TextBox> = ref(new TextBox({
            require: false,
            boxType: 'vbox',
            classType: "tertiary",
            readOnly: false,

        }));
        const cbkBill: Ref<Checkbox> = ref(new Checkbox({
            fieldText: "In hóa đơn"
        }));
        const cbkOrder: Ref<Checkbox> = ref(new Checkbox({
            fieldText: "Đặt hàng"
        }));
        const btnTemporarySave: Button = new Button({
            fieldText: "Lưu Tạm",
            classType: "SaveBtn"
        });
        const btnCollectMoney: Button = new Button({
            fieldText: "Tính tiền",
            classType: "CollectMoneyBtn"
        });

        const displayItemWarehouse: Ref<boolean> = ref(false)
        return {
            displayItemWarehouse,
            disableFormLogOut,
            disableFormMoreAction,
            cbbCheckPoint,
            cbkBill,
            cbkOrder,
            btnTemporarySave,
            btnCollectMoney,
            cbbSearchProduct,
            cbbAgentSales,
            txtQuanTySearch,
            txtPurchased,
            txtAccountNumber,
            // txtProductCode,
            txtPrice,
            txtPriceLast,
            txtNumberRecipient,
            txtDeliveryCharges,
            // txtProductName,
            txtAddressRecipient,
            txtLadingCode,
            txtInfoRecipient,
            dtDateDelivery,
            cbbSelectCustomer,
            txtDeliveryService,
            disableFormShowDelivery,
            txtDeliveryPartner,
            btnAcceptForm,
            btnCloseForm,
            txtPayments,
            txtNotice,
            isActive,
            txtUnit,
            disableFormShowVoucher,
            numVoucherNumber,
            numVoucherPrice,
            numVoucherTotalPrice,
            cbbVoucherItem,
            cbbPayments,
            txtAllPayments,
            txtPromotion,
            DisableFormPayment


        }
    },
    created() {
        try {
            const me = this;
            me.cbbCheckPoint.value = 1;
            me.cbbPayments.value = 1;
            me.bill.TotalMoneyBill = 0;
            me.bill.collectedMoney = 0;
            me.bill.numVoucherTotalPrice = 0;
            me.bill.refundDetail = 0;

        } catch (error) {
            Log.ErrorLog(error as Error);
        }
    },

    methods: {
        ShowFormLogOut() {
            try {
                const me = this;
                me.disableFormLogOut = !me.disableFormLogOut
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        LogOutClickOut() {
            const me = this;
            try {
                if (me.disableFormLogOut) {
                    me.disableFormLogOut = false;
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        LogOutActive() {
            const me = this;
            try {
                if (me.isActive) {
                    me.isActive = false;
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        LogOut() {
            localStorage.clear();
            router.push({ path: '/login' })

        },
        ShowFormMoreAction() {
            try {
                const me = this;
                me.disableFormMoreAction = !me.disableFormMoreAction
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        MoreActionClickOut() {
            const me = this;
            try {
                if (me.disableFormMoreAction) {
                    me.disableFormMoreAction = false;
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        routerManage() {
            router.push({ path: '/home' })
        },
        ShowDelivery() {
            const me = this;
            try {
                me.disableFormShowDelivery = true;
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        OutFormDelivery() {
            const me = this;
            try {
                if (me.disableFormShowDelivery) {
                    me.disableFormShowDelivery = false;
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        ShowVoucher() {
            const me = this;
            try {
                me.disableFormShowVoucher = true;
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        OutFormVoucher() {
            const me = this;
            try {
                if (me.disableFormShowVoucher) {
                    me.disableFormShowVoucher = false;
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        DelListTable(index: number) {
            const me = this;
            if (index >= 0 && index < this.lstBillDetail.length) {
                this.lstBillDetail.splice(index, 1);
            }
            if (me.bill.TotalMoneyBill) {
                me.bill.TotalMoneyBill = 0;
                me.bill.collectedMoney = 0;
                me.bill.refundDetail = 0;
            }

            for (let index = 0; index < me.lstBillDetail.length; index++) {
                const element = me.lstBillDetail[index];
                if (!me.bill.TotalMoneyBill) {
                    me.bill.TotalMoneyBill = 0;
                }

                if (element && me.bill.numVoucherTotalPrice) {
                    me.bill.TotalMoneyBill += element.IntoMoneyBill ?? 0;
                    me.bill.collectedMoney = me.bill.TotalMoneyBill - me.bill.numVoucherTotalPrice;
                }
            }
        },

        ShowNameProduct(value: any) {
            try {
                const me = this;
                let itemValue = new BillDetail();
                const listProduct = LocalStorageLibrary.getByKey<Array<Product>>("Product");
                if (listProduct) {
                    const listProductFilter = listProduct.filter(item => {
                        if (value) {
                            return item.NameProductList == value;
                        }
                    });
                    if (listProductFilter?.length > 0) {
                        itemValue.CodeProductBill = listProductFilter[0].CodeProductList;
                        itemValue.NameProductBill = listProductFilter[0].NameProductList;
                        itemValue.UnitProductBill = listProductFilter[0].UnitProductList;
                        itemValue.UnitPriceBill = listProductFilter[0].PriceProductList;
                    }
                }
                if (me.lstBillDetail?.length > 0) {
                    me.lstBillDetail.push(itemValue);
                } else {
                    me.lstBillDetail = new Array<ProductDetail>(itemValue);
                }
            } catch (error) {
                console.log(error);
            }

        },


        ShowTotalProduct(value: number, item: BillDetail) {
            const me = this;
            if (value == null) {
                value = 0;
            }
            if (item.UnitPriceBill) {
                item.IntoMoneyBill = item.UnitPriceBill * value;
            }
            // /tinh lai tong tien
            if (me.bill.TotalMoneyBill) {
                me.bill.TotalMoneyBill = 0;
                // me.bill.numVoucherTotalPrice = 0;
            }
            for (let index = 0; index < me.lstBillDetail.length; index++) {
                const element = me.lstBillDetail[index];
                if (!me.bill.TotalMoneyBill) {
                    me.bill.TotalMoneyBill = 0;
                }
                if (element && me.bill.numVoucherTotalPrice) {
                    me.bill.TotalMoneyBill += element.IntoMoneyBill ?? 0;
                    me.bill.collectedMoney = me.bill.TotalMoneyBill - me.bill.numVoucherTotalPrice;

                }
            }
        },

        ShowValueVoucher(item: String) {
            const me = this;
            if (me.lstVoucher) {
                for (let indexListDetail = 0; indexListDetail < me.lstVoucher.length; indexListDetail++) {
                    const elementListDetail = me.lstVoucher[indexListDetail]; //Dòng chi tiết
                    if (item == elementListDetail.NameVoucher) {
                        me.numVoucherPrice.value = elementListDetail.PriceVoucher ?? 0;


                    }
                }
            }

        },
        ShowTotalVoucher(value: number) {
            const me = this;
            if (me.numVoucherPrice.value) {
                me.bill.numVoucherTotalPrice = me.numVoucherPrice.value * value;
            }
            // /tinh lai tong tien (Lấy giá trị CollectedMoney trong bill.ts)
            if (me.bill.numVoucherTotalPrice) {
                if (me.bill.TotalMoneyBill == null)
                    me.bill.collectedMoney = 0 - me.bill.numVoucherTotalPrice;
                else {
                    me.bill.collectedMoney = me.bill.TotalMoneyBill - me.bill.numVoucherTotalPrice;
                }
            }


            // for (let index = 0; index < me.lstProductDetail.length; index++) {
            //     const element = me.lstProductDetail[index];
            //     if (!me.bill.TotalMoneyBill) {
            //         me.bill.TotalMoneyBill = 0;
            //     }
            //     if (element) {
            //         me.bill.TotalMoneyBill += element.TotalProductList ?? 0;
            //     }

            // }
        },
        ShowDeposits(value: number) {
            const me = this;
            if (me.bill.collectedMoney) {
                me.bill.refundDetail = value - me.bill.collectedMoney;
            }
            else {
                me.bill.collectedMoney = 0
                me.bill.refundDetail = value - me.bill.collectedMoney;
            }
        },
        ShowCodeAccount(item: string) {
            const me = this;
            if (me.lstBank) {
                for (let indexListDetail = 0; indexListDetail < me.lstBank.length; indexListDetail++) {
                    const elementListDetail = me.lstBank[indexListDetail]; //Dòng chi tiết
                    if (item == elementListDetail.NameAccount) {
                        me.txtAccountNumber.value = elementListDetail.CodeAccount;
                    }
                }
            }
        },
        ShowCodeBank(item: string) {
            const me = this;
            if (me.lstBankAccount) {
                for (let indexListDetail = 0; indexListDetail < me.lstBankAccount.length; indexListDetail++) {
                    const elementListDetail = me.lstBankAccount[indexListDetail]; //Dòng chi tiết


                    if (item == elementListDetail.NameCardBank) {
                        me.DisableFormPayment = false;
                    }
                    else {
                        me.DisableFormPayment = true;
                    }
                }
            }
        },
        //Show Popup
        async saveData() {
            const me = this;
            let lstBill: Array<Bill> | null = new Array<Bill>;
            me.bill['BillId'] = Guid.NewGuid();
            me.bill['DateBill'] = new Date().toLocaleString();
            me.bill['NumberBill'] = Guid.NewGuid();

            lstBill = LocalStorageLibrary.getByKey<Array<Bill>>("itemBill");
            if (lstBill) {
                lstBill.push(me.bill);
                LocalStorageLibrary.setByKey("itemBill", lstBill);
            }
            else {
                lstBill = new Array<Bill>({ ...me.bill });
                LocalStorageLibrary.setByKey("itemBill", lstBill);
            }

            // start cất detail
            //gán khoá phụ cho detail
            if (me.lstBillDetail?.length > 0) {
                me.lstBillDetail.forEach(detailItem => {
                    if (me.bill) {
                        detailItem.BillId = me.bill['BillId'];
                    }
                });
                //end gán khoá phụ

                let listBillDetail: Array<BillDetail> | null = new Array<BillDetail>;
                listBillDetail = LocalStorageLibrary.getByKey<Array<BillDetail>>("BillItemDetail");
                if (listBillDetail) {
                    listBillDetail.push(...me.lstBillDetail);
                    LocalStorageLibrary.setByKey("BillItemDetail", listBillDetail);
                }
                else {
                    listBillDetail = new Array<BillDetail>(...me.lstBillDetail);
                    LocalStorageLibrary.setByKey("BillItemDetail", listBillDetail);
                }
            }


            //end cất detail


            const component = (await import(`./popup-COD/PopupCod.vue`)).default;
            if (component) {
                PopupLibrary.createPopup(component, {});
            };
        },







    }

}
</script>