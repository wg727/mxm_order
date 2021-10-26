<template>
	<div>
		<div class="transferDetail">
      <span class="detail_title">审核综合调拨单详情</span>
			<div class="button">
				<el-button  size="small" @click="goback">返回</el-button>
			</div>
		</div>

		<el-card class="el_card-style">
			<div class="detail">
				<section class="detail_section1 ">
					<div class="section_list first">
						<span>单据号：</span>
						<span>申请时间：</span>
					</div>
					<div class="section_list ">
						<span>ZDDB20211022000013</span>
						<span>2021-10-23</span>
					</div>
				</section>

				<section class="detail_section1  ">
					<div class="section_list first">
						<span>状态：</span>
						<span>申请备注：</span>
					</div>
					<div class="section_list ">
						<span>已完成</span>
						<span>回收申请自动生成！</span>
					</div>
				</section>

				<section class="detail_section1 ">
					<div class="section_list first">
						<span>调入组织：</span>
						<span>最后更新：</span>
					</div>
					<div class="section_list ">
						<span>云镖网络科技有限公司</span>
						<span>2021-10-18 11:01:01</span>
					</div>
				</section>
				
				<section class="detail_section1 ">
					<div class="section_list first">
						<span>申请人：</span>
						<span>资产所属组织：</span>
					</div>
					<div class="section_list ">
						<span>员工李季</span>
						<span>云镖网络科技有限公司</span>
					</div>
				</section>
			</div>
		</el-card>

		<div class="product_list">
			<span class="detail_title">产品明细</span>
		</div>
		<el-card>
			<el-row>
        <el-table :data="goodsList" border style="width: 100%">
          <el-table-column prop="index" label="序号" width="50px"></el-table-column>
          <el-table-column prop="productName" label="产品名称" ></el-table-column>
          <el-table-column prop="specification" label="规格" width="90px" ></el-table-column>
          <el-table-column prop="unit" label="单位" width="90px"></el-table-column>
          <el-table-column prop="applicationsNum" label="申请数量" width="90px"></el-table-column>
          <el-table-column label="调出组织" width="300px" >
						<template>
							<el-select v-model="value" placeholder="请选择">
								<el-option 	v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
						</template>
					</el-table-column>
          <el-table-column  label="审批数量" >
						<template v-slot="scoped">
								<el-input type="number" placeholder="请输入数量" v-model="value">{{scoped.row}}</el-input>
							</template>
					</el-table-column>
          <el-table-column prop="quantityAvailable" label="可用数量" ></el-table-column>
          <el-table-column label="查询组织库存" >
						<el-button type="text" @click="lookViewDialog = true">查看</el-button>
					</el-table-column>
          <el-table-column prop="operate" label="操作" ></el-table-column>
        </el-table>
      </el-row>
		</el-card>

		<!-- 查看的对话框 -->
		<el-dialog
			title="产品列表"
			:visible.sync="lookViewDialog"
			width="50%"
			:before-close="handleClose"
			>
			<div class="addProductVisible">

				<!-- 按钮搜索/添加区域 -->
				<el-row :gutter="10">
					<el-col :span="7">
							<el-input placeholder="请输入组织名称"  clearable v-model="addProductVisibleInfo.query" class="search_input"></el-input>
							<el-input placeholder="请输入省份"  clearable v-model="addProductVisibleInfo.query" class="search_input"></el-input>
							<el-button  icon="el-icon-search" class="search_button"></el-button>
					</el-col>
				</el-row>

				<!-- table区域 -->
				<el-row class="row">
					<el-table :data="dialogTableList" border style="width: 100%" header-cell-class-name="table-header" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55" align="center"></el-table-column>
						<el-table-column prop="name" label="产品名称"></el-table-column>
						<el-table-column prop="specification" label="规格"></el-table-column>
						<el-table-column prop="unit" label="单位" ></el-table-column>
					</el-table>
				</el-row>

			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addProductVisible = false">取 消</el-button>
				<el-button type="primary" @click="addProductVisible = false">确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
export default {
	data(){
		return{
			// 产品明细列表数据
      goodsList: [
        {
          index: '001',
          productName: '云镖网络科技有限公司',
          specification:'',
          unit:'默认',
          applicationsNum: 5,
          organizationOut: '',
          approvalsNum: '',
          quantityAvailable: '',
          organizationInventory: '查看',
          operate: '拆行',
        
        },
        

      ],
			options: [{
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
			value: '',

			// 查看的对话框
			lookViewDialog:false,
			addProductVisibleInfo:{
				query:'',
			},
			// 列表数据
			dialogTableList:[
        {
          name: '磁悬浮地球仪-无规格',
          specification: 25,
          unit: '个',
        },
        
      ]
		}
	},
	methods:{
		//返回
		goback(){
			this.$router.push('/transfer')
		},
		// 监听 pagesize 改变事件 每页显示的个数
		handleSizeChange (newSize) {
			this.queryInfo.pagesize = newSize
		},
		// 监听 页码值 改变的事件 当前页面值
		handleCurrentChange (newPage) {
			this.queryInfo.pagenum = newPage
		},
	}
}
</script>

<style lang="less" scoped>
.el_card-style{
	background-color: #fff;
}
.detail_title{
	border-left: 4px solid red;
	padding-left: 10px;
	font-size: 15px;
	line-height: 20px;
	text-align: left;
	color: #d71418;
	cursor: pointer;
}
.transferDetail{
	display: flex;
	align-items: center;
	height: 50px;
	.button{
	margin-left: auto;
	}
}
	
.detail{
	display: flex;
	justify-content: space-between;
		background-color: #f0f4f5ec;
	.detail_section1{
		display: flex;
		width: 25%;
		height: 60px;
		border-right: 1px solid rgb(224, 220, 220);
		background-color: #f0f4f5ec;
		flex-direction: row;
		flex-wrap: nowrap;
		padding: 15px;
		color: rgba(0,0,0,.65);
    font-size: 14px;
		font-weight: 550;
		.section_list{
			width: 180px;
			display: flex;
			flex-wrap: nowrap;
			flex-direction: column;
			justify-content:space-between;
		}
		.first{
			width: 120px;
		}
	}
}

// 产品明细
.product_list{
	margin-top: 30px;
	margin-bottom: 15px;
}

// 查看的对话框
.row{
	margin-top: 20px;
}

.addProductVisible{
	padding: 10px;
	// border-top: 1px solid rgb(240, 230, 230);
	// border-bottom: 1px solid rgb(240, 230, 230);
	.el-col{
			display: flex;
	}
}


</style>