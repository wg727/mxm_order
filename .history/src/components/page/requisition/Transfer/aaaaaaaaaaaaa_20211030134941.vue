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
							<el-select
								v-model="scope.row.goodsId"
								filterable
								placeholder="请选择"
								@change.native="getGoodsList"
								clearable
							>
								<el-option
									v-for="product in productList"
									:key="product.id"
									:label="product.name"
									:value="product.id"
								>
								</el-option>
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

}
</script>

<style>

</style>