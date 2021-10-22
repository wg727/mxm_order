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
                    path: "transfer",
                    name: "Transfer",
                    meta: {
                        title: '综合调拨申请',
                        permission: true
                    },
                    component: () => import (  "../components/page/requisition/Transfer/index.vue"),
                    children:[
                        {
                            path: "add",
                            name: "Add",
                            meta: {
                                title: '综合调拨申请添加',
                                permission: true
                            },
                            component: () => import ( "../components/page/requisition/Transfer/Add.vue")
                        },
                    ]
                    
                }, 
                {
                    path: "/transfer/add",
                    name: "Add",
                    meta: {
                        title: '综合调拨申请添加',
                        permission: true
                    },
                    component: () => import ( "../components/page/requisition/Transfer/Add.vue")
                },
                {
                    path: '/prolist',
                    name: 'prolist',
                    meta: {
                        title: '产品列表'
                    },
                    component: () => import ( '../components/page/requisition/Prolist/index.vue')
                }, {
                    path: '/reviewList',
                    name: 'review',
                    meta: {
                        title: '审核调拨单'
                    },
                    component: () => import ( '../components/page/requisition/ReviewList/index.vue')
                },
                // ========================订单模块====================================
                {
                    path: '/salesOrder',
                    name: 'salesOrder',
                    meta: {
                        title: '销售订单'
                    },
                    component: () => import ( '../components/page/order/SalesOrder/index.vue')
                },
                {
                    path: '/addSalesOrder',
                    name: 'addSalesOrder',
                    meta: {
                        title: '新增销售订单'
                    },
                    component: () => import ( '../components/page/order/SalesOrder/add.vue')
                },
                {
                    path: '/productSummary',
                    name: 'ProductSummary',
                    meta: {
                        title: '产品汇总'
                    },
                    component: () => import ( '../components/page/order/ProductSummary/index.vue')
                },
                {
                    path: '/adReplaceOrder',
                    name: 'adReplaceOrder',
                    meta: {
                        title: '广告资源置换订单'
                    },
                    component: () => import ( '../components/page/order/adReplaceOrder/index.vue')
                },
                

                
                
                
                
            ]
        },
        
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
