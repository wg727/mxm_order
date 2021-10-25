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
			// 1-待发货
			deliveredList:[
				{
					productName:'测试7161',
					specification:'',
					unit:'默认',
					applicationsNum:'1',
					callOutOrg:'xyj店铺',
					sentNum:'0',
				}
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

			//2-已发货
			shipped:[
				{
					index:'DBFH172872021102200006',
					applicationNum:'1',
					shipNum:'0',
					cancelNum:'0',
					state:'已完成',
					applicationTime:'	2021-10-22 17:30:18'
				}
			],

			//3-已撤回
			Withdrawn:[
				{
					index:'DBFH172872021102200006',
					applicationNum:'1',
					shipNum:'0',
					cancelNum:'0',
					state:'已完成',
					applicationTime:'	2021-10-22 17:30:18'
				}
			],


			// 操作记录
			operationRecordList:[
				{
					operatingTime:'2021-10-22 17:30:18',
					operator:'系统',
					accessDevice:'系统自动生成',
					visitCity:'系统',
					ip:'0.0.0.0	',
					operationContent:'新增调拨申请单',
				}
			]
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
.transferDetail{
	display: flex;
	align-items: center;
	height: 50px;
	.detail_title{
		border-left: 4px solid red;
		padding-left: 10px;
		font-size: 15px;
		line-height: 20px;
		text-align: left;
		color: #d71418;
		cursor: pointer;
	}
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
		height: 150px;
		border-right: 1px solid rgb(224, 220, 220);
		background-color: #f0f4f5ec;
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



// 分页
.el-pagination{
	margin-top: 20px;
	margin-left:30%;
}

</style>