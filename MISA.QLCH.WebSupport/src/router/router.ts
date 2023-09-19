import { RouteRecordRaw } from 'vue-router';
// import RouterMetaModel from '@src/models/route-meta/RouterMetaModel';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'main',
        component: () => import('@src/views/main/Main.vue'),
        redirect: '/invoice',
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