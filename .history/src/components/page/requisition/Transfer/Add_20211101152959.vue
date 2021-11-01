<template>
    <div>
        <div class="transheader">
            <span class="detail_title">新增调拨单-发货申请</span>
            <div class="button">
                <el-button size="small" plain @click="$router.push('/transfer')"> 取消 </el-button>
                <el-button size="small" type="danger" @click="addShipment('addInfo')"> 提交 </el-button>
            </div>
        </div>

        <el-card id="aaa">
            <span>发货单信息</span>

            <div class="invoice_info_div">
                <el-form :model="addInfo" :rules="addRules" ref="addInfo">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="调入组织：">
                                <el-input placeholder="云镖网络科技有限公司" v-model="addInfo.orgName" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" class="odd_lie">
                            <el-form-item label="资产所属组织：" prop="assetsOrgRule">
                                <el-select v-model="addInfo.assetsOrgId" placeholder="请选择资产所属组织" style="width: 100%" clearable>
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
                            <el-form-item label="收货人：" prop="receiver">
                                <el-input v-model="addInfo.receiver" placeholder="请选择收货人"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" class="odd_lie">
                            <el-form-item label="收货电话：" prop="mobile">
                                <el-input v-model="addInfo.mobile" placeholder="请输入收货电话"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="省市区：" prop="city"
                                ><br />
                                <el-cascader v-model="citys" :props="optionProp" ref="elCascader" clearable></el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" class="odd_lie">
                            <el-form-item label="详细地址：" prop="receiverAddress">
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
                                    <el-option label="客户现场" value="1"></el-option>
                                    <el-option label="公司仓库" value="2"></el-option>
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
                <div class="row">
                    <el-form :model="addInfo">
                        <el-table :data="addInfo.applyItemList" border style="width: 100%">
                            <el-table-column type="index" label="序列"></el-table-column>
                            <el-table-column prop="productName" label="产品名称" align="center">
                                <template slot-scope="scope">
                                    <!-- <el-form-item :prop="'applyItemList[' + scope.$index + '].productName'"> -->
                                    <el-form-item :prop="'applyItemList[' + scope.$index + '].name'">
                                        <span>{{ scope.row.productName }}</span>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column prop="specUnionKey" label="规格" align="center">
                                <template slot-scope="scope">
                                    <el-form-item :prop="'applyItemList[' + scope.$index + '].specUnionKey'">
                                        {{ scope.row.specUnionKey }}
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column prop="unitText" label="单位" align="center">
                                <template slot-scope="scope">
                                    <el-form-item :prop="'applyItemList[' + scope.$index + '].unitText'">
                                        {{ scope.row.unitText }}
                                    </el-form-item>
                                </template>
                            </el-table-column> -->
                            <el-table-column prop="idleQuantity" label="闲置数量" align="center">
                                <template slot-scope="scope">
                                    <el-form-item :prop="'applyItemList[' + scope.$index + '].idleQuantity'">
                                        {{ scope.row.idleQuantity }}
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column label="申请数量" align="center">
                                <template slot-scope="scope">
                                    <el-form-item :prop="'applyItemList[' + scope.$index + '].applyNum'">
                                        <el-input
                                            type="number"
                                            v-model="addInfo.applyItemList[scope.$index].applyNum"
                                            placeholder="请输入数量"
                                        ></el-input>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="80">
                                <template v-slot="scope">
                                    <el-button @click="deleteProdect(scope.$index)">刪除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form>
                </div>
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
                            @clear="getProducts()"
                            clearable
                            v-model="inputproductName"
                            class="search_input"
                        ></el-input>
                        <el-button icon="el-icon-search" @click="getProducts()" class="search_button"></el-button>
                    </el-col>
                </el-row>

                <!-- table区域 -->
                <el-row class="row">
                    <el-table
                        :data="productList"
                        border
                        style="width: 100%"
                        header-cell-class-name="table-header"
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column type="selection" width="55" align="center"></el-table-column>
                        <el-table-column prop="name" label="产品名称"></el-table-column>
                        <el-table-column prop="specUnionKey" label="规格"></el-table-column>
                        <el-table-column prop="unitText" label="单位"></el-table-column>
                    </el-table>
                </el-row>
                <!-- 分页 -->
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="p"
                    @size-change="handleSizeChange"
                    :page-size="s"
                    :page-sizes="[5, 10, 20, 50]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                >
                </el-pagination>
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
    assetOrganization,
    newProductList,//根据资产所属组织查询产品列表
} from '@/request/api.js';

