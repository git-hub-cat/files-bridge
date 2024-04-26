"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const https = require("https");
const Koa = require("koa");
const koa_body_1 = require("koa-body");
const routeErr_1 = require("./auth/routeErr");
const routers_1 = require("./routers");
const tools_1 = require("./tools");
const wayOut_1 = require("./routers/wayOut");
const paramsVerify_1 = require("./routers/paramsVerify");
const allowCross = async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    await next();
};
const koaBodyMiddle = (0, koa_body_1.default)({ multipart: true });
let isInstance = false;
let isListen = false;
class MagicFactory {
    constructor(opts) {
        this.app = null;
        this.serverApp = null;
        this.initSocket = null;
        this.controllers = [];
        this.scheduleClazz = null;
        this.frontThing = [allowCross, koaBodyMiddle];
        this.plugThing = [];
        this.authThing = [routeErr_1.default];
        this.nearCoreThing = [paramsVerify_1.default];
        this.behindThing = [wayOut_1.formatResponse];
        if (isInstance)
            throw new tools_1.JError("MagicFactory不可重复实例化");
        const { controllers, middleware, middleAuth, schedule, initSocket, sslOpts } = opts;
        this.setController(controllers);
        this.addMiddleware(middleware);
        if (middleAuth)
            this.authThing.push(middleAuth);
        this.setSchedule(schedule);
        this.app = new Koa();
        this.setServerApp(initSocket, sslOpts);
        isInstance = true;
    }
    setController(list) {
        if (list.length)
            this.controllers = list;
    }
    setSchedule(clazz) {
        if ((0, tools_1.getType)(clazz) === "Function")
            this.scheduleClazz = clazz;
    }
    setServerApp(initSocket, sslOpts) {
        let serve = null;
        const isFunc = typeof initSocket === "function", isSsl = (0, tools_1.notEmptyObj)(sslOpts);
        if (isSsl) {
            const enforceSSL = require("koa-sslify");
            this.app.use(enforceSSL());
            serve = https.createServer(sslOpts, this.app.callback());
        }
        if (isFunc) {
            if (!serve)
                serve = http.createServer(this.app.callback());
            this.initSocket = initSocket;
        }
        if (serve)
            this.serverApp = serve;
    }
    addMiddleware(plug) {
        const f = "function";
        if (typeof plug === f)
            this.plugThing.push(plug);
        if (Array.isArray(plug)) {
            plug.forEach(fun => (typeof fun === f) && this.plugThing.push(fun));
        }
    }
    useMiddleware(list) {
        try {
            list.forEach((func) => this.app.use(func));
        }
        catch (err) {
            console.error("中间件错误");
            throw new tools_1.JError(err);
        }
    }
    runSchedule() {
        const clazz = this.scheduleClazz;
        if (!clazz)
            return;
        const instance = new clazz();
        const crons = clazz.prototype.crons;
        if ((0, tools_1.notEmptyAry)(crons))
            crons.forEach(func => func(instance));
    }
    runApp() {
        this.useMiddleware(this.frontThing);
        this.useMiddleware(this.plugThing);
        this.useMiddleware(this.authThing);
        this.useMiddleware(this.nearCoreThing);
        (0, routers_1.default)(this.app, this.controllers);
        this.useMiddleware(this.behindThing);
    }
    listen(port) {
        return new Promise((resolve, reject) => {
            if (!this.app || !port || isListen)
                return;
            this.runApp();
            const app = this.serverApp || this.app;
            const serve = app.listen(port, () => {
                this.runSchedule();
                isListen = true;
                resolve();
                this.initSocket && this.initSocket(this.serverApp);
            });
            serve.addListener("error", (err) => reject(err));
        });
    }
}
exports.default = MagicFactory;
