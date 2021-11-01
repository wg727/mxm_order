<template>
    <div>
        <div class="transferDetail">
            <span class="detail_title">综合调拨单详情</span>
            <div class="button">
                <el-button size="small" @click="cancelApplyDialog = true">取消申请</el-button>
                <el-button size="small" @click="goback">返回</el-button>
            </div>
        </div>

        <el-card class="el_card-style">
            <div class="detail">
                <section class="detail_section1 detail_margin">
                    <div class="section_list first">
                        <span>调入组织：</span>
                        <span>单据号：</span>
                        <span>申请项目：</span>
                        <span v-if="documentDetails.remark !== ''">申请备注：</span>
                    </div>
                    <div class="section_list">
                        <span>{{ documentDetails.inOrgName }}</span>
                        <span>{{ documentDetails.applyCode }}</span>
                        <span>{{ documentDetails.applyTypeText }}</span>
                        <span v-if="documentDetails.remark !== ''">{{ documentDetails.remark }}</span>
                    </div>
                </section>

                <section class="detail_section1 detail_margin">
                    <div class="section_list first">
                        <span>资产所属组织：</span>
                        <span>状态：</span>
                        <span v-if="documentDetails.applyType !== ''">领资料类型：</span>
                    </div>
                    <div class="section_list">
                        <span>{{ documentDetails.assetsOrgName }}</span>
                        <span>{{ documentDetails.applyStatusText }}</span>
                        <span v-if="documentDetails.applyType !== ''">{{ isApplyType }}</span>
                    </div>
                </section>

                <section class="detail_section1 detail_margin">
                    <div class="section_list first">
                        <span>申请人：</span>
                        <span>计划员：</span>
                        <span>审批备注：</span>
                    </div>
                    <div class="section_list">
                        <span>{{ documentDetails.applyUserName }}</span>
                        <span>{{ documentDetails.auditName }}</span>
                        <span>{{ documentDetails.auditRemark }}</span>
                    </div>
                </section>

                <section class="detail_section1 detail_margin">
                    <div class="section_list first">
                        <span>申请时间：</span>
                        <span>最后更新：</span>
                        <span v-if="documentDetails.receiverAddress !== '' || null || undefined">项目地址：</span>
                    </div>
                    <div class="section_list">
                        <span>{{ documentDetails.createdDate }}</span>
                        <span>{{ documentDetails.lastUpdatedDate }}</span>
                        <span>{{ documentDetails.receiverAddress }}</span>
                    </div>
                </section>
            </div>

            <div class="login-body">
                <el-steps :active="4" finish-status="success" size="medium" :space="200" :align-center="true" style="width: 700px">
                    <el-step title="员工李季单据提交" description="2021-10-22 17:30:19" />
                    <el-step title="超级管理员审批同意" description="2021-10-22 17:30:19" />
                    <el-step title="员工李季已发货" description="2021-10-22 17:30:19" />
                    <el-step title="已完成" />
                </el-steps>
            </div>

            <el-tabs type="border-card" style="margin-top:50px">
                <el-tab-pane label="单据详情">
                    <el-row>
                        <el-table :data="document" border>
                            <el-table-column type="index" label="序号"></el-table-column>
                            <el-table-column prop="outOrgName" label="调出管理组织"></el-table-column>
                            <el-table-column prop="productName" label="产品名称"></el-table-column>
                            <el-table-column prop="specification" label="规格"></el-table-column>
                            <el-table-column prop="unitText" label="单位"></el-table-column>
                            <el-table-column prop="applyNum" label="申请数量"></el-table-column>
                            <el-table-column prop="auditNum" label="审批数量"></el-table-column>
                            <el-table-column prop="waitNum" label="待发货数量"></el-table-column>
                            <el-table-column prop="sendNum" label="已发货数量"></el-table-column>
                            <el-table-column prop="cancelNum" label="	取消数量"></el-table-column>
                        </el-table>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="发货申请">
                    <el-table :data="shipmentApplica" border>
                        <el-table-column prop="code" label="申请单编号"></el-table-column>
                        <el-table-column prop="count" label="申请数量"></el-table-column>
                        <el-table-column prop="deliveryCount" label="待发货数量"></el-table-column>
                        <el-table-column prop="cancelCount" label="取消数量"></el-table-column>
                        <el-table-column prop="statusStr" label="状态"></el-table-column>
                        <el-table-column prop="createdDate" label="申请时间"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="发货记录">
                    <div>
                        <span>| 待发货</span>
                        <el-table :data="deliveredList" border style="margin-top:15px">
                            <el-table-column prop="productName" label="产品名称"></el-table-column>
                            <el-table-column prop="specification" label="规格"></el-table-column>
                            <el-table-column prop="unit" label="单位"></el-table-column>
                            <el-table-column prop="applicationsNum" label="申请数量"></el-table-column>
                            <el-table-column prop="callOutOrg" label="调出组织"></el-table-column>
                            <el-table-column prop="sentNum" label="待发数量"></el-table-column>
                        </el-table>
                        <!-- 分页 -->
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="queryInfo.pagenum"
                            @size-change="handleSizeChange"
                            :page-size="queryInfo.pagesize"
                            :page-sizes="[5, 10, 20, 50]"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="queryInfo.total"
                        >
                        </el-pagination>
                    </div>
                    <div>
                        <span>| 已发货</span>
                        <el-table :data="shipped" border style="margin-top:15px">
                            <el-table-column prop="index" label="发运单号"></el-table-column>
                            <el-table-column prop="applicationNum" label="物流公司"></el-table-column>
                            <el-table-column prop="shipNum" label="物流单号"></el-table-column>
                            <el-table-column prop="cancelNum" label="发货日期"></el-table-column>
                            <el-table-column prop="state" label="	产品名称"></el-table-column>
                            <el-table-column prop="applicationTime" label="规格"></el-table-column>
                            <el-table-column prop="applicationTime" label="单位"></el-table-column>
                            <el-table-column prop="applicationTime" label="发货数量"></el-table-column>
                            <el-table-column prop="applicationTime" label="	调出组织"></el-table-column>
                            <el-table-column prop="applicationTime" label="出库仓库"></el-table-column>
                            <el-table-column prop="applicationTime" label="出库货位"></el-table-column>
                            <el-table-column prop="applicationTime" label="查看"></el-table-column>
                            <el-table-column prop="applicationTime" label="	操作"></el-table-column>
                        </el-table>
                        <!-- 分页 -->
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="queryInfo.pagenum"
                            @size-change="handleSizeChange"
                            :page-size="queryInfo.pagesize"
                            :page-sizes="[5, 10, 20, 50]"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="queryInfo.total"
                        >
                        </el-pagination>
                    </div>
                    <div>
                        <span>| 已撤回</span>
                        <el-table :data="Withdrawn" border style="margin-top:15px">
                            <el-table-column prop="index" label="发运单号"></el-table-column>
                            <el-table-column prop="applicationNum" label="物流公司"></el-table-column>
                            <el-table-column prop="shipNum" label="物流单号"></el-table-column>
                            <el-table-column prop="cancelNum" label="发货日期"></el-table-column>
                            <el-table-column prop="state" label="产品名称"></el-table-column>
                            <el-table-column prop="applicationTime" label="规格"></el-table-column>
                            <el-table-column prop="applicationTime" label="单位"></el-table-column>
                            <el-table-column prop="applicationTime" label="发货数量"></el-table-column>
                            <el-table-column prop="applicationTime" label="调出组织"></el-table-column>
                            <el-table-column prop="applicationTime" label="撤回日期"></el-table-column>
                            <el-table-column prop="applicationTime" label="查看"></el-table-column>
                        </el-table>
                        <!-- 分页 -->
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="queryInfo.pagenum"
                            @size-change="handleSizeChange"
                            :page-size="queryInfo.pagesize"
                            :page-sizes="[5, 10, 20, 50]"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="queryInfo.total"
                        >
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="收货记录">
                    <div>
                        <span>| 待发货</span>
                        <el-table :data="deliveredList" border style="margin-top:15px">
                            <el-table-column prop="productName" label="产品名称"></el-table-column>
                            <el-table-column prop="specification" label="规格"></el-table-column>
                            <el-table-column prop="unit" label="单位"></el-table-column>
                            <el-table-column prop="applicationsNum" label="申请数量"></el-table-column>
                            <el-table-column prop="callOutOrg" label="调出组织"></el-table-column>
                            <el-table-column prop="sentNum" label="待发数量"></el-table-column>
                        </el-table>
                        <!-- 分页 -->
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="queryInfo.pagenum"
                            @size-change="handleSizeChange"
                            :page-size="queryInfo.pagesize"
                            :page-sizes="[5, 10, 20, 50]"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="queryInfo.total"
                        >
                        </el-pagination>
                    </div>
                    <div>
                        <span>| 已发货</span>
                        <el-table :data="shipped" border style="margin-top:15px">
                            <el-table-column prop="index" label="发运单号"></el-table-column>
                            <el-table-column prop="applicationNum" label="物流公司"></el-table-column>
                            <el-table-column prop="shipNum" label="物流单号"></el-table-column>
                            <el-table-column prop="cancelNum" label="发货日期"></el-table-column>
                            <el-table-column prop="state" label="	产品名称"></el-table-column>
                            <el-table-column prop="applicationTime" label="规格"></el-table-column>
                            <el-table-column prop="applicationTime" label="单位"></el-table-column>
                            <el-table-column prop="applicationTime" label="发货数量"></el-table-column>
                            <el-table-column prop="applicationTime" label="	调出组织"></el-table-column>
                            <el-table-column prop="applicationTime" label="出库仓库"></el-table-column>
                            <el-table-column prop="applicationTime" label="出库货位"></el-table-column>
                            <el-table-column prop="applicationTime" label="查看"></el-table-column>
                            <el-table-column prop="applicationTime" label="	操作"></el-table-column>
                        </el-table>
                        <!-- 分页 -->
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="queryInfo.pagenum"
                            @size-change="handleSizeChange"
                            :page-size="queryInfo.pagesize"
                            :page-sizes="[5, 10, 20, 50]"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="queryInfo.total"
                        >
                        </el-pagination>
                    </div>
                    <div>
                        <span>| 已撤回</span>
                        <el-table :data="Withdrawn" border style="margin-top:15px">
                            <el-table-column prop="index" label="发运单号"></el-table-column>
                            <el-table-column prop="applicationNum" label="物流公司"></el-table-column>
                            <el-table-column prop="shipNum" label="物流单号"></el-table-column>
                            <el-table-column prop="cancelNum" label="发货日期"></el-table-column>
                            <el-table-column prop="state" label="产品名称"></el-table-column>
                            <el-table-column prop="applicationTime" label="规格"></el-table-column>
                            <el-table-column prop="applicationTime" label="单位"></el-table-column>
                            <el-table-column prop="applicationTime" label="发货数量"></el-table-column>
                            <el-table-column prop="applicationTime" label="调出组织"></el-table-column>
                            <el-table-column prop="applicationTime" label="撤回日期"></el-table-column>
                            <el-table-column prop="applicationTime" label="查看"></el-table-column>
                        </el-table>
                        <!-- 分页 -->
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="queryInfo.pagenum"
                            @size-change="handleSizeChange"
                            :page-size="queryInfo.pagesize"
                            :page-sizes="[5, 10, 20, 50]"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="queryInfo.total"
                        >
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="操作记录">
                    <el-table :data="operationRecordList" border>
                        <el-table-column prop="operatingTime" label="操作时间"></el-table-column>
                        <el-table-column prop="operator" label="操作人"></el-table-column>
                        <el-table-column prop="accessDevice" label="访问设备"></el-table-column>
                        <el-table-column prop="visitCity" label="	访问城市"></el-table-column>
                        <el-table-column prop="ip" label="ip地址"></el-table-column>
                        <el-table-column prop="operationContent" label="操作内容"></el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>

        <!-- ==========================q取消发货申请的对话框====================================== -->
        <el-dialog title="取消申请" :visible.sync="cancelApplyDialog" width="50%" :before-close="handleClose">
            <el-form :model="cancelApply">
                <el-form-item>
                    <el-input type="textarea" v-model="cancelApply.cancelText" placeholder="请输入取消申请原因(不超200字)" maxlength="200"
                        >></el-input
                    >
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelApplyDialog = false">取 消</el-button>
                <el-button type="primary" @click="cancelApplyDialog = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { transferApplicationDetails, detailDeliveryRecord, cancelTransferRequisition } from '@/request/api.js';

