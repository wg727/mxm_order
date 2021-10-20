<template>
	<div>
		<div class="transheader">
      <h2>新增销售订单</h2>
      <div class="button">
        <el-button size="small" plain  @click="$router.push('/transfer')"> 取消 </el-button>
        <el-button size="small"  @click="save" type="danger"> 保存 </el-button>
      </div>
		</div>

		<el-card>
			<span>客户信息</span>
			<div class="a">
				<el-row :gutter="20">
					<el-col :span="12">
							客户名称:<br><el-select v-model="value" placeholder="请选择客户名称">
												<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
					</el-col>
					<el-col :span="12">
							客户地址:<el-input placeholder="选择客户后自动带出" v-model="addSalesOrderInfo.address" :disabled="true"></el-input>
					</el-col>
					<el-col :span="12" class="colPadding">
							联系人:<br><el-select v-model="value" placeholder="请选择联系人（先选择客户）">
												<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
					</el-col>
					<el-col :span="12" class="colPadding">
							联系电话:<el-input placeholder="请输入联系电话" v-model="addSalesOrderInfo.phoneNum"></el-input>
					</el-col>
				</el-row>
			</div>
			
			
			<div class="a">
				<span>订单基本信息</span>
				<el-row :gutter="20" class="orderMessage">
					<el-col :span="12">
							商机:<br><el-select v-model="value" placeholder="请选择商机(先选择客户)">
												<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
					</el-col>
					<el-col :span="12">
							货币:<br><el-select v-model="value" placeholder="请选择货币">
												<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
					</el-col>
					<el-col :span="12" class="colPadding">
							印章类别:<br><el-select v-model="value" placeholder="请选择印章类别">
												<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
					</el-col>
					<el-col :span="12" class="colPadding">
							印章公司名称:<el-input placeholder="请输入印章公司名称" v-model="addSalesOrderInfo.sealCompany"></el-input>
					</el-col>
					<el-col :span="12" class="colPadding">
							合同类型:<br><el-select v-model="value" placeholder="请选择合同类型">
												<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
					</el-col>
					<el-col :span="12" class="colPadding">
							合同模版:<br><el-select v-model="value" placeholder="请选择合同模版">
												<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
					</el-col>
					<el-col :span="12" class="colPadding">
							合同名称:<el-input placeholder="请输入合同名称" v-model="addSalesOrderInfo.sealCompany"></el-input>
					</el-col>
					<el-col :span="12" class="colPadding">
						  签约日期<br>
						<el-date-picker class="eldatePicker" v-model="addSalesOrderInfo.contractDate" align="right" type="date" placeholder="请输入签约日期" :picker-options="pickerOptions"> </el-date-picker>
					</el-col>
					<el-col :span="12" class="colPadding">
							订单负责人:<br><el-select v-model="value" placeholder="请选择订单负责人">
												<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
					</el-col>
					<el-col :span="12" class="colPadding">
							发货:<br><el-select v-model="value" placeholder="请选择发货">
												<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
					</el-col>
					<el-col :span="12" class="colPadding">
							开票公司:<br><el-select v-model="value" placeholder="请选择开票公司">
												<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
					</el-col>
					<el-col :span="12" class="colPadding">
							启用钉钉流程:<br>
							<el-switch v-model="addSalesOrderInfo.startDing" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
					</el-col>
					<el-col :span="24" class="colPadding">
							备注:<br>
							<el-input type="textarea" :rows="4" placeholder="请输入备注" v-model="addSalesOrderInfo.remark"></el-input>
					</el-col>
					<el-col :span="24" class="colPadding">
							特别约定:<br>
							<el-input type="textarea" :rows="4" placeholder="请输入备注" v-model="addSalesOrderInfo.specialAppointment"></el-input>
					</el-col>
				</el-row>	
			</div>

			<!-- 收货信息 -->
			<div class="a">
				<span>收货信息</span>
				<el-row :gutter="20" class="orderMessage">
					<el-col :span="12" class="colPadding">
							收货人:<el-input placeholder="请输入收货人" v-model="addSalesOrderInfo.sealCompany"></el-input>
					</el-col>
					<el-col :span="12" class="colPadding">
							收货人联系电话:<el-input placeholder="请输入收货人联系电话" v-model="addSalesOrderInfo.sealCompany"></el-input>
					</el-col>
					<el-col :span="12" class="colPadding">
							<!-- 收货电话:<el-input placeholder="请选择省市区" v-model="receivingPhone" ></el-input> -->
							<div>
								省市区:<el-cascader v-model="addSalesOrderInfo.city" :options="citys" @change="handleChange" placeholder="请选择省市区"></el-cascader>
							</div>
					</el-col>
					<el-col :span="12" class="colPadding">
							详细地址:<el-input placeholder="请输入详细地址" v-model="addSalesOrderInfo.sealCompany"></el-input>
					</el-col>
				</el-row>
			</div>

			<!-- 发票信息 -->
			<div class="a">
				<span>发票信息</span>
				<el-row :gutter="20" class="orderMessage">
					<el-col :span="12" class="colPadding">
							开票抬头:<el-input placeholder="请输入开票抬头" v-model="addSalesOrderInfo.sealCompany"></el-input>
					</el-col>
					<el-col :span="12" class="colPadding">
							纳税人识别号:<el-input placeholder="请输入纳税人识别号" v-model="addSalesOrderInfo.sealCompany"></el-input>
					</el-col>
					<el-col :span="12" class="colPadding">
							注册地址:<el-input placeholder="请输入注册地址" v-model="addSalesOrderInfo.sealCompany"></el-input>
					</el-col>
					<el-col :span="12" class="colPadding">
							开户行:<el-input placeholder="请输入开户行" v-model="addSalesOrderInfo.sealCompany"></el-input>
					</el-col>
					<el-col :span="12" class="colPadding">
							电话:<el-input placeholder="请输入电话" v-model="addSalesOrderInfo.sealCompany"></el-input>
					</el-col>
					<el-col :span="12" class="colPadding">
							账号:<el-input placeholder="请输入账号" v-model="addSalesOrderInfo.sealCompany"></el-input>
					</el-col>
				</el-row>
			</div>

			<!-- 产品明细行 -->
			<div class="productLine">
				<span>产品明细行</span>
				<el-button size="small">删除产品</el-button>
				<el-button size="small" @click="addDialogVisible = true">添加产品</el-button>
				<el-row class="row">
					<el-table :data="productLine" border style="width: 100%">
						<el-table-column prop="index" label="序列"></el-table-column>
						<el-table-column prop="productName" label="产品名称"></el-table-column>
						<el-table-column prop="contractProductName" label="合同产品名称" ></el-table-column>
						<el-table-column prop="specification" label="规格" ></el-table-column>
						<el-table-column prop="unit" label="单位" ></el-table-column>
						<el-table-column prop="unitPrice" label="单价(元)" ></el-table-column>
						<el-table-column prop="bunbers" label="数量" ></el-table-column>
						<el-table-column prop="money" label="金额小计(元)" ></el-table-column>
						<el-table-column prop="operate" label="操作" ></el-table-column>
					</el-table>
				</el-row>
				<div class="a">
					<el-row :gutter="20" class="orderMessage">
						<el-col :span="12" >
								订单总价:<el-input placeholder="请输入订单总价" v-model="addSalesOrderInfo.sealCompany"></el-input>
						</el-col>
						<el-col :span="12" >
								运费:<el-input placeholder="请输入运费" v-model="addSalesOrderInfo.sealCompany"></el-input>
						</el-col>
						<el-col :span="12" class="colPadding">
								订单实际总价:<el-input placeholder="请输入订单实际总价" v-model="addSalesOrderInfo.sealCompany"></el-input>
						</el-col>
						<el-col :span="12" class="colPadding">
								付款方式:<br><el-select v-model="value" placeholder="请选择付款方式">
													<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
								</el-select>
						</el-col>

					</el-row>
				</div>
			</div>

		</el-card>
	</div>
