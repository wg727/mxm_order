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
					<el-dropdown trigger="click">
            <span class="el-dropdown-link">
              Click Me<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item class="clearfix">
                  comments
                  <el-badge class="mark" :value="12" />
                </el-dropdown-item>
                <el-dropdown-item class="clearfix">
                  replies
                  <el-badge class="mark" :value="3" />
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
				</div>
				<div class="button">
					<el-button size="small" icon="el-icon-plus" @click="goAddpage">  新增</el-button>
					<el-button size="small" icon="el-icon-document-remove"> 订单汇总 </el-button>
					<el-button size="small" icon="el-icon-lx-filter"> 筛选 </el-button>
				</div>
			</div>
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
.allOrderList{
	margin-top: 20px;
}
.transheader {
	margin-top: 20px;
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
