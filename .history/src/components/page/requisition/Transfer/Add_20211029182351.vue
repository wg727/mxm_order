<template>
    <div>
        <div class="transheader">
            <span class="detail_title">新增调拨单-发货申请</span>
            <div class="button">
                <el-button size="small" plain @click="$router.push('/transfer')"> 取消 </el-button>
                <el-button size="small" type="danger" @click="addShipment()"> 保存 </el-button>
            </div>
        </div>

        <el-card id="aaa">
            <span>发货单信息</span>

            <div class="invoice_info_div">
                <el-form :model="addInfo">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="调入组织：">
                                <el-input placeholder="云镖网络科技有限公司" v-model="addInfo.transOrganiza" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" class="odd_lie">
                            <el-form-item label="资产所属组织：">
                                <el-select v-model="addInfo.assetsOrgId" placeholder="请选择资产所属组织" style="width: 100%">
                                    <el-option
                                        v-for="item in assetOrgList"
                                        :key="item.assetsOrgId"
                                        :label="item.assetsOrgName"
                                        :value="item.assetsOrgId"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="收货人：" prop="name">
                                <el-input v-model="addInfo.receiver" placeholder="请选择收货人"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" class="odd_lie">
                            <el-form-item label="收货电话：" prop="name">
                                <el-input v-model="addInfo.mobile" placeholder="请输入收货电话"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="省市区："
                                ><br />
                                <el-cascader
                                    v-model="citys"
                                    :options="cityList"
                                    placeholder="请选择省市区"
                                    filterable
                                    clearable
                                    :props="city"
                                    change-on-select
                                ></el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" class="odd_lie">
                            <el-form-item label="详细地址：" prop="name">
                                <el-input v-model="addInfo.receiverAddress" placeholder="请输入详细收货地址"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="期望发货日期：" prop="name"
                                ><br />
                                <el-date-picker
                                    style="width: 100%"
                                    v-model="addInfo.expectDeliveryDate"
                                    type="date"
                                    placeholder="选择期望发货日期"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" class="odd_lie">
                            <el-form-item label="收货场景：">
                                <el-select v-model="addInfo.receiptScenario" placeholder="请选择收货场景" style="width: 100%">
                                    <el-option label="客户现场" value="shanghai"></el-option>
                                    <el-option label="公司仓库" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <el-form-item label="备注：">
                                <el-input
                                    type="textarea"
                                    placeholder="请输入备注信息(不超200字)"
                                    v-model="addInfo.remark"
                                    maxlength="200"
                                    show-word-limit
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

            <!-- 产品明细行 -->
            <div class="productLine">
                <span>产品明细行</span>
                <el-button size="small" @click="getProducts()">添加产品</el-button>
                <el-row class="row">
                    <el-table :data="multipleSelection" border style="width: 100%">
                        <el-table-column type="index" label="序列"></el-table-column>
                        <el-table-column prop="name" label="产品名称"></el-table-column>
                        <el-table-column prop="specification" label="规格"></el-table-column>
                        <el-table-column prop="unit" label="单位">台</el-table-column>
                        <el-table-column prop="idleNum" label="闲置数量"></el-table-column>
                        <el-table-column label="申请数量">
                            <template v-slot="scoped">
                                <el-input type="number" placeholder="请输入数量" v-model="addInfo.applyItemList.applyNum">{{
                                    scoped.row
                                }}</el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="80">
                            <template v-slot="scope">
                                <el-button @click="deleteProdect(scope.$index)">刪除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </div>
        </el-card>

        <!-- 添加产品的对话框 -->
        <el-dialog title="产品列表" :visible.sync="addProductVisible" width="50%" :before-close="handleClose">
            <div class="addProductVisible">
                <!-- 按钮搜索/添加区域 -->
                <el-row :gutter="10">
                    <el-col :span="7">
                        <el-input
                            placeholder="请输入产品名称"
                            clearable
                            v-model="addProductVisibleInfo.query"
                            class="search_input"
                        ></el-input>
                        <el-button icon="el-icon-search" class="search_button"></el-button>
                    </el-col>
                </el-row>

                <!-- table区域 -->
                <el-row class="row">
                    <el-table
                        :data="dialogTableList"
                        border
                        style="width: 100%"
                        header-cell-class-name="table-header"
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column type="selection" width="55" align="center"></el-table-column>
                        <el-table-column prop="name" label="产品名称"></el-table-column>
                        <el-table-column prop="specUnionKey" label="规格"></el-table-column>
                        <el-table-column prop="unitText" label="单位">台</el-table-column>
                    </el-table>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addProductVisible = false">取 消</el-button>
                <el-button type="primary" @click="beSure()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import InvoiceInfo from './InvoiceInfo.vue';
import {
    addShipmentRequisition,
    queryTransferOrganization,
    queryCity, //省市区
    productLists,
    transferInOrganization,
    assetOrganization
} from '@/request/api.js';

