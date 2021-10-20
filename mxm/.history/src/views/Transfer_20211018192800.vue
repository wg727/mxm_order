<template>
	<div>
		<div class="header">
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
h1 {
	text-align: center;
	margin: 30px 0;
}
p {
	line-height: 30px;
	margin-bottom: 10px;
	text-indent: 2em;
}
.logout {
	color: #409eff;
}
</style>