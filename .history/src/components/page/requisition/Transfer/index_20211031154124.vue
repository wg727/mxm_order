<template>
    <div>
        <el-card>
            <div class="transheader">
                <div>
                    <span class="detail_title">综合调拨申请列表</span>
                </div>
                <div class="detail_left">
                    <el-button size="small" @click="getTransferList" class="button"> 查看全部</el-button>
                    <el-button size="small" icon="el-icon-plus" @click="addAdReplaceOrder" class="button"> 新增</el-button>
                    <el-button size="small" icon="el-icon-plus" @click="exportFile" class="button"> 批量导出</el-button>

                    <el-popover ref="popoverRef" placement="bottom-start" width="400" trigger="click">
                        <el-form :model="filterInfo">
                            <el-row>
                                <el-form-item label="调出组织:" class="filter_el-col" prop="aaa">
                                    <el-input placeholder="输入调出组织" v-model="filterInfo.outOrgName"></el-input>
                                </el-form-item>
                                <el-form-item label="调入组织:" class="filter_el-col">
                                    <el-input placeholder="输入调入组织" v-model="filterInfo.inOrgName"></el-input>
                                </el-form-item>
                                <el-form-item label="设备序列号:" class="filter_el-col">
                                    <el-input placeholder="输入设备序列号" v-model="filterInfo.deviseSerialNum"></el-input>
                                </el-form-item>
                                <el-form-item label="单据号:" class="filter_el-col">
                                    <el-input placeholder="输入单据号" v-model="filterInfo.applyCode"></el-input>
                                </el-form-item>

                                <el-form-item label="来源类型:" class="filter_el-col">
                                    <el-select v-model="filterInfo.fromCode" style="width:100%" :popper-append-to-body="false">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option label="DMI调拨" value="DMI调拨"></el-option>
                                        <el-option label="实施任务书" value="实施任务书"></el-option>
                                        <el-option label="回收申请" value="回收申请"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="订单状态:" class="filter_el-col">
                                    <el-select
                                        v-model="filterInfo.applyStatus"
                                        placeholder="全部"
                                        style="width:100%"
                                        :popper-append-to-body="false"
                                    >
                                        <el-option label="全部" value=""></el-option>
                                        <el-option label="待审核" value="0"></el-option>
                                        <el-option label="待发货" value="1"></el-option>
                                        <el-option label="审核拒绝" value="2"></el-option>
                                        <el-option label="待收货" value="3"></el-option>
                                        <el-option label="已取消" value="4"></el-option>
                                        <el-option label="待完成" value="5"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="申请人:" class="filter_el-col">
                                    <el-input placeholder="输入申请人" v-model="filterInfo.applyUserName"></el-input>
                                </el-form-item>
                                <el-form-item label="计划员:" class="filter_el-col">
                                    <el-input placeholder="输入计划员" v-model="filterInfo.auditName"></el-input>
                                </el-form-item>
                                <el-form-item label="申请时间：" class="filter_el-col"
                                    ><br />
                                    <el-col :span="12">
                                        <el-date-picker
                                            type="date"
                                            placeholder="选择日期"
                                            v-model="filterInfo.createdDateStart"
                                            style="width: 100%;"
                                            :popper-append-to-body="false"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                        ></el-date-picker>
                                    </el-col>

                                    <el-col :span="12" class="el_col_seletime" :popper-append-to-body="false">
                                        <el-date-picker
                                            type="date"
                                            placeholder="选择日期"
                                            v-model="filterInfo.createdDateEnd"
                                            style="width: 100%; margin-left:10px;"
                                            :popper-append-to-body="false"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                        ></el-date-picker>
                                    </el-col>
                                </el-form-item>

                                <el-form-item class="besure">
                                    <el-button type="info" @click="resetFilter()">重置</el-button>
                                    <el-button type="danger" @click="beSure()">确定</el-button>
                                </el-form-item>
                            </el-row>
                        </el-form>
                        <el-button size="small" slot="reference" icon="el-icon-lx-filter" style="margin-left:10px">
                            筛选
                        </el-button>
                    </el-popover>
                </div>
            </div>

            <!-- --------------------------------------------- -->

            <el-row class="orderlist">
                <el-table :data="goodsList" border>
                    <el-table-column prop="applyCode" label="单据号" width="140px" style="height:50px">
                        <template v-slot="scope">
                            <div>
                                <!-- <a href="javascript:;" @click="toTransferDetail(scope.row.id)">{{ scope.row.applyCode }}</a> -->
                                <a @click="toTransferDetail(scope.row.id)" style="color:blue;cursor: pointer">{{ scope.row.applyCode }}</a>
                                <!-- <router-link :to="'/transfer/transferDetail/'+scope.row.id" >{{ scope.row.applyCode }}</router-link> -->
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="assetsOrgName" label="资产所属组织"></el-table-column>
                    <el-table-column prop="inOrgName" label="调入管理组织"></el-table-column>
                    <el-table-column prop="applyTypeText" label="来源类型"></el-table-column>
                    <el-table-column prop="productName" label="产品名称" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="applyNumCount" label="申请数量"></el-table-column>
                    <el-table-column prop="waitNumCount" label="待发数量"></el-table-column>
                    <el-table-column prop="confirmNumCount" label="收货数量"></el-table-column>
                    <el-table-column prop="applyStatusText" label="状态"></el-table-column>
                    <el-table-column prop="applyUserName" label="申请人"></el-table-column>
                    <el-table-column prop="auditName" label="计划员"></el-table-column>
                    <el-table-column prop="receiverName" label="客户名称"></el-table-column>
                    <el-table-column prop="receiverAddress" label="客户地址"></el-table-column>
                    <el-table-column prop="receiverMobile" label="客户联系方式"></el-table-column>
                    <el-table-column prop="createdDate" label="申请时间"></el-table-column>
                    <el-table-column prop="lastUpdatedDate" label="最后更新时间"></el-table-column>
                </el-table>
            </el-row>

            <!-- 分页 -->
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="queryInfo.p"
                @size-change="handleSizeChange"
                :page-size="queryInfo.s"
                :page-sizes="[5, 10, 20, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import { apiTransferApplicationlist, listExport } from '@/request/api.js';
