"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responFail = exports.responSess = exports.betRecord = exports.uInfo = exports.gamehall = exports.Authorization = exports.baseUrl = void 0;
const moment = require("moment");
exports.baseUrl = 'https://api.cqgame.games';
exports.Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NjFkNTE0Mjc2ZWViMzc2ZDNmOTUxZTciLCJhY2NvdW50IjoiZG9nX3N3Iiwib3duZXIiOiI2NjFkNTE0Mjc2ZWViMzc2ZDNmOTUxZTciLCJwYXJlbnQiOiJzZWxmIiwiY3VycmVuY3kiOiJCUkwiLCJicmFuZCI6ImNxOSIsImp0aSI6IjYyODE1OTAzIiwiaWF0IjoxNzEzMTk3Mzc4LCJpc3MiOiJDeXByZXNzIiwic3ViIjoiU1NUb2tlbiJ9.PCPgcnSgsBPJUrVuaByt0x3ysowtnDAuwn9VIPM2JRU';
exports.gamehall = "cq9";
exports.uInfo = {
    account: 'Cbxy3mldOjcoZYOA61dsE',
    currency: 'CNY',
    balance: 1000,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkNieHkzbWxkT2pjb1pZT0E2MWRzRSIsImlhdCI6MTcxMzk2MzUyMywiZXhwIjo0MjM2ODQzNTIzfQ.APVeT8b3PlsyCyOxY93ycCNik-eBJm7Boa8qzc9hKr8'
};
exports.betRecord = [];
const responSess = (data = null) => {
    return {
        data,
        status: { code: "0", message: "Success", datetime: moment().format('YYYY-MM-DD HH:mm:ss') }
    };
};
exports.responSess = responSess;
const responFail = (data = null, code = '0') => {
    return {
        data,
        status: { code, message: "Success", datetime: moment().format('YYYY-MM-DD HH:mm:ss') }
    };
};
exports.responFail = responFail;
