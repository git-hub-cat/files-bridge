"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const magic_1 = require("../magic");
const isProd = process.env.NODE_ENV === "production";
const clientIP = async (ctx, next) => {
    if (isProd) {
        const { path } = ctx.request;
        if (path === "/user/login") {
            const { req, query } = ctx;
            try {
                let ip = req.headers["x-forwarded-for"] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress;
                ip = ip.toString().replace("::ffff:", "");
                ip = "IP: " + ip;
                magic_1.logger.info(ip, query);
            }
            catch (err) {
                magic_1.logger.error("记录ip信息异常", err);
            }
        }
    }
    await next();
};
exports.default = clientIP;
