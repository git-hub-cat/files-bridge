"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hub_1 = require("../magic/hub");
const config_1 = require("../modules/trans/config");
const lossStruct = (0, config_1.responFail)('1002');
const routeErr = async (ctx, next) => {
    const { path, method } = ctx.request;
    const unit = (0, hub_1.isRouteExist)(path, method);
    if (unit === 0) {
        ctx.body = lossStruct;
        return;
    }
    if (unit === -1) {
        ctx.body = lossStruct;
        return;
    }
    ctx.unit = unit;
    await next();
};
exports.default = routeErr;
