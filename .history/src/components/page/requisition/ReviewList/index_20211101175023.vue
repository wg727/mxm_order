<template>
    <div>
        <div class="reviewheader">
            <span>审核调拨单列表</span>
            <div class="button">
                <el-dropdown trigger="click">
                    <el-button class="el_dropdown" icon="el-icon-lx-filter" size="small">筛选</el-button>
                    <el-button size="small" @click="getExamineList()" class="button"> 查看全部</el-button>
                    <el-popover
                        <el-form :model="filterInfo" ref="filterInfo">
                            <el-row>
                                <el-form-item label="调出组织：" class="filter_el-col">
                                    <el-input placeholder="输入调出组织" v-model="filterInfo.outOrgName"></el-input>
                                </el-form-item>
                                <el-form-item label="调入组织：" class="filter_el-col">
                                    <el-input placeholder="输入调入组织" v-model="filterInfo.inOrgName"></el-input>
                                </el-form-item>
                                <el-form-item label="设备序列号:" class="filter_el-col">
                                    <el-input placeholder="输入设备序列号" v-model="filterInfo.deviseSerialNum"></el-input>
                                </el-form-item>

                                <el-form-item label="来源类型：" class="filter_el-col">
                                    <el-select
                                        v-model="filterInfo.applyType"
                                        placeholder="全部"
                                        style="width:100%"
                                        :popper-append-to-body="false"
                                    >
                                        <el-option label="全部" value=""></el-option>
                                        <el-option label="手工新增" value="0"></el-option>
                                        <el-option label="实施任务书" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="单据号：" class="filter_el-col">
                                    <el-input placeholder="输入单据号" v-model="filterInfo.applyCode"></el-input>
                                </el-form-item>

                                <el-form-item label="申请人：" class="filter_el-col">
                                    <el-input placeholder="输入申请人" v-model="filterInfo.applyUserName"></el-input>
                                </el-form-item>
                                <el-form-item label="计划员：" class="filter_el-col">
                                    <el-input placeholder="输入计划员" v-model="filterInfo.auditName"></el-input>
                                </el-form-item>

                                <el-form-item label="申请时间：" class="filter_el-col"
                                    ><br />
                                    <el-col :span="11">
                                        <el-date-picker
                                            type="date"
                                            placeholder="选择日期"
                                            v-model="filterInfo.createdDateStart"
                                            style="width: 100%;"
                                            :popper-append-to-body="false"
                                        ></el-date-picker>
                                    </el-col>

                                    <el-col :span="11" class="el_col_seletime" :popper-append-to-body="false">
                                        <el-date-picker
                                            type="date"
                                            placeholder="选择日期"
                                            v-model="filterInfo.createdDateEnd"
                                            style="width: 100%;"
                                            :popper-append-to-body="false"
                                        ></el-date-picker>
                                    </el-col>
                                </el-form-item>

                                <el-form-item class="besure">
                                    <el-button @click="resetFilter('filterInfo')">重置</el-button>
                                    <el-button type="danger" @click="beSure()">确定</el-button>
                                </el-form-item>
                            </el-row>
                        </el-form>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <el-card>
            <!-- table区域 -->
            <el-row>
                <el-table :data="goodsList" border style="width: 100%">
                    <el-table-column prop="applyCode" label="单据号">
                        <template v-slot="scope">
                            <div>
                                <a href="javascript:;" @click="toReviewDetails(scope.row.id)">{{ scope.row.applyCode }}</a>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="inOrgName" label="调入组织"></el-table-column>
                    <el-table-column prop="applyTypeText" label="来源类型"></el-table-column>
                    <el-table-column prop="fromCode" label="来源编号"></el-table-column>

                    <el-table-column prop="idleNum" label="闲置数量"></el-table-column>

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

            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                @size-change="handleSizeChange"
                :page-size="queryInfo.pagesize"
                :page-sizes="[5, 9, 13, 15]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
import { approvertransferOrderList } from '@/request/api.js';
export default {
    name: 'ReviewList',
    data() {
        return {
            queryInfo: {
                applyCode: '', //调拨申请单号
                auditQuery: 1, //是否审批列表- 非null -是(若传null为申请列表)
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
            total: 0,
            // 查询参数对象

            // 商品列表
            goodsList: [],

            // 筛选表单数据
            filterInfo: {
                auditQuery: 1, //是否审批列表- 非null -是(若传null为申请列表)
                outOrgName: '', //调出组织
                inOrgName: '', //调入组织
                deviseSerialNum: '', //设备序列号
                applyCode: '', //单据号
                applyType: '', //来源类型
                applyStatus: '', //订单状态
                applyUserName: '', //申请人
                auditName: '', //计划员
                createdDateStart: '', //开始时间
                createdDateEnd: '', //结束时间：
                p: 1,
                s: 10
            }
        };
    },
    created() {
        this.getExamineList();
    },
    methods: {
        //请求调拨申请数据
        getExamineList() {
            approvertransferOrderList(this.queryInfo).then(res => {
                this.goodsList = res.data.list;
                this.total = res.data.total;
            });
        },

        //重置
        resetFilter(formName){
            (this.filterInfo.outOrgName = ''), //调出组织
                (this.filterInfo.inOrgName = ''), //调入组织
                (this.filterInfo.deviseSerialNum = null), //设备序列号
                (this.filterInfo.applyCode = ''), //单据号
                (this.filterInfo.applyType = ''), //来源类型
                (this.filterInfo.applyStatus = ''), //订单状态
                (this.filterInfo.applyUserName = ''), //申请人
                (this.filterInfo.auditName = ''), //计划员
                (this.filterInfo.createdDateStart = ''), //开始时间
                (this.filterInfo.createdDateEnd = ''); //结束时间：
        },
        //筛选框确定
        beSure() {
            approvertransferOrderList(this.filterInfo).then(res => {
                this.goodsList = res.data.list;
                this.total = res.data.total;
            });
        },

        // ========================
        // 监听 pagesize 改变事件 每页显示的个数
        handleSizeChange(newS) {
            this.queryInfo.s = newS;
            this.getExamineList();
        },
        // 监听 页码值 改变的事件 当前页面值
        handleCurrentChange(newP) {
            this.queryInfo.p = newP;
            this.getExamineList();
        },

        //   跳转到审核综合调拨单详情
        // toReviewDetails(row) {
        //     this.$router.push('/reviewList/reviewListDetail');
        // },
        //去详情页
        toReviewDetails(id) {
            // console.log(id);
            // this.$router.push({path:`/transfer/transferDetail/${id}`});
            this.$router.push({
                name: 'review',
                params: {
                    id: id
                }
            });
        },
        get() {
            apiCheckOrganization(this.queryInfo);
        }
    }
};
</script>
<style lang="less" scoped>
.detail_title {
    border-left: 4px solid red;
    padding-left: 10px;
    font-size: 15px;
    line-height: 20px;
    text-align: left;
    color: #d71418;
    cursor: pointer;
}
.reviewheader {
    display: flex;
    align-items: center;
    height: 50px;
}
.button {
    margin-left: auto;
}
.el-pagination {
    margin-top: 20px;
    margin-left: 400px;
}
/* 筛选 */
.button {
    margin-left: auto;
    .el_dropdown {
        margin-left: 10px;
    }
}
.filter_el-col {
    box-sizing: border-box;
    margin: 10px;
    width: 400px;
}
.el_col_seletime {
    margin-left: 20px;
}
.besure {
    margin-left: 250px;
}
</style>
