<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">{{
                                    threeItem.title
                                }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: '6',
                    title: '供应链调拨',
                    subs: [
                        {
                            index: '/transfer',
                            title: '综合调拨申请'
                        },
                        {
                            index: '/prolist',
                            title: '产品列表'
                        },
                        {
                            index: '/reviewList',
                            title: '审核调拨单'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: '7',
                    title: '订单中心',
                    subs: [
                        {
                            index: '/salesOrder',
                            title: '销售订单'
                        },
                        {
                            index: '/adReplaceOrder',
                            title: '广告资源置换订单'
                        },
                        {
                            index: '/productSummary',
                            title: '产品汇总'
                        },
                        {
                            index: '/purchaseOrder',
                            title: '采购订单'
                        },
                        {
                            index: '/leaseOrder',
                            title: '租赁订单'
                        },
                        {
                            index: "/conversionOrder",
                            title: "转换订单",
                        },
                        {
                            index: "/shipmentNum",
                            title: "物流单号",
                        },
                        {
                            index: "/purchaseReturns",
                            title: "采购退换货",
                        },
                        {
                            index: "/salesreturnAddress",
                            title: "销售退换货地址",
                        },

                    ]
                }

                },


            ]
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
