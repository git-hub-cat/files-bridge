"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const magic_1 = require("../../magic");
const config_1 = require("./config");
const gameBet_dto_1 = require("./gameBet.dto");
let TransController = class TransController {
    balance(account) {
        const data = { balance: config_1.uInfo.balance, currency: "CNY" };
        return (0, config_1.responSess)(data);
    }
    gameBet(gab) {
        console.log(gab);
    }
};
__decorate([
    (0, magic_1.Get)('balance/:account'),
    (0, magic_1.BareOut)(),
    __param(0, (0, magic_1.Params)('account')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransController.prototype, "balance", null);
__decorate([
    (0, magic_1.Post)('game/bet'),
    (0, magic_1.BareOut)(),
    __param(0, (0, magic_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gameBet_dto_1.default]),
    __metadata("design:returntype", void 0)
], TransController.prototype, "gameBet", null);
TransController = __decorate([
    (0, magic_1.Controller)('transaction'),
    (0, magic_1.Auth)()
], TransController);
exports.default = TransController;
