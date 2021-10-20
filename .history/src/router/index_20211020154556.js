import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/transfer'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [

            {
                path: "/transfer",
                name: "Transfer",
                meta: {
                    title: '综合调拨申请',
                    permission: true
                },
                component: () => import (  "../views/requisition/Transfer.vue")
            }, 
            {
                path: "/add",
                name: "Add",
                meta: {
                    title: '综合调拨申请添加',
                    permission: true
                },
                component: () => import ( "../views/Add.vue")
            },
            {
                path: '/prolist',
                name: 'prolist',
                meta: {
                    title: '产品列表'
                },
                component: () => import ( '../views/requisition/Prolist.vue')
            }, {
                path: '/reviewList',
                name: 'review',
                meta: {
                    title: '审核调拨单'
                },
                component: () => import ( '../views/ReviewList.vue')
            },
            // ========================订单模块====================================
               {
                path: '/salesOrder',
                name: 'salesOrder',
                meta: {
                    title: '销售订单'
                },
                component: () => import ( '../views/order/SalesOrder.vue')
            },
               {
                path: '/addSalesOrder',
                name: 'addSalesOrder',
                meta: {
                    title: '新增销售订单'
                },
                component: () => import ( '../views/order/AddSalesOrder.vue')
            },
        ]
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;