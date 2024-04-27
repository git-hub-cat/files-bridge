"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const router_1 = require("./router");
const exception_1 = require("../exception");
const tools_1 = require("../tools");
const hub_1 = require("../hub");
const startRouter = (app, controllers) => {
    if (!app || !(app instanceof Koa))
        throw new tools_1.JError("缺少kao对象");
    (0, hub_1.initHub)();
    for (const item of hub_1.layerList) {
        const { clazz, list } = item;
        if (!controllers.includes(clazz)) {
            throw new tools_1.JError("缺少" + clazz.name + "类");
        }
        const instance = new clazz();
        for (const rou of list) {
            packingRou(rou, instance);
        }
    }
    try {
        app.use(router_1.default.routes());
        app.use(router_1.default.allowedMethods());
    }
    catch (err) {
        console.error("路由启动失败:::", err);
    }
};
const packingRou = (rou, instance) => {
    const { action, path, method, parameter = [] } = rou;
    if (!path || !method)
        return;
    router_1.default[method](path, async (ctx, next) => {
        const { unit, query, params, user = {} } = ctx;
        const { body, files = {} } = ctx.request;
        const ctxParams = { query, body, params };
        try {
            (0, tools_1.notEmptyObj)(params) && checkParams(params, unit);
            const ary = packingParams(parameter, query, body, params, user, files, ctxParams);
            let result = await action.call(instance, ...ary);
            if (result === undefined)
                result = {};
            ctx.success = result;
        }
        catch (err) {
            ctx.fail = err;
        }
        await next();
    });
};
const checkParams = (params, unit) => {
    if (unit === 0 || unit === -1)
        return;
    const { parameter = [] } = unit;
    for (const item of parameter) {
        const { dataType, key = "" } = item;
        if (dataType !== "Params")
            continue;
        if (!key || !(key in params)) {
            throw new exception_1.ParamException("缺少参数" + key);
        }
        const value = params[key];
        if (dataType === String && typeof value !== "string") {
            params[key] = String(value);
            continue;
        }
        if (dataType === Number) {
            if (!(0, tools_1.isNumber)(value)) {
                throw new exception_1.ParamException("参数" + key + "需要为数值类型");
            }
            params[key] = Number(value);
        }
    }
};
const packingParams = (parameter, query, body, params, user, files, ctxParams) => {
    const ary = [];
    for (const item of parameter) {
        const { loc, dataType, key } = item;
        if (hub_1.paramsLoc.includes(loc)) {
            let pixie = loc === "Query" ? query : (loc === "Body" ? body : params);
            !pixie && (pixie = {});
            if (dataType.prototype.dtoClazz) {
                ary.push(pixie);
                continue;
            }
            if (!key)
                continue;
            const value = pixie[key];
            ary.push(value);
            continue;
        }
        if (loc === "UserInfo") {
            ary.push(user);
            continue;
        }
        if (loc === "Files") {
            if ((0, tools_1.getType)(files) !== "Object")
                files = {};
            ary.push(files[key]);
            continue;
        }
        if (loc === "CtxParams") {
            ary.push(ctxParams);
            continue;
        }
    }
    return ary;
};
exports.default = startRouter;
