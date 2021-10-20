import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            }, {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            },
            {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标'
                },
                component: () => import ( /* webpackChunkName: "icon" */ "../views/Icon.vue")
            },
            {
                path: "/login",
                name: "Login",
                meta: {
                    title: '登录'
                },
                component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
            },



    // -------------------------------------------------------------------------------------
            {
                path: "/transfer",
                name: "transfer",
                meta: {
                    title: '综合调拨申请',
                    permission: true
                },
                component: () => import ( /* webpackChunkName: "permission" */ "../views/Transfer.vue")
            },  {
                path: '/prolist',
                name: 'prolist',
                meta: {
                    title: '产品列表'
                },
                component: () => import (/* webpackChunkName: "404" */ '../views/Prolist.vue')
            }, {
                path: '/review',
                name: 'review',
                meta: {
                    title: '审核调拨单'
                },
                component: () => import (/* webpackChunkName: "403" */ '../views/ReviewList.vue')
            },
        ]
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;