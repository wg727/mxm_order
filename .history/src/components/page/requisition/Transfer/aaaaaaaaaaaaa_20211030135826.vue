<template>
	<div>
		<el-form :model="tableForm" :rules="rules" ref="tableForm">
			<el-table :data="tableForm.tableData" border class="table-lot">
				<el-table-column prop="goodsId" label="商品名称" align="center">
					<template slot-scope="scope">
						<el-form-item
							:prop="'tableData[' + scope.$index + '].goodsId'"
							:rules="rules.goodsId"
							:status-icon="true"
							:inline-message="true"
						>
							
							</el-select>
						</el-form-item>
					</template>
				</el-table-column>
			</el-table>
		</el-form>
	</div>
</template>

<script>
export default {
		tableForm: {
			tableData: [
				{
					goodsId: null,
					quantity: null,
					type: null
				}
			]
		},
}
</script>

<style>

</style>