"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeCache = require("node-cache");
const appCache = new NodeCache();
exports.default = appCache;
