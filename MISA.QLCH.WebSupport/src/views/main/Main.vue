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
export default {
    components: {
        LeftMenu, ECombobox,
    },

    setup() {
        /**Khai báo hằng số pages là 1 mảng chứa các giá trị của đối tượng menu */
        const pages: Array<Menu> = new Array(
            {
                routerLink: "home",
                fieldText: "Trang Chủ"
            },
            {
                children: new Array(

                    {
                        routerLink: "sales",
                        fieldText: "Bán hàng",
                    },
                    {
                        fieldText: "Bán hàng đa chi nhánh",
                    },
                    {
                        fieldText: "Nhập hàng",
                    },
                    {
                        fieldText: "Kho",
                    }
                ),
                fieldText: "Báo cáo",
            },
            {
                routerLink: "order",
                fieldText: "Đơn Hàng"
            },
            {
                children: new Array(
                    {

                        fieldText: "Báo Hàng"
                    },
                    {
                        fieldText: "Đặt Hàng",
                    },
                ),
                fieldText: "Mua Hàng",

            },
            {
                routerLink: "product",
                fieldText: "Sản Phẩm"
            },

            {
                routerLink: "expense",
                fieldText: "Chi Phí"
            },
            {
                children: new Array(
                    {
                        headingText: "HÀNG HÓA"
                    },
                    {
                        routerLink: "categoryItem",
                        fieldText: "Nhóm hàng hóa"
                    },
                    {
                        routerLink: "product",
                        fieldText: "Hàng hóa",
                    },
                    {
                        routerLink: "unit",
                        fieldText: "Đơn vị tính",
                    },
                    {
                        headingText: "KHÁCH HÀNG",
                    },
                    {
                        routerLink: "customerCategory",
                        fieldText: "Nhóm khách hàng",

                    },
                    {
                        routerLink: "customer",
                        fieldText: "khách hàng",

                    },
                    {
                        headingText: "NHÀ CUNG CẤP",
                    },
                    {
                        routerLink: "vendorCategory",
                        fieldText: "Nhóm nhà cung cấp",
                    },

                    {
                        routerLink: "vendor",
                        fieldText: "Nhà cung cấp",
                    },
                    {
                        routerLink: "shippingPartner",
                        fieldText: "Đối tác giao hàng",
                    },
                    {
                        headingText: "KHÁC",

                    },
                    {
                        routerLink: "employee",
                        fieldText: "Nhân viên"
                    },

                    {
                        routerLink: "branch",
                        fieldText: "Cửa hàng"
                    },
                    {
                        routerLink: "shiftRecord",
                        fieldText: "Ca làm việc"
                    },
                    {
                        routerLink: "bankAccount",
                        fieldText: "Phương thức và dịch vụ thanh toán"
                    }

                ),
                fieldText: "Danh Mục"
            },




        );
        const cbbStore: Ref<Combobox> = ref(new Combobox({
            require: true,
            data: [
                {
                    value: 1,
                    display: "CH1"
                },
                {
                    value: 2,
                    display: "CH2"
                },
                {
                    value: 3,
                    display: "CH3"
                },

            ]
            // require: true
        }));
        return {
            pages,
            cbbStore
        }
    },

    data() {
        const thisData = new Main();
        return {
            thisData,
            DropdownUserVisible: false
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
                });
            }
            me.cbbStore.value = 1;

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
        OnClickOutUserManage() {
            try {
                const me = this
                me.DropdownUserVisible = false;
            }
            catch (error) {
                Log.ErrorLog(error as Error);
            }
        }
    }
}
</script>
