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
					<el-row>
						<el-table :data="goodsList" border >
							<el-table-column prop="organization" label="序号"></el-table-column>
							<el-table-column prop="transferred" label="调出管理组织" ></el-table-column>
							<el-table-column prop="productName" label="产品名称" ></el-table-column>
							<el-table-column prop="applications" label="规格" ></el-table-column>
							<el-table-column prop="sentNum" label="待发数量" ></el-table-column>
							<el-table-column prop="cancellationsNum" label="收货数量" ></el-table-column>
							<el-table-column prop="state" label="状态" ></el-table-column>
							<el-table-column prop="applicant" label="申请人" ></el-table-column>
							<el-table-column prop="planner" label="计划员" ></el-table-column>
							<el-table-column prop="clientName" label="客户名称" ></el-table-column>
							<el-table-column prop="customerAddress" label="客户地址" ></el-table-column>
							<el-table-column prop="customerContact" label="客户联系方式" ></el-table-column>
							<el-table-column prop="applicationime" label="申请时间" ></el-table-column>
							<el-table-column prop="updateTime" label="最后更新时间" ></el-table-column>
						</el-table>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="发货申请">配置管理</el-tab-pane>
				<el-tab-pane label="发货记录">角色管理</el-tab-pane>
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
			goodsList: [
        {
          id: 'DB20211015000001',
          organization: '云镖网络科技有限公司',
          transferred: 'xyj店铺',
          sourceType: 'DMI调拨',
          productName:'机器人',
          applications: '10',
          sentNum: 87,
          cancellationsNum: 87,
          state: '待收货',
          applicant: '张三',
          planner: '系统',
          clientName:'张三',
          customerAddress:'南山区',
          customerContact:123456789,
          applicationime: '2021-10-15 10:35:23',
          updateTime: '2021-10-18 15:59:40'
        },
        

      ],
		}
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

</style>