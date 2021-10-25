<template>
  <div>
    <div class="reviewheader">
      <span class="title">销售退换货地址</span>
      <div class="button">
          <el-button size="small" icon="el-icon-plus" @click="goAddpage()">  新增</el-button>
      </div>
    </div>
    <el-card>
      <!-- table区域 -->
      <el-row>
        <el-table :data="goodsList" border style="width: 100%">

					<el-table-column prop="receiver" label="收货人" ></el-table-column>
          <el-table-column prop="contactNum" label="联系电话" ></el-table-column>
          <el-table-column prop="shippingAddress" label="收货地址" ></el-table-column>
          <el-table-column label="操作" >
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row)" type="text" size="small">设置为默认地址</el-button>
							<el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
							<el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
						</template>
					</el-table-column>
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
          receiver: '钱五',
          contactNum: 12345678901,
          shippingAddress: '北京市 北京市 东城区 中国北京市北京市东城区111',
        },
        {
          receiver: '钱五',
          contactNum: 12345678901,
          shippingAddress: '北京市 北京市 东城区 中国北京市北京市东城区111',
        },
        {
          receiver: '钱五',
          contactNum: 12345678901,
          shippingAddress: '北京市 北京市 东城区 中国北京市北京市东城区111',
        },
        {
          receiver: '钱五',
          contactNum: 12345678901,
          shippingAddress: '北京市 北京市 东城区 中国北京市北京市东城区111',
        },
        {
          receiver: '钱五',
          contactNum: 12345678901,
          shippingAddress: '北京市 北京市 东城区 中国北京市北京市东城区111',
        },
        {
          receiver: '钱五',
          contactNum: 12345678901,
          shippingAddress: '北京市 北京市 东城区 中国北京市北京市东城区111',
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
      },
			//新增按钮
			goAddpage(){

			}
    
  }
}
</script>
<style lang="less" scoped>
.title{
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
.button{
    margin-left: auto;
  }
.el-pagination{
	margin-top: 20px;
	margin-left:400px;
}
</style>
