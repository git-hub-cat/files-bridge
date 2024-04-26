"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JError = exports.pathVerify = exports.guid = exports.isNumber = exports.notEmptyAry = exports.notEmptyObj = exports.getType = void 0;
const getType = (data) => Object.prototype.toString.call(data).slice(8, -1);
exports.getType = getType;
const notEmptyObj = (obj) => {
    return (0, exports.getType)(obj) === "Object" && Object.keys(obj).length > 0;
};
exports.notEmptyObj = notEmptyObj;
const notEmptyAry = (list) => {
    return (0, exports.getType)(list) === "Array" && list.length > 0;
};
exports.notEmptyAry = notEmptyAry;
const isNumber = (val) => {
    const regPos = /^\d+(\.\d+)?$/;
    const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
    return (regPos.test(val) || regNeg.test(val)) ? true : false;
};
exports.isNumber = isNumber;
const guid = () => {
    return "xxxxy-xxxxy-xxxxy-xxxxy-xxxxy-xxxxy".replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
exports.guid = guid;
const pathVerify = (path) => {
    if (!path.trim())
        throw new JError("path值不能为空");
    if (path.charAt(0) !== "/")
        path = "/" + path;
    return path;
};
exports.pathVerify = pathVerify;
class JError extends Error {
    constructor(err) {
        super(err);
    }
}
exports.JError = JError;
