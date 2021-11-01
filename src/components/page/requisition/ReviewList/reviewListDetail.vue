<template>
    <div>
        <div class="transferDetail">
            <span class="detail_title">审核综合调拨单详情</span>
            <div class="button">
                <el-button size="small" @click="dialogFormVisible = true">提交</el-button>
                <el-dialog title="渠道审批" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item>
                            <el-switch
                                v-model="switchValue"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-text="同意审核意见"
                                inactive-text="拒绝审核意见"
                            >
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="备注" :label-width="formLabelWidth">
                            <el-input type="textarea" :rows="2" placeholder="请输备注(不超过200字)" v-model="textarea"> </el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="reviewTransferRequestSubmission">确 定</el-button>
                    </div>
                </el-dialog>
                <el-button size="small" @click="goback">返回</el-button>
            </div>
        </div>

        <el-card class="el_card-style">
            <div class="detail">
                <section class="detail_section1 detail_margin">
                    <div class="section_list first">
                        <span>调入组织</span>
                        <span>单据号</span>
                        <span>申请人</span>
                        <span>资产所属组织</span>
                    </div>
                    <div class="section_list">
                        <span>{{ documentDetails.inOrgName }}</span>
                        <span>{{ documentDetails.applyCode }}</span>
                        <span>{{ documentDetails.applyUserName }}</span>
                        <span>{{ documentDetails.assetsOrgName }}</span>
                    </div>
                </section>

                <section class="detail_section1 detail_margin">
                    <div class="section_list first">
                        <span>状态</span>
                        <span>申请备注</span>
                        <span>领资料类型</span>
                    </div>
                    <div class="section_list">
                        <span>{{ documentDetails.applyStatusText }}</span>
                        <span>{{ documentDetails.remark }}</span>
                        <span>{{ documentDetails.applyType }}</span>
                    </div>
                </section>

                <section class="detail_section1 detail_margin">
                    <div class="section_list first">
                        <span>计划员</span>
                        <span>审批备注</span>
                        <span>申请项目</span>
                    </div>
                    <div class="section_list">
                        <span>{{ documentDetails.auditName }}</span>
                        <span>{{ documentDetails.auditRemark }}</span>
                        <span>{{ documentDetails.applyTypeText }}</span>
                    </div>
                </section>

                <section class="detail_section1 detail_margin">
                    <div class="section_list first">
                        <span>申请时间</span>
                        <span>最后更新</span>
                        <span>项目地址</span>
                    </div>
                    <div class="section_list">
                        <span>{{ documentDetails.createdDate }}</span>
                        <span>{{ documentDetails.lastUpdatedDate }}</span>
                        <span>{{ documentDetails.receiverAddress }}</span>
                    </div>
                </section>
            </div>
        </el-card>

        <div class="product_list">
            <span class="detail_title">产品明细</span>
        </div>
        <el-card>
            <el-row>
                <el-table :data="productList" border style="width: 100%" :key="Math.random()">
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column prop="productName" label="产品名称"></el-table-column>
                    <el-table-column prop="specification" label="规格" width="90px"></el-table-column>
                    <el-table-column prop="unitText" label="单位" width="90px"></el-table-column>
                    <el-table-column prop="applyNum" label="申请数量" width="90px"></el-table-column>
                    <el-table-column label="调出组织" width="250px">
                        <template slot-scope="scope">
                            <el-select
                                v-model="productList[scope.$index].searchConfig"
                                placeholder="请选择"
                                @focus="flag && getTransferOrganization()"
                                @change="searchSelect(productList[scope.$index].searchConfig)"
                                value-key="orgId"
                                :disabled="isdisabled"
                            >
                                <el-option v-for="item in options" :key="item.orgId" :label="item.orgName" :value="item"> </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="审批数量" width="250px">
                        <template v-slot="scoped">
                            <el-input type="number" placeholder="请输入数量" v-model="productList[scoped.$index].auditNum">{{
                                scoped.row
                            }}</el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="可用数量">
                        <template slot-scope="scope"
                            ><span>{{ productList[scope.$index].searchConfig.inventory }}</span></template
                        >
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="addLine(scope.$index)">拆行</el-button>
                            <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-card>

        <!-- 查看的对话框 -->
        <el-dialog title="产品列表" :visible.sync="lookViewDialog" width="50%" :before-close="handleClose">
            <div class="addProductVisible">
                <!-- 按钮搜索/添加区域 -->
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-input placeholder="请输入组织名称" clearable v-model="addProductVisibleInfo.query"></el-input> &nbsp;
                        <el-input placeholder="请输入省份" clearable v-model="addProductVisibleInfo.query"></el-input>
                        <el-button class="search_button">搜索</el-button>
                        <el-button>重置</el-button>
                    </el-col>
                </el-row>

                <!-- table区域 -->
                <el-row class="row">
                    <el-table
                        :data="dialogTableList"
                        border
                        style="width: 100%"
                        header-cell-class-name="table-header"
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column prop="organizas" label="组织"></el-table-column>
                        <el-table-column prop="city" label="	省份-城市"></el-table-column>
                        <el-table-column prop="available" label="可用量"></el-table-column>
                        <el-table-column prop="purchaseInventory" label="采购在途库存"></el-table-column>
                        <el-table-column prop="allocateInventory" label="调拨在途库存"></el-table-column>
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
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="lookViewDialog = false">取 消</el-button>
                <el-button type="primary" @click="lookViewDialog = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { transferApplicationDetails, transferOutProductOrganization, apiReviewTransferRequestSubmission } from '@/request/api.js';
