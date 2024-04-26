"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = exports.Injectable = void 0;
require("reflect-metadata");
const tools_1 = require("./tools");
class Injector {
    constructor() {
        this.providerSet = new Set();
        this.instanceMap = new Map();
    }
    setProvider(value) {
        if (!this.hasProvider(value))
            this.providerSet.add(value);
    }
    hasProvider(value) {
        return this.providerSet.has(value);
    }
    setInstance(key, value) {
        if (!this.instanceMap.has(key))
            this.instanceMap.set(key, value);
    }
    getInstance(clazz) {
        let instance = this.instanceMap.get(clazz);
        if (!instance) {
            instance = new clazz();
            this.setInstance(clazz, instance);
        }
        return instance;
    }
}
const injector = new Injector();
const Injectable = () => {
    return (clazz) => {
        injector.setProvider(clazz);
        injector.setInstance(clazz, new clazz());
    };
};
exports.Injectable = Injectable;
const Inject = () => {
    return (proto, name) => {
        const clazz = Reflect.getMetadata("design:type", proto, name);
        if (!injector.hasProvider(clazz)) {
            console.error(clazz);
            throw new tools_1.JError("Injectable缺少相应的类");
        }
        proto[name] = injector.getInstance(clazz);
    };
};
exports.Inject = Inject;