</template>

<script>
export default {
	data(){
		return{
			addSalesOrderInfo:{
				address:'',  //客户地址
				phoneNum:'', //联系电话
				sealCompany:'', //印章公司名
				contractDate:'', //签约日期
				startDing:true, //启用钉钉流程
				remark:'',    //备注
				specialAppointment:'', //特别约定
				city:'',    //省市区
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
			shortcuts: [       //签约日期
        {
          text: 'Today',
          value: new Date(),
        },
        {
          text: 'Yesterday',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
          },
        },
        {
          text: 'A week ago',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
          },
        },
      ],
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
          index:'MXM001',    //序列
          productName:'机器人',    //产品名称
          contractProductName:'科卫',    //合同产品名称
          specification:'1',    //规格
          unit:'个',    //单位
          unitPrice:'300000',    //单价
          bunbers:'3',    //数量
          money:'99',    //金额小计
          operate:'',    //操作
        },
			],
			//添加产品对话框
			addDialogVisible:false,
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

.a{
	padding: 10px;
	margin-top: 10px;
	margin-bottom: 20px;
	border: 1px solid rgb(240, 230, 230);
}
.a >>> .el-input > input{
    height: 32px;
		margin-right:600px;
		margin-top: 5px;
}
.colPadding{
	margin-top: 20px;
}
.orderMessage{
	margin-top: 10px;
}
/* 签约时间 */
/* .eldatePicker{
	width: 200px;
} */

.el-switch{
	margin-top: 10px;
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
	margin-left: 8px;
}

</style>