export default {
    data() {
        return {
            form: {},
            dialogFormVisible: false,
            formLabelWidth: '120px',
            switchValue: true,
            textarea: '',
            isdisabled: false,
            // 产品明细列表数据
            id: this.$route.params.id,
            listId: null,
            // 单据详情
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
            assetsOrgId: null,
            orgId: null,
            productId: null,
            flag: true,
            //明细中转对象
            test: {
                productName: '', //产品名称
                specification: '',
                unitText: '默认',
                applyNum: 0,
                organizationOut: '',
                approvalsNum: '',
                assetsOrgId: null, //调出组织id
                quantityAvailable: '',
                organizationInventory: '查看',
                operate: '拆行',
                searchConfig: {
                    inventory: 0
                }
                //outOrgId: this.productList[0].searchConfig.orgId
            },
            //调出组织选项
            options: [],
            //明细调出组织id
            searchConfig: null,

            // 查看的对话框
            lookViewDialog: false,
            addProductVisibleInfo: {
                query: ''
            },
            // 列表数据
            dialogTableList: [
                {
                    organizas: '郑祺贤咕咕家的零售公司',
                    city: '广东省-广东省',
                    available: 0,
                    purchaseInventory: 0,
                    allocateInventory: 0
                }
            ],
            //分页数据
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

            //明细表数据源
            productList: [
                {
                    productName: '',
                    specification: '',
                    unitText: '',
                    applyNum: 0,
                    searchConfig: {
                        inventory: 0
                    },
                    inventory: 0,
                    auditNum: 0
                    //outOrgId: this.productList[0].searchConfig.orgId
                }
            ]
        };
    },
    created() {
        this.getTransferDetails();
        // console.log(this.$route.params.id);
        //console.log(this.productList);
    },
    mounted() {
        //this.goodsList[0] = this.test;
        this.productList[0] = this.test;
        console.log(this.productList);
        //this.getTransferOrganization();
    },
    updated() {
        //this.getTransferOrganization();
    },
    methods: {
        addLine(index) {
            if (this.options.length <= 1) {
                this.$message('请先选择调出组织');
            } else if (parseInt(this.productList[index].auditNum) > this.productList[index].searchConfig.inventory) {
                this.$message('审批数不能大于可用数量');
            } else if (this.productList[index].applyNum - parseInt(this.productList[index].auditNum) == 0) {
            } else if (this.options.length > 1) {
                //添加行数
                var newValue = {
                    productName: this.test.productName,
                    specification: this.test.specification,
                    unitText: this.test.unitText,
                    applyNum: 0,
                    searchConfig: {},
                    inventory: 0,
                    productId: this.test.productId
                };
                newValue.outOrgId = this.productList[index].searchConfig.orgId;
                newValue.applyNum = this.productList[index].applyNum - parseInt(this.productList[index].auditNum);
                this.productList[0].outOrgId = this.productList[0].searchConfig.orgId;
                //console.log(this.productList[index].applyNum, parseInt(this.productList[index].numberApprovals));
                //添加新的行数
                this.productList.push(newValue);
            }
        },
        handleDelete(index) {
            //删除行数
            if (this.productList.length > 1) {
                this.productList.splice(index, 1);
            }
        },
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
        },
        // 获取详情页数据
        getTransferDetails() {
            let params = { id: this.id };
            transferApplicationDetails(params).then(res => {
                console.log(res.data);
                // console.log(res.data.applyItemVoList[0].productId);
                // console.log(res.data.assetsOrgId);
                // console.log(res.data.inOrgId);
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

                this.test.productName = res.data.applyItemVoList[0].productName;
                this.test.unitText = res.data.applyItemVoList[0].unitText;
                this.test.productId = res.data.applyItemVoList[0].productId;
                this.test.serialNumberEnable = res.data.applyItemVoList[0].serialNumberEnable;
                this.test.bathEnable = res.data.applyItemVoList[0].bathEnable;
                //this.$set(this.goodsList, 'productName', res.data.applyItemVoList[0].productName);
                this.test.applyNum = res.data.applyItemVoList[0].applyNum;
                //this.$set(this.goodsList, 'applyNum', res.data.applyItemVoList[0].applyNum);
                //console.log(this.goodsList.applyNum);
                //console.log(res.data.applyItemVoList[0].productName);
                //console.log(this.goodsList.productName);

                this.assetsOrgId = res.data.assetsOrgId; //
                this.orgId = res.data.inOrgId;
                this.productId = res.data.applyItemVoList[0].productId;
                this.listId = res.data.applyItemVoList[0].id;
                console.log(this.assetsOrgId, this.orgId, this.productId);
            });
        },
        //获取审核调出产品组织
        getTransferOrganization() {
            let params = { assetsOrgId: this.assetsOrgId, orgId: this.orgId, productId: this.productId };
            console.log(this.assetsOrgId, this.orgId, this.productId);
            transferOutProductOrganization(params).then(res => {
                this.options = res.data;
                console.log(res);
                this.flag = false;
                //console.log(this.options);
            });
        },
        searchSelect(value) {
            //this.$forceUpdate();
            console.log(value);
            //this.searchConfig = value;
        },
        reviewTransferRequestSubmission() {
            if (parseInt(this.productList[0].auditNum) > this.productList[0].searchConfig.inventory) {
                this.$message('审批数不能大于可用数量');
            } else {
                this.productList[0].id = this.listId;
                this.productList[0].outOrgId = this.productList[0].searchConfig.orgId;
                let params = {};
                params.applyItemList = this.productList;
                params.applyStatus = +this.switchValue;
                params.auditRemark = this.textarea;
                params.id = this.id;
                console.log(params);
                apiReviewTransferRequestSubmission(params).then(res => {
                    if (res.code == 200) {
                        this.$router.push({ path: '/reviewList' });
                    }
                    if (res.code == 500) {
                        this.$message(res.message);
                    }
                    console.log(res);
                });
                this.dialogFormVisible = false;
            }
        },

        //dialog
        handleClose() {},
        handleSelectionChange() {}
    }
};
</script>

