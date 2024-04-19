"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schedule = require("node-schedule");
const addSchedule = (proto, func) => {
    if (!proto.crons)
        proto.crons = [];
    proto.crons.push(func);
};
const Cron = (cronTimeStr) => {
    return (proto, name, dec) => {
        if (cronTimeStr && typeof cronTimeStr === "string") {
            const func = (instance) => schedule.scheduleJob(cronTimeStr, () => dec.value.call(instance));
            addSchedule(proto, func);
        }
    };
};
const Interval = (time) => {
    return (proto, name, dec) => {
        if (time && typeof time === "number" && time > 0) {
            const func = (instance) => setInterval(() => dec.value.call(instance), time);
            addSchedule(proto, func);
        }
    };
};
const Timeout = (time) => {
    return (proto, name, dec) => {
        if (time && typeof time === "number" && time > 0) {
            const func = (instance) => setTimeout(() => dec.value.call(instance), time);
            addSchedule(proto, func);
        }
    };
};
exports.default = {
    Cron,
    Interval,
    Timeout
};
