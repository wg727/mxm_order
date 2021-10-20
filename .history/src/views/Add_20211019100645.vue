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
			<div class="a">
			<el-row :gutter="20">
				<el-col :span="12">
					<!-- <span>调入组织 :</span> -->
					<!-- <div class="a"> -->
						调入组织:<el-input placeholder="云镖网络科技有限公司" v-model="transOrganiza" :disabled="true"></el-input>
					<!-- </div> -->
				</el-col>
				<el-col :span="12">
					<!-- <span>资产所属组织 :</span> -->
					资产所属组织<br><el-select v-model="value" placeholder="请选择资产所属组织">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
  				</el-select>

				</el-col>
			</el-row>
		</div>	
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
				transOrganiza:'',  //调入组织
				// assetsOrg:''       //资产所属组织
			},
			options: [{         //资产所属组织
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
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
.a >>> .el-input > input{
    height: 32px;
		padding-right:450px
}
.a >>> .el-select{
	height: 50px;
}
</style>