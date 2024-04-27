"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CtxParams = exports.Files = exports.UserInfo = exports.Params = exports.Body = exports.Query = void 0;
require("reflect-metadata");
const hub_1 = require("./hub");
const tools_1 = require("./tools");
const getParaTypes = (proto, name) => Reflect.getMetadata("design:paramtypes", proto, name);
const Query = (key) => {
    if (key && !key.trim()) {
        throw new tools_1.JError("Query方法参数key不能为空===" + key);
    }
    return (proto, name, idx) => {
        const types = getParaTypes(proto, name);
        hub_1.hub.addPoadInfo({ clazz: proto.constructor, name, idx, loc: "Query", dataType: types[idx], key });
    };
};
exports.Query = Query;
const Body = (key) => {
    if (key && !key.trim()) {
        throw new tools_1.JError("Body方法参数key不能为空===" + key);
    }
    return (proto, name, idx) => {
        const types = getParaTypes(proto, name);
        hub_1.hub.addPoadInfo({ clazz: proto.constructor, name, idx, loc: "Body", dataType: types[idx], key });
    };
};
exports.Body = Body;
const Params = (key) => {
    if (key && !key.trim()) {
        throw new tools_1.JError("Params方法参数key不能为空===" + key);
    }
    return (proto, name, idx) => {
        const types = getParaTypes(proto, name);
        hub_1.hub.addPoadInfo({ clazz: proto.constructor, name, idx, loc: "Params", dataType: types[idx], key });
    };
};
exports.Params = Params;
const UserInfo = () => {
    return (proto, name, idx) => {
        const types = getParaTypes(proto, name);
        hub_1.hub.addPoadInfo({ clazz: proto.constructor, name, idx, loc: "UserInfo", dataType: types[idx] });
    };
};
exports.UserInfo = UserInfo;
const Files = (key) => {
    return (proto, name, idx) => {
        const types = getParaTypes(proto, name);
        hub_1.hub.addPoadInfo({ clazz: proto.constructor, name, idx, loc: "Files", dataType: types[idx], key });
    };
};
exports.Files = Files;
const CtxParams = () => {
    return (proto, name, idx) => {
        const types = getParaTypes(proto, name);
        hub_1.hub.addPoadInfo({ clazz: proto.constructor, name, idx, loc: "CtxParams", dataType: types[idx] });
    };
};
exports.CtxParams = CtxParams;
