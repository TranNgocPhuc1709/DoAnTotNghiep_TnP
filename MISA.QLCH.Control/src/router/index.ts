import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'default',
        redirect: '/control/eshop-button'
    },
    {
        path: '/control',
        name: 'control',
        component: () => import('@src/views/demo_control/DemoControl.vue'),
        children: [
            {
                path: 'eshop-button',
                name: 'defaultControl',
                component: () => import('@src/views/demo_button/DemoButton.vue'),
            },
            {
                path: 'eshop-combobox',
                name: 'controlCombobox',
                component: () => import('@src/views/demo_combobox/DemoCombobox.vue'),
            },
            {
                path: 'eshop-date',
                name: 'controlDate',
                component: () => import('@src/views/demo_date/DemoDate.vue'),
            },
            {
                path: 'eshop-drop-down-menu',
                name: 'controlDropDownMenu',
                component: () => import('@src/views/demo_drop_down_menu/DemoDropDownMenu.vue'),
            },
            {
                path: 'eshop-number',
                name: 'controlNumber',
                component: () => import('@src/views/demo_number/DemoNumber.vue'),
            },
            {
                path: 'eshop-text-box',
                name: 'controlTextBox',
                component: () => import('@src/views/demo_text_box/DemoTextBox.vue'),
            },
            {
                path: 'eshop-checkbox',
                name:'controlCheckbox',
                component:()=>import('@src/views/demo_checkbox/DemoCheckBox.vue')
            },
            {
                path: 'eshop-grid',
                name:'controlGrid',
                component:()=>import('@src/views/demo_grid/DemoGrid.vue')
            },
            {
                path: 'eshop-column-chart',
                name:'controlColumnChart',
                component:()=>import('@src/views/demo_column_chart/DemoColumnChart.vue')
            }
        ]
    }

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})


export default router
