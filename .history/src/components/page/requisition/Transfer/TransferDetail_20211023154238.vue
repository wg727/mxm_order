<template>
	<div>
		<div class="transferDetail">
      <span>综合调拨单详情</span>
			<div class="button">
				<el-button  size="small">返回</el-button>
			</div>
		</div>

		<el-card class="el_card-style">
			<div class="detail">
				<section class="detail_section1 detail_margin">
					<div class="section_list">
						<span>单据号</span>
						<span>申请时间</span>
						<span>最后更新</span>
					</div>
					<div class="section_list">
						<span>ZDDB20211022000013</span>
						<span>2021-10-23</span>
						<span>2022-2-12</span>
					</div>
				</section>

				<section class="detail_section1 detail_margin">
					<div class="section_list">
						<span>状态</span>
						<span>申请备注</span>
						<span>资产所属组织</span>
					</div>
					<div class="section_list">
						<span>已完成</span>
						<span>回收申请自动生成！</span>
						<span>xyj店铺</span>
					</div>
				</section>

				<section class="detail_section1 detail_margin">
					<div class="section_list">
						<span>调入组织</span>
						<span>计划员</span>
					</div>
					<div class="section_list">
						<span>xyj店铺</span>
						<span>系统</span>
					</div>
				</section>
				
				<section class="detail_section1 detail_margin">
					<div class="section_list">
						<span>申请人</span>
						<span>审批备注</span>
					</div>
					<div class="section_list">
						<span>员工李季</span>
						<span>系统自动审批</span>
					</div>
				</section>
			</div>

			<div class="login-body">
        <el-steps :active="active" finish-status="success" size="medium" :space="400" :align-center="true" style="width: 800px">
          <el-step title="创建帐户" />
          <el-step title="完善信息"/>
          <el-step title="注册成功"/>
        </el-steps>
        <!--创建帐户-->
        <el-card class="card" style="margin-top: 50px;width:1000px;">
          <account v-if="active==1" :obj="obj" ref="account" @clickNext="next($event)"/>

          <!--完善信息-->
          <info
                  v-if="active==2 "
                  ref="info"
                  :obj="obj"
                  @click="closeDialog()"
                  @clickPrev="prev($event)"
                  @clickNext="next"/>

          <!--注册成功-->
          <success
                  v-if="active==3"
                  ref="success"
                  @clickPrev="prev()"/>

        </el-card>
        <!--    </el-dialog>-->
      </div>
		</el-card>

	</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.el_card-style{
	background-color: #fff;
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
	background-color: rgb(244, 245, 241);
	.detail_section1{
		display: flex;
		width: 25%;
		height: 150px;
		border-right: 1px solid rgb(204, 199, 199);
		background-color: rgb(244, 245, 241);
		flex-direction: row;
		flex-wrap: nowrap;
		.section_list{
			width: 150px;
			// border: 1px solid #111;
			display: flex;
			flex-wrap: nowrap;
			flex-direction: column;
			justify-content:space-around;
			// background-color: rgb(214, 61, 61);
		}
		
	}
	.detail_margin{
		margin-left: 20px;
	}

}
.cart_el_teps{
	margin-top: 40px;
	margin-left: 100px;
}

.login-body {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /deep/.el-step__icon{
          width: 50px;
          height: 50px;
        }
  }

</style>