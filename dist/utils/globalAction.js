"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dealFile = exports.numPlus = exports.numMinus = exports.equalObj = exports.base64ToStr = exports.strToBase64 = exports.waitFor = exports.notEmptyAry = exports.notEmptyObj = exports.guid = exports.isNumber = exports.deepClone = exports.getType = exports.isDev = void 0;
const fs = require("fs");
const path = require("path");
const bignumber_js_1 = require("bignumber.js");
exports.isDev = process.env.NODE_ENV === "development";
const getType = (data) => Object.prototype.toString.call(data).slice(8, -1);
exports.getType = getType;
const deepClone = (target) => {
    if (typeof target !== "object")
        return target;
    let result;
    if (Array.isArray(target)) {
        result = [];
        for (const i in target) {
            result.push((0, exports.deepClone)(target[i]));
        }
    }
    else if (target === null) {
        result = null;
    }
    else if (target.constructor === RegExp) {
        result = target;
    }
    else {
        result = {};
        for (const i in target) {
            result[i] = (0, exports.deepClone)(target[i]);
        }
    }
    return result;
};
exports.deepClone = deepClone;
const isNumber = (val) => {
    const regPos = /^\d+(\.\d+)?$/;
    const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
    return (regPos.test(val) || regNeg.test(val)) ? true : false;
};
exports.isNumber = isNumber;
const guid = () => {
    return "xxxxyxxxxy-xxxxyxxxxy-xxxxyxxxxy".replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
exports.guid = guid;
const notEmptyObj = (data) => {
    return (0, exports.getType)(data) === "Object" && Object.keys(data).length > 0;
};
exports.notEmptyObj = notEmptyObj;
const notEmptyAry = (data) => {
    return (0, exports.getType)(data) === "Array" && data.length > 0;
};
exports.notEmptyAry = notEmptyAry;
const waitFor = (time = 0) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};
exports.waitFor = waitFor;
const strToBase64 = (str) => {
    return Buffer.from(str).toString("base64");
};
exports.strToBase64 = strToBase64;
const base64ToStr = (b64) => {
    return Buffer.from(b64, "base64").toString();
};
exports.base64ToStr = base64ToStr;
const equalObj = (obj1, obj2) => {
    let boo = true;
    for (const k in obj1) {
        if (obj2.hasOwnProperty(k) && obj1[k] !== obj2[k]) {
            boo = false;
            break;
        }
    }
    return boo;
};
exports.equalObj = equalObj;
const numMinus = (num1, num2) => {
    if (!num1)
        num1 = 0;
    if (!num2)
        num2 = 0;
    const str = (0, bignumber_js_1.default)(num1).minus(num2).toFixed(4);
    return Number(str);
};
exports.numMinus = numMinus;
const numPlus = (num1, num2) => {
    if (!num1)
        num1 = 0;
    if (!num2)
        num2 = 0;
    const str = (0, bignumber_js_1.default)(num1).plus(num2).toFixed(4);
    return Number(str);
};
exports.numPlus = numPlus;
const dealFile = (files) => {
    const execute = (file) => {
        const prefix = path.extname(file.originalFilename);
        const reader = fs.createReadStream(file.filepath);
        let name = file.newFilename + Date.now();
        name = name + prefix;
        const filePath = path.join(__dirname, "../../static/uploads/") + name;
        const upStream = fs.createWriteStream(filePath);
        reader.pipe(upStream);
        return name;
    };
    const type = (0, exports.getType)(files);
    if (type === "Object") {
        return execute(files);
    }
    if (type === "Array") {
        return files.map(file => execute(file)).toString();
    }
    return "";
};
exports.dealFile = dealFile;
