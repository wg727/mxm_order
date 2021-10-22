<template>
	<div>
		<div class="transheader">
      <h2>新增调拨单</h2>
      <div class="button">
        <el-button size="small" plain  @click="$router.push('/transfer')"> 取消 </el-button>
        <el-button size="small"  @click="save" type="danger"> 保存 </el-button>
      </div>
		</div>

		<el-card>
			<!-- 发货单信息 -->
			<span>发货单信息</span>
			<div class="a,user_info_page">
				<!-- <el-row :gutter="20"> -->

			<el-form :model="addInfo" :rules="rules" label-width="100px" class="demo-ruleForm">
				<el-col :span="12">
						调入组织:<br><el-input placeholder="云镖网络科技有限公司" v-model="addInfo.transOrganiza" :disabled="true" style="margin-top:15px"></el-input>
				</el-col>

				<el-form-item label="资产所属组织:" class="descClass"><br>
					<el-select v-model="value" placeholder="请选择活动区域" style="width:50%">
						<el-option label="区域一" value="shanghai" ></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
			</el-form>

				<!--
					<el-col :span="12">
							资产所属组织:<br><el-select v-model="value" placeholder="请选择资产所属组织">
												<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
					</el-col>
					<el-col :span="12" class="colPadding">
							收货人:<el-input placeholder="请输入收货人" v-model="addInfo.receiver" ></el-input>
					</el-col>
					<el-col :span="12" class="colPadding">
							收货电话:<el-input placeholder="请输入收货电话" v-model="addInfo.receivingPhone" ></el-input>
					</el-col>

					<el-col :span="12" class="colPadding">
							<!-- 收货电话:<el-input placeholder="请选择省市区" v-model="receivingPhone" ></el-input> -
							<div>
								省市区:<br><el-cascader v-model="addInfo.city" :options="citys" @change="handleChange" placeholder="请选择省市区"></el-cascader>
							</div>
					</el-col>
					<el-col :span="12" class="colPadding">
						详细地址:<el-input placeholder="请输入详细收货地址" v-model="addInfo.receivingPhone" ></el-input>
					</el-col>

					<!-- 》》》》》》时间选择器《《《《《《《《 --
					<el-col :span="12" class="colPadding">
						期望发货日期：<br>
						<el-date-picker v-model="addInfo.deliveryTime" align="right" type="date" placeholder="请选择期望发货日期" :picker-options="shortcuts"> </el-date-picker>
					</el-col>
					<!-- 》》》》》》收货场景《《《《《《《《《 --
					<el-col :span="12" class="colPadding">
							收货场景:<br><el-select v-model="value" placeholder="请选择收货场景">
												<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
					</el-col>
					<!-- 》》》》》》备注《《《《《《《《《《《 --
					<el-col :span="24" class="colPadding">
						备注:<el-input type="textarea" placeholder="请输入备注信息（不超200字）" v-model="addInfo.remark" maxlength="200" show-word-limit > </el-input>
					</el-col>
					-->
				<!-- </el-row> -->
			</div>	

			<!-- 产品明细行 --
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
			</div>  -->
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
				// assetsOrg:''    //资产所属组织
				receiver:'',       //收货人
				receivingPhone:'',  //收货电话
				city:'',           //城市
				deliveryTime:'',	 //发货日期
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
    height: 35px;
		padding-right:100px;
		margin-top: 5px;
}
.colPadding{
	margin-top: 20px;
}


/* .eldatePicker{
	width: 200px;
} */

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