"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataDecrypt = exports.dataEncrypt = void 0;
const CryptoJS = require("crypto-js");
const logger_1 = require("./logger");
const SECRET_KEY = CryptoJS.enc.Utf8.parse("65893547fxtRUXNGPKMpomhy");
const SECRET_IV = CryptoJS.enc.Utf8.parse("WYMFyhxp64139587");
const cfg = {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
};
const dataEncrypt = (text) => {
    try {
        if (typeof text !== "string")
            text = String(text);
        const srcs = CryptoJS.enc.Utf8.parse(text);
        const encrypted = CryptoJS.AES.encrypt(srcs, SECRET_KEY, cfg);
        return encrypted.ciphertext.toString();
    }
    catch (err) {
        logger_1.default.error("数据加密错误: ", err);
        return "";
    }
};
exports.dataEncrypt = dataEncrypt;
const dataDecrypt = (text) => {
    try {
        if (typeof text !== "string")
            text = String(text);
        const hexStr = CryptoJS.enc.Hex.parse(text);
        const srcs = CryptoJS.enc.Base64.stringify(hexStr);
        const decrypt = CryptoJS.AES.decrypt(srcs, SECRET_KEY, cfg);
        const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString().trim();
    }
    catch (err) {
        logger_1.default.error("数据解密错误: ", err);
        return "";
    }
};
exports.dataDecrypt = dataDecrypt;
