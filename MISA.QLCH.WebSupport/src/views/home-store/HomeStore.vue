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
import Branch from '@store-src/models/branch/Branch';
import Outward from '@store-src/models/outward/Outward';
import OutwardDetail from '@store-src/models/outward/OutwardDetail';
import DictionaryStock from '@store-src/models/dictionary-stock/DictionaryStock';
import InventoryDetail from '@store-src/models/inventory/InventoryDetail';
import InwardDetail from '@store-src/models/inward/InwardDetail';
import Constant from '@library-src/utilities/constants/Constant';

// import Outward from '@store-src/models/outward/Outward';

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
        const lstBill = LocalStorageLibrary.getByKey<Array<Bill>>("itemBill") ?? new Array<Bill>();
        const NameBranch = LocalStorageLibrary.getByKey<Array<Branch>>("branch");
        const lstBillDetail: Ref<Array<BillDetail>> = ref(new Array<BillDetail>());
        const lstVoucher = LocalStorageLibrary.getByKey<Array<Voucher>>("voucher");
        const lstCustomer = LocalStorageLibrary.getByKey<Array<Customer>>("Customer");
        const lstBank = LocalStorageLibrary.getByKey<Array<Bank>>("Bank");
        const lstEmployee = LocalStorageLibrary.getByKey<Array<Employee>>("employee");
        const lstBankAccount = LocalStorageLibrary.getByKey<Array<BankAccount>>("BankAccount");;
        const bill: Ref<Bill> = ref(new Bill());

        return {

            lstBillDetail,
            bill,
            lstVoucher,
            lstBank,
            lstEmployee,
            lstBankAccount,
            // timePresent: new Date().toLocaleDateString(), //Hiển thị mỗi ngày
            timePresent: new Date().toLocaleString(),
            NameBranch,
            lstCustomer,
            lstBill,
            bills: [{ number: 1 }],
            selectedBillIndex: null,
            userClicked: false,

        };
    },
    setup() {
        const disableFormLogOut: Ref<boolean> = ref(false);
        const DisableFormPayment: Ref<boolean> = ref(false);
        const DisableVoucher: Ref<boolean> = ref(false)
        const isActive: Ref<boolean> = ref(false);
        const disableFormShowDelivery: Ref<boolean> = ref(false)
        const disableFormMoreAction: Ref<boolean> = ref(false);
        const disableFormShowVoucher: Ref<boolean> = ref(false);
        let lstCbbSearchProduct = LocalStorageLibrary.getByKey<Array<Product>>("Product") ?? new Array<Product>();
        const lstCbbAgentSales = LocalStorageLibrary.getByKey<Array<Employee>>("employee") ?? new Array<Employee>();
        const lstTxtInfoRecipient = LocalStorageLibrary.getByKey<Array<Customer>>("Customer") ?? new Array<Customer>();
        const lstCbbCheckPoint = LocalStorageLibrary.getByKey<Array<BankAccount>>("BankAccount") ?? new Array<BankAccount>();
        const lstCbbPayments = LocalStorageLibrary.getByKey<Array<Bank>>("Bank") ?? new Array<Bank>();
        const lstCbbVoucherItem = LocalStorageLibrary.getByKey<Array<Voucher>>("voucher") ?? new Array<Voucher>();
        const lstDictionaryStock = LocalStorageLibrary.getByKey<Array<DictionaryStock>>("dictionaryStock") ?? new Array<DictionaryStock>();
        const lstInventoryDetail = LocalStorageLibrary.getByKey<Array<InventoryDetail>>("inventoryDetail") ?? new Array<InventoryDetail>();

        //Trạng thái kinh doanh
        lstCbbSearchProduct = lstCbbSearchProduct.filter(item => {
            return item.StatusProductList == "Đang kinh doanh";
        });

        const txtQuanTySearch: Ref<NumberModel> = ref(new NumberModel({
            classType: "thirty",
            format: new NumberFormat({
                decimal: ".",
                thousands: ",",
                precision: 0
            }),
            value: 1,
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
            require: false,
            data: lstTxtInfoRecipient,
            valueField: "NameCustomer",
            displayField: "NameCustomer",
            labelWidth: 120,
            classType: "tertiary",
            placeholder: "Số điện thoại, Tên khách hàng"
        }));

        const txtNumberRecipient: Ref<TextBox> = ref(new TextBox({
            fieldText: "Số điện thoại",
            require: false,
            classType: "secondary",
            type: "number",
            labelWidth: 120,
            // format: new NumberFormat({
            //     decimal: ".",
            //     thousands: ",",
            //     precision: 0
            // }),
        }));
        const txtAddressRecipient: Ref<TextBox> = ref(new TextBox({
            fieldText: "Địa chỉ",
            require: false,
            type: "text",
            classType: "secondary",
            labelWidth: 120,
            placeholder: "Số nhà, Tên nhà, Tên xóm,..."
        }));

        const dtDateDelivery: DateModel = new DateModel({
            fieldText: "Ngày giao hàng",
            require: false,
            labelWidth: 120
        });

        const txtDeliveryCharges: Ref<NumberModel> = ref(new NumberModel({
            fieldText: "Phí GH thu khách",
            require: false,
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
            require: false,
            data: [
                {
                    value: "Đối tác Shoppe",
                    display: "Đối tác Shoppe"
                }
            ],
            classType: "tertiary",
            labelWidth: 120,

        }));

        const txtQuantityBill: Ref<Combobox> = ref(new Combobox({
            fieldText: "",
            require: false,
            data: lstDictionaryStock,
            valueField: "NameStore",
            displayField: "NameStore",
            classType: "tertiary",
            labelWidth: 120,
        }));

        const txtDeliveryService: Ref<Combobox> = ref(new Combobox({
            fieldText: "Loại dịch vụ",
            require: false,
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
            require: false,
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
            require: false,
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
        const txtPriceLastPurchase: Ref<NumberModel> = ref(new NumberModel({
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
            DisableVoucher,
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
            txtPriceLastPurchase,
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
            DisableFormPayment,
            txtQuantityBill,
            lstInventoryDetail


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
            me.bill.Payments = 0;

        } catch (error) {
            Log.ErrorLog(error as Error);
        }
    },

    methods: {
        selectBill(index: any) {
            const me = this;
            // Đặt selectedBillIndex bằng index của bill được chọn
            me.selectedBillIndex = index;
        },
        addBill() {
            const me = this;
            const newBill = {
                number: me.bills.length > 0 ? me.bills[me.bills.length - 1].number + 1 : 1,
            };
            me.bills.push(newBill);
        },
        deleteBill(index: number) {
            const me = this;
            me.bills.splice(index, 1);
            if (me.bills.length === 0) {
                setTimeout(() => {
                    me.addBill();
                }, 100);
            }
        },
        formatCurrency(value: any) {
            // Định dạng giá trị tiền tệ
            const formattedValue = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'VND', // Điều này có thể được thay đổi thành đơn vị tiền tệ của bạn
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(value);
            const currencySymbol = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'VND',
            }).formatToParts(1).find(part => part.type === 'currency')?.value;
            if (currencySymbol) {
                return formattedValue.replace(new RegExp(currencySymbol, 'g'), '').trim();
            }

            return formattedValue.trim();
        },

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
            LocalStorageLibrary.deleteByKey(Constant.tokenContext)
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

        //v-click-out
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
            if (index >= 0 && index < me.lstBillDetail.length) {
                me.lstBillDetail.splice(index, 1);
            }
            //Tnp
            me.bill.TotalMoneyBill = 0;
            me.bill.collectedMoney = 0;
            me.bill.TotalPurchaseBill = 0;

            for (let index = 0; index < me.lstBillDetail.length; index++) {
                const element = me.lstBillDetail[index];
                if (element) {
                    me.bill.TotalMoneyBill += element.IntoMoneyBill ?? 0;
                    me.bill.TotalPurchaseBill += element.IntoPurchaseMoneyBill ?? 0;
                }
            }
            if (me.bill.numVoucherTotalPrice != null) {
                me.bill.collectedMoney = me.bill.TotalMoneyBill - me.bill.numVoucherTotalPrice;
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
                        itemValue.PurchaseBill = listProductFilter[0].PurchasePriceProductList;
                        itemValue.InventoryBill = "Kho 01";
                        itemValue.QuantityBill = me.txtQuanTySearch.value;
                        if (itemValue.UnitPriceBill) {
                            itemValue.IntoMoneyBill = itemValue.QuantityBill * itemValue.UnitPriceBill;
                        }
                        if (itemValue.PurchaseBill) {
                            itemValue.IntoPurchaseMoneyBill = itemValue.QuantityBill * itemValue.PurchaseBill;
                        }

                        // Số lượng hàng trong kho 01

                        if (!itemValue.InventoryNumber) {
                            itemValue.InventoryNumber = 0;
                        }
                        const listInwardDetail = LocalStorageLibrary.getByKey<Array<InwardDetail>>("inwardDetail");
                        if (listInwardDetail && listInwardDetail.length > 0) {
                            for (let index = 0; index < listInwardDetail.length; index++) {
                                const elementInward = listInwardDetail[index]; ///Dòng Nhập Hàng
                                if (elementInward.WarehouseProductInward == "Kho 01" && elementInward.NameProductInward == value) {
                                    itemValue.InventoryNumber += elementInward.NumberProductInward || 0;
                                }
                            }
                        }

                        // //Xuất kho
                        const listOutwardDetail = LocalStorageLibrary.getByKey<Array<OutwardDetail>>("outwardDetail");
                        if (listOutwardDetail && listOutwardDetail.length > 0) {
                            for (let index = 0; index < listOutwardDetail.length; index++) {
                                const elementOutward = listOutwardDetail[index]; ///Dòng Nhập Hàng
                                if (elementOutward.WarehouseProductOutWard == "Kho 01" && elementOutward.NameProductOutWard == value) {
                                    itemValue.InventoryNumber -= elementOutward.NumberProductOutWard || 0;
                                }
                            }
                        }





                    }
                }
                // Số lượng
                if (me.lstBillDetail?.length > 0) {
                    let Exist = false;
                    for (let index = 0; index < me.lstBillDetail.length; index++) {
                        const element = me.lstBillDetail[index];
                        if (!element.QuantityBill) {
                            element.QuantityBill = 0;
                        }
                        if (!element.UnitPriceBill) {
                            element.UnitPriceBill = 0;
                        }
                        if (!element.PurchaseBill) {
                            element.PurchaseBill = 0;
                        }
                        if (element && element.NameProductBill == itemValue.NameProductBill) {
                            Exist = true;
                            if (me.txtQuanTySearch.value == 0) {
                                element.QuantityBill++;
                            }
                            else {
                                element.QuantityBill += me.txtQuanTySearch.value;
                            }
                            element.IntoMoneyBill = element.QuantityBill * element.UnitPriceBill;
                            element.IntoPurchaseMoneyBill = element.QuantityBill * element.PurchaseBill;
                        }
                    }
                    if (!Exist) {
                        me.lstBillDetail.push(itemValue);
                    }

                } else {
                    me.lstBillDetail = new Array<ProductDetail>(itemValue);
                }


                //Tính lại tổng tiền
                me.bill.TotalMoneyBill = 0;
                me.bill.collectedMoney = 0;
                me.bill.TotalPurchaseBill = 0;

                for (let index = 0; index < me.lstBillDetail.length; index++) {
                    const element = me.lstBillDetail[index];
                    if (element) {
                        me.bill.TotalMoneyBill += element.IntoMoneyBill ?? 0;
                        me.bill.TotalPurchaseBill += element.IntoPurchaseMoneyBill ?? 0;
                    }
                }
                if (me.bill.numVoucherTotalPrice != null) {
                    me.bill.collectedMoney = me.bill.TotalMoneyBill - me.bill.numVoucherTotalPrice;
                }
            } catch (error) {
                console.log(error);
            }

        },
        // ShowObjectAgent(item: string) {
        //     const me = this;
        //     if (me.lstEmployee) {
        //         for (let indexListDetail = 0; indexListDetail < me.lstEmployee.length; indexListDetail++) {
        //             const elementListDetail = me.lstEmployee[indexListDetail]; //Dòng chi tiết
        //             if (item == elementListDetail.NameEmployee) {
        //                 me.bill.ObjectSalesAgent = elementListDetail.CodeEmployee;
        //             }
        //         }
        //     }
        // },
        ShowTotalProduct(value: number, item: BillDetail) {
            const me = this;

            // Nếu giá trị là null hoặc undefined, gán giá trị mặc định là 0
            if (value == null) {
                value = 0;
            }
            if (item.UnitPriceBill && item.PurchaseBill != null) {
                item.IntoMoneyBill = item.UnitPriceBill * value;
                item.IntoPurchaseMoneyBill = item.PurchaseBill * value;
            } else {
                item.IntoMoneyBill = 0;
                item.IntoPurchaseMoneyBill = 0;

            }

            // Tính lại tổng tiền trong hóa đơn
            me.bill.TotalMoneyBill = 0;
            me.bill.collectedMoney = 0;
            me.bill.TotalPurchaseBill = 0;

            for (let index = 0; index < me.lstBillDetail.length; index++) {
                const element = me.lstBillDetail[index];
                if (element) {
                    me.bill.TotalMoneyBill += element.IntoMoneyBill ?? 0;
                    me.bill.TotalPurchaseBill += element.IntoPurchaseMoneyBill ?? 0;

                }
            }

            if (me.bill.numVoucherTotalPrice != null) {
                me.bill.collectedMoney = me.bill.TotalMoneyBill - me.bill.numVoucherTotalPrice;
            }

        },

        ShowInfoCustomer(item: string) {
            const me = this;
            if (me.lstCustomer) {
                for (let indexListDetail = 0; indexListDetail < me.lstCustomer.length; indexListDetail++) {
                    const elementListDetail = me.lstCustomer[indexListDetail]; //Dòng chi tiết
                    if (item == elementListDetail.NameCustomer) {
                        me.txtNumberRecipient.value = elementListDetail.TelephoneCustomer;
                        me.txtAddressRecipient.value = elementListDetail.AddressCustomer;

                    }
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
        closePopupVoucher() {
            const me = this;
            me.disableFormShowVoucher = false;
        },
        DelVoucher() {
            const me = this;
            me.DisableVoucher = false;
            me.bill.numVoucherTotalPrice = 0;
            me.numVoucherNumber.value = 0;
            me.cbbVoucherItem.value = "";
            me.numVoucherPrice.value = 0;
            me.bill.TotalMoneyBill = 0;
            me.bill.collectedMoney = 0;

            for (let index = 0; index < me.lstBillDetail.length; index++) {
                const element = me.lstBillDetail[index];
                if (element) {
                    me.bill.TotalMoneyBill += element.IntoMoneyBill ?? 0;
                }
            }
            if (me.bill.numVoucherTotalPrice != null) {
                me.bill.collectedMoney = me.bill.TotalMoneyBill - me.bill.numVoucherTotalPrice;
            }
            else {
                me.bill.collectedMoney = me.bill.TotalMoneyBill - 0;
            }

        },
        AcceptFormVoucher() {
            const me = this;
            // /tinh lai tong tien (Lấy giá trị CollectedMoney trong bill.ts)
            if (me.bill.numVoucherTotalPrice) {
                if (me.bill.TotalMoneyBill == null)
                    me.bill.collectedMoney = 0 - me.bill.numVoucherTotalPrice;
                else {
                    me.bill.collectedMoney = me.bill.TotalMoneyBill - me.bill.numVoucherTotalPrice;
                }
            }
            me.disableFormShowVoucher = false;
            me.DisableVoucher = true;


        },
        closePopupDelivery() {
            const me = this;
            me.disableFormShowDelivery = false;
        },
        ShowTotalVoucher(value: number) {
            const me = this;
            if (me.numVoucherPrice.value) {
                me.bill.numVoucherTotalPrice = me.numVoucherPrice.value * value;
            }
        },
        ShowDeposits(value: number) {

            const me = this;
            if (value == null) {
                value = 0;
            }
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
        ShowCodeBank() {
            const me = this;
            if (me.cbbCheckPoint.value == "Tiền mặt") {
                me.DisableFormPayment = false;
            } else {
                me.DisableFormPayment = true;
            }
        },



        //Show Popup
        async saveData() {
            const me = this;
            let lstBill: Array<Bill> | null = new Array<Bill>;
            me.bill['BillId'] = Guid.NewGuid();
            me.bill['DateBill'] = new Date().toLocaleString();
            me.bill['NumberBill'] = "HD" + me.generateRandomNumberString();

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
            let ItemTotalQuantityOutward = 0;
            for (let index = 0; index < me.lstBillDetail.length; index++) {
                const element = me.lstBillDetail[index];
                if (element) {
                    ItemTotalQuantityOutward += element.QuantityBill ?? 0;
                }
            }
            const OutwardMain: Outward = new Outward({
                // ObjectOutward: me.bill.ObjectSalesAgent,
                ObjectNameOutward: me.bill.SalesAgent,
                DeliveryOutward: "XK" + me.generateRandomNumberString(),
                DayOutward: new Date(),
                OutwardId: Guid.NewGuid(),
                TotalQuantityOutward: '' + ItemTotalQuantityOutward,
                TotalMoneyOutward: me.bill.TotalPurchaseBill,

            });


            let listOutward = LocalStorageLibrary.getByKey<Array<Outward>>("outwardItem");
            if (listOutward) {
                listOutward.push(OutwardMain);
                LocalStorageLibrary.setByKey("outwardItem", listOutward);
            }
            else {
                listOutward = new Array<Outward>({ ...OutwardMain });
                LocalStorageLibrary.setByKey("outwardItem", listOutward);
            }
            const lstOutWardDetail: Array<OutwardDetail> = new Array<OutwardDetail>(

            )
            for (let index = 0; index < me.lstBillDetail.length; index++) {
                const element = me.lstBillDetail[index];
                const OurWardDetail: OutwardDetail = new OutwardDetail({
                    CodeProductOutWard: element.CodeProductBill, //MÃ
                    NameProductOutWard: element.NameProductBill, //Tên
                    UnitProductOutWard: element.UnitProductBill, //Đơn vị tính
                    NumberProductOutWard: element.QuantityBill, //Số lượng
                    WarehouseProductOutWard: element.InventoryBill, // Kho sử dụng
                    UnitPriceOutWard: element.PurchaseBill, //Đơn giá
                    PaymentOutWard: element.IntoPurchaseMoneyBill, //Thành tiền
                    OutwardId: OutwardMain.OutwardId,
                })
                lstOutWardDetail.push(OurWardDetail)
            }
            let listOutwardDetail: Array<OutwardDetail> | null = new Array<OutwardDetail>;
            listOutwardDetail = LocalStorageLibrary.getByKey<Array<OutwardDetail>>("outwardDetail");
            if (listOutwardDetail) {
                listOutwardDetail.push(...lstOutWardDetail);
                LocalStorageLibrary.setByKey("outwardDetail", listOutwardDetail);
            }
            else {
                listOutwardDetail = new Array<OutwardDetail>(...lstOutWardDetail);
                LocalStorageLibrary.setByKey("outwardDetail", listOutwardDetail);
            }


            const component = (await import(`./popup-COD/PopupCod.vue`)).default;
            if (component) {
                PopupLibrary.createPopup(component, {});
            };
            me.bill.TotalMoneyBill = 0;
            me.bill.numVoucherTotalPrice = 0;
            me.bill.collectedMoney = 0;
            me.bill.refundDetail = 0;
            me.bill.Payments = 0;
            me.lstBillDetail.splice(0);

        },

        generateRandomNumberString() {
            // Tạo một số ngẫu nhiên từ 100000 đến 999999 (bao gồm cả 2 đầu)
            const randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
            // Chuyển đổi số thành chuỗi
            const randomString = randomNumber.toString();
            return randomString;
        },









    }

}
</script>