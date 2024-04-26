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
Object.defineProperty(exports, "__esModule", { value: true });
const magic_1 = require("../../magic");
const httpService_1 = require("../../utils/httpService");
const config_1 = require("./config");
let GameController = class GameController {
    async gameList() {
        const data = await (0, httpService_1.default)({
            url: config_1.baseUrl + '/gameboy/game/list/' + config_1.gamehall,
            headers: { Authorization: config_1.Authorization }
        });
        return data;
    }
    async gamelink() {
        const data = await (0, httpService_1.default)({
            url: config_1.baseUrl + '/gameboy/player/sw/gamelink',
            method: 'post',
            data: {
                account: config_1.uInfo.account,
                gamehall: config_1.gamehall,
                gamecode: "52",
                gameplat: 'web',
                lang: 'en'
            },
            headers: { Authorization: config_1.Authorization }
        });
        return data;
    }
};
__decorate([
    (0, magic_1.Get)('gameList'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "gameList", null);
__decorate([
    (0, magic_1.Get)('gamelink'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "gamelink", null);
GameController = __decorate([
    (0, magic_1.Controller)('game')
], GameController);
exports.default = GameController;
