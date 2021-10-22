import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/transfer'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                
                
                {
                    path: "/transfer",
                    name: "Transfer",
                    meta: {
                        title: '综合调拨申请',
                        permission: true
                    },
                    component: () => import (  "../components/page/requisition/Transfer.vue")
                }, 
                {
                    path: "/add",
                    name: "Add",
                    meta: {
                        title: '综合调拨申请添加',
                        permission: true
                    },
                    component: () => import ( "../components/page/requisition/children/Add.vue")
                },
                {
                    path: '/prolist',
                    name: 'prolist',
                    meta: {
                        title: '产品列表'
                    },
                    component: () => import ( '../components/page/requisition/Prolist.vue')
                }, {
                    path: '/reviewList',
                    name: 'review',
                    meta: {
                        title: '审核调拨单'
                    },
                    component: () => import ( '../components/page/requisition/ReviewList.vue')
                },
                // ========================订单模块====================================
                {
                    path: '/salesOrder',
                    name: 'salesOrder',
                    meta: {
                        title: '销售订单'
                    },
                    component: () => import ( '../components/page/order/SalesOrder.vue')
                },
                {
                    path: '/addSalesOrder',
                    name: 'addSalesOrder',
                    meta: {
                        title: '新增销售订单'
                    },
                    component: () => import ( '../components/page/order/children/AddSalesOrder.vue')
                },
                {
                    path: '/productSummary',
                    name: 'ProductSummary',
                    meta: {
                        title: '新增销售订单'
                    },
                    component: () => import ( '../components/page/order/ProductSummary.vue')
                },
                

                
                
                
                
            ]
        },
        
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