export default {
    name: 'Add',
    components: { InvoiceInfo },
    data() {
        return {
            //查询调入组织信息
            transferInOrganizationMessage: { captcha: '111111', loginName: 'admin', password: '12345678', source: 'web_1635473594550' },
            // 新增调拨单提交信息
            addInfo: {
                orgId: null, //调入组织id
                orgName: '', //调入组织
                assetsOrgId: '', //资产所属组织
                receiver: '', //收货人
                mobile: '', //收货电话
                receiverAddress: '', //详细地址
                expectDeliveryDate: '', //期望发货日期
                receiptScenario: '', //收货场景
                remark: '', //备注,
                province: '',
                city: '',
                country: '',
                applyItemList: [
                    {
                        productId: '',
                        productName: '',
                        applyNum: 1
                    }
                ]
            },
            //添加产品信息后返回的数据

            //资产所属组织
            assetOrgInfo: {
                name: ''
            },
            //资产所属组织列表数据展示
            assetOrgList: [],

            //省
            province:[],
            //市
            citys:[],
            //区
            area:[],

            cityList: [],
            city: {
                value: '',
                children: 'childList',
                label: 'name'
            },

            //产品列表
            products: {
                // code:'',
                // id:1,
                // name:'',
                orgId: 1
            },
            multipleSelection: [],

            submitInfo: [],
            options: [
                {
                    //资产所属组织
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            value: '',

            // 城市下拉选择数据
            citys: [
                {
                    value: 'zhinan',
                    label: '指南',
                    children: [
                        {
                            value: 'shejiyuanze',
                            label: '设计原则',
                            children: [
                                {
                                    value: 'yizhi',
                                    label: '一致'
                                }
                            ]
                        },
                        {
                            value: 'daohang',
                            label: '导航',
                            children: [
                                {
                                    value: 'cexiangdaohang',
                                    label: '侧向导航'
                                },
                                {
                                    value: 'dingbudaohang',
                                    label: '顶部导航'
                                }
                            ]
                        }
                    ]
                }
            ],

            // 产品明细行列表数据
            productLine: [
                {
                    index: 'MXM001', //序列
                    productName: '机器人', //产品名称
                    specification: 1, //规格
                    unit: '个', //单位
                    idleNum: 20, //闲置数量
                    applicationNum: 3, //申请数量
                    operate: '' //操作
                }
            ],

            // 添加产品的对话框
            addProductVisible: false,
            addProductVisibleInfo: {
                query: ''
            },
            addNewTable: {
                name: '',
                specification: '',
                unit: '',
                idleNum: '',
                applicationNum: '',
                applyNum: ''
            },
            // 产品明细行列表数据
            dialogTableList: []
        };
    },

    created() {
        this.getTransferOrganization();
        this.getAssetOrgMessage(); //查询资产所属组织
        this.getCity();
        // this.getProducts();
    },

    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },

        // ============================
        // 查询调入组织
        getTransferOrganization() {
            transferInOrganization(this.transferInOrganizationMessage).then(res => {
                this.addInfo.orgName = res.data.orgName;
                this.addInfo.orgId = res.data.orgId;
            });
        },

        //查询资产所属组织
        getAssetOrgMessage() {
            assetOrganization(this.assetOrgInfo).then(res => {
                this.assetOrgList = res.data;
                this.addInfo.assetsOrgId = res.assetsOrgId;
            });
        },

        // 获取城市
        getCity() {
            let id = {id:1}
            queryCity(id).then(res=>{
                    this.province=res.data
                let cityNum=[]
                console.log(this.province);
            })
        },

        //获取产品列表
        getProducts() {
            if (this.addInfo.assetsOrgId === '') {
                alert('请输入组织');
            } else {
                productLists(this.products).then(res => {
                    this.addProductVisible = true;
                    this.dialogTableList = res.data;
                    this.addInfo.applyItemList.productId = res.data.id;
                    this.addInfo.applyItemList.productName = res.data.name;
                    // console.log(this.applyItemList);
                });
            }
        },
        //产品列表-确定
        beSure() {
            this.addProductVisible = false;
            this.dialogTableList.push(this.addNewTable);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 删除产品明细
        deleteProdect(id) {
            this.multipleSelection.splice(id, 1);
        },

        // 新增发货申请请求
        addShipment() {
            this.addInfo.province = this.city[0];
            this.addInfo.city = this.city[1];
            this.addInfo.country = this.city[2];

            addShipmentRequisition(this.addInfo).then(res => {
                // console.log(this.addInfo);
                // console.log(res);
            });
        }
    }
};
</script>

<style lang="less" scoped>
.detail_title {
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
h2 {
    font-size: 15px;
    font-weight: 400;
}
.button {
    margin-left: auto;
    font-size: 5px;
}

// 发货单信息的div
.invoice_info_div {
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    border-top: 1px solid rgb(240, 230, 230);
}
// 奇数列
.odd_lie {
    margin-left: 60px;
}
.el-cascader {
    width: 100%;
}

/*产品明细行 */
.productLine {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid rgb(240, 230, 230);
}
.row {
    margin-top: 20px;
}
.productLine .el-button {
    float: right;
}
// 添加产品的对话框
.addProductVisible {
    padding: 10px;
    // border-top: 1px solid rgb(240, 230, 230);
    // border-bottom: 1px solid rgb(240, 230, 230);
    .el-col {
        display: flex;
    }
}
</style>
