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
                component: () => import (  "../views/Transfer.vue")
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
                component: () => import ( '../views/Prolist.vue')
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

// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title} | vue-manage-system`;
//     const role = localStorage.getItem('ms_username');
//     if (!role && to.path !== '/login') {
//         next('/login');
//     } else if (to.meta.permission) {
//         // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//         role === 'admin'
//             ? next()
//             : next('/403');
//     } else {
//         next();
//     }
// });

export default router;