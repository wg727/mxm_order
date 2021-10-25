<template>
	<div>
		<div class="transheader">
      <span>综合调拨申请列表</span>
      <div class="button">
        <el-button size="small" icon="el-icon-plus" @click="goAddpage()">  新增</el-button>
        <el-button size="small" icon="el-icon-printer"> 批量导出 </el-button>
        <el-dropdown trigger="click" :hide-on-click="false">
            <el-button class="el_dropdown" icon="el-icon-lx-filter" size="small">筛选</el-button>
            <el-dropdown-menu >
              <el-form :model="filterInfo">
                <el-row >
                    <el-form-item label="调出组织:" class="filter_el-col">
                      <el-input placeholder="输入调出组织" v-model="filterInfo.transOrganiza"></el-input>
                    </el-form-item>
                    <el-form-item label="调入组织:" class="filter_el-col">
                      <el-input placeholder="输入调入组织" v-model="filterInfo.transOrganiza"></el-input>
                    </el-form-item>
                    <el-form-item label="设备序列号:" class="filter_el-col">
                      <el-input placeholder="输入设备序列号" v-model="filterInfo.transOrganiza"></el-input>
                    </el-form-item>
                    <el-form-item label="单据号:" class="filter_el-col">
                      <el-input placeholder="输入单据号" v-model="filterInfo.transOrganiza"></el-input>
                    </el-form-item>

                    <el-form-item label="来源类型:" class="filter_el-col" >
                      <el-select v-model="filterInfo.transOrganiza" placeholder="全部" style="width:100%" :popper-append-to-body="false">
                        <el-option label="全部" value="shanghai" ></el-option>
                        <el-option label="DMI调拨" value="beijing"></el-option>
                        <el-option label="实施任务书" value="beijing"></el-option>
                        <el-option label="回收申请" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="状态:" class="filter_el-col" >
                      <el-select v-model="filterInfo.transOrganiza" placeholder="全部" style="width:100%" :popper-append-to-body="false">
                        <el-option label="全部" value="shanghai" ></el-option>
                        <el-option label="待审核" value="beijing"></el-option>
                        <el-option label="待发货" value="beijing"></el-option>
                        <el-option label="审核拒绝" value="beijing"></el-option>
                        <el-option label="待收货" value="beijing"></el-option>
                        <el-option label="已取消" value="beijing"></el-option>
                        <el-option label="已完成" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="申请人:" class="filter_el-col">
                      <el-input placeholder="输入申请人" v-model="filterInfo.transOrganiza"></el-input>
                    </el-form-item>
                    <el-form-item label="计划员:" class="filter_el-col">
                      <el-input placeholder="输入计划员" v-model="filterInfo.transOrganiza"></el-input>
                    </el-form-item>

                    <el-form-item label="申请时间：" class="filter_el-col" ><br>
                      <el-col :span="11" >
                        <el-date-picker type="date" placeholder="选择日期" v-model="filterInfo.transOrganiza" style="width: 100%;" :popper-append-to-body="false"></el-date-picker>
                      </el-col>
                      
                      <el-col :span="11" class="el_col_seletime" :popper-append-to-body="false">
                        <el-date-picker type="date" placeholder="选择日期" v-model="filterInfo.transOrganiza" style="width: 100%;" :popper-append-to-body="false" ></el-date-picker>
                      </el-col>
                    </el-form-item>

                    <el-form-item class="besure">
                      <el-button >重置</el-button>
                      <el-button type="danger" >确定</el-button>
                    </el-form-item>
                </el-row>
              </el-form>
            </el-dropdown-menu>
          </el-dropdown>
      </div>
		</div>
		
			<!-- --------------------------------------------- -->
			<el-card>
				<!-- table区域 -->
				<el-row>
					<el-table :data="goodsList" border >
						
						<el-table-column  prop="id" label="单据号" width="150px">
							<template v-slot="scope">
								<div>
									<a href="javascript:;" @click="a">{{scope.row.id}}</a>
								</div>
							</template>
						</el-table-column>
						
						<el-table-column prop="organization" label="资产所属组织"></el-table-column>
						<el-table-column prop="transferred" label="调入管理组织" ></el-table-column>
						<el-table-column prop="sourceType" label="来源类型" ></el-table-column>
						<el-table-column prop="productName" label="产品名称" ></el-table-column>
						<el-table-column prop="idleNum" label="闲置数量" ></el-table-column>
						<el-table-column prop="applications" label="申请数量" ></el-table-column>
						<el-table-column prop="sentNum" label="待发数量" ></el-table-column>
						<el-table-column prop="cancellationsNum" label="收货数量" ></el-table-column>
						<el-table-column prop="state" label="状态" ></el-table-column>
						<el-table-column prop="applicant" label="申请人" ></el-table-column>
						<el-table-column prop="planner" label="计划员" ></el-table-column>
						<el-table-column prop="applicationime" label="申请时间" ></el-table-column>
						<el-table-column prop="updateTime" label="最后更新时间" ></el-table-column>
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
  name: "Transfer",
	data(){
		return{
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

			// 综合调拨申请列表
      goodsList: [
        {
          id: 'DB20211015000001',
          organization: '云镖网络科技有限公司',
          transferred: 'xyj店铺',
          sourceType: 'DMI调拨',
          productName:'机器人',
          idleNum:20, 
          applications: '10',
          sentNum: 87,
          cancellationsNum: 87,
          state: '待收货',
          applicant: '张三',
          planner: '系统',
          applicationime: '2021-10-15 10:35:23',
          updateTime: '2021-10-18 15:59:40'
        },
        

      ],
      // 筛选表单数据
      filterInfo:{
        transOrganiza:''
      }
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
    goAddpage () {
      this.$router.push({path:'/transfer/add'})
    },
		a(row){
			this.$router.push("/add")
		},

  }
};
</script>

<style lang="less" scoped>
.transheader {
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

/* 筛选 */
.button{
	margin-left: auto;
  .el_dropdown{
    margin-left: 10px;
  }
}
.filter_el-col {
  box-sizing: border-box;
  margin: 10px;
  width: 400px;
}
.el_col_seletime{
  margin-left: 20px;
}
.besure{
  margin-left: 250px;
}

</style>