export default {
    data() {
        return {
            id: this.$route.params.id,
            // 详情
            documentDetails: {
                inOrgName: '',
                applyCode: '',
                applyUserName: '',
                assetsOrgName: '',
                applyStatusText: '',
                remark: '',
                applyType: '',
                auditName: '',
                auditRemark: '',
                applyTypeText: '',
                createdDate: '',
                lastUpdatedDate: '',
                receiverAddress: ''
            },
            isApplyType: this.applyType === 0 ? 'applyType' : '实施任务书',
            // 单据详情
            document: [],

            // 发货申请
            shipmentApplica: [],

            //取消填写的表单数据
            cancelApply: {
                id:this.id,
                cancelText: ''
            },
            //取消申请接口数据
            cancelRequisition: {},

            //发货记录-接口提交数据
            cancelApplyDialog: false,
            deliveryRecord: {
                deliveryApplyId: 0, //发货申请id
                deliveryApplyType: 0, //发货申请类型 0-订单 2-调拨单
                deliveryCode: '', //发运单号
                entityId: 0, //关联单id
                isReceive: 0, //是否收货 0-查全部 1-已收货
                logisticsCode: '', //物流单号
                p: 1, //页码
                relationType: 0, //发货单关联类型 1-订单,2-退换货,3-调货,4-调拨
                s: 10, //条
                serialNumber: '' //序列号
            },
            // 1-待发货
            deliveredList: [
                {
                    productName: '测试7161',
                    specification: '',
                    unit: '默认',
                    applicationsNum: '1',
                    callOutOrg: 'xyj店铺',
                    sentNum: '0'
                }
            ],
            queryInfo: {
                // 搜索值
                query: '',
                // 当前的页数
                pagenum: 1,
                // 当前每次显示多少条数据
                pagesize: 5,
                total: 100
            },

            //2-已发货
            shipped: [],

            //3-已撤回
            Withdrawn: [],

            // 操作记录
            operationRecordList: []
        };
    },
    created() {
        this.getTransferDetails();
        this.getDeliveryRecord();
				console.log(this.cancelApply.id);
    },
    methods: {
        // 获取详情页数据
        getTransferDetails() {
            let params = { id: this.id };
            transferApplicationDetails(params).then(res => {
                // console.log(res);
                this.documentDetails.inOrgName = res.data.inOrgName; //调入组织
                this.documentDetails.applyCode = res.data.applyCode; //单据号
                this.documentDetails.applyUserName = res.data.applyUserName; //申请人
                this.documentDetails.assetsOrgName = res.data.assetsOrgName; //资产所属组织
                this.documentDetails.applyStatusText = res.data.applyStatusText; //状态
                this.documentDetails.remark = res.data.remark; //申请备注
                this.documentDetails.applyType = res.data.applyType; //领资料类型
                this.documentDetails.auditName = res.data.auditName; //计划员
                this.documentDetails.auditRemark = res.data.auditRemark; //审批备注
                this.documentDetails.applyTypeText = res.data.applyTypeText; //申请项目
                this.documentDetails.createdDate = res.data.createdDate; //申请时间
                this.documentDetails.lastUpdatedDate = res.data.lastUpdatedDate; //最后更新
                this.documentDetails.receiverAddress = res.data.receiverAddress; //项目地址

                // 单据详情
                this.document = res.data.applyItemVoList;
                //发货申请
                this.shipmentApplica = res.data.deliveredAppList;
            });
        },
        // 取消发货申请的关闭事件
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },

        //取消发货申请
        cancenlRequest() {
            cancelTransferRequisition().then(res => {});
        },

        //发货记录
        getDeliveryRecord() {
            detailDeliveryRecord(this.deliveryRecord).then(res => {
                console.log(res);
            });
        },

        // --------------------------------------

        //返回
        goback() {
            this.$router.push('/transfer');
        },
        // 监听 pagesize 改变事件 每页显示的个数
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize;
        },
        // 监听 页码值 改变的事件 当前页面值
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage;
        }
    }
};
</script>

