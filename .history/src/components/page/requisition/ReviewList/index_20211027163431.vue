<template>
    <div>
        <div class="reviewheader">
            <span>审核调拨单列表</span>
            <div class="button">
                <el-dropdown trigger="click">
                    <el-button class="el_dropdown" icon="el-icon-lx-filter" size="small">筛选</el-button>
                    <el-dropdown-menu>
                        <el-form :model="filterInfo">
                            <el-row>
                                <el-form-item label="调出组织：" class="filter_el-col">
                                    <el-input placeholder="输入调出组织" v-model="filterInfo.transOrganiza"></el-input>
                                </el-form-item>
                                <el-form-item label="调入组织：" class="filter_el-col">
                                    <el-input placeholder="输入调入组织" v-model="filterInfo.transOrganiza"></el-input>
                                </el-form-item>
                                <el-form-item label="单据号：" class="filter_el-col">
                                    <el-input placeholder="输入单据号" v-model="filterInfo.transOrganiza"></el-input>
                                </el-form-item>

                                <el-form-item label="来源类型：" class="filter_el-col">
                                    <el-select
                                        v-model="filterInfo.transOrganiza"
                                        placeholder="全部"
                                        style="width:100%"
                                        :popper-append-to-body="false"
                                    >
                                        <el-option label="全部" value="shanghai"></el-option>
                                        <el-option label="DMI调拨" value="beijing"></el-option>
                                        <el-option label="实施任务书" value="beijing"></el-option>
                                        <el-option label="回收申请" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="单据号：" class="filter_el-col">
                                    <el-input placeholder="输入单据号" v-model="filterInfo.transOrganiza"></el-input>
                                </el-form-item>

                                <el-form-item label="申请人：" class="filter_el-col">
                                    <el-input placeholder="输入申请人" v-model="filterInfo.transOrganiza"></el-input>
                                </el-form-item>
                                <el-form-item label="计划员：" class="filter_el-col">
                                    <el-input placeholder="输入计划员" v-model="filterInfo.transOrganiza"></el-input>
                                </el-form-item>

                                <el-form-item label="申请时间：" class="filter_el-col"
                                    ><br />
                                    <el-col :span="11">
                                        <el-date-picker
                                            type="date"
                                            placeholder="选择日期"
                                            v-model="filterInfo.transOrganiza"
                                            style="width: 100%;"
                                            :popper-append-to-body="false"
                                        ></el-date-picker>
                                    </el-col>

                                    <el-col :span="11" class="el_col_seletime" :popper-append-to-body="false">
                                        <el-date-picker
                                            type="date"
                                            placeholder="选择日期"
                                            v-model="filterInfo.transOrganiza"
                                            style="width: 100%;"
                                            :popper-append-to-body="false"
                                        ></el-date-picker>
                                    </el-col>
                                </el-form-item>

                                <el-form-item class="besure">
                                    <el-button>重置</el-button>
                                    <el-button type="danger">确定</el-button>
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
                    <el-table-column prop="id" label="单据号">
                        <template v-slot="scope">
                            <div>
                                <a href="javascript:;" @click="toReviewDetails">{{ scope.row.id }}</a>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="transferred" label="调入组织"></el-table-column>
                    <el-table-column prop="sourceType" label="来源类型"></el-table-column>
                    <el-table-column prop="sourceNum" label="来源编号"></el-table-column>
                    <el-table-column prop="idleNum" label="闲置数量"></el-table-column>
                    <el-table-column prop="applications" label="申请数量"></el-table-column>
                    <el-table-column prop="sentNum" label="待发数量"></el-table-column>
                    <el-table-column prop="cancellationsNum" label="收货数量"></el-table-column>
                    <el-table-column prop="state" label="状态"></el-table-column>
                    <el-table-column prop="applicant" label="申请人"></el-table-column>
                    <el-table-column prop="planner" label="计划员"></el-table-column>
                    <el-table-column prop="clientName" label="客户名称"></el-table-column>
                    <el-table-column prop="customerAddress" label="客户地址"></el-table-column>
                    <el-table-column prop="customerContact" label="客户联系方式"></el-table-column>
                    <el-table-column prop="applicationime" label="申请时间"></el-table-column>
                    <el-table-column prop="updateTime" label="最后更新时间"></el-table-column>
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
import { apiTransferApplicationlist } from '@/request/api.js';
export default {
    name: 'ReviewList',
    data() {
        return {
            queryInfo: {
                applyStatus: 0,
                auditQuery: 1
            },
            total: 100,
            currentPage4: 10,
            // 查询参数对象

            // 商品列表
            goodsList: [],

            // 筛选表单数据
            filterInfo: {
                transOrganiza: ''
            }
        };
    },
    methods: {
        //请求调拨申请数据
        getExamineList() {
            apiTransferApplicationlist(this.queryInfo).then(res => {
                // this.goodsList = res.data;
                console.log(res.data);
            });
        },

        // ========================
        // 监听 pagesize 改变事件 每页显示的个数
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize;
        },
        // 监听 页码值 改变的事件 当前页面值
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage;
        },

        //   跳转到审核综合调拨单详情
        toReviewDetails(row) {
            this.$router.push('/reviewList/reviewListDetail');
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
