"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoAuth = exports.Auth = void 0;
const hub_1 = require("../hub");
const Auth = () => {
    return (clazz) => {
        hub_1.hub.addAuthClazz(clazz);
    };
};
exports.Auth = Auth;
const NoAuth = () => {
    return (proto, name, dec) => {
        hub_1.hub.addAuthExclude(proto.constructor, name);
    };
};
exports.NoAuth = NoAuth;
