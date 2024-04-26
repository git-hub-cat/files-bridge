"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const exception_1 = require("../exception");
const tools_1 = require("../tools");
const nones = ["", null, undefined, "undefined"];
const VerifyTool = () => {
    return (clazz) => {
        clazz.prototype.dtoClazz = true;
        clazz.prototype.verify = (data = {}) => {
            if ((0, tools_1.getType)(data) !== "Object") {
                throw new exception_1.ParamException("数据类型错误");
            }
            const rules = clazz.prototype.rules;
            if (!(0, tools_1.notEmptyObj)(rules))
                return;
            for (const key in rules) {
                const ary = rules[key];
                for (const sub of ary) {
                    if (sub.action)
                        sub.action(data, key);
                    const val = data[key];
                    if (sub.verdict(val))
                        throw new exception_1.ParamException(sub.msg);
                }
            }
        };
    };
};
const assembleRule = (jon) => {
    return (proto, key) => {
        const { verdict, msg, action, type } = jon;
        if (type) {
            const clazz = Reflect.getMetadata("design:type", proto, key);
            if (!clazz || clazz.name !== type) {
                console.error("key=" + key + ",", type, ",", clazz.name);
                throw new Error("DTO中装饰器的类型与设定的类型不一致,如果不给设定类型,默认为Object");
            }
        }
        if ((0, tools_1.getType)(verdict) !== "Function")
            throw Error("verdict的类型需要为方法");
        const rule = { msg, verdict };
        if (action && (0, tools_1.getType)(action) === "Function")
            rule.action = action;
        if (!proto.rules)
            proto.rules = {};
        const ary = proto.rules[key];
        if (Array.isArray(ary)) {
            ary.push(rule);
        }
        else {
            proto.rules[key] = [rule];
        }
    };
};
const IsNotEmpty = (msg = "不能为空") => {
    const verdict = (val) => nones.includes(val);
    return assembleRule({ verdict, msg });
};
const DefaultVal = (val) => {
    if (val === undefined)
        throw Error("默认值不能为空");
    const action = (data, key) => {
        if (nones.includes(data[key]))
            data[key] = val;
    };
    return assembleRule({ verdict: () => false, msg: "", action });
};
const Max = (max, msg = "数据超出最大值限制") => {
    const verdict = (val) => val > max;
    return assembleRule({ verdict, msg });
};
const Min = (min, msg = "数据超出限制") => {
    const verdict = (val) => val < min;
    return assembleRule({ verdict, msg });
};
const MunSize = (min, max, msg = "数据超出最小/大值限制") => {
    const verdict = (val) => val < min || val > max;
    return assembleRule({ verdict, msg });
};
const IsString = (msg = "需要为字符串") => {
    const verdict = (val) => (0, tools_1.getType)(val) !== "String";
    return assembleRule({ verdict, msg, type: "String" });
};
const IsNumber = (msg = "需要为数值") => {
    const verdict = (val) => (0, tools_1.getType)(val) !== "Number";
    const action = (data, key) => {
        const num = data[key];
        if (!nones.includes(num) && (0, tools_1.isNumber)(num)) {
            data[key] = Number(num);
        }
    };
    return assembleRule({ verdict, msg, action, type: "Number" });
};
const MultipleType = (types, msg = "数据类型错误") => {
    if (!Array.isArray(types))
        throw Error("types需要为数组");
    const verdict = (val) => !types.includes((0, tools_1.getType)(val));
    return assembleRule({ verdict, msg });
};
const NotEmptyObj = (msg = "需要为对象且不能为空") => {
    const verdict = (val) => (0, tools_1.getType)(val) !== "Object" || Object.keys(val).length === 0;
    return assembleRule({ verdict, msg, type: "Object" });
};
const NotEmptyAry = (msg = "需要为数组且不能为空") => {
    const verdict = (val) => (0, tools_1.getType)(val) !== "Array" || val.length === 0;
    return assembleRule({ verdict, msg, type: "Array" });
};
const Length = (min, max, msg = "长度不符合要求") => {
    const verdict = (val) => {
        const t = (0, tools_1.getType)(val);
        if (t === "String" || t === "Array") {
            const len = val.length;
            return len < min || len > max ? true : false;
        }
        return true;
    };
    return assembleRule({ verdict, msg });
};
const IsInt = (msg = "需要为整型") => {
    const verdict = (val) => !(0, tools_1.isNumber)(val) || val % 1 !== 0;
    return assembleRule({ verdict, msg });
};
const Limit = (list, msg = "数据超出限制") => {
    const verdict = (val) => !list.includes(val);
    return assembleRule({ verdict, msg });
};
exports.default = {
    VerifyTool,
    assembleRule,
    IsNotEmpty,
    Max,
    Min,
    MunSize,
    IsString,
    IsNumber,
    MultipleType,
    NotEmptyObj,
    NotEmptyAry,
    DefaultVal,
    Length,
    IsInt,
    Limit
};
