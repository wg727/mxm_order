<template>
	<div>
		<div class="transheader">
      <h2>综合调拨申请列表</h2>
      <div class="button">
        <el-button size="small" @click="goAddpage"> + 新增</el-button>
        <el-button size="small">批量导出</el-button>
        <el-button size="small">筛选</el-button>
      </div>

			<!-- --------------------------------------------- -->
			<div class="container">
				<!-- table区域 -->
      <el-row>
        <el-table :data="goodsList" border style="width: 100%">
          <el-table-column prop="id" label="单据号"></el-table-column>
          <el-table-column prop="organization" label="资产所属组织"></el-table-column>
          <el-table-column prop="transferred" label="调入管理组织" ></el-table-column>
          <el-table-column prop="sourceType" label="来源类型" ></el-table-column>
          <el-table-column prop="applications" label="申请数量" ></el-table-column>
          <el-table-column prop="approvalsNum" label="审批数量" ></el-table-column>
          <el-table-column prop="sentNum" label="待发数量" ></el-table-column>
          <el-table-column prop="cancelNum" label="取消数量" ></el-table-column>
          <el-table-column prop="cancellationsNum" label="收货数量" ></el-table-column>
          <el-table-column prop="state" label="状态" ></el-table-column>
          <el-table-column prop="applicant" label="申请人" ></el-table-column>
          <el-table-column prop="planner" label="计划员" ></el-table-column>
          <el-table-column prop="applicationime" label="申请时间" ></el-table-column>
          <el-table-column prop="updateTime" label="最后更新时间" ></el-table-column>
        </el-table>
      </el-row>
			</div>
    </div>

			
	</div>
</template>

<script>
export default {
  name: "permission",
	data(){
		return{
			
		}
	}
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