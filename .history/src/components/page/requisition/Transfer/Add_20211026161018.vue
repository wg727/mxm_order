<template>
	<div>
		<div class="transheader">
      <span class="detail_title">新增调拨单-发货申请</span>
      <div class="button">
        <el-button size="small" plain id="el_button">添加发货信息 </el-button>
        <el-button size="small" plain  @click="$router.push('/transfer')"> 取消 </el-button>
        <el-button size="small"   type="danger"> 保存 </el-button>
      </div>
		</div>

		<el-card id="add_Invoice">
			
		<InvoiceInfo id="info"></InvoiceInfo>


			<!-- 产品明细行 -->
			<div class="productLine">
				<span>产品明细行</span>
				<el-button size="small" @click="addProductVisible = true">添加产品</el-button>
				<el-row class="row">
					<el-table :data="productLine" border style="width: 100%">
						<el-table-column prop="index" label="序列"></el-table-column>
						<el-table-column prop="productName" label="产品名称"></el-table-column>
						<el-table-column prop="specification" label="规格" ></el-table-column>
						<el-table-column prop="unit" label="单位" ></el-table-column>
						<el-table-column prop="idleNum" label="闲置数量" ></el-table-column>
						<el-table-column prop="applicationNum" label="申请数量" ></el-table-column>
						<el-table-column prop="operate" label="操作" ></el-table-column>
					</el-table>
				</el-row>
			</div> 
		</el-card>

		<!-- 添加产品的对话框 -->
		<el-dialog
			title="产品列表"
			:visible.sync="addProductVisible"
			width="50%"
			:before-close="handleClose"
			>
			<div class="addProductVisible">

				<!-- 按钮搜索/添加区域 -->
				<el-row :gutter="10">
					<el-col :span="7">
							<el-input placeholder="请输入产品名称"  clearable v-model="addProductVisibleInfo.query" class="search_input"></el-input>
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
import  InvoiceInfo from './InvoiceInfo.vue'

var el_button =document.getElementById('el_button'),
var add_Invoice=document.getElementById("add_Invoice");
el_button.onclick
var info =document.createElement("InvoiceInfo")
add_Invoice.appendChild(info)
export default {
	name:'Add',
	components:{InvoiceInfo},

	
	
	data(){
		return{
			// 新增调拨单提交信息
			addInfo:{
				transOrganiza:'',  //调入组织
				assetsOrg:'',    //资产所属组织
				receiver:'',       //收货人
				receivingPhone:'',  //收货电话
				city:'',           //城市
				address:'',        //详细地址
				deliveryTime:'',	 //期望发货日期
				remark:'',				 //备注
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
      value: '',

			// 城市下拉选择数据
			citys: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
			}],

			// 产品明细行列表数据
			productLine: [
        {
          index: 'MXM001',         //序列
          productName: '机器人',   //产品名称
          specification:1,         //规格
          unit: '个',              //单位
					idleNum:20,              //闲置数量
          applicationNum: 3,       //申请数量
          operate: ''              //操作
        },
			],

			// 添加产品的对话框
			addProductVisible: false,
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
		handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
		
		addInvoiceInfo(){
			var add_Invoice=document.getElementById("add_Invoice");
			var info =document.createElement("InvoiceInfo")
			add_Invoice.appendChild(info)
		}
	
	}
}
</script>

<style lang="less" scoped>
.detail_title{
	border-left: 4px solid red;
	padding-left: 10px;
	font-size: 15px;
	line-height: 20px;
	text-align: left;
	color: #d71418;
	cursor: pointer;
}
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

// 发货单信息的div
.invoice_info_div{
	padding: 10px;
	margin-top: 10px;
	margin-bottom: 20px;
	border-top: 1px solid rgb(240, 230, 230);
}
// 奇数列
.odd_lie{
	margin-left: 60px;
}
.el-cascader{
	width: 100%;
}


/*产品明细行 */
.productLine{
	margin-top: 10px;
	padding: 10px;
	border: 1px solid rgb(240, 230, 230);
}
.row{
	margin-top: 20px;
}
.productLine .el-button{
	float: right;
}
// 添加产品的对话框
.addProductVisible{
	padding: 10px;
	// border-top: 1px solid rgb(240, 230, 230);
	// border-bottom: 1px solid rgb(240, 230, 230);
	.el-col{
			display: flex;
	}
}

</style>