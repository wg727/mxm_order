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

