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
                path: 'goodsOrder',
                name: 'goodsOrder',
                component: () => import('@src/views/goods-order-list-dictionary/GoodsOrderListDictionary.vue'),
                meta: {
                    title: "Đặt Hàng",
                    anonymous: false
                }
            },
            {
                path: 'import',
                name: 'import',
                component: () => import('@src/views/import-list-dictionary/ImportListDictionary.vue'),
                meta: {
                    title: "Nhập Hàng",
                    anonymous: false
                }
            },
            {
                path: 'return',
                name: 'return',
                component: () => import('@src/views/return-list-dictionary/ReturnListDictionary.vue'),
                meta: {
                    title: "Trả lại hàng mua",
                    anonymous: false
                }
            },

            {
                path: 'inward',
                name: 'inward',
                component: () => import('@src/views/inward-list-dictionary/InwardListDictionary.vue'),
                meta: {
                    title: "Nhập Kho",
                    anonymous: false
                }
            },
            {
                path: 'outward',
                name: 'outward',
                component: () => import('@src/views/outward-list-dictionary/OutwardListDictionary.vue'),
                meta: {
                    title: "Xuất Kho",
                    anonymous: false
                }
            },
            {
                path: 'inventory',
                name: 'inventory',
                component: () => import('@src/views/inventory-list-dictionary/InventoryListDictionary.vue'),
                meta: {
                    title: "Kiểm kê kho",
                    anonymous: false
                }
            },

            {
                path: 'cashReceipt',
                name: 'cashReceipt',
                component: () => import('@src/views/cash-receipt-list-dictionary/CashReceiptListDictionary.vue'),
                meta: {
                    title: "Phiếu thu tiền",
                    anonymous: false
                }
            },
            {
                path: 'cashPayment',
                name: 'cashPayment',
                component: () => import('@src/views/cash-payment-list-dictionary/CashPaymentListDictionary.vue'),
                meta: {
                    title: "Phiếu chi tiền",
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
                path: 'purchase',
                name: 'purchase',
                component: () => import('@src/views/purchase-list-dictionary/PurchaseListDictionary.vue'),
                meta: {
                    title: "Nhập Hàng",
                    anonymous: false
                }
            },
            {
                path: 'monetaryFlow',
                name: 'monetaryFlow',
                component: () => import('@src/views/monetary-flow-list-dictionary/MonetaryFlowListDictionary.vue'),
                meta: {
                    title: "Doanh thu bàn giao ca",
                    anonymous: false
                }
            },
            {
                path: 'revenueExpenditure',
                name: 'revenueExpenditure',
                component: () => import('@src/views/revenue-expenditure-list-dictionary/RevenueExpenditureListDictionary.vue'),
                meta: {
                    title: "Thu chi",
                    anonymous: false
                }
            },
            {
                path: 'stock',
                name: 'stock',
                component: () => import('@src/views/stock-list-dictionary/StockListDictionary.vue'),
                meta: {
                    title: "Kho",
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
        path: '/homeStore',
        name: 'homeStore',
        component: () => import('@src/views/home-store/HomeStore.vue'),
        meta: {
            title: "Trang Bán Hàng",
            anonymous: false
        }
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