<template>
	<div>
		<div class="transferDetail">
      <span>综合调拨单详情</span>
			<div class="button">
				<el-button  size="small">返回</el-button>
			</div>
		</div>

		<el-card class="el_card-style">
			<div class="detail">
				<section class="detail_section1 detail_margin">
					<div class="section_list">
						<span>单据号</span>
						<span>申请时间</span>
						<span>最后更新</span>
					</div>
					<div class="section_list">
						<span>ZDDB20211022000013</span>
						<span>2021-10-23</span>
						<span>2022-2-12</span>
					</div>
				</section>

				<section class="detail_section1 detail_margin">
					<div class="section_list">
						<span>状态</span>
						<span>申请备注</span>
						<span>资产所属组织</span>
					</div>
					<div class="section_list">
						<span>已完成</span>
						<span>回收申请自动生成！</span>
						<span>xyj店铺</span>
					</div>
				</section>

				<section class="detail_section1 detail_margin">
					<div class="section_list">
						<span>调入组织</span>
						<span>计划员</span>
					</div>
					<div class="section_list">
						<span>xyj店铺</span>
						<span>系统</span>
					</div>
				</section>
				
				<section class="detail_section1 detail_margin">
					<div class="section_list">
						<span>申请人</span>
						<span>审批备注</span>
					</div>
					<div class="section_list">
						<span>员工李季</span>
						<span>系统自动审批</span>
					</div>
				</section>
			</div>

			<div class="login-body">
        <el-steps :active="2" finish-status="success" size="medium" :space="200" :align-center="true" style="width: 700px">
          <el-step title="员工李季单据提交" description="2021-10-22 17:30:19" />
          <el-step title="超级管理员审批同意" description="2021-10-22 17:30:19"/>
          <el-step title="员工李季已发货" description="2021-10-22 17:30:19"/>
          <el-step title="已完成" />
        </el-steps>
      </div>

			<el-tabs type="border-card" style="margin-top:50px">
				<el-tab-pane label="单据详情">
					<!-- <el-row> -->
						<el-table :data="documentDetails" border >
							<el-table-column prop="index" label="序号"></el-table-column>
							<el-table-column prop="callOutOrg" label="调出管理组织" ></el-table-column>
							<el-table-column prop="productName" label="产品名称" ></el-table-column>
							<el-table-column prop="specification" label="规格" ></el-table-column>
							<el-table-column prop="unit" label="单位" ></el-table-column>
							<el-table-column prop="applicationNum" label="申请数量" ></el-table-column>
							<el-table-column prop="approvalNum" label="审批数量" ></el-table-column>
							<el-table-column prop="shipNum" label="待发货数量" ></el-table-column>
							<el-table-column prop="finishShipNum" label="已发货数量" ></el-table-column>
							<el-table-column prop="cancelNum" label="	取消数量" ></el-table-column>
						</el-table>
					<!-- </el-row> -->
				</el-tab-pane>
				<el-tab-pane label="发货申请">
					<el-table :data="shipmentApplica" border >
						<el-table-column prop="index" label="申请单编号"></el-table-column>
						<el-table-column prop="applicationNum" label="申请数量" ></el-table-column>
						<el-table-column prop="shipNum" label="待发货数量" ></el-table-column>
						<el-table-column prop="cancelNum" label="取消数量" ></el-table-column>
						<el-table-column prop="state" label="状态" ></el-table-column>
						<el-table-column prop="applicationTime" label="申请时间" ></el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="发货记录">
					<div>
						<span>| 待发货</span>
						<el-table :data="shipmentApplica" border style="margin-top:15px">
							<el-table-column prop="index" label="申请单编号"></el-table-column>
							<el-table-column prop="applicationNum" label="申请数量" ></el-table-column>
							<el-table-column prop="shipNum" label="待发货数量" ></el-table-column>
							<el-table-column prop="cancelNum" label="取消数量" ></el-table-column>
							<el-table-column prop="state" label="状态" ></el-table-column>
							<el-table-column prop="applicationTime" label="申请时间" ></el-table-column>
						</el-table>
						<!-- 分页 -->
						<el-pagination
							@current-change="handleCurrentChange"
							:current-page="queryInfo.pagenum"
							@size-change="handleSizeChange"
							:page-size="queryInfo.pagesize"
							:page-sizes="[5, 10, 20, 50]"
							layout="total, sizes, prev, pager, next, jumper"
							:total="queryInfo.total">
						</el-pagination>
					</div>
					<div>
						<span>| 已发货</span>
						<el-table :data="shipmentApplica" border style="margin-top:15px">
							<el-table-column prop="index" label="申请单编号"></el-table-column>
							<el-table-column prop="applicationNum" label="申请数量" ></el-table-column>
							<el-table-column prop="shipNum" label="待发货数量" ></el-table-column>
							<el-table-column prop="cancelNum" label="取消数量" ></el-table-column>
							<el-table-column prop="state" label="状态" ></el-table-column>
							<el-table-column prop="applicationTime" label="申请时间" ></el-table-column>
						</el-table>
						<!-- 分页 -->
						<el-pagination
							@current-change="handleCurrentChange"
							:current-page="queryInfo.pagenum"
							@size-change="handleSizeChange"
							:page-size="queryInfo.pagesize"
							:page-sizes="[5, 10, 20, 50]"
							layout="total, sizes, prev, pager, next, jumper"
							:total="queryInfo.total">
						</el-pagination>
					</div>
					<div>
						<span>| 已撤回</span>
						<el-table :data="shipmentApplica" border style="margin-top:15px">
							<el-table-column prop="index" label="申请单编号"></el-table-column>
							<el-table-column prop="applicationNum" label="申请数量" ></el-table-column>
							<el-table-column prop="shipNum" label="待发货数量" ></el-table-column>
							<el-table-column prop="cancelNum" label="取消数量" ></el-table-column>
							<el-table-column prop="state" label="状态" ></el-table-column>
							<el-table-column prop="applicationTime" label="申请时间" ></el-table-column>
						</el-table>
						<!-- 分页 -->
						<el-pagination
							@current-change="handleCurrentChange"
							:current-page="queryInfo.pagenum"
							@size-change="handleSizeChange"
							:page-size="queryInfo.pagesize"
							:page-sizes="[5, 10, 20, 50]"
							layout="total, sizes, prev, pager, next, jumper"
							:total="queryInfo.total">
						</el-pagination>
					</div>
					

				</el-tab-pane>
				<el-tab-pane label="收货记录">定时任务补偿</el-tab-pane>
				<el-tab-pane label="操作记录">定时任务补偿</el-tab-pane>
			</el-tabs>

		</el-card>

	</div>
