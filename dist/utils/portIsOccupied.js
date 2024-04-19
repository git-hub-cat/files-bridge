"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
const portIsOccupied = (port) => {
    return new Promise((resolve, reject) => {
        const server = net.createServer().listen(port);
        server.on("listening", () => {
            server.close();
            resolve();
        });
        server.on("error", (err) => {
            if (err.code === "EADDRINUSE") {
                console.log("端口【" + port + "】已端口被占用...");
                reject();
            }
        });
    });
};
exports.default = portIsOccupied;
