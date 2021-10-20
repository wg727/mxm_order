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
			<div class="a">
			<el-row :gutter="20">
				<el-col :span="12">
						调入组织:<el-input placeholder="云镖网络科技有限公司" v-model="transOrganiza" :disabled="true"></el-input>
				</el-col>
				<el-col :span="12">
					  资产所属组织:<br><el-select v-model="value" placeholder="请选择资产所属组织">
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
  					</el-select>
				</el-col>
				<el-col :span="12" class="colPadding">
						收货人:<el-input placeholder="云镖网络科技有限公司" v-model="receiver" ></el-input>
				</el-col>
				<el-col :span="12" class="colPadding">
						收货电话:<el-input placeholder="云镖网络科技有限公司" v-model="receivingPhone" ></el-input>
				</el-col>

				<el-col :span="12" class="colPadding">
						<!-- 收货电话:<el-input placeholder="请选择省市区" v-model="receivingPhone" ></el-input> -->
						<div>
							省市区:<el-cascader v-model="city" :options="citys" @change="handleChange"></el-cascader>
						</div>
				</el-col>
				<el-col :span="12" class="colPadding">
					详细地址:<el-input placeholder="云镖网络科技有限公司" v-model="receivingPhone" ></el-input>
				</el-col>

				<!-- 》》》》》》时间选择器《《《《《《《《 -->
				<el-col :span="12" class="colPadding">
					期望发货日期：
					<div class="block">
						<el-date-picker v-model="deliveryTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions"> </el-date-picker>
					</div>
				</el-col>

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
				// assetsOrg:''    //资产所属组织
				receiver:'',       //收货人
				receivingPhone:'',  //收货电话
				city:'',           //城市
				deliveryTime:'',	 //发货日期
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
			pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
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
.a >>> .el-input > input{
    height: 32px;
		padding-right:600px;
		margin-top: 5px;
}
.colPadding{
	margin-top: 20px;
}



</style>