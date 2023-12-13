<template src="./Main.html"></template>
<style lang="scss" scoped src="./Main.scss"></style>
<script lang="ts">
import { Menu } from '@library-src/models/qlch_menu/Menu';
import Main from './Main';
import Log from '@library-src/utilities/Log';
import LeftMenu from '@src/components/left_menu/LeftMenu.vue';
//tnp
import ECombobox from "qlch_control/ECombobox";
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import { Ref, ref } from 'vue';
import router from '@src/router';
import Branch from '@store-src/models/branch/Branch';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import NotificationPopupViewModel from '@library-src/models/qlch_notification/NotificationPopupViewModel';
import ToolBarItemsView from '@library-src/models/qlch_base/tool_bar_items_view/ToolBarItemsView';
import Button from '@library-src/models/qlch_control/qlch_button/Button';
import PopupLibrary from '@library-src/utilities/commons/PopupLibrary';
import Constant from '@library-src/utilities/constants/Constant';
import Bill from '@store-src/models/bill-main/Bill';
import Employee from '@store-src/models/employee/Employee';
export default {
    components: {
        LeftMenu, ECombobox,
    },

    setup() {

        /**Khai báo hằng số pages là 1 mảng chứa các giá trị của đối tượng menu */
        const lstCbbStore = LocalStorageLibrary.getByKey<Array<Branch>>("branch") ?? new Array<Branch>();
        let pages: Array<Menu> = new Array(

            {
                routerLink: "/home",
                fieldText: "Trang Chủ"
            },

            {
                children: new Array(
                    {
                        routerLink: "/sales",
                        fieldText: "Danh sách hóa đơn",
                    },
                    // {
                    //     routerLink: "/purchase",
                    //     fieldText: "Nhập hàng",
                    // },
                    {
                        routerLink: "/stock",
                        fieldText: "Tồn Kho",
                    },
                    // {
                    //     routerLink: "/monetaryFlow",
                    //     fieldText: "Doanh thu bàn giao ca"
                    // },
                    // {
                    //     routerLink: "/revenueExpenditure",
                    //     fieldText: "Thu chi"
                    // },
                    {
                        routerLink: "/profit",
                        fieldText: "Lợi Nhuận"
                    }
                ),
                fieldText: "Báo cáo",
            },
            {
                routerLink: "/order",
                fieldText: "Đơn Hàng"
            },
            {
                children: new Array(
                    {
                        routerLink: "/goodsOrder",
                        fieldText: "Đặt Hàng",
                    },
                    {
                        routerLink: "/import",
                        fieldText: "Nhập Hàng",
                    },
                    {
                        routerLink: "/return",
                        fieldText: "Trả lại Hàng mua",
                    },
                ),
                fieldText: "Mua Hàng",

            },
            {
                children: new Array(
                    {
                        fieldText: "Nhập Kho",
                        routerLink: "/inward"
                    },
                    {
                        fieldText: "Xuất Kho",
                        routerLink: "/outward"
                    },
                    // {
                    //     fieldText: "Chuyển Kho",
                    //     routerLink: "/transferStock"
                    // },
                    {
                        fieldText: "Kiểm kê kho",
                        routerLink: "/inventory"
                    },


                ),
                fieldText: "Kho Hàng"
            },

            //Quỹ tiền
            // {
            //     children: new Array(
            //         {
            //             fieldText: "Phiếu thu tiền mặt",
            //             routerLink: "/cashReceipt"
            //         },
            //         {
            //             fieldText: "Phiếu chi tiền mặt",
            //             routerLink: "/cashPayment"
            //         }

            //     ),
            //     fieldText: "Quỹ Tiền"
            // },


            // {
            //     routerLink: "product",
            //     fieldText: "Sản Phẩm"
            // },
            // {
            //     routerLink: "/expense",
            //     fieldText: "Chi Phí"
            // },
            {
                routerLink: "/voucher",
                fieldText: "Khuyến mãi"
            },
            {
                children: new Array(
                    {
                        routerLink: "/categoryItem",
                        fieldText: "Nhóm hàng hóa"
                    },
                    {
                        routerLink: "/product",
                        fieldText: "Hàng hóa",
                    },
                    {
                        routerLink: "/unit",
                        fieldText: "Đơn vị tính",

                    }
                ),
                fieldText: "Hàng Hóa"
            },
            {
                children: new Array(
                    {
                        routerLink: "/customerCategory",
                        fieldText: "Nhóm khách hàng",

                    },
                    {
                        routerLink: "/customer",
                        fieldText: "khách hàng",


                    }
                ),
                fieldText: "Khách Hàng"
            },
            {
                children: new Array(
                    {
                        routerLink: "/vendorCategory",
                        fieldText: "Nhóm nhà cung cấp",
                    },

                    {
                        routerLink: "/vendor",
                        fieldText: "Nhà cung cấp",
                    },
                    {
                        routerLink: "/shippingPartner",
                        fieldText: "Đối tác giao hàng",
                    },
                ),
                fieldText: "Nhà Cung Cấp"
            },
            {
                children: new Array(
                    {
                        routerLink: "/employee",
                        fieldText: "Nhân viên"
                    },

                    {
                        routerLink: "/branch",
                        fieldText: "Cửa hàng"
                    },
                    {
                        routerLink: "/shiftRecord",
                        fieldText: "Ca làm việc"
                    },
                    {
                        routerLink: "/dictionaryStock",
                        fieldText: "Kho"

                    },
                    {
                        routerLink: "/bankAccount",
                        fieldText: "Phương thức và dịch vụ thanh toán"
                    },
                    {
                        routerLink: "/bank",
                        fieldText: "Tài khoản ngân hàng"
                    }
                ),
                fieldText: "Khác"
            },
        );

        //Tạo phân quyền

        // const user = LocalStorageLibrary.getByKey<Employee>("userName") ?? new Employee;
        // if (user.UsageSystem == "Nhân viên bán hàng") {
        //     pages = new Array()
        // }
        // if (user.UsageSystem == "Nhân viên thủ kho") {
        //     pages = new Array(
        //         {
        //             children: new Array(
        //                 {
        //                     routerLink: "/goodsOrder",
        //                     fieldText: "Đặt Hàng",
        //                 },
        //                 {
        //                     routerLink: "/import",
        //                     fieldText: "Nhập Hàng",
        //                 },
        //                 {
        //                     routerLink: "/return",
        //                     fieldText: "Trả lại Hàng mua",
        //                 },
        //             ),
        //             fieldText: "Mua Hàng",

        //         },
        //     )
        // }


        const cbbStore: Ref<Combobox> = ref(new Combobox({
            require: false,
            readOnly: false,
            data: lstCbbStore,
            valueField: "NameBranch",
            displayField: "NameBranch",
            // require: true
        }));
        return {
            pages,
            cbbStore
        }
    },

    data() {
        const UserName: Ref<string> = ref("")
        const user: Ref<Employee> = ref(new Employee())
        const thisData = new Main();
        const lstBranch = LocalStorageLibrary.getByKey<Array<Branch>>("branch");
        const bill: Ref<Bill> = ref(new Bill());
        return {
            thisData,
            DropdownUserVisible: false,
            lstBranch,
            bill,
            user,
            UserName
        };
    },

    created() {
        try {
            const me = this;

            if (me.pages && me.pages.length) {
                me.pages.forEach(itemMenu => {
                    if (window.location.pathname == itemMenu.routerLink) {
                        me.thisData.title = itemMenu.fieldText;
                        return;
                    }
                    if (itemMenu.children && itemMenu.children.length) {
                        itemMenu.children.forEach(itemMenuChildren => {
                            if (window.location.pathname == itemMenuChildren.routerLink) {
                                me.thisData.title = itemMenuChildren.fieldText;
                                return;
                            }
                        }
                        )
                    }
                });
            }
            me.user = LocalStorageLibrary.getByKey<Employee>("userName") ?? new Employee;
            me.UserName = me.user.NameEmployee ?? "";

            me.cbbStore.value = "K-Store";

        } catch (error) {
            Log.ErrorLog(error as Error);
        }
    },

    methods: {
        /**
         * Handler Event Click Menu
         */

        changeItemMenu(item: Menu) {
            const me = this;
            try {
                if (item.routerLink) {
                    me.thisData.title = item.fieldText;
                }


            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        OnClickDropDownIconUser() {
            try {
                const me = this
                me.DropdownUserVisible = !me.DropdownUserVisible;
            }
            catch (error) {
                Log.ErrorLog(error as Error);
            }


        },
        ShowNameStore(item: string) {
            const me = this;
            if (me.lstBranch) {
                for (let indexListDetail = 0; indexListDetail < me.lstBranch.length; indexListDetail++) {
                    const elementListDetail = me.lstBranch[indexListDetail];
                    if (item == elementListDetail.NameBranch) {
                        me.bill.NameStore = elementListDetail.CodeBranch;
                    }
                }
            }
        },
        OnClickOutUserManage() {
            try {
                const me = this
                me.DropdownUserVisible = false;
            }
            catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        LogOut() {
            LocalStorageLibrary.deleteByKey(Constant.tokenContext)
            router.push({ path: '/login' })

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
        }
    }
}
</script>
