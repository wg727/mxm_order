/**   
 * api接口统一管理
 */
import { get, post } from './http'

//查询调出组织 
export const apiCheckOrganization = p => post('neworder/other/api/order/getDcSysOrg', p);

//收货人信息 
export const apiConsigneeInformation = p => post('neworder/other/api/order/getGoods', p);

//调出组织产品 
export const apiCallOutOrganizationalProducts = p => post('/neworder/other/api/order/getProductType', p);

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

// =============================================================================
//产品列表
export const productList = p => post('neworder/api/v1/allocate/statistics', p);

// ===============================================================================
//审核调拨单列表
export const approvertransferOrderList = p => post('neworder/api/v1/allocate/list', p);

//审核调出产品组织
export const transferOutProductOrganization = p => post('neworder/other/api/order/getDispatchOrg', p);

//查询组织库存
export const checkOrganizationalInventory = p => post('neworder/api/v1/allocate/getOrgInventory', p);

//审核调拨申请提交
export const apiReviewTransferRequestSubmission = p => post('neworder/api/v1/allocate/audit', p);