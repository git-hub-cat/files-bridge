"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Del = exports.Put = exports.Post = exports.Get = void 0;
const hub_1 = require("../hub");
const tools_1 = require("../tools");
const request = (path, method) => {
    path = (0, tools_1.pathVerify)(path);
    return (proto, name, dec) => {
        const action = dec.value;
        hub_1.hub.addMethodInfo({ clazz: proto.constructor, name, action, path, method });
    };
};
const Get = (path) => request(path, "get");
exports.Get = Get;
const Post = (path) => request(path, "post");
exports.Post = Post;
const Put = (path) => request(path, "put");
exports.Put = Put;
const Del = (path) => request(path, "delete");
exports.Del = Del;
