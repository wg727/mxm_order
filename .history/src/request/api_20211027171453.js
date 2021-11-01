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
//新增发货申请
export const addShipmentRequisition = p => post('neworder/api/v1/allocate/commitAllocateApply', p);

// =============================================================================
//产品列表
export const productList = p => post('neworder/api/v1/allocate/statistics', p);


