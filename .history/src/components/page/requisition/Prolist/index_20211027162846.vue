<template>
    <div>
        <span class="detail_title">产品列表</span>
        <el-card>
            <!-- 按钮搜索/添加区域 -->
            <el-row :gutter="10">
                <el-col :span="5">
                    <el-input placeholder="请输入产品名称" clearable v-model="queryInfo.query"></el-input>
                    <el-button icon="el-icon-search"></el-button>
                </el-col>
            </el-row>

            <!-- table区域 -->
            <el-row class="row">
                <el-table :data="proList" border style="width: 100%">
                    <el-table-column prop="name" label="产品名称"></el-table-column>
                    <el-table-column prop="idleNum" label="闲置数量"></el-table-column>
                    <el-table-column prop="applicationsNum" label="申请数量"></el-table-column>
                    <el-table-column prop="approvalsNum" label="审批数量"></el-table-column>
                    <el-table-column prop="sentNum" label="待发数量"></el-table-column>
                    <el-table-column prop="cancellationsNum" label="收货数量"></el-table-column>
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
import { productList } from '@/request/api.js';
export default {
    name: 'Prolist',
    data() {
        return {
            queryInfo: {},
            total: 100,
            currentPage4: 10,
            proList: {
              calTotal: true,
              countSqlPrefix: null,
              customCountSql: false,
              endRow: 10,
              pageNum: 1,
              pageSize: 10,
              pageable: true,
              pages: 0,
              result: null,
              startRow: 0,
              total: 0,
            }
        };
    },
    created() {
        this.getProductList();
    },
    methods: {
        //请求产品列表数据
        getProductList() {
            productList(this.queryInfo).then(res => {
              console.log(res.data);
              // var list = new Array

                // this.proList = res.data;
                // console.log(res.data.constructor ===Object );
            });
        },

        // ----------------
        handleCurrentChange() {},
        handleSizeChange() {}
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
.el-card {
    margin-top: 10px;
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
</style>
