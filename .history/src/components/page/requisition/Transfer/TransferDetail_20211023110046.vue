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
				<div class="header_list_span">
					<span>单据号</span>
					<span>申请时间</span>
					<span>最后更新</span>
				</div>
				<div class="header_list_span">
					<span>状态</span>
					<span>单据号</span>
					<span>单据号</span>
				</div>
				<div class="header_list_span">
					<span>单据号</span>
					<span>单据号</span>
					<span>单据号</span>
				</div>
				<div class="header_list_span">
					<span>单据号</span>
					<span>单据号</span>
					<span>单据号</span>
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
		.header_list_span{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			span{
				margin-bottom: 15px;
			}
		}
	}
</style>