import fileDownload from 'js-file-download';
import axios from 'axios';

export default {
    name: 'Transfer',
    data() {
        return {
            queryInfo: {
                applyCode: '', //调拨申请单号
                auditQuery: null, //是否审批列表- 非null -是(若传null为申请列表)
                applyStatus: null, //调拨申请状态 0-待审核 1待发货 2审核拒绝 3待收货 4已取消 5待完成
                applyType: '', //申请类型 0-手工新增 1-实施任务书
                applyUserName: '', //申请人姓名
                auditName: '', //审核人-计划员
                createdDateEnd: '', //筛选项-申请时间尾
                createdDateStart: '', //筛选项-申请时间起
                fromCode: '', //来源编号
                inOrgName: '', //调入组织名称
                outOrgName: '', //调出组织名称
                p: 1,
                s: 10
            },
            total: 1,
            currentPage4: 10,

            // 综合调拨申请列表
            goodsList: [],
            // 筛选表单数据
            filterInfo: {
                outOrgName: '', //调出组织
                inOrgName: '', //调入组织
                deviseSerialNum: '', //设备序列号
                applyCode: '', //单据号
                fromCode: '', //来源类型
                applyStatus: '', //订单状态
                applyUserName: '', //申请人
                auditName: '', //计划员
                createdDateStart: '', //开始时间
                createdDateEnd: '', //结束时间：
                p: 1,
                s: 10
            },
            //批量导出
            url: {
                type:  'http://10.0.32.240:8089/neworder/api/v1/allocate/listExport',
                required: true
            },
            params:{

            }
        };
    },
    created() {
        this.getTransferList();
    },
    methods: {
        //请求调拨申请数据
        getTransferList() {
            apiTransferApplicationlist(this.queryInfo).then(res => {
                console.log(res);
                this.goodsList = res.data.list;
                this.total = res.data.total;
            });
        },
        
        //文件导出
        exportFile() {
            const params=this.filterInfo
            axios({
                method: 'get',
                url: 'http://10.0.32.240:8089/neworder/api/v1/allocate/listExport',
                params:params,
                responseType: 'blob',
                headers: {
                    'Content-Type': 'application/octet-stream'
                }
            }).then(res => {
                fileDownload(res.data, '调拨单列表');
                this.$emit('after-download');
            });

        },

        // 监听 pagesize 改变事件 每页显示的个数
        handleSizeChange(newS) {
            this.queryInfo.s = newS;
            this.getTransferList();
        },
        // 监听 页码值 改变的事件 当前页面值
        handleCurrentChange(newP) {
            this.queryInfo.p = newP;
            this.getTransferList();
        },
        addAdReplaceOrder() {
            this.$router.push({ path: '/transfer/add' });
        },
        goAddpage() {
            this.$router.push({ path: '/transfer/add' });
        },
        //去详情页
        toTransferDetail(id) {
            this.$router.push({
                name: 'TransferDetail',
                params: {
                    id: id
                }
            });
        },
        //筛选框确定
        beSure() {
            apiTransferApplicationlist(this.filterInfo).then(res => {
                this.goodsList = res.data.list;
                this.total = res.data.total;
            });
        },
        //筛选框重置
        resetFilter() {
            (this.filterInfo.outOrgName = ''), //调出组织
                (this.filterInfo.inOrgName = ''), //调入组织
                (this.filterInfo.deviseSerialNum = null), //设备序列号
                (this.filterInfo.applyCode = ''), //单据号
                (this.filterInfo.fromCode = ''), //来源类型
                (this.filterInfo.applyStatus = ''), //订单状态
                (this.filterInfo.applyUserName = ''), //申请人
                (this.filterInfo.auditName = ''), //计划员
                (this.filterInfo.createdDateStart = ''), //开始时间
                (this.filterInfo.createdDateEnd = ''); //结束时间：
        },

        // 添加产品
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
};
</script>

<style lang="less" scoped>
.transheader {
    display: flex;
    justify-content: space-between;
}
.detail_title {
    // display: flex;
    border-left: 4px solid red;
    padding-left: 10px;
    // margin-right: 1050px;
    font-size: 15px;
    line-height: 20px;
    text-align: left;
    color: #d71418;
    cursor: pointer;
}
.detail_left {
    margin-right: 0px;
}

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
.besure {
    margin-top: 10px;
    margin-left: 270px;
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

// .aaa{
//     display: flex;
//     .bbb{
//         display: flex;
//         margin-left: 1100px;
//     }
// }
</style>
