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
        const lstProductDetail: Ref<Array<ProductDetail>> = ref(new Array<ProductDetail>(
            // {
            //     NumberProductList: 123,
            //     CodeProductList: "SP12356",
            //     NameProductList: "Quần áo Nam Thu Đông",
            //     QuantityProductList: 1,
            //     UnitProductList: "Chiếc",
            //     PriceProductList: 100000,
            //     TotalProductList: 200000,
            // }
        ));
        return {
            lstProductDetail,
        };
    },
    setup() {
        const disableFormLogOut: Ref<boolean> = ref(false);
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
        const txtPurchased: Ref<TextBox> = ref(new TextBox({
            fieldText: "",
            require: false,
            type: "number",
            classType: "secondary",
            placeholder: "0"
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


        }
    },
    created() {
        try {
            const me = this;
            me.cbbCheckPoint.value = 1;
            me.cbbPayments.value = 1;

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
            if (index >= 0 && index < this.lstProductDetail.length) {
                this.lstProductDetail.splice(index, 1);
            }
        },


        ShowNameProduct(value: any) {
            try {
                const me = this;
                let itemValue = new Product();
                const listProduct = LocalStorageLibrary.getByKey<Array<Product>>("Product");
                if (listProduct) {
                    const listProductFilter = listProduct.filter(item => {
                        if (value) {
                            return item.NameProductList == value;
                        }
                    });

                    if (listProductFilter?.length > 0) {
                        itemValue = listProductFilter[0];
                    }
                }
                if (me.lstProductDetail?.length > 0) {
                    me.lstProductDetail.push(itemValue);
                } else {
                    me.lstProductDetail = new Array<ProductDetail>(itemValue);
                }
            } catch (error) {
                console.log(error);
            }

        },


        // ShowInfoCustomer(value: any, item: Customer) {
        //     const me = this;
        //     const listCustomer = LocalStorageLibrary.getByKey<Array<Customer>>("Customer");
        //     if (listCustomer && listCustomer.length > 0 && me.masterData) {
        //         // const vendorCode = me.masterData['SupplierOrder'];
        //         if (value) {
        //             let rowCustomerByCustomerName = new Customer();
        //             for (let index = 0; index < listCustomer.length; index++) {
        //                 const rowProductDetail = listCustomer[index];
        //                 if (rowProductDetail.NameCustomer == value) {
        //                     rowCustomerByCustomerName = rowProductDetail;
        //                     break;
        //                 }
        //             }
        //             if (rowCustomerByCustomerName) {
        //                 item.NameProductOrder = rowCustomerByCustomerName.TelephoneCustomer;
        //                 item.UnitProductOrder = rowCustomerByCustomerName.AddressCustomer;
        //                 item.UnitPriceOrder = rowCustomerByCustomerName.PurchasePriceProductList;
        //             }
        //         }
        //     }
        // },






    }

}
</script>