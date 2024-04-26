"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const cache_1 = require("../utils/cache");
const magic_1 = require("../magic");
const isProd = process.env.NODE_ENV === "production";
const { AuthException } = magic_1.exception;
const guidErr = new AuthException("鉴权异常");
const guidKey = "guid", cacheKey = "guidCacheApi";
const uniqueApiVerify = async (ctx, next) => {
    const { unit } = ctx;
    const boo1 = (unit !== 0 && unit !== -1 && unit.isAuth);
    if (boo1 && isProd) {
        const heads = ctx.headers;
        if (!heads.hasOwnProperty(guidKey)) {
            ctx.body = guidErr;
            return;
        }
        const guid = heads[guidKey];
        if (!verifyGuid(guid)) {
            ctx.body = guidErr;
            return;
        }
        const arr = cache_1.default.get(cacheKey) || [];
        if (arr.includes(guid)) {
            ctx.body = guidErr;
            return;
        }
        arr.push(guid);
        cache_1.default.set(cacheKey, arr);
    }
    await next();
};
exports.default = uniqueApiVerify;
function verifyGuid(guid) {
    try {
        if (!guid)
            return false;
        guid = (0, magic_1.dataDecrypt)(guid);
        if (!guid)
            return false;
        const jon = JSON.parse(guid);
        if (!jon.hasOwnProperty("time") || !jon.hasOwnProperty("state"))
            return false;
        const seconds = moment(Date.now()).diff(moment(jon.time), "seconds");
        if (isNaN(seconds))
            return false;
        return Math.abs(seconds) < 5 && jon.state === 1 ? true : false;
    }
    catch (err) {
        return false;
    }
}
!void function () {
    setInterval(() => {
        const arr = cache_1.default.get(cacheKey) || [];
        const unix = Date.now();
        for (let i = arr.length - 1; i >= 0; i--) {
            try {
                const guid = (0, magic_1.dataDecrypt)(arr[i]);
                const jon = JSON.parse(guid);
                const seconds = moment(unix).diff(moment(jon.time), "seconds");
                if (isNaN(seconds) || Math.abs(seconds) > 20)
                    arr.splice(i, 1);
            }
            catch (err) { }
        }
        cache_1.default.set(cacheKey, arr);
    }, 30 * 1000);
}();
