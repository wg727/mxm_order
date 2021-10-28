<template>
    <div>
        <el-card>
            <div class="transheader">
                <span class="detail_title">综合调拨申请列表</span>
                <el-button size="small" icon="el-icon-plus" @click="addAdReplaceOrder" class="button"> 新增</el-button>
                <el-button size="small" icon="el-icon-plus" @click="addAdReplaceOrder" class="button"> 批量导出</el-button>

                
                
                <el-popover ref="popoverRef" placement="bottom-start" width="400" trigger="click">
                    <el-form :model="filterInfo">
                        <el-row>
                            <el-form-item label="调出组织:" class="filter_el-col">
                                <el-input placeholder="输入调出组织" v-model="filterInfo.organizationOut"></el-input>
                            </el-form-item>
                            <el-form-item label="调入组织:" class="filter_el-col">
                                <el-input placeholder="输入调入组织" v-model="filterInfo.transferInto"></el-input>
                            </el-form-item>
                            <el-form-item label="设备序列号:" class="filter_el-col">
                                <el-input placeholder="输入设备序列号" v-model="filterInfo.deviseSerialNum"></el-input>
                            </el-form-item>
                            <el-form-item label="单据号:" class="filter_el-col">
                                <el-input placeholder="输入单据号" v-model="filterInfo.documentNo"></el-input>
                            </el-form-item>
                            

                            <el-form-item label="来源类型:" class="filter_el-col">
                                <el-select  v-model="filterInfo.sourceType" placeholder="全部" style="width:100%" :popper-append-to-body="false">
                                    <el-option label="全部" value="shanghai"></el-option>
                                    <el-option label="机器人" value="beijing"></el-option>
                                    <el-option label="其他" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="订单状态:" class="filter_el-col">
                                <el-select v-model="filterInfo.orderStatus" placeholder="全部" style="width:100%" :popper-append-to-body="false">
                                    <el-option label="全部" value="shanghai"></el-option>
                                    <el-option label="待审核" value="a"></el-option>
                                    <el-option label="待发货" value="b"></el-option>
                                    <el-option label="审核拒绝" value="c"></el-option>
                                    <el-option label="待收货" value="beijing"></el-option>
                                    <el-option label="已取消" value="beijing"></el-option>
                                    <el-option label="已完成" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                                                            <el-form-item label="申请人:" class="filter_el-col">
                                <el-input placeholder="输入申请人" v-model="filterInfo.applicant"></el-input>
                            </el-form-item>
                                                            <el-form-item label="计划员:" class="filter_el-col">
                                <el-input placeholder="输入计划员" v-model="filterInfo.planner"></el-input>
                            </el-form-item>
                            <el-form-item label="申请时间：" class="filter_el-col"><br />
                                <el-col :span="12">
                                    <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="filterInfo.orderTime.startTime"
                                        style="width: 100%;"
                                        :popper-append-to-body="false"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                    ></el-date-picker>
                                </el-col>

                                <el-col :span="12" class="el_col_seletime" :popper-append-to-body="false">
                                    <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="filterInfo.orderTime.endTime"
                                        style="width: 100%; margin-left:10px;"
                                        :popper-append-to-body="false"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                    ></el-date-picker>
                                </el-col>
                            </el-form-item>

                            <el-form-item class="besure">
                                <el-button>重置</el-button>
                                <el-button type="danger" @click="close()">确定</el-button>
                            </el-form-item>
                        </el-row>
                    </el-form>
                    <el-button size="small" slot="reference" icon="el-icon-lx-filter" style="margin-left:10px" @click="visible = !visible"> 筛选 </el-button>
                </el-popover>
            </div>

        <!-- --------------------------------------------- -->
    
            <el-row class="orderlist">
                <el-table :data="goodsList" border>
                    <el-table-column prop="applyCode" label="单据号" width="140px">
                        <template v-slot="scope">
                            <div>
                                <a href="javascript:;" @click="toTransferDetail(scope.row.id)">{{ scope.row.applyCode }}</a>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="assetsOrgName" label="资产所属组织"></el-table-column>
                    <el-table-column prop="inOrgName" label="调入管理组织"></el-table-column>
                    <el-table-column prop="applyTypeText" label="来源类型"></el-table-column>
                    <el-table-column prop="productName" label="产品名称"></el-table-column>
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
import {apiTransferApplicationlist} from '@/request/api.js' 

export default {
    name: 'Transfer',
    data() {
        return {
            queryInfo: {
                // applyStatus:0,
                // auditQuery:1
            },
            total: 100,
            currentPage4: 10,

            // 综合调拨申请列表
            goodsList: [],
            // 筛选表单数据
            filterInfo: {
                organizationOut: '',
                transferInto: '',
                deviseSerialNum: '',
                documentNo: '',
                sourceType: '',
                orderStatus: '',
                applicant: '',
                planner: '',
                orderTime: {
                    startTime: '',
                    endTime: ''
                },
                
            }
        };
    },
    created(){
        this.getTransferList()
    },
    methods: {
        //请求调拨申请数据
        getTransferList(){
            apiTransferApplicationlist(this.queryInfo).then(res=>{
                this.goodsList=res.data
                // console.log(res);
            })

            
        },

        // ------------------------------------------------------
        // 监听 pagesize 改变事件 每页显示的个数
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize;
        },
        // 监听 页码值 改变的事件 当前页面值
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage;
        },
        addAdReplaceOrder(){
          this.$router.push({ path: '/transfer/add' });
        },
        goAddpage() {
            this.$router.push({ path: '/transfer/add' });
        },
        //去详情页
        toTransferDetail(id) {
            // console.log(id);
            this.$router.push('/transfer/transferDetail'+ id);
        },
        //筛选窗关闭
        close() {
            this.$refs.popoverRef.doClose();
        }
    },

		// 添加产品
		// 多选操作
		handleSelectionChange(val) {
				this.multipleSelection = val;
		}
    
};
</script>

<style lang="less" scoped>
.detail_title {
    border-left: 4px solid red;
    padding-left: 10px;
    margin-right: 1170px;
    font-size: 15px;
    line-height: 20px;
    text-align: left;
    color: #d71418;
    cursor: pointer;
}
// .button {
//     margin-right: 500px;
// }
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
.besure{
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
