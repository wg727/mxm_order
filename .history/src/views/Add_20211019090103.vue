<template>
	<div>
		<div class="transheader">
      <h2>综合调拨申请列表</h2>
      <div class="button">
        <el-button size="small" icon="el-icon-plus" @click="save"> 保存 </el-button>
        <el-button size="small" icon="el-icon-printer"> 取消 </el-button>
        
      </div>
		</div>
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
.button{
    margin-left: auto;
}
</style>