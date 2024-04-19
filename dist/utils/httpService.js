"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseCap = exports.axiosService = void 0;
const axios_1 = require("axios");
const magic_1 = require("../magic");
const instance = axios_1.default.create({
    baseURL: "",
    timeout: 8000,
    headers: { "Content-Type": "application/json; charset=utf-8" }
});
instance.interceptors.request.use(config => {
    if (config.isForm) {
        config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    return config;
}, error => {
    console.error("请求失败>>>", error);
    return Promise.reject();
});
instance.interceptors.response.use(response => {
    return response.data;
}, error => {
    magic_1.logger.error("响应失败>>>", error.message);
    let res = error.response || null;
    res ? res = res.data : null;
    return Promise.reject(res);
});
const promiseCap = (promise) => {
    return new Promise((resolve, reject) => {
        promise
            .then(result => resolve(result))
            .catch(err => {
            err ? resolve(err) : reject();
        });
    });
};
exports.promiseCap = promiseCap;
const httpService = (config) => {
    return new Promise((resolve, reject) => {
        instance(config)
            .then(result => resolve(result))
            .catch(err => {
            err ? resolve(err) : reject();
        });
    });
};
const axiosService = instance;
exports.axiosService = axiosService;
exports.default = httpService;
