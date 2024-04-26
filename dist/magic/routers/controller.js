"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hub_1 = require("../hub");
const tools_1 = require("../tools");
const Controller = (path) => {
    path = (0, tools_1.pathVerify)(path);
    return (clazz) => {
        hub_1.hub.addClazzInfo({ clazz, prefix: path });
    };
};
exports.default = Controller;
