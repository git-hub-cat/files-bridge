"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const getType = (data) => Object.prototype.toString.call(data).slice(8, -1);
const logInstance = (0, winston_1.createLogger)({ transports: [] });
-function () {
    const isDev = process.env.NODE_ENV === "development";
    const { combine, align, timestamp, colorize, printf } = winston_1.format;
    const time = timestamp({ format: "YYYY-MM-DD HH:mm:ss" });
    const print = printf(info => `${info.level}: ${info.timestamp}: ${info.message}`);
    if (isDev) {
        logInstance.add(new winston_1.transports.Console({
            format: combine(time, align(), colorize(), print)
        }));
        return;
    }
    const defaultOpts = {
        format: combine(time, align(), print),
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
    };
    logInstance.add(new DailyRotateFile(Object.assign({ filename: "logs/info-%DATE%.log", level: "info" }, defaultOpts))).add(new DailyRotateFile(Object.assign({ filename: "logs/error-%DATE%.log", level: "error" }, defaultOpts)));
}();
const msgToStr = (list) => {
    let msgs = "";
    list.forEach((val, i) => {
        try {
            const t = getType(val);
            if (t === "Object" || t === "Array")
                val = JSON.stringify(val);
            const s = i > 0 ? `; ${val}` : val;
            msgs += s;
        }
        catch (err) { }
    });
    return msgs;
};
const logger = {
    info(...message) {
        process.nextTick(() => {
            logInstance.info(msgToStr(message));
        });
    },
    error(...message) {
        process.nextTick(() => {
            logInstance.error(msgToStr(message));
        });
    }
};
exports.default = logger;
