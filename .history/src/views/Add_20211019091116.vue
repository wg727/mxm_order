<template>
	<div>
		<div class="transheader">
      <h2>新增调拨单</h2>
      <div class="button">
        <el-button size="medium" plain  @click="$router.push('/transfer')"> 取消 </el-button>
        <el-button size="medium"  @click="save" type="danger"> 保存 </el-button>
        
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