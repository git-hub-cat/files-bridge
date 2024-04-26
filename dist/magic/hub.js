"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsLoc = exports.hub = exports.initHub = exports.Rou = exports.isRouteExist = exports.layerList = void 0;
const path_to_regexp_1 = require("path-to-regexp");
const tools_1 = require("./tools");
const paramsLoc = ["Query", "Body", "Params"];
exports.paramsLoc = paramsLoc;
class R {
}
class Rou extends R {
    constructor(data) {
        super();
        for (const k in data) {
            this[k] = data[k];
        }
    }
}
exports.Rou = Rou;
class Layer {
    constructor(data) {
        this.list = [];
        this.clazz = data.clazz;
        this.prefix = data.prefix;
    }
}
class PoadInfo {
}
class AuthInfo {
    constructor() {
        this.clazzs = [];
        this.excludes = [];
    }
}
class Hub {
    constructor() {
        this.clazzInfo = [];
        this.methodInfo = [];
        this.poadInfo = [];
        this.authInfo = new AuthInfo();
        this.bareOut = [];
        this.jsonStringify = [];
    }
    addClazzInfo(data) {
        this.clazzInfo.push(data);
    }
    useClazzInfo() {
        const arr = [];
        this.clazzInfo.forEach(({ clazz, prefix }) => {
            if (arr.includes(prefix)) {
                throw new tools_1.JError("存在相同的前缀path::" + prefix);
            }
            arr.push(prefix);
            layerList.push(new Layer({ clazz, prefix }));
        });
    }
    addMethodInfo(data) {
        this.methodInfo.push(data);
    }
    useMethodInfo() {
        this.methodInfo.forEach(item => {
            const { clazz, name, action, path, method } = item;
            const layer = layerList.find(sub => sub.clazz === clazz);
            if (!layer) {
                console.error(clazz);
                throw new tools_1.JError("class不存在");
            }
            const finalPath = layer.prefix + path;
            const rou = new Rou({ name, action, path: finalPath, method });
            if (finalPath.includes(":") && finalPath.split(":").length > 1) {
                rou.pathReg = (0, path_to_regexp_1.pathToRegexp)(finalPath);
            }
            layer.list.push(rou);
        });
    }
    addPoadInfo(data) {
        const { clazz, name, idx, loc, dataType, key = '' } = data;
        let pi = this.poadInfo.find(item => item.clazz === clazz && item.name === name);
        if (!pi) {
            pi = new PoadInfo();
            pi.clazz = data.clazz;
            pi.name = data.name;
            pi.parameter = [];
            this.poadInfo.push(pi);
        }
        if (!dataType.prototype.dtoClazz && paramsLoc.includes(loc) && !key) {
            throw new tools_1.JError(name + "方法中当参数类型为基本数据类型时, key值必传");
        }
        pi.parameter.push({ idx, loc, dataType, key });
    }
    usePoadInfo() {
        this.poadInfo.forEach(({ clazz, name, parameter: pAry }) => {
            const layer = layerList.find(sub => sub.clazz === clazz);
            if (!layer) {
                console.error(clazz);
                throw new tools_1.JError("class不存在");
            }
            const rou = layer.list.find(sub => sub.name === name);
            if (!rou)
                throw new tools_1.JError("rou匹配失败," + rou);
            for (let i = 0; i < pAry.length - 1; i++) {
                for (let j = 0; j < pAry.length - i - 1; j++) {
                    if (pAry[j].idx > pAry[j + 1].idx) {
                        const tem = pAry[j];
                        pAry[j] = pAry[j + 1];
                        pAry[j + 1] = tem;
                    }
                }
            }
            rou.parameter = pAry;
        });
    }
    addAuthClazz(clazz) {
        this.authInfo.clazzs.push(clazz);
    }
    addAuthExclude(clazz, name) {
        this.authInfo.excludes.push({ clazz, name });
    }
    useAuthInfo() {
        this.authInfo.clazzs.forEach(clazz => {
            const layer = layerList.find(sub => sub.clazz === clazz);
            if (!layer) {
                console.error(clazz);
                throw new tools_1.JError("class不存在");
            }
            layer.list.forEach(rou => {
                const { name, parameter = [] } = rou;
                const boo = !this.authInfo.excludes.find(sub => sub.clazz === clazz && sub.name === name);
                rou.isAuth = boo;
                if (!boo) {
                    if (parameter.some(sub => sub.loc === "UserInfo")) {
                        throw new tools_1.JError(name + "方法为非鉴权方法,不能使用UserInfo装饰器");
                    }
                }
            });
        });
    }
    addJSONStringify({ clazz, name }) {
        this.jsonStringify.push({ clazz, name });
    }
    useJSONStringify() {
        this.jsonStringify.forEach(item => {
            const { clazz, name } = item;
            const layer = layerList.find(sub => sub.clazz === clazz);
            if (!layer) {
                console.error(clazz);
                throw new tools_1.JError("class不存在");
            }
            const rou = layer.list.find(sub => sub.name === name);
            rou.isJSONStringify = true;
        });
    }
    addBareOut({ clazz, name }) {
        this.bareOut.push({ clazz, name });
    }
    useBareOut() {
        this.bareOut.forEach(item => {
            const { clazz, name } = item;
            const layer = layerList.find(sub => sub.clazz === clazz);
            if (!layer) {
                console.error(clazz);
                throw new tools_1.JError("class不存在");
            }
            const rou = layer.list.find(sub => sub.name === name);
            rou.isBareOut = true;
        });
    }
    initUse() {
        this.useClazzInfo();
        this.useMethodInfo();
        this.usePoadInfo();
        this.useBareOut();
        this.useJSONStringify();
        this.useAuthInfo();
    }
}
const hub = new Hub();
exports.hub = hub;
const layerList = [];
exports.layerList = layerList;
const layerFlatList = [];
const layerFlat = () => {
    layerList.forEach(layer => {
        const { list, clazz, prefix } = layer;
        list.forEach(item => {
            layerFlatList.push(Object.assign(Object.assign({}, item), { clazz, prefix, list: [] }));
        });
    });
};
const initHub = () => {
    hub.initUse();
    layerFlat();
};
exports.initHub = initHub;
const isRouteExist = (path, method) => {
    if (path.slice(-1) === "/") {
        path = path.substring(0, path.length - 1);
    }
    const unit = layerFlatList.find(item => {
        if (item.pathReg)
            return item.pathReg.test(path);
        return item.path === path;
    });
    if (!unit)
        return 0;
    if (unit.method !== method.toLowerCase())
        return -1;
    return unit;
};
exports.isRouteExist = isRouteExist;
