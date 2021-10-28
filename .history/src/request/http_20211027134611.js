import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据
import { Message } from 'element-ui';

// 环境的切换
if (process.env.NODE_ENV == 'development') {    
    axios.defaults.baseURL = 'http://10.0.4.84:8089/';} 
else if (process.env.NODE_ENV == 'debug') {    
    axios.defaults.baseURL = 'http://10.0.4.84:8089/';
} 
else if (process.env.NODE_ENV == 'production') {    
    axios.defaults.baseURL = 'http://10.0.4.84:8089/';
}

axios.defaults.timeout = 10000; //超时时间

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;corTicket=1_1635312848609'; //post请求头设置

//响应拦截器
axios.interceptors.response.use(    
    response => {   
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        if (response.status === 200) {            
            return Promise.resolve(response);        
        } else {            
            return Promise.reject(response);        
        }    
    },    
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {            
        if (error.response.status) {            
            switch (error.response.status) {                 

                // 404请求不存在
                case 404:
                    Message({
                        message: '网络请求不存在',
                        duration: 1500,
                        type: error
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Message({
                        message: error.response.data.message,
                        duration: 1500,
                        type: error
                    });
            }
            return Promise.reject(error.response);
        }
    }    
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
    })    
});}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */

export function post(url, params) {
    return new Promise((resolve, reject) => {
         axios.post(url, QS.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}

export default {get, post}