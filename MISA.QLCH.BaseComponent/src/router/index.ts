import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'default',
        redirect: '/control/bank-account'
    },
    {
        path: '/control',
        name: 'control',
        component: () => import('@src/views/demo_control/DemoControl.vue'),
        children: [
            
            {
                path: 'bank-account',
                name: 'bankAccount',
                component: () => import('@src/views/dictionary/bank_account/BankAccount.vue'),
            }
        ]
    }

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})


export default router
