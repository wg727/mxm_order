<template>
	<div>
		<div class="transferDetail">
      <span>综合调拨单详情</span>
			<div class="button">
				<el-button  size="small">返回</el-button>
			</div>
		</div>

		<el-card>
			<div class="header_list">
				<div class="header_list_div first_span">
					<section class="section_span1 first_span">
						<span>单据号</span>
						<span>申请时间</span>
						<span>最后更新</span>
					</section>
					<section class="section_span2 span2_margin">
						<span>ZDDB20211022000013</span>
						<span>2021-10-23</span>
						<span>2022-2-12</span>
					</section>
					
				</div>
				<div class="header_list_div">
					<section class="section_span1">
						<span>状态</span>
						<span>申请备注</span>
						<span>资产所属组织</span>
					</section>
					<section class="section_span2">
						<span>已完成</span>
						<span>回收申请自动生成！</span>
						<span>xyj店铺</span>
					</section>
					
				</div>
				<div class="header_list_div">
					<section class="section_span1">
						<span>调入组织</span>
						<span>计划员</span>
					</section>
					<section class="section_span2">
						<span>xyj店铺</span>
						<span>系统</span>
					</section>
					
				</div>
				<div class="header_list_div">
					<section class="section_span1">
						<span>申请人</span>
						<span>审批备注</span>
					</section>
					<section class="section_span2">
						<span>员工李季</span>
						<span>系统自动审批</span>
					</section>
					
				</div>
				
			</div>
			<span>--------------------------</span>
			<div class="a">
				<section class="a1">
					<div class="a11">
						<span>单据号</span>
						<span>申请时间</span>
						<span>最后更新</span>
					</div>
					<div class="a11">
						<span>ZDDB20211022000013</span>
						<span>2021-10-23</span>
						<span>2022-2-12</span>
					</div>
				</section>
				<section class="a1 aa">
						<div class="a11">
						<span>状态</span>
						<span>申请备注</span>
						<span>资产所属组织</span>
					</div>
					<div class="a11">
						<span>已完成</span>
						<span>回收申请自动生成！</span>
						<span>xyj店铺</span>
					</div>
				</section>
				<section class="a1 aa">
				<section class="a1 aa">
					<div class="a11">
						<span>调入组织</span>
						<span>计划员</span>
					</div>
					<div class="a11">
						<span>xyj店铺</span>
						<span>系统</span>
					</div>
			</section>
				</section>
				<section class="a1 aa">444</section>
			</div>

		</el-card>

	</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
	.transferDetail{
		display: flex;
    align-items: center;
    height: 50px;
		.button{
    margin-left: auto;
		}
	}
	.header_list{
		display: flex;
		justify-content: space-between;
		.header_list_div{
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			border-left: 1px solid #ccc;
			.section_span1{
				padding-left: 10px;
				font-size: 14px;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				span{
					margin-bottom: 20px;
				}
			}
			.section_span2{
				font-size: 14px;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				
				span{
					margin-bottom: 20px;
					margin-left: 30px;
				}	
			}
			.span2_margin{
				margin-top: 5px;
			}
		}
			.first_span{
				border: none;
			}


	}

// -----------------
.a{
	display: flex;
	justify-content: space-between;

	.a1{
		display: flex;
		width: 25%;
		height: 100px;
		border: 1px solid #000;
		background-color: #ccc;
		flex-direction: row;
		flex-wrap: nowrap;
		.a11{
			width: 40%;
			height: 100px;
			border: 1px solid #111;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			background-color: rgb(214, 61, 61);
		}
		
	}
	.aa{
		margin-left: 20px;
	}
}

</style>