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
                    <el-button size="small" icon="el-icon-plus" @click="addPurchaseOrder"> 新增</el-button>
                    <el-popover ref="popoverRef" placement="bottom-start" width="400" trigger="click">
                        <el-form :model="filterInfo">
                            <el-row>
                                <el-form-item label="订单编码:" class="filter_el-col">
                                    <el-input placeholder="输入订单编码" v-model="filterInfo.orderCode"></el-input>
                                </el-form-item>
                                <el-form-item label="供应商:" class="filter_el-col">
                                    <el-input placeholder="输入供应商" v-model="filterInfo.provider"></el-input>
                                </el-form-item>
                                <el-form-item label="产品名称:" class="filter_el-col">
                                    <el-input placeholder="输入产品名称" v-model="filterInfo.productName"></el-input>
                                </el-form-item>
                                <el-form-item label="序列号:" class="filter_el-col">
                                    <el-input placeholder="输入序列号" v-model="filterInfo.serialNumber"></el-input>
                                </el-form-item>
                                <el-form-item label="物流单号:" class="filter_el-col">
                                    <el-input placeholder="输入物流单号" v-model="filterInfo.logisticBillNumber"></el-input>
                                </el-form-item>

                                <el-form-item label="钉钉审批状态:" class="filter_el-col">
                                    <el-select
                                        v-model="filterInfo.DDapprovalStatus"
                                        placeholder="全部"
                                        style="width:100%"
                                        :popper-append-to-body="false"
                                    >
                                        <el-option label="全部" value="shanghai"></el-option>
                                        <el-option label="启用" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="下单时间：" class="filter_el-col"
                                    ><br />
                                    <el-col :span="11">
                                        <el-date-picker
                                            type="date"
                                            placeholder="选择日期"
                                            v-model="filterInfo.orderTime.startTime"
                                            style="width: 100%;"
                                            :popper-append-to-body="false"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                        ></el-date-picker>
                                    </el-col>

                                    <el-col :span="11" class="el_col_seletime" :popper-append-to-body="false">
                                        <el-date-picker
                                            type="date"
                                            placeholder="选择日期"
                                            v-model="filterInfo.orderTime.endTime"
                                            style="width: 100%;"
                                            :popper-append-to-body="false"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                        ></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="订单状态:" class="filter_el-col">
                                    <el-select
                                        v-model="filterInfo.orderStatus"
                                        placeholder="全部"
                                        style="width:100%"
                                        :popper-append-to-body="false"
                                    >
                                        <el-option label="全部订单" value="shanghai"></el-option>
                                        <el-option label="待供应商审核" value="beijing"></el-option>
                                        <el-option label="待供应商发货" value="beijing"></el-option>
                                        <el-option label="待收货" value="beijing"></el-option>
                                        <el-option label="已完成" value="beijing"></el-option>
                                        <el-option label="关闭交易" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item class="besure">
                                    <el-button>重置</el-button>
                                    <el-button type="danger" @click="close()">确定</el-button>
                                </el-form-item>
                            </el-row>
                        </el-form>
                        <el-button size="small" slot="reference" icon="el-icon-lx-filter" @click="visible = !visible"> 筛选 </el-button>
                    </el-popover>
                </div>
            </div>

            <!-- 列表 -->
            <el-row class="orderlist">
                <el-table :data="allOrderList" border>
                    <el-table-column prop="id" label="订单编号">
                        <template v-slot="scope">
                            <div>
                                <a href="javascript:;">{{ scope.row.id }}</a>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="orderTime" label="下单时间"></el-table-column>
                    <el-table-column prop="customer" label="供应商"></el-table-column>
                    <el-table-column prop="orderAmount" label="采购员"></el-table-column>
                    <el-table-column prop="sentNum" label="待发数量/订单数量"></el-table-column>
                    <el-table-column prop="sentedNum" label="已发数量/已申请数量"></el-table-column>
                    <el-table-column prop="orderStatus" label="订单状态"></el-table-column>
                    <el-table-column prop="nailingApproval" label="钉钉审批"></el-table-column>
                    <el-table-column prop="reviewer" label="审核人"></el-table-column>
                    <el-table-column prop="updateTime" label="最后更新时间"></el-table-column>
                </el-table>
            </el-row>
            <section class="footerMessage">
                <span>订单总数量: 25924</span>
                <span>订单待发总数量: 22796</span>
                <span>订单总金额:￥16119714148</span>
            </section>

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
                {
                    id: 'ORD16539202110190001',
                    orderTime: '2021-10-19 16:32:42',
                    customer: '深圳科卫机器人服务有限公司',
                    area: '华南大区',
                    orderAmount: '彭帅渠道管理员',
                    sentNum: '	2/2',
                    sentedNum: '	0/0',
                    orderStatus: '待供应商审核',
                    collectionStatus: '待客户付款',
                    nailingApproval: '未启用',
                    reviewer: '超级管理员	',
                    expectedTime: '2021-10-25',
                    updateTime: '2021-10-15 16:59:24'
                },
                {
                    id: 'ORD16539202110190001',
                    orderTime: '2021-10-19 16:32:42',
                    customer: '深圳科卫机器人服务有限公司',
                    area: '华南大区',
                    orderAmount: '彭帅渠道管理员',
                    sentNum: '	2/2',
                    sentedNum: '	0/0',
                    orderStatus: '待供应商审核',
                    collectionStatus: '待客户付款',
                    nailingApproval: '未启用',
                    reviewer: '超级管理员	',
                    expectedTime: '2021-10-25',
                    updateTime: '2021-10-15 16:59:24'
                },
                {
                    id: 'ORD16539202110190001',
                    orderTime: '2021-10-19 16:32:42',
                    customer: '深圳科卫机器人服务有限公司',
                    area: '华南大区',
                    orderAmount: '彭帅渠道管理员',
                    sentNum: '	2/2',
                    sentedNum: '	0/0',
                    orderStatus: '待供应商审核',
                    collectionStatus: '待客户付款',
                    nailingApproval: '未启用',
                    reviewer: '超级管理员	',
                    expectedTime: '2021-10-25',
                    updateTime: '2021-10-15 16:59:24'
                },
                {
                    id: 'ORD16539202110190001',
                    orderTime: '2021-10-19 16:32:42',
                    customer: '深圳科卫机器人服务有限公司',
                    area: '华南大区',
                    orderAmount: '超级管理员',
                    sentNum: '	2/2',
                    sentedNum: '	0/0',
                    orderStatus: '待供应商审核',
                    collectionStatus: '待客户付款',
                    nailingApproval: '未启用',
                    reviewer: '超级管理员	',
                    expectedTime: '2021-10-25',
                    updateTime: '2021-10-15 16:59:24'
                }
            ],
            visible: false,
            // 筛选表单数据
            filterInfo: {
                orderCode: '',
                provider: '',
                productName: '',
                serialNumber: '',
                logisticBillNumber: '',
                DDapprovalStatus: '',
                orderTime: {
                    startTime: '',
                    endTime: ''
                },
                orderStatus: ''
            }
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
        },
        //筛选窗关闭
        close() {
            this.$refs.popoverRef.doClose();
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

.el-form-item {
    margin-bottom: 0px;
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
