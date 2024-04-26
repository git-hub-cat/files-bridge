"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutePathException = exports.AuthException = exports.ParamException = exports.SysException = exports.OKStruct = exports.Struct = void 0;
const struct_1 = require("./struct");
exports.Struct = struct_1.default;
class OKStruct extends struct_1.default {
    constructor(data) {
        super({ msg: "", code: 200, data });
    }
}
exports.OKStruct = OKStruct;
class SysException extends struct_1.default {
    constructor(error = { msg: "", code: -1, describe: "" }) {
        if (error instanceof Error) {
            super({ msg: "系统错误", code: 201, describe: error.message });
            return;
        }
        super({ msg: error.msg || "", code: error.code || -1, describe: error.describe || "" });
    }
}
exports.SysException = SysException;
class ParamException extends struct_1.default {
    constructor(error = "", describe) {
        super({ msg: error, code: 301, describe });
    }
}
exports.ParamException = ParamException;
class AuthException extends struct_1.default {
    constructor(error = "") {
        super({ msg: error, code: 401 });
    }
}
exports.AuthException = AuthException;
class RoutePathException extends struct_1.default {
    constructor(error = "") {
        super({ msg: error, code: 404 });
    }
}
exports.RoutePathException = RoutePathException;
