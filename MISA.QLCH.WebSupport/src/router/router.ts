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
                path: 'invoice',
                name: 'invoice',
                component: () => import('@src/views/invoice-list-dictionary/InvoiceListDictionary.vue'),
                meta: {
                    title: "Hóa đơn",
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
            // {
            //     path: 'revenue',
            //     name: 'revenue',
            //     component: () => import('@src/views/revenue-report/RevenueReport.vue'),
            //     meta: {
            //         title: "Đơn Hàng",
            //         anonymous: false
            //     }
            // },

            {
                path: 'home',
                name: 'Home',
                component: () => import('@src/views/home-view/HomeView.vue'),
                meta: {
                    title: "Trang Chủ",
                    anonymous: false
                }
            },
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