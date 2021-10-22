<template>
  <div>
    <div class="reviewheader">
      <h2>物流单号</h2>
      <div class="button">
          <el-button size="small">物流单号导入</el-button>
          <el-button size="small">筛选</el-button>
      </div>
    </div>
    <el-card>
      <!-- table区域 -->
      <el-row>
        <el-table :data="goodsList" border style="width: 100%">

					<el-table-column prop="conversionType" label="发货申请单号" ></el-table-column>
          <el-table-column prop="orderNum" label="订单编号" ></el-table-column>
          <el-table-column prop="clientName" label="	客户名称" ></el-table-column>
          <el-table-column prop="applicant" label="申请人" ></el-table-column>
          <el-table-column prop="submissionTime" label="提交时间" ></el-table-column>
        </el-table>
      </el-row>

      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        @size-change="handleSizeChange"
        :page-size="queryInfo.pagesize"
        :page-sizes="[5, 9, 13, 15]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'ReviewList',
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
      // 查询参数对象

      // 商品列表
      goodsList: [
        {
          conversionType: '试用转租赁',
          conversionOrderNum: 'ZHD202109270002',
          orderNum: 3163270642283579,
          clientName: '下大雨了',
          applicant:'xyj测试商城店铺',
          submissionTime: '2021-09-27 09:36:13',
        },
        {
          conversionType: '试用转租赁',
          conversionOrderNum: 'ZHD202109270002',
          orderNum: 3163270642283579,
          clientName: '下大雨了',
          applicant:'xyj测试商城店铺',
          submissionTime: '2021-09-27 09:36:13',
        },
        {
          conversionType: '试用转租赁',
          conversionOrderNum: 'ZHD202109270002',
          orderNum: 3163270642283579,
          clientName: '下大雨了',
          applicant:'xyj测试商城店铺',
          submissionTime: '2021-09-27 09:36:13',
        },
        {
          conversionType: '试用转租赁',
          conversionOrderNum: 'ZHD202109270002',
          orderNum: 3163270642283579,
          clientName: '下大雨了',
          applicant:'xyj测试商城店铺',
          submissionTime: '2021-09-27 09:36:13',
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
      
    //   跳转到审核综合调拨单详情
      toReviewDetails(row){
          this.$router.push("/add")
      }
    
  }
}
</script>
<style scoped>
.reviewheader {
    display: flex;
    align-items: center;
    height: 50px;
}
.button{
    margin-left: auto;
  }
.el-pagination{
	margin-top: 20px;
	margin-left:400px;
}
</style>
