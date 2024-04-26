"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = exports.Entity = void 0;
const tools_1 = require("./tools");
const Entity = (tableName, sequelize) => {
    if (!tableName)
        throw new tools_1.JError("Entity映射的表名不可为空");
    if (!sequelize)
        throw new tools_1.JError("sequelize实例缺失");
    return (clazz) => {
        clazz.init(clazz.prototype.props, {
            sequelize,
            tableName,
            timestamps: false,
        });
    };
};
exports.Entity = Entity;
const Column = (option = {}) => {
    return (proto, key) => {
        const props = proto.props;
        if (props && Object.keys(props).length > 0) {
            props[key] = option;
        }
        else {
            const obj = {};
            obj[key] = option;
            proto.props = obj;
        }
    };
};
exports.Column = Column;
