<template>
	<div>
		<div class="transheader">
      <h2>新增调拨单-发货申请</h2>
      <div class="button">
        <el-button size="small" plain  @click="$router.push('/transfer')"> 取消 </el-button>
        <el-button size="small"  @click="save" type="danger"> 保存 </el-button>
      </div>
		</div>

		<el-card>
			<span>发货单信息</span>
			<div class="invoice_info_div">
				<el-form :model="addInfo" :rules="rules">
					<el-row>
						<el-col :span="12" >
							<el-form-item label="调入组织:" >
								<el-input placeholder="云镖网络科技有限公司" v-model="addInfo.transOrganiza" :disabled="true" ></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11" class="odd_lie">
							<el-form-item label="资产所属组织:" >
								<el-select v-model="addInfo.assetsOrg" placeholder="请选择资产所属组织" style="width:100%">
									<el-option label="区域一" value="shanghai" ></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item  label="收货人" prop="name" >
								<el-input v-model="addInfo.receiver" placeholder="请选择收货人"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11" class="odd_lie">
							<el-form-item  label="收货电话" prop="name" >
								<el-input v-model="addInfo.receivingPhone" placeholder="请输入收货电话"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12" >
							<el-form-item label="省市区:"><br>
								<el-cascader v-model="addInfo.city" :options="citys" @change="handleChange" placeholder="请选择省市区"></el-cascader> 
							</el-form-item>
						</el-col>
						<el-col :span="11" class="odd_lie">
							<el-form-item  label="详细地址" prop="name" >
								<el-input v-model="addInfo.address" placeholder="请输入详细收货地址"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item  label="期望发货日期" prop="name" ><br>
								<el-date-picker  style="width:100%" v-model="addInfo.deliveryTime" type="date" placeholder="选择期望发货日期" > </el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="11" class="odd_lie">
							<el-form-item label="收货场景:" >
								<el-select v-model="addInfo.assetsOrg" placeholder="请选择收货场景" style="width:100%">
									<el-option label="区域一" value="shanghai" ></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col>
							<el-form-item label="收货场景:" >
								<el-input type="textarea" placeholder="请输入备注信息(不超200字)" v-model="textarea" maxlength="200" show-word-limit style="height:200px"> </el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>

			<!-- 产品明细行 -->
			<div class="productLine">
				<span>产品明细行</span>
				<el-button size="small">添加产品</el-button>
				<el-row class="row">
					<el-table :data="productLine" border style="width: 100%">
						<el-table-column prop="index" label="序列"></el-table-column>
						<el-table-column prop="productName" label="产品名称"></el-table-column>
						<el-table-column prop="specification" label="规格" ></el-table-column>
						<el-table-column prop="unit" label="单位" ></el-table-column>
						<el-table-column prop="applicationNum" label="申请数量" ></el-table-column>
						<el-table-column prop="operate" label="操作" ></el-table-column>
					</el-table>
				</el-row>
			</div> 
		</el-card>
	</div>
</template>

<script>
export default {
	name:'Add',
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
			//选择发货日期数据
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

			// 产品明细行列表数据
			productLine: [
        {
          index: 'MXM001',  //序列
          productName: '机器人',             //产品名称
          specification:1,           //规格
          unit: '个',                    //单位
          applicationNum: 3,          //申请数量
          operate: ''                  //操作
        },
			]
		}
	}
}
</script>

<style lang="less" scoped>
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
	border: 1px solid rgb(240, 230, 230);
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

</style>