export default {
    name: 'Add',
    components: { InvoiceInfo },
    data() {
        // 验证手机的规则
        var checkMobeli = (rule, value, callback) => {
            const regMobile = /^1[34578]\d{9}$/;
            if (regMobile.test(value)) {
                return callback();
            }
            // 返回一个错误提示
            callback(new Error('请输入合法的手机号码'));
        };
        return {
            //查询调入组织信息
            transferInOrganizationMessage: { captcha: '111111', loginName: 'admin', password: '12345678', source: 'web_1635473594550' },
            // 新增调拨单提交信息
            addInfo: {
                inOrgId: null, //调入组织id
                orgName: '', //调入组织
                assetsOrgId: '', //资产所属组织
                receiver: '', //收货人
                mobile: '', //收货电话
                receiverAddress: '', //详细地址
                expectDeliveryDate: '', //期望发货日期
                receiptScenario: '', //收货场景
                remark: '', //备注,
                province: '', //省
                city: '', //市
                country: '', //区
                areaStr: '', //省市区
                applyType: 1, //申请类型 0-手工新增 1-实施任务书 2-回收申请(默认为1)
                allocateType: '', //领料单类型
                
            },
            ItemList: [
                {id:1,name:"aaaaa"}
            ],

            addRules: {
                assetsOrgRule: [{ required: true, message: '请选择资产所属组织', trigger: 'blur' }],
                receiver: [{ required: true, message: '请输入活收货人', trigger: 'blur' }],
                mobile: [
                    { required: true, message: '请输入收货电话', trigger: 'blur' },
                    { validator: checkMobeli, trigger: 'blur' }
                ],
                city: [{ required: true, message: '请选择省市区：', trigger: 'blur' }],
                receiverAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
            },

            //资产所属组织
            assetOrgInfo: {
                name: ''
            },
            //资产所属组织列表数据展示
            assetOrgList: [],

            //产品列表请求数据
            p: 1,
            s: 10,
            inputproductName: '',
            total: 0,

            //添加产品的 列表展示数据
            productList: [],
            //产品明细行列表数据
            multipleSelection: [],

            // 城市下拉选择数据
            citys: [],

            // 添加产品的对话框
            addProductVisible: false,
            addProductVisibleInfo: {
                query: ''
            },
            addNewTable: {
                productId: '', //产品id
                productName: '', //产品名称
                applyNum: 1, //申请数量
                productSpecId: '', //产品规格id
                specUnionKey: '', //产品规格
                // auditNum: 'this.addInfo.applyItemList.applyNum', //审批数量(与申请数量值相同即可)
                auditNum: '', //审批数量(与申请数量值相同即可)
                unitText: '', //单位
                bathEnable: '0', //是否启用批次管理（0否1是）
                serialNumberEnable: '0' //是否启用序列号管理（0否1是）
            },
            // 产品明细行列表数据
            dialogTableList: [],

            // 省市区
            testOption: [],
            // 当前层级
            nowLevel: 0,
            optionProp: {
                lazy: true,
                lazyLoad(node, resolve) {
                    const id = node.level ? node.data.value.regionId : 1;
                    const { level } = node;
                    let nodes = [];
                    queryCity({ id }).then(res => {
                        nodes = res.data.map(item => ({
                            value: { ...item },
                            label: item.regionName,
                            leaf: level >= 2
                        }));
                    });
                    setTimeout(() => {
                        resolve(nodes);
                    }, 100);
                }
            }
        };
    },
    created() {
        this.getTransferOrganization(); // 查询调入组织
        this.getAssetOrgMessage(); //查询资产所属组织
        this.getCity(); // 省市区
    },

    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },

        // 查询调入组织
        getTransferOrganization() {
            transferInOrganization(this.transferInOrganizationMessage).then(res => {
                this.addInfo.orgName = res.data.orgName;
                this.addInfo.inOrgId = res.data.orgId;
            });
        },

        //查询资产所属组织
        getAssetOrgMessage() {
            assetOrganization(this.assetOrgInfo).then(res => {
                console.log(res);
                this.assetOrgList = res.data;
                this.addInfo.assetsOrgId = res.assetsOrgId;
            });
        },

        // 获取城市
        getCity() {
            let id = { id: 1 };
            queryCity(id).then(res => {
                this.province = res.data;
                let cityNum = [];
                this.province.forEach((item, index) => {
                    this.nowLevel = item.parentRegionId;
                    cityNum.push({ value: { ...item, index }, label: item.regionName });
                });
                this.testOption = cityNum;
            });
        },

        //获取产品列表
        getProducts() {
            if (this.addInfo.assetsOrgId === undefined) {
                alert('请输入资产所属组织');
            } else {
                const requertProList = {
                    p: this.p,
                    s: this.s,
                    productName: this.inputproductName,
                    assetsOrgId: this.addInfo.assetsOrgId
                };
                // productLists(requertProList).then(res => {
                //     this.addProductVisible = true;
                //     this.productList = res.data.list;
                //     this.total = res.data.total;
                // });
                newProductList({orgId:this.addInfo.assetsOrgId}).then(res=>{
                    console.log(res);   
                    this.addProductVisible = true;   
                    this.productList = res.data;  
                    })
            }
        },
        //添加产品分页
        handleCurrentChange(newP) {
            this.p = newP;
            this.getProducts();
        },
        handleSizeChange(newS) {
            this.s = newS;
            this.getProducts();
        },
        //产品列表-确定
        beSure() {
            this.addProductVisible = false;
        },

        //TODO:
        handleSelectionChange(val) {
            console.log(val);
            this.ItemList = val;
            
            
            console.log(this.ItemList);
        },
        // 删除产品明细
        deleteProdect(id) {
            this.addInfo.applyItemList.splice(id, 1);
        },

        // TODO:提交
        addShipment(formName) {
            this.addInfo.province = this.citys[0].regionId;
            this.addInfo.city = this.citys[1].regionId;
            this.addInfo.country = this.citys[2].regionId;
            this.addInfo.areaStr = this.citys[0].regionName + '-' + this.citys[1].regionName + '-' + this.citys[2].regionName;

            this.addInfo.applyItemList.forEach((item, index) => {
                let outOrg = this.addInfo.assetsOrgId;
                let auditNums = this.addInfo.applyItemList[index].applyNum;
                (item.outOrgId = outOrg), (item.auditNum = auditNums);
            });

            console.log(this.addInfo);

            let applyItemList = []
            this.ItemList.map(i=>{
                for(let key in i){
                    if(key == 'name'){
                        key 
                    }
                }
                item.productName=item.name
                item.productId=item.id
                item.outOrgId=item.orgId
            })
            console.log(this.ItemList);


            addShipmentRequisition(this.addInfo).then(res => {
                console.log(res);
                if (res.code === 200) {
                    this.$message.success('添加发货申请成功!');
                }
                this.$refs[formName].resetFields();
                this.addInfo.assetsOrgId = '';
                this.citys = [];
                this.addInfo.applyItemList=[];
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
