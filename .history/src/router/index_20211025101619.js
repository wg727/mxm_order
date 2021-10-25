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
                    component: () => import (  "../components/page/requisition/Transfer/index.vue"),
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
                    path: "/transfer/transferDetail",
                    name: "TransferDetail",
                    meta: {
                        title: '综合调拨申请详情',
                        permission: true
                    },
                    component: () => import ( "../components/page/requisition/Transfer/TransferDetail.vue")
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
                , {
                    path: '/reviewList',
                    name: 'review',
                    meta: {
                        title: '审核调拨单详情'
                    },
                    component: () => import ( '../components/page/requisition/ReviewList/reviewListDetail.vue')
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
                {
                    path: '/adReplaceOrder/add',
                    name: 'addAdReplaceOrder',
                    meta: {
                        title: '新增广告资源置换订单'
                    },
                    component: () => import ( '../components/page/order/adReplaceOrder/add.vue')
                },
                {
                    path: '/purchaseOrder',
                    name: 'purchaseOrder',
                    meta: {
                        title: '采购订单'
                    },
                    component: () => import ( '../components/page/order/purchaseOrder/index.vue')
                },
                {
                    path: '/purchaseOrder/add',
                    name: 'addPurchaseOrder',
                    meta: {
                        title: '新增采购订单'
                    },
                    component: () => import ( '../components/page/order/purchaseOrder/add.vue')
                },
                {
                    path: '/leaseOrder',
                    name: 'leaseOrder',
                    meta: {
                        title: '租赁订单'
                    },
                    component: () => import ( '../components/page/order/leaseOrder/index.vue')
                },
                {
                    path: '/leaseOrder/add',
                    name: 'addLeaseOrder',
                    meta: {
                        title: '新增租赁订单'
                    },
                    component: () => import ( '../components/page/order/leaseOrder/add.vue')
                },
                {
                    path: '/conversionOrder',
                    name: 'conversionOrder',
                    meta: {
                        title: '转换订单'
                    },
                    component: () => import ( '../components/page/order/ConversionOrder/index.vue')
                },
                {
                    path: '/shipmentNum',
                    name: 'shipmentNum',
                    meta: {
                        title: '物流单号'
                    },
                    component: () => import ( '../components/page/order/shipmentNum/index.vue')
                },
                {
                    path: '/purchaseReturns',
                    name: 'purchaseReturns',
                    meta: {
                        title: '采购退换货'
                    },
                    component: () => import ( '../components/page/order/purchaseReturns/index.vue')
                },
                {
                    path: '/salesreturnAddress',
                    name: 'salesreturnAddress',
                    meta: {
                        title: '销售退换货地址'
                    },
                    component: () => import ( '../components/page/order/salesreturnAddress/index.vue')
                },
                
                

                
                
                
                
            ]
        },
        
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
