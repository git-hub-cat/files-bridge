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
let PlayerController = class PlayerController {
    check(account) {
        const boo = account === config_1.uInfo.account;
        return (0, config_1.responSess)(boo);
    }
};
__decorate([
    (0, magic_1.Get)('check/:account'),
    (0, magic_1.BareOut)(),
    __param(0, (0, magic_1.Params)('account')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlayerController.prototype, "check", null);
PlayerController = __decorate([
    (0, magic_1.Controller)('player')
], PlayerController);
exports.default = PlayerController;
