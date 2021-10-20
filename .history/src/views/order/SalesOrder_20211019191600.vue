<template>
  <div>
    <h2>销售订单</h2>
    <el-card>
      <!-- 按钮搜索/添加区域 -->
      <el-row :gutter="10">
        <el-col :span="7">
            <el-input placeholder="请输入产品名称" @clear="getGoofsList" clearable v-model="queryInfo.query"></el-input>
            <el-button  icon="el-icon-search" @click="getGoofsList"></el-button>
        </el-col>
      </el-row>

      <!-- table区域 -->
      <el-row class="row">
        <el-table :data="orderList" border style="width: 100%">
          <el-table-column prop="name" label="产品名称"></el-table-column>
          <el-table-column prop="applicationsNum" label="订单总数"></el-table-column>
          <el-table-column prop="approvalsNum" label="代发货" ></el-table-column>
          <el-table-column prop="sentNum" label="已发货" ></el-table-column>
          <el-table-column prop="cancelNum" label="已收货" ></el-table-column>
          <el-table-column prop="cancellationsNum" label="收货数量" ></el-table-column>
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
          :total="total">
        </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'SalesOrder',
  data () {
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
          name: '磁悬浮地球仪-无规格',
          applicationsNum: 25,
          approvalsNum: 25,
          sentNum: 25,
          cancelNum: 25,
          cancellationsNum: 25
        },
        
      ]

    }
  },
  methods: {
    // 监听 pagesize 改变事件 每页显示的个数
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
    },
    // 监听 页码值 改变的事件 当前页面值
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
    },
  }
}
</script>
<style scoped>
.row{
  margin-top: 10px;
}
.el-col{
    display: flex;
}
.el-pagination{
	margin-top: 20px;
	margin-left:400px;
}
</style>
