<template>
	<div>
		<div class="transheader">
      <h2>新增销售订单</h2>
      <div class="button">
        <el-button size="small" plain  @click="$router.push('/transfer')"> 取消 </el-button>
        <el-button size="small"  @click="save" type="danger"> 保存 </el-button>
      </div>
		</div>

		<el-card>
			<span>新增销售订单</span>
			<div class="a">
				<el-row :gutter="20">
					<el-col :span="12">
							调入组织:<el-input placeholder="云镖网络科技有限公司" v-model="transOrganiza" :disabled="true"></el-input>
					</el-col>
				</el-row>
			</div>
		</el-card>
	</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.transheader {
  display: flex;
  align-items: center;
  height: 50px;
}
h2{
	font-size: 15px;
	font-weight: 400;
}
.button{
    margin-left: auto;
		font-size: 5px;
}
</style>