"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plainToClass = (clazz, obj) => {
    const { props } = clazz.prototype;
    if (!props)
        throw new Error("实体类缺少props");
    const keys = Object.keys(props);
    const instance = new clazz();
    for (const k of keys) {
        if (obj.hasOwnProperty(k))
            instance[k] = obj[k];
    }
    return instance;
};
exports.default = plainToClass;
