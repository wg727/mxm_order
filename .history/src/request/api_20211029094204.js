/**   
 * api接口统一管理
 */
import { get, post } from './http'

//查询调出组织 
export const apiCheckOrganization = p => post('neworder/other/api/order/getDcSysOrg', p);

//收货人信息 
export const apiConsigneeInformation = p => post('neworder/other/api/order/getGoods', p);

//调出组织产品 
export const apiCallOutOrganizationalProducts = p => post('neworder/other/api/order/getGoods', p);

//
//调拨申请列表-分页
export const apiTransferApplicationlist = p => post('neworder/api/v1/allocate/list', p);

//新增发货申请
export const addShipmentRequisition = p => post('neworder/api/v1/allocate/commitAllocateApply', p);
// 查询调入组织
export const queryTransferOrganization = () => get('neworder/api/v1/allocate/getOrg');
// 查询省市区
export const queryCity = () => get('neworder/api/v1/allocate/listByParentId');
// 添加产品列表
export const productLists = p => post('neworder/other/api/order/getProductType',p);
// 调拨申请详情页
export const transferApplicationDetails = p => post('neworder/api/v1/allocate/detail',p);
// 调拨申请详批量导出
export const listExport = ()=> get('neworder/api/v1/allocate/listExport');

// TransferDetail-取消调拨申请
export const cancelTransferRequisition = p => post('neworder/api/v1/allocate/cancel',p);
// TransferDetail-调拨单详情的发货记录
export const detailDeliveryRecord = p => post('neworder/api/v1/allocate/queryDeliveryItemList',p);
// TransferDetail-查询发货撤回记录列表
export const shipmentWithdrawalRecordlist = p => post('neworder/api/v1/allocate/queryRecallDeliveryItemList',p);
// TransferDetail-调拨单详情--操作记录
export const operationRecord = p => post('neworder/api/v1/allocate/getOperateLogWithLocation',p);
// TransferDetail-调拨单详情--流程图
export const flow chart = p => post('neworder/api/v1/allocate/operationLog',p);

// =============================================================================
//产品列表
export const productList = p => post('neworder/api/v1/allocate/statistics',p);


// ===============================================================================
//审核--调拨单列表
export const approvertransferOrderList = p => post('neworder/api/v1/allocate/list', p);
