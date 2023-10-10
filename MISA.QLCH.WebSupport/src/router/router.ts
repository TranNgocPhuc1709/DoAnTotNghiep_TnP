import { RouteRecordRaw } from 'vue-router';
// import RouterMetaModel from '@src/models/route-meta/RouterMetaModel';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'main',
        component: () => import('@src/views/main/Main.vue'),
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('@src/views/home-view/HomeView.vue'),
                meta: {
                    title: "Trang Chủ",
                    anonymous: false
                }
            },
            {
                path: 'product',
                name: 'product',
                component: () => import('@src/views/product-list-dictionary/ProductListDictionary.vue'),
                meta: {
                    title: "Sản Phẩm",
                    anonymous: false
                }
            },
            {
                path: 'order',
                name: 'order',
                component: () => import('@src/views/order-list-dictionary/OrderListDictionary.vue'),
                meta: {
                    title: "Đơn Hàng",
                    anonymous: false
                }
            },
            {
                path: 'expense',
                name: 'expense',
                component: () => import('@src/views/expense-list-dictionary/ExpenseListDictionary.vue'),
                meta: {
                    title: "Chi Tiêu",
                    anonymous: false
                }
            },
            {
                path: 'sales',
                name: 'sales',
                component: () => import('@src/views/sales-list-dictionary/SalesListDictionary.vue'),
                meta: {
                    title: "Bán Hàng",
                    anonymous: false
                }
            },
            {
                path: 'categoryItem',
                name: 'categoryItem',
                component: () => import('@src/views/category-item-list-dictionary/CategoryItemListDictionary.vue'),
                meta: {
                    title: "Nhóm Hàng Hóa",
                    anonymous: false
                }
            },
            {
                path: 'unit',
                name: 'unit',
                component: () => import('@src/views/unit-list-dictionary/UnitListDictionary.vue'),
                meta: {
                    title: "Đơn vị tính",
                    anonymous: false
                }
            },
            {
                path: 'customerCategory',
                name: 'customerCategory',
                component: () => import('@src/views/customercategory-list-dictionary/CustomercategoryListDictionary.vue'),
                meta: {
                    title: "Nhóm khách hàng",
                    anonymous: false
                }
            },
            {
                path: 'customer',
                name: 'customer',
                component: () => import('@src/views/customer-list-dictionary/CustomerListDictionary.vue'),
                meta: {
                    title: "Khách hàng",
                    anonymous: false
                }
            },
            {
                path: 'vendorCategory',
                name: 'vendorCategory',
                component: () => import('@src/views/vendor-category-list-dictionary/VendorCategoryListDictionary.vue'),
                meta: {
                    title: "Nhóm nhà cung cấp",
                    anonymous: false
                }
            },
            {
                path: 'vendor',
                name: 'vendor',
                component: () => import('@src/views/vendor-list-dictionary/VendorListDictionary.vue'),
                meta: {
                    title: "Nhà cung cấp",
                    anonymous: false
                }
            },
            {
                path: 'shippingPartner',
                name: 'shippingPartner',
                component: () => import('@src/views/shipping-partner-list-dictionary/ShippingPartnerListDictionary.vue'),
                meta: {
                    title: "Đơn vị vận chuyển",
                    anonymous: false
                }
            },
            {
                path: 'employee',
                name: 'employee',
                component: () => import('@src/views/employee-list-dictionary/EmployeeListDictionary.vue'),
                meta: {
                    title: "Nhân viên",
                    anonymous: false
                }
            },
            {
                path: 'branch',
                name: 'branch',
                component: () => import('@src/views/branch-list-dictionary/BranchListDictionary.vue'),
                meta: {
                    title: "Cửa hàng",
                    anonymous: false
                }
            },
            {
                path: 'shiftRecord',
                name: 'shiftRecord',
                component: () => import('@src/views/shift-record-list-dictionary/ShiftRecordListDictionary.vue'),
                meta: {
                    title: "Ca làm việc",
                    anonymous: false
                }
            },
            {
                path: 'bankAccount',
                name: 'bankAccount',
                component: () => import('@src/views/bank-account-list-dictionary/BankAccountListDictionary.vue'),
                meta: {
                    title: "Phương thức thanh toán",
                    anonymous: false
                }
            },

            // {
            //     path: 'revenue',
            //     name: 'revenue',
            //     component: () => import('@src/views/revenue-report/RevenueReport.vue'),
            //     meta: {
            //         title: "Đơn Hàng",
            //         anonymous: false
            //     }
            // },


        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@src/views/login/Login.vue'),
        meta: {
            title: "Đăng nhập",
            anonymous: true
        }
    },
    {
        path: '/:chapters*',
        name: 'error',
        redirect: '/not-found',
        component: () => import('@src/views/errors/Errors.vue'),
        children: [
            {
                path: 'not-found',
                name: 'badRequest',
                component: () => import('@src/views/errors/bad-request/BadRequest.vue'),
                meta: {
                    title: "Không tìm thấy trang",
                    anonymous: true
                }
            }
        ]
    }
]

export default routes;