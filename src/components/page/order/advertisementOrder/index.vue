<template>
    <div>
        <h2>广告订单列表</h2>

        <!-- ==========================全部订单========================= -->
        <el-card class="allOrderList">
            <div class="transheader">
                <div class="button">
                    <el-button size="small"> + 新增 </el-button>
                    <el-button size="small"> 批量导出 </el-button>
                    <el-popover ref="popoverRef" placement="bottom-start" width="400" trigger="click">
                        <el-form :model="filterInfo">
                            <el-row>
                                <el-form-item label="订单编码:" class="filter_el-col">
                                    <el-input placeholder="输入订单编码" v-model="filterInfo.orderCode"></el-input>
                                </el-form-item>
                                <el-form-item label="客户名称:" class="filter_el-col">
                                    <el-input placeholder="输入客户名称" v-model="filterInfo.customerName"></el-input>
                                </el-form-item>
                                <el-form-item label="客户所属区域:" class="filter_el-col">
                                    <el-input placeholder="输入客户所属区域" v-model="filterInfo.customerRegion"></el-input>
                                </el-form-item>
                                <el-form-item label="客户所在省份:" class="filter_el-col">
                                    <el-input placeholder="输入客户所在省份" v-model="filterInfo.customerProvince"></el-input>
                                </el-form-item>

                                <el-form-item label="产品类别:" class="filter_el-col">
                                    <el-select
                                        v-model="filterInfo.productCategory"
                                        placeholder="全部"
                                        style="width:100%"
                                        :popper-append-to-body="false"
                                    >
                                        <el-option label="全部" value="shanghai"></el-option>
                                        <el-option label="机器人" value="beijing"></el-option>
                                        <el-option label="其他" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="订单来源:" class="filter_el-col">
                                    <el-select
                                        v-model="filterInfo.transOrganiza"
                                        placeholder="全部"
                                        style="width:100%"
                                        :popper-append-to-body="false"
                                    >
                                        <el-option label="全部" value="shanghai"></el-option>
                                        <el-option label="科卫云" value="beijing"></el-option>
                                        <el-option label="好萝卜" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="申请时间：" class="filter_el-col"
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
                                        <el-option label="全部" value="shanghai"></el-option>
                                        <el-option label="待审核" value="beijing"></el-option>
                                        <el-option label="待发货" value="beijing"></el-option>
                                        <el-option label="审核拒绝" value="beijing"></el-option>
                                        <el-option label="待收货" value="beijing"></el-option>
                                        <el-option label="已取消" value="beijing"></el-option>
                                        <el-option label="已完成" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="收款状态:" class="filter_el-col">
                                    <el-select
                                        v-model="filterInfo.collectionStatus"
                                        placeholder="全部"
                                        style="width:100%"
                                        :popper-append-to-body="false"
                                    >
                                        <el-option label="全部" value="shanghai"></el-option>
                                        <el-option label="待客户付款" value="beijing"></el-option>
                                        <el-option label="待确认收款" value="beijing"></el-option>
                                        <el-option label="部分收款" value="beijing"></el-option>
                                        <el-option label="收款完成" value="beijing"></el-option>
                                        <el-option label="无需收款" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="组织类型:" class="filter_el-col">
                                    <el-select
                                        v-model="filterInfo.organizationType"
                                        placeholder="全部"
                                        style="width:100%"
                                        :popper-append-to-body="false"
                                    >
                                        <el-option label="全部" value="shanghai"></el-option>
                                        <el-option label="子公司" value="beijing"></el-option>
                                        <el-option label="代理商" value="beijing"></el-option>
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
                    <el-table-column prop="id" label="序号">
                        <template v-slot="scope">
                            <div>
                                <a href="javascript:;">{{ scope.row.id }}</a>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="customer" label="订单号"></el-table-column>
                    <el-table-column prop="customer" label="客户名称"></el-table-column>
                    <el-table-column prop="customer" label="投放时间"></el-table-column>
                    <el-table-column prop="customer" label="播放周期"></el-table-column>
                    <el-table-column prop="orderTime" label="订单金额"></el-table-column>
                    <el-table-column prop="orderAmount" label="负责人"></el-table-column>
                    <el-table-column prop="sentNum" label="计划设备数"></el-table-column>
                    <el-table-column prop="sentedNum" label="投放省市区"></el-table-column>
                    <el-table-column prop="collectionStatus" label="订单创建时间"></el-table-column>
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
            ],
            visible: false,
            // 筛选表单数据
            filterInfo: {
                orderCode: '',
                customerName: '',
                customerRegion: '',
                customerProvince: '',
                productCategory: '',
                orderSource: '',
                orderTime: {
                    startTime: '',
                    endTime: ''
                },
                orderStatus: '',
                collectionStatus: '',
                organizationType: ''
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
