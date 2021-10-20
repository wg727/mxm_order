<template>
	<div>
		<div class="transheader">
      <h2>综合调拨申请列表</h2>
      <div class="button">
        <el-button size="small" @click="goAddpage"> + 新增</el-button>
        <el-button size="small">批量导出</el-button>
        <el-button size="small">筛选</el-button>
      </div>
    </div>

			
	</div>
</template>

<script>
export default {
  name: "permission"
};
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