"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const key = "iupqxyrmaTHPEzpaoOXGALE";
const expir = 60 * 60 * 48;
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
exports.verifyToken = verifyToken;
