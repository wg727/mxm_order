<template>
    <div>
        <h2>租赁换货</h2>

        <!-- ==========================全部订单========================= -->
        <el-card class="allOrderList">
            <div class="transheader">
                <div class="button">
                    <el-button size="small" icon="el-icon-lx-filter"> 筛选 </el-button>
                </div>
            </div>
            <!-- 列表 -->
            <el-row class="orderlist">
                <el-table :data="allOrderList" border>
                    <!-- <el-table-column prop="id" label="序号">
                        <template v-slot="scope">
                            <div>
                                <a href="javascript:;">{{ scope.row.id }}</a>
                            </div>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="customer" label="申请类型"></el-table-column>
                    <el-table-column prop="customer" label="申请单编号"></el-table-column>
                    <el-table-column prop="customer" label="客户名称"></el-table-column>
                    <el-table-column prop="customer" label="申请人(姓名)"></el-table-column>
                    <el-table-column prop="orderTime" label="申请人所属组织"></el-table-column>
                    <el-table-column prop="orderAmount" label="申请状态"></el-table-column>
                    <el-table-column prop="sentNum" label="操作"></el-table-column>
                </el-table>
            </el-row>
        </el-card>
    </div>
</template>
<script>
export default {
    name: 'leaseExchange',
    data() {
        return {
            queryInfo: {
                // 搜索值
                query: '',
                // 当前的页数
                pagenum: 1,
                // 当前每次显示多少条数据
                pagesize: 5
            },
            total: 100,
            currentPage4: 10,
            orderList: [
                {
                    name: '天正电气塑壳断路器空气开关断路器空开塑壳DZ20Y系列',
                    orderNum: 10318,
                    deliver: 10317,
                    shipped: 0,
                    received: 1
                },
                {
                    name: '天正电气塑壳断路器空气开关断路器空开塑壳DZ20Y系列',
                    orderNum: 10318,
                    deliver: 10317,
                    shipped: 0,
                    received: 1
                },
                {
                    name: '天正电气塑壳断路器空气开关断路器空开塑壳DZ20Y系列',
                    orderNum: 10318,
                    deliver: 10317,
                    shipped: 0,
                    received: 1
                },
                {
                    name: '天正电气塑壳断路器空气开关断路器空开塑壳DZ20Y系列',
                    orderNum: 10318,
                    deliver: 10317,
                    shipped: 0,
                    received: 1
                }
            ],
            allOrderList: [
                // {
                //     id: 'ORD16539202110190001',
                //     orderTime: '2021-10-19 16:32:42',
                //     customer: '深圳科卫机器人服务有限公司',
                //     area: '华南大区',
                //     orderAmount: '	¥12.00',
                //     sentNum: '	2/2',
                //     sentedNum: '	0/0',
                //     orderStatus: '待发货',
                //     collectionStatus: '待客户付款',
                //     nailingApproval: '未启用',
                //     reviewer: '超级管理员	',
                //     expectedTime: '2021-10-25',
                //     updateTime: '2021-10-15 16:59:24'
                // },
                // {
                //     id: 'ORD16539202110190001',
                //     orderTime: '2021-10-19 16:32:42',
                //     customer: '深圳科卫机器人服务有限公司',
                //     area: '华南大区',
                //     orderAmount: '	¥12.00',
                //     sentNum: '	2/2',
                //     sentedNum: '	0/0',
                //     orderStatus: '待发货',
                //     collectionStatus: '待客户付款',
                //     nailingApproval: '未启用',
                //     reviewer: '超级管理员	',
                //     expectedTime: '2021-10-25',
                //     updateTime: '2021-10-15 16:59:24'
                // },
                // {
                //     id: 'ORD16539202110190001',
                //     orderTime: '2021-10-19 16:32:42',
                //     customer: '深圳科卫机器人服务有限公司',
                //     area: '华南大区',
                //     orderAmount: '	¥12.00',
                //     sentNum: '	2/2',
                //     sentedNum: '	0/0',
                //     orderStatus: '待发货',
                //     collectionStatus: '待客户付款',
                //     nailingApproval: '未启用',
                //     reviewer: '超级管理员	',
                //     expectedTime: '2021-10-25',
                //     updateTime: '2021-10-15 16:59:24'
                // },
                // {
                //     id: 'ORD16539202110190001',
                //     orderTime: '2021-10-19 16:32:42',
                //     customer: '深圳科卫机器人服务有限公司',
                //     area: '华南大区',
                //     orderAmount: '	¥12.00',
                //     sentNum: '	2/2',
                //     sentedNum: '	0/0',
                //     orderStatus: '待发货',
                //     collectionStatus: '待客户付款',
                //     nailingApproval: '未启用',
                //     reviewer: '超级管理员	',
                //     expectedTime: '2021-10-25',
                //     updateTime: '2021-10-15 16:59:24'
                // }
            ]
        };
    },
    methods: {
        // 监听 pagesize 改变事件 每页显示的个数
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize;
        },
        // 监听 页码值 改变的事件 当前页面值
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage;
        },

        // 订单名称点击事件
        orderDetail(row) {
            this.$router.push('/add');
        }
    }
};
</script>
<style lang="less" scoped>
.row {
    margin-top: 10px;
}
.el-col {
    display: flex;
}
.el-pagination {
    margin-top: 20px;
    margin-left: 400px;
}

/* 全部订单 */

/* 全部订单下拉菜单 */
.el-dropdown-link {
    cursor: pointer;
    color: #409eff;
}
.el-icon-arrow-down {
    font-size: 12px;
}
.demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}
.allOrderList {
    margin-top: 8px;
}
.transheader {
    margin-top: 10px;
    display: flex;
    align-items: center;
    height: 10px;
}
.button {
    margin-left: auto;
}
.el-pagination {
    margin-top: 20px;
    margin-left: 400px;
}
.orderlist {
    margin-top: 20px;
}
.footerMessage {
    margin-top: 10px;
    margin-right: 1%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    span {
        font-size: 12px;
        padding-left: 10px;
    }
}
</style>
