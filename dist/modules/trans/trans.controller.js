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
        const data = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        return (0, config_1.responSess)(data);
    }
    gameBet(gbd) {
        magic_1.logger.info("game/bet传入参数::", gbd);
        const data = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        return (0, config_1.responSess)(data);
    }
    gameEndround(ged) {
        magic_1.logger.info("game/endround传入参数::", ged);
        const data = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        return (0, config_1.responSess)(data);
    }
    gameRollout(grod) {
        magic_1.logger.info("game/rollout传入参数::", grod);
        const data = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        return (0, config_1.responSess)(data);
    }
    gameTakeall(gtd) {
        magic_1.logger.info("game/takeall传入参数::", gtd);
        const data = {
            amount: config_1.uInfo.balance,
            balance: 0,
            currency: config_1.uInfo.currency
        };
        return (0, config_1.responSess)(data);
    }
    gameRollin(grid) {
        magic_1.logger.info("game/rollin传入参数::", grid);
        const data = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        return (0, config_1.responSess)(data);
    }
    gameDebit(gdbd) {
        magic_1.logger.info("game/debit传入参数::", gdbd);
        const data = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        return (0, config_1.responSess)(data);
    }
    gameCredit(gcdd) {
        magic_1.logger.info("game/credit传入参数::", gcdd);
        const data = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        return (0, config_1.responSess)(data);
    }
    userPayoff(upfd) {
        magic_1.logger.info("game/payoff传入参数::", upfd);
        const data = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        return (0, config_1.responSess)(data);
    }
    gameRefund(mtcode) {
        magic_1.logger.info("game/refund传入参数::", mtcode);
        const data = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        return (0, config_1.responSess)(data);
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
    __metadata("design:paramtypes", [gameBet_dto_1.GameBetDto]),
    __metadata("design:returntype", void 0)
], TransController.prototype, "gameBet", null);
__decorate([
    (0, magic_1.Post)('game/endround'),
    (0, magic_1.BareOut)(),
    __param(0, (0, magic_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gameBet_dto_1.GameEndroundDto]),
    __metadata("design:returntype", void 0)
], TransController.prototype, "gameEndround", null);
__decorate([
    (0, magic_1.Post)('game/rollout'),
    (0, magic_1.BareOut)(),
    __param(0, (0, magic_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gameBet_dto_1.GameRolloutDto]),
    __metadata("design:returntype", void 0)
], TransController.prototype, "gameRollout", null);
__decorate([
    (0, magic_1.Post)('game/takeall'),
    (0, magic_1.BareOut)(),
    __param(0, (0, magic_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gameBet_dto_1.GameTakeallDto]),
    __metadata("design:returntype", void 0)
], TransController.prototype, "gameTakeall", null);
__decorate([
    (0, magic_1.Post)('game/rollin'),
    (0, magic_1.BareOut)(),
    __param(0, (0, magic_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gameBet_dto_1.GameRollinDto]),
    __metadata("design:returntype", void 0)
], TransController.prototype, "gameRollin", null);
__decorate([
    (0, magic_1.Post)('game/debit'),
    (0, magic_1.BareOut)(),
    __param(0, (0, magic_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gameBet_dto_1.GameDebitDto]),
    __metadata("design:returntype", void 0)
], TransController.prototype, "gameDebit", null);
__decorate([
    (0, magic_1.Post)('game/credit'),
    (0, magic_1.BareOut)(),
    __param(0, (0, magic_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gameBet_dto_1.GameCreditDto]),
    __metadata("design:returntype", void 0)
], TransController.prototype, "gameCredit", null);
__decorate([
    (0, magic_1.Post)('user/payoff'),
    (0, magic_1.BareOut)(),
    __param(0, (0, magic_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gameBet_dto_1.UserPayoffDto]),
    __metadata("design:returntype", void 0)
], TransController.prototype, "userPayoff", null);
__decorate([
    (0, magic_1.Post)('game/refund'),
    (0, magic_1.BareOut)(),
    __param(0, (0, magic_1.Body)('mtcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransController.prototype, "gameRefund", null);
TransController = __decorate([
    (0, magic_1.Controller)('transaction')
], TransController);
exports.default = TransController;
