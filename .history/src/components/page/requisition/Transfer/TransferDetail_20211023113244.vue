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
				<div class="header_list_div">
					<section class="section_span1">
						<span>单据号</span>
						<span>申请时间</span>
						<span>最后更新</span>
					</section>
					<section class="section_span2">
						<span>ZDDB20211022000013</span>
						<span>2021-10-23</span>
						<span>2022-2-12</span>
					</section>
					
				</div>
				<div class="header_list_div">
					<section class="section_span1">
						<span>单据号</span>
						<span>申请时间</span>
						<span>最后更新</span>
					</section>
					<section class="section_span2">
						<span>ZDDB20211022000013</span>
						<span>2021-10-23</span>
						<span>2022-2-12</span>
					</section>
					
				</div>
				
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
			justify-content: space-between;
			.section_span1{
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				span{
					margin-bottom: 20px;
				}
			}
			.section_span2{
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				span{
					margin-bottom: 20px;
					margin-left: 30px;
				}	
			}
		}
	}
</style>