<style lang="less" scoped>
.el_card-style {
    background-color: #fff;
}
.detail_title {
    border-left: 4px solid red;
    padding-left: 10px;
    font-size: 15px;
    line-height: 20px;
    text-align: left;
    color: #d71418;
    cursor: pointer;
}
.transferDetail {
    display: flex;
    align-items: center;
    height: 50px;
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
        height: 60px;
        border-right: 1px solid rgb(224, 220, 220);
        background-color: #f0f4f5ec;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: 5px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        font-weight: 550;
        .section_list {
            width: 180px;
            display: flex;
            flex-wrap: nowrap;
            flex-direction: column;
            justify-content: space-between;
        }
        .first {
            width: 120px;
        }
    }
    .detail_margin {
        margin-left: 20px;
    }
}

// 产品明细
.product_list {
    margin-top: 30px;
    margin-bottom: 15px;
}

// 查看的对话框
.row {
    margin-top: 20px;
}

.addProductVisible {
    padding: 10px;
    // border-top: 1px solid rgb(240, 230, 230);
    // border-bottom: 1px solid rgb(240, 230, 230);
    .el-col {
        display: flex;
    }
    .search_button {
        margin: 0px 10px;
    }
}
.el-pagination {
    margin-top: 20px;
    margin-left: 100px;
}
</style>
