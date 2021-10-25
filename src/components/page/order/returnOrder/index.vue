<template>
    <div>
        <!-- ==========================全部订单========================= -->
        <el-card class="allOrderList">
            <div class="transheader">
                <div>
                    <el-col>
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link"> 全部订单<i class="el-icon-arrow-down el-icon--right"></i> </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>全部订单</el-dropdown-item>
                                    <el-dropdown-item>待审核</el-dropdown-item>
                                    <el-dropdown-item>代发货</el-dropdown-item>
                                    <el-dropdown-item>待客户收货</el-dropdown-item>
                                    <el-dropdown-item>已完成</el-dropdown-item>
                                    <el-dropdown-item>交易关闭</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-col>
                </div>
                <div class="button">
                    <el-button size="small" icon="el-icon-lx-filter"> 筛选 </el-button>
                </div>
            </div>

            <!-- 列表 -->
            <el-row class="orderlist">
                <el-table :data="allOrderList" border>
                    <el-table-column prop="id" label="退货申请编号">
                        <template v-slot="scope">
                            <div>
                                <a href="javascript:;">{{ scope.row.id }}</a>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="orderTime" label="退货编号"></el-table-column>
                    <el-table-column prop="customer" label="订单编号"></el-table-column>
                    <el-table-column prop="orderAmount" label="申请时间"></el-table-column>
                    <el-table-column prop="sentNum" label="客户"></el-table-column>
                    <el-table-column prop="sentedNum" label="订单金额(元)"></el-table-column>
                    <el-table-column prop="orderStatus" label="类型"></el-table-column>
                    <el-table-column prop="nailingApproval" label="订单状态"></el-table-column>
                    <el-table-column prop="updateTime" label="最后更新时间"></el-table-column>
                </el-table>
            </el-row>

            <!-- 分页 -->
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                @size-change="handleSizeChange"
                :page-size="queryInfo.pagesize"
                :page-sizes="[5, 10, 20, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
export default {
    name: 'SalesOrder',
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
            orderList: [],
            allOrderList: []
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
        },
        // 新增跳转的到新增销售订单页面
        addPurchaseOrder() {
            this.$router.push('/purchaseOrder/add');
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
