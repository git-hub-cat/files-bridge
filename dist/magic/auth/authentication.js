"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("./jwt");
const hub_1 = require("../hub");
const exception_1 = require("../exception");
const authErr = new exception_1.AuthException("鉴权错误");
const urlErr = new exception_1.RoutePathException("url错误");
const methodErr = new exception_1.RoutePathException("method错误");
const tokenKey = "token";
const authentication = async (ctx, next) => {
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
    if (unit.isAuth) {
        const token = ctx.headers[tokenKey];
        if (!token) {
            ctx.body = authErr;
            return;
        }
        const data = (0, jwt_1.verifyToken)(token);
        if (!data) {
            ctx.body = authErr;
            return;
        }
        ctx.user = data;
    }
    ctx.unit = unit;
    await next();
};
exports.default = authentication;