</template>

<script>
export default {
	data(){
		return{
			// 单据详情
			documentDetails: [
        {
          index: '1',
          callOutOrg: '	xyj店铺',
          productName: '测试7161',
          specification: '1',
          unit:'个',
          applicationNum: '10',
          approvalNum: 5,
          shipNum: 5,
          finishShipNum: '5',
          cancelNum: '1',
        },
        

      ],
			// 发货申请
			shipmentApplica:[
				{
					index:'DBFH172872021102200006',
					applicationNum:'1',
					shipNum:'0',
					cancelNum:'0',
					state:'已完成',
					applicationTime:'	2021-10-22 17:30:18'
				}
			],
			//发货记录
			deliveryRecord:[
				{}
			],
			queryInfo: {
        // 搜索值
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每次显示多少条数据
        pagesize: 5,
				total:100
      },
		}
	},
	methods:{
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

<style lang="less" scoped>
.el_card-style{
	background-color: #fff;
}
	.transferDetail{
		display: flex;
    align-items: center;
    height: 50px;
		.button{
    margin-left: auto;
		}
	}
	
.detail{
	display: flex;
	justify-content: space-between;
		background-color: rgba(252, 246, 246, 0.966);
	.detail_section1{
		display: flex;
		width: 25%;
		height: 150px;
		border-right: 1px solid rgb(204, 199, 199);
		background-color: rgba(252, 246, 246, 0.966);
		flex-direction: row;
		flex-wrap: nowrap;
		.section_list{
			width: 150px;
			// border: 1px solid #111;
			display: flex;
			flex-wrap: nowrap;
			flex-direction: column;
			justify-content:space-around;
			// background-color: rgb(214, 61, 61);
		}
		
	}
	.detail_margin{
		margin-left: 20px;
	}

}
.cart_el_teps{
	margin-top: 40px;
	margin-left: 100px;
}

.login-body {
    width: 100%;
    height: 90%;
		margin-top: 40px;
    ::v-deep .el-step__icon{
          width: 50px;
          height: 50px;
        }
    ::v-deep .el-step__line{
      top: 25px;
    }
}

// 分页
.el-pagination{
	margin-top: 20px;
	margin-left:30%;
}

</style>