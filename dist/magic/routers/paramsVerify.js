"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../tools");
const exception_1 = require("../exception");
const paramsVerify = async (ctx, next) => {
    const { query, unit } = ctx;
    const { body } = ctx.request;
    if (unit !== 0 && unit !== -1) {
        try {
            const { parameter } = unit;
            parameter && checkParams(parameter, query, body);
        }
        catch (err) {
            ctx.body = err instanceof exception_1.Struct ? err : new exception_1.ParamException(err);
            return;
        }
    }
    await next();
};
const checkParams = (parameter, query, body) => {
    for (const item of parameter) {
        const { loc, dataType, key = "" } = item;
        if (!(loc === "Body" || loc === "Query"))
            continue;
        let pixie = loc === "Query" ? query : body;
        if (!pixie || (0, tools_1.getType)(pixie) !== "Object")
            pixie = {};
        if (dataType.prototype.dtoClazz) {
            const verify = dataType.prototype.verify;
            if (!verify)
                continue;
            verify(pixie);
            continue;
        }
        if (!key || !(key in pixie)) {
            throw new exception_1.ParamException("缺少参数" + key);
        }
        const val = pixie[key];
        if (dataType === String && typeof val !== "string") {
            pixie[key] = String(val);
            continue;
        }
        if (dataType === Number) {
            if (!(0, tools_1.isNumber)(val))
                throw new exception_1.ParamException("参数" + key + "需要为数值类型");
            pixie[key] = Number(val);
            continue;
        }
        if (dataType === Boolean) {
            pixie[key] = Boolean(val);
            continue;
        }
        if (dataType === Array) {
            if (!Array.isArray(val))
                throw new exception_1.ParamException("参数" + key + "需要为数组类型");
            continue;
        }
        if (dataType === Object) {
            if ((0, tools_1.getType)(val) !== "Object")
                throw new exception_1.ParamException("参数" + key + "需要为对象类型");
            continue;
        }
    }
};
exports.default = paramsVerify;
