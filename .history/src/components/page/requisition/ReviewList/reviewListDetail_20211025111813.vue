<template>
	<div>
		<div class="transferDetail">
      <span class="detail_title">审核综合调拨单详情</span>
			<div class="button">
				<el-button  size="small" @click="goback">返回</el-button>
			</div>
		</div>

		<el-card class="el_card-style">
			<div class="detail">
				<section class="detail_section1 ">
					<div class="section_list aaa">
						<span>单据号：</span>
						<span>申请时间：</span>
					</div>
					<div class="section_list bbb">
						<span>ZDDB20211022000013</span>
						<span>2021-10-23</span>
					</div>
				</section>

				<section class="detail_section1  ">
					<div class="section_list aaa">
						<span>状态：</span>
						<span>申请备注：</span>
					</div>
					<div class="section_list bbb">
						<span>已完成</span>
						<span>回收申请自动生成！</span>
					</div>
				</section>

				<section class="detail_section1 ">
					<div class="section_list aaa">
						<span>调入组织：</span>
						<span>最后更新：</span>
					</div>
					<div class="section_list bbb">
						<span>云镖网络科技有限公司</span>
						<span>2021-10-18 11:01:01</span>
					</div>
				</section>
				
				<section class="detail_section1 ">
					<div class="section_list aaa">
						<span>申请人：</span>
						<span>资产所属组织：</span>
					</div>
					<div class="section_list bbb">
						<span>员工李季</span>
						<span>云镖网络科技有限公司</span>
					</div>
				</section>
			</div>
		</el-card>

		<div class="product_list">
			<span class="detail_title">产品明细</span>
		</div>
		<el-card>
			<el-row>
        <el-table :data="goodsList" border style="width: 100%">
          <el-table-column prop="index" label="序号" ></el-table-column>
          <el-table-column prop="productName" label="产品名称" ></el-table-column>
          <el-table-column prop="specification" label="规格" ></el-table-column>
          <el-table-column prop="applications" label="单位" ></el-table-column>
          <el-table-column prop="sentNum" label="申请数量" ></el-table-column>
          <el-table-column prop="cancellationsNum" label="调出组织" ></el-table-column>
          <el-table-column prop="state" label="审批数量" ></el-table-column>
          <el-table-column prop="applicant" label="可用数量" ></el-table-column>
          <el-table-column prop="planner" label="查询组织库存" ></el-table-column>
          <el-table-column prop="clientName" label="操作" ></el-table-column>
        </el-table>
      </el-row>
		</el-card>

	</div>
</template>

<script>
export default {
	data(){
		return{
			// 产品明细列表数据
      goodsList: [
        {
          id: 'DB20211015000001',
          transferred: '云镖网络科技有限公司',
          productName:'机器人',
          idleNum:20,
          applications: '',
          sentNum: '10',
          cancellationsNum: 87,
          state: '待收货',
          applicant: '张三',
          planner: '系统',
          clientName:'李四',
          customerAddress:'福田',
          customerContact:18866669999,
          applicationime: '2021-10-15 10:35:23',
          updateTime: '2021-10-15 10:35:23'
        },
        

      ],
		}
	},
	methods:{
		//返回
		goback(){
			this.$router.push('/transfer')
		},
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
.detail_title{
	border-left: 4px solid red;
	padding-left: 10px;
	font-size: 15px;
	line-height: 20px;
	text-align: left;
	color: #d71418;
	cursor: pointer;
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
		background-color: #f0f4f5ec;
	.detail_section1{
		display: flex;
		width: 25%;
		height: 60px;
		border-right: 1px solid rgb(224, 220, 220);
		background-color: #f0f4f5ec;
		flex-direction: row;
		flex-wrap: nowrap;
		padding: 15px;
		color: rgba(0,0,0,.65);
    font-size: 14px;
		font-weight: 550;
		.section_list{
			width: 180px;
			display: flex;
			flex-wrap: nowrap;
			flex-direction: column;
			justify-content:space-between;
		}
		.aaa{
			width: 120px;
		}
	}
}

// 产品明细
.product_list{
	margin-top: 30px;
	margin-bottom: 15px;
}



</style>