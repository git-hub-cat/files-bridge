"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const hub_1 = require("../magic/hub");
const magic_1 = require("../magic");
const { AuthException } = magic_1.exception;
const authErr = new AuthException("鉴权错误");
const key = "iuyrxmTYPEOXGALFpaoyrma";
const expir = 60 * 60 * 24 * 365 * 80;
const tokenKey = "wtoken";
const createToken = (data) => {
    return (0, jsonwebtoken_1.sign)(data, key, { expiresIn: expir });
};
exports.createToken = createToken;
const verifyToken = (token = "") => {
    try {
        return (0, jsonwebtoken_1.verify)(token, key);
    }
    catch (err) {
        return null;
    }
};
const jwtAuthMiddle = async (ctx, next) => {
    const { path, method } = ctx.request;
    const unit = (0, hub_1.isRouteExist)(path, method);
    if (unit !== 0 && unit !== -1 && unit.isAuth) {
        const token = ctx.headers[tokenKey];
        if (!token) {
            ctx.body = authErr;
            return;
        }
        const data = verifyToken(token);
        if (!data) {
            ctx.body = authErr;
            return;
        }
        ctx.user = data;
    }
    await next();
};
exports.default = jwtAuthMiddle;
