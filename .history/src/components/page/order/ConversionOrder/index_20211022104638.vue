<template>
  <div>
    <div class="reviewheader">
      <h2>转换订单列表</h2>
      <div class="button">
          <el-button size="small">筛选</el-button>
      </div>
    </div>
    <el-card>
      <!-- table区域 -->
      <el-row>
        <el-table :data="goodsList" border style="width: 100%">

          <el-table-column  prop="id" label="单据号">
            <template v-slot="scope">
                <div>
                    <a href="javascript:;" @click="toReviewDetails">{{scope.row.id}}</a>
                </div>
            </template>
        </el-table-column>

          <el-table-column prop="transferred" label="转化类型" ></el-table-column>
          <el-table-column prop="sourceType" label="转化单编号" ></el-table-column>
          <el-table-column prop="sourceNum" label="订单编号" ></el-table-column>
          <el-table-column prop="idleNum" label="	客户名称" ></el-table-column>
          <el-table-column prop="applications" label="	申请人" ></el-table-column>
          <el-table-column prop="sentNum" label="待发数量" ></el-table-column>
          <el-table-column prop="cancelNum" label="取消数量" ></el-table-column>
          <el-table-column prop="cancellationsNum" label="收货数量" ></el-table-column>
          <el-table-column prop="state" label="状态" ></el-table-column>
          <el-table-column prop="applicant" label="申请人" ></el-table-column>
          <el-table-column prop="planner" label="计划员" ></el-table-column>
          <el-table-column prop="applicationime" label="申请时间" ></el-table-column>
          <el-table-column prop="updateTime" label="最后更新时间" ></el-table-column>
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
          id: 'DB20211015000001',
          transferred: '云镖网络科技有限公司',
          sourceType: 'xyj店铺',
          sourceNum: 'DMI调拨',
          idleNum:20,
          applications: '',
          sentNum: '10',
          cancelNum: 87,
          cancellationsNum: 87,
          state: '待收货',
          applicant: '张三',
          planner: '2021-10-15 10:35:23',
          applicationime: '2021-10-15 10:35:23',
          updateTime: '2021-10-15 10:35:23'
        },
        {
          id: 'DB20211015000001',
          transferred: '云镖网络科技有限公司',
          sourceType: 'xyj店铺',
          sourceNum: 'DMI调拨',
          idleNum:20,
          applications: '',
          sentNum: '10',
          cancelNum: 87,
          cancellationsNum: 87,
          state: '待收货',
          applicant: '张三',
          planner: '2021-10-15 10:35:23',
          applicationime: '2021-10-15 10:35:23',
          updateTime: '2021-10-15 10:35:23'
        },
        {
          id: 'DB20211015000001',
          transferred: '云镖网络科技有限公司',
          sourceType: 'xyj店铺',
          sourceNum: 'DMI调拨',
          idleNum:20,
          applications: '',
          sentNum: '10',
          cancelNum: 87,
          cancellationsNum: 87,
          state: '待收货',
          applicant: '张三',
          planner: '2021-10-15 10:35:23',
          applicationime: '2021-10-15 10:35:23',
          updateTime: '2021-10-15 10:35:23'
        },
        {
          id: 'DB20211015000001',
          transferred: '云镖网络科技有限公司',
          sourceType: 'xyj店铺',
          sourceNum: 'DMI调拨',
          idleNum:20,
          applications: '',
          sentNum: '10',
          cancelNum: 87,
          cancellationsNum: 87,
          state: '待收货',
          applicant: '张三',
          planner: '2021-10-15 10:35:23',
          applicationime: '2021-10-15 10:35:23',
          updateTime: '2021-10-15 10:35:23'
        },
        {
          id: 'DB20211015000001',
          transferred: '云镖网络科技有限公司',
          sourceType: 'xyj店铺',
          sourceNum: 'DMI调拨',
          idleNum:20,
          applications: '',
          sentNum: '10',
          cancelNum: 87,
          cancellationsNum: 87,
          state: '待收货',
          applicant: '张三',
          planner: '2021-10-15 10:35:23',
          applicationime: '2021-10-15 10:35:23',
          updateTime: '2021-10-15 10:35:23'
        },
        {
          id: 'DB20211015000001',
          transferred: '云镖网络科技有限公司',
          sourceType: 'xyj店铺',
          sourceNum: 'DMI调拨',
          idleNum:20,
          applications: '',
          sentNum: '10',
          cancelNum: 87,
          cancellationsNum: 87,
          state: '待收货',
          applicant: '张三',
          planner: '2021-10-15 10:35:23',
          applicationime: '2021-10-15 10:35:23',
          updateTime: '2021-10-15 10:35:23'
        }

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
