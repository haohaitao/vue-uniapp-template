/*
 * @Description  : 网络请求基础配置
 * @Author       : pacino
 * @Date         : 2021-09-22 17:38:45
 * @LastEditTime : 2021-09-23 14:46:44
 * @LastEditors  : pacino
 */
import Request from 'luch-request';

const pro = false; //是否为生产环境

const proUrl = 'https://www.prod.com/api';
const testUrl = 'https://www.test.cn/api';
const apiURL = pro ? proUrl : testUrl;
const http = new Request();
http.setConfig(config => {
    config.baseURL = apiURL;
    config.dataType = 'json';
    return config;
});

http.interceptors.request.use(
    config => {
        config.header['Authorization'] = 'Bearer ' + uni.getStorageSync('token');
        const { showLoading } = config.custom;
        showLoading && uni.showLoading({ title: '正在加载中~', mask: true });
        return config;
    },
    config => {
        return Promise.reject(config);
    }
);

http.interceptors.response.use(
    response => {
        uni.hideLoading();
        if (response.data.code === 200) {
            return response.data;
        } else if (response.data.code === 400) {
            uni.showModal({
                title: '提示',
                showCancel: false,
                content: response.data?.msg
            });
        }
        return Promise.reject(response);
    },
    response => {
        if (response.statusCode === 401) {
            uni.removeStorageSync('token');
            uni.showModal({
                title: '提示',
                content: '没有权限，请先登录'
            });
        } else {
            uni.showToast({
                title: response.data?.msg || '服务器好像出了点问题~',
                icon: 'none',
                duration: 1500
            });
        }
        uni.hideLoading();
        uni.getNetworkType({
            success: function(res) {
                if (res.networkType === 'none') {
                    uni.showModal({
                        title: '提示',
                        content: '您当前的网络不可用，请检查您的网络设置~~',
                        showCancel: false
                    });
                }
            }
        });
        return Promise.reject(response);
    }
);

/**
 * @Description GET请求
 * @param url 请求地址
 * @param params 请求参数  默认 {}
 * @param showLoading 是否显示全局Loading动画
 */
export const get = (url, params = {}) => {
    const { showLoading = true } = params;
    return http.get(url, { params, custom: { showLoading } });
};

/**
 * @Description POST请求
 * @param url 请求地址
 * @param data 请求参数 默认 {}
 * @param showLoading 是否显示全局Loading动画
 */
export const post = (url, params = {}) => {
    const { showLoading = true } = params;
    return http.post(url, params, { custom: { showLoading } });
};

export { apiURL as baseURL };
