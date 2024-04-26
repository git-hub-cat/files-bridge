"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONStringify = exports.BareOut = exports.formatResponse = void 0;
const exception_1 = require("../exception");
const hub_1 = require("../hub");
const logger_1 = require("../logger");
const tools_1 = require("../tools");
const oArrTs = ['Array', 'Object'];
const formatResponse = async (ctx, next) => {
    const { success, fail, unit } = ctx;
    const { isBareOut } = unit;
    let target = null;
    if (success !== undefined) {
        target = isBareOut ? success : new exception_1.OKStruct(success);
    }
    else if (fail !== undefined) {
        target = isBareOut ? fail : new exception_1.SysException(fail);
        logger_1.default.error(fail);
    }
    else {
        target = new exception_1.SysException();
        logger_1.default.error(target);
    }
    if (unit.isJSONStringify && oArrTs.includes((0, tools_1.getType)(target))) {
        target = JSON.stringify(target, null, 2);
    }
    ctx.body = target;
    await next();
};
exports.formatResponse = formatResponse;
const BareOut = () => {
    return (proto, name) => {
        hub_1.hub.addBareOut({ clazz: proto.constructor, name });
    };
};
exports.BareOut = BareOut;
const JSONStringify = () => {
    return (proto, name) => {
        hub_1.hub.addJSONStringify({ clazz: proto.constructor, name });
    };
};
exports.JSONStringify = JSONStringify;
