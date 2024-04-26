"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hub_1 = require("../hub");
const exception_1 = require("../exception");
const urlErr = new exception_1.RoutePathException("url错误");
const methodErr = new exception_1.RoutePathException("method错误");
const routeErr = async (ctx, next) => {
    const { path, method } = ctx.request;
    const unit = (0, hub_1.isRouteExist)(path, method);
    if (unit === 0) {
        ctx.body = urlErr;
        return;
    }
    if (unit === -1) {
        ctx.body = methodErr;
        return;
    }
    ctx.unit = unit;
    await next();
};
exports.default = routeErr;
