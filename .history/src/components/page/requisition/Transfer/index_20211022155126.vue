<template>
	<div>
		<div class="transheader">
      <span>综合调拨申请列表</span>
      <div class="button">
        <el-button size="small" icon="el-icon-plus" @click="goAddpage()">  新增</el-button>
        <el-button size="small" icon="el-icon-printer"> 批量导出 </el-button>

        <el-dropdown>
            <el-button class="el_dropdown" icon="el-icon-lx-filter" size="small">筛选</el-button>
            <el-dropdown-menu >
              <el-form :model="filterInfo">
                <el-row>
                  <el-col  class="filter_el-col">
                    <el-form-item label="调入组织:" >
                      <el-input placeholder="云镖网络科技有限公司" v-model="filterInfo.transOrganiza"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col >
                    <el-form-item label="调入组织:" >
                      <el-input placeholder="云镖网络科技有限公司" v-model="filterInfo.transOrganiza"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col >
                    <el-form-item label="调入组织:" >
                      <el-input placeholder="云镖网络科技有限公司" v-model="filterInfo.transOrganiza"></el-input>
                    </el-form-item>
                  </el-col>
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
						
						<el-table-column  prop="id" label="单据号">
							<template v-slot="scope">
								<div>
									<a href="javascript:;" @click="a">{{scope.row.id}}</a>
								</div>
							</template>
						</el-table-column>
						
						<el-table-column prop="organization" label="资产所属组织"></el-table-column>
						<el-table-column prop="transferred" label="调入管理组织" ></el-table-column>
						<el-table-column prop="sourceType" label="来源类型" ></el-table-column>
						<el-table-column prop="idleNum" label="闲置数量" ></el-table-column>
						<el-table-column prop="applications" label="申请数量" ></el-table-column>
						<el-table-column prop="approvalsNum" label="审批数量" ></el-table-column>
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
          idleNum:20, 
          applications: '10',
          approvalsNum: 1,
          sentNum: 87,
          cancelNum: 0,
          cancellationsNum: 87,
          state: '待收货',
          applicant: '张三',
          planner: '系统',
          applicationime: '2021-10-15 10:35:23',
          updateTime: '2021-10-18 15:59:40'
        },
        {
          id: 'DB20211015000001',
          organization: '云镖网络科技有限公司',
          transferred: 'xyj店铺',
          sourceType: 'DMI调拨',
          idleNum:20, 
          applications: '10',
          approvalsNum: 1,
          sentNum: 87,
          cancelNum: 0,
          cancellationsNum: 87,
          state: '待收货',
          applicant: '张三',
          planner: '系统',
          applicationime: '2021-10-15 10:35:23',
          updateTime: '2021-10-18 15:59:40'
        },
        {
          id: 'DB20211015000001',
          organization: '云镖网络科技有限公司',
          transferred: 'xyj店铺',
          sourceType: 'DMI调拨',
          idleNum:20, 
          applications: '10',
          approvalsNum: 1,
          sentNum: 87,
          cancelNum: 0,
          cancellationsNum: 87,
          state: '待收货',
          applicant: '张三',
          planner: '系统',
          applicationime: '2021-10-15 10:35:23',
          updateTime: '2021-10-18 15:59:40'
        },
        {
          id: 'DB20211015000001',
          organization: '云镖网络科技有限公司',
          transferred: 'xyj店铺',
          sourceType: 'DMI调拨',
          idleNum:20, 
          applications: '10',
          approvalsNum: 1,
          sentNum: 87,
          cancelNum: 0,
          cancellationsNum: 87,
          state: '待收货',
          applicant: '张三',
          planner: '系统',
          applicationime: '2021-10-15 10:35:23',
          updateTime: '2021-10-18 15:59:40'
        },
        {
          id: 'DB20211015000001',
          organization: '云镖网络科技有限公司',
          transferred: 'xyj店铺',
          sourceType: 'DMI调拨',
          idleNum:20, 
          applications: '10',
          approvalsNum: 1,
          sentNum: 87,
          cancelNum: 0,
          cancellationsNum: 87,
          state: '待收货',
          applicant: '张三',
          planner: '系统',
          applicationime: '2021-10-15 10:35:23',
          updateTime: '2021-10-18 15:59:40'
        },
        {
          id: 'DB20211015000001',
          organization: '云镖网络科技有限公司',
          transferred: 'xyj店铺',
          sourceType: 'DMI调拨',
          idleNum:20, 
          applications: '10',
          approvalsNum: 1,
          sentNum: 87,
          cancelNum: 0,
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
        transOrganiza:'sdfsd'
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
		}

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
  filter_el-col{
    margin: 20px;
  }
}


</style>