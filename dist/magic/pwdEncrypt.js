"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pwdDecrypt = exports.pwdEncrypt = void 0;
const crypto = require("crypto");
const key = "pomhyfxtRUXNGPKM65893547";
const iv = "yhxpWYMF95876413";
const algorithm = "aes192";
const encoding = "hex";
const pwdEncrypt = (text) => {
    try {
        if (typeof text !== "string")
            text = String(text);
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        cipher.update(text);
        return cipher.final(encoding);
    }
    catch (err) {
        return "";
    }
};
exports.pwdEncrypt = pwdEncrypt;
const pwdDecrypt = (text) => {
    try {
        if (typeof text !== "string")
            text = String(text);
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        decipher.update(text, encoding);
        return decipher.final("utf8");
    }
    catch (err) {
        return "";
    }
};
exports.pwdDecrypt = pwdDecrypt;
