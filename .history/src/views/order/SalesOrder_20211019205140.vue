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

          <el-table-column prop="name" label="产品名称">
						<template v-slot="scope">
							<div>
								<a href="javascript:;" @click="orderDetail">{{scope.row.name}}</a>
							</div>
						</template>
					</el-table-column>

          <el-table-column prop="orderNum" label="订单总数"></el-table-column>
          <el-table-column prop="deliver" label="待发货" ></el-table-column>
          <el-table-column prop="shipped" label="已发货" ></el-table-column>
          <el-table-column prop="received" label="已收货" ></el-table-column>
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

		<!-- ==========================全部订单========================= -->
		<el-card class="allOrderList">
			<div class="transheader">
				<div>
					<el-col>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                全部订单<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item >全部订单</el-dropdown-item>
                  <el-dropdown-item >待审核</el-dropdown-item>
                  <el-dropdown-item >代发货</el-dropdown-item>
                  <el-dropdown-item >待客户收货</el-dropdown-item>
                  <el-dropdown-item >已完成</el-dropdown-item>
                  <el-dropdown-item >交易关闭</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
				</div>
				<div class="button">
					<el-button size="small" icon="el-icon-plus" @click="goAddpage">  新增</el-button>
					<el-button size="small" icon="el-icon-document-remove"> 订单汇总 </el-button>
					<el-button size="small" icon="el-icon-lx-filter"> 筛选 </el-button>
				</div>
			</div>

      <!-- 列表 -->
      <el-row class="orderlist"> 
					<el-table :data="allOrderList" border >
						
						<el-table-column  prop="id" label="订单编号">
							<template v-slot="scope">
								<div>
									<a href="javascript:;" @click="a">{{scope.row.id}}</a>
								</div>
							</template>
						</el-table-column>
						
						<el-table-column prop="orderTime" label="下单时间"></el-table-column>
						<el-table-column prop="customer" label="客户" ></el-table-column>
						<el-table-column prop="area" label="所属区域" ></el-table-column>
						<el-table-column prop="orderAmount" label="订单金额(元)" ></el-table-column>
						<el-table-column prop="sentNum" label="待发数量/订单数量" ></el-table-column>
						<el-table-column prop="sentedNum" label="已发数量/已申请数量" ></el-table-column>
						<el-table-column prop="orderStatus" label="订单状态" ></el-table-column>
						<el-table-column prop="collectionStatus" label="收款状态" ></el-table-column>
						<el-table-column prop="nailingApproval" label="钉钉审批" ></el-table-column>
						<el-table-column prop="reviewer" label="审核人" ></el-table-column>
						<el-table-column prop="expectedTime" label="期望交货日期" ></el-table-column>
						<el-table-column prop="updateTime" label="最后更新时间" ></el-table-column>
					</el-table>
				</el-row>
        <span>订单总数量: 25924</span>
        <span>订单待发总数量: 22796</span>
        <span>订单总金额:￥16119714148</span>
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
          name: '天正电气塑壳断路器空气开关断路器空开塑壳DZ20Y系列',
          orderNum: 10318,
          deliver: 10317,
          shipped: 0,
          received: 1,
        },
        
      ],
      allOrderList:[
        {
          id:'ORD16539202110190001',
          orderTime:'2021-10-19 16:32:42',
          customer:'深圳科卫机器人服务有限公司',
          area:'华南大区',
          orderAmount:'	¥12.00',
          sentNum:'	2/2',
          sentedNum:'	0/0',
          orderStatus:'待发货',
          collectionStatus:'待客户付款',
          nailingApproval:'未启用',
          reviewer:'超级管理员	',
          expectedTime:'2021-10-25',
          updateTime:'2021-10-15 16:59:24',
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

		// 订单名称点击事件
		orderDetail(row){
			this.$router.push("/add")
		}
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
.allOrderList{
	margin-top: 8px;
}
.transheader {
	margin-top: 10px;
  display: flex;
  align-items: center;
  height: 10px;
}
.button{
	margin-left: auto;

}
.el-pagination{
	margin-top: 20px;
	margin-left:400px;
}
.orderlist{
  margin-top: 20px;
}

</style>
