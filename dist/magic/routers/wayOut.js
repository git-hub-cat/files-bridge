"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponse = void 0;
const exception_1 = require("../exception");
const logger_1 = require("../logger");
const formatResponse = async (ctx, next) => {
    const { success, fail } = ctx;
    let target;
    if (success !== undefined) {
        target = new exception_1.OKStruct(success);
    }
    else if (fail !== undefined) {
        target = new exception_1.SysException(fail);
        logger_1.default.error(fail);
    }
    else {
        target = new exception_1.SysException();
        logger_1.default.error(target);
    }
    ctx.body = target;
    await next();
};
exports.formatResponse = formatResponse;
