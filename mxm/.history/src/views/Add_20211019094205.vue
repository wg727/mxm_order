<template>
	<div>
		<div class="transheader">
      <h2>新增调拨单</h2>
      <div class="button">
        <el-button size="small" plain  @click="$router.push('/transfer')"> 取消 </el-button>
        <el-button size="small"  @click="save" type="danger"> 保存 </el-button>
      </div>
		</div>

		<el-card>
			<el-row :gutter="20">
				<el-col :span="12">
					<span>调入组织 :</span>
					<input placeholder='云镖网络科技有限公司' v-model="transOrganiza" :disabled="true">
				</el-col>
				<el-col :span="12">
					<span>资产所属组织 :</span>
					<el-input placeholder="请选择资产所属组织" v-model="input" > </el-input>
				</el-col>
			</el-row>
			
		</el-card>
	</div>
</template>

<script>
export default {
	name:'Add',
	data(){
		return{
			// 新增调拨单提交信息
			addInfo:{
				transOrganiza:'云镖网络科技有限公司'
			}
		}
	}
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
input{
	height: 32px;
}

</style>