<style lang="less" scoped>
.el_card-style {
    background-color: #fff;
}
.transferDetail {
    display: flex;
    align-items: center;
    height: 50px;
    .detail_title {
        border-left: 4px solid red;
        padding-left: 10px;
        font-size: 15px;
        line-height: 20px;
        text-align: left;
        color: #d71418;
        cursor: pointer;
    }
    .button {
        margin-left: auto;
    }
}

.detail {
    display: flex;
    justify-content: space-between;
    background-color: #f0f4f5ec;
    .detail_section1 {
        display: flex;
        width: 25%;
        height: 140px;
        border-right: 1px solid rgb(224, 220, 220);
        background-color: #f0f4f5ec;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: 5px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        font-weight: 550;
        .section_list {
            width: 190px;
            display: flex;
            flex-wrap: nowrap;
            flex-direction: column;
            justify-content: space-around;
            // background-color: rgb(214, 61, 61);
        }
        .first {
            width: 120px;
        }
    }
    .detail_margin {
        margin-left: 20px;
    }
}
.cart_el_teps {
    margin-top: 40px;
    margin-left: 100px;
}

.login-body {
    width: 100%;
    height: 90%;
    margin-top: 40px;
    ::v-deep .el-step__icon {
        width: 30px;
        height: 30px;
    }
    ::v-deep .el-step__line {
        top: 15px;
    }
}

// 分页
.el-pagination {
    margin-top: 20px;
    margin-left: 30%;
}
</style>
