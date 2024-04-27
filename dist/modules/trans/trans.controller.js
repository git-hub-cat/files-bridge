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
const globalAction_1 = require("../../utils/globalAction");
;
const gameBet_dto_1 = require("./gameBet.dto");
const badParas = { msg: 'Bad parameters', code: '5' };
const badAccount = { msg: 'Your account or password is incorrect', code: '14' };
const balanceLess = { msg: 'Insufficient balance', code: '1' };
let TransController = class TransController {
    balance(account) {
        magic_1.logger.info("balance/传入参数::", account);
        if (account !== config_1.uInfo.account) {
            return (0, config_1.responFail)(badAccount.msg, badAccount.code);
        }
        const data = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        return (0, config_1.responSess)(data);
    }
    gameBet(data) {
        magic_1.logger.info("game/bet传入参数::", data);
        const gbd = data.body;
        try {
            gameBet_dto_1.GameBetDto.prototype.verify(gbd);
        }
        catch (err) {
            magic_1.logger.error('game/bet参数错误', err);
            return (0, config_1.responFail)(badParas.msg, badParas.code);
        }
        if (gbd.account !== config_1.uInfo.account) {
            return (0, config_1.responFail)(badAccount.msg, badAccount.code);
        }
        if (config_1.uInfo.balance < gbd.amount) {
            return (0, config_1.responFail)(balanceLess.msg, balanceLess.code);
        }
        config_1.betRecord.push(gbd);
        config_1.uInfo.balance = (0, globalAction_1.numMinus)(config_1.uInfo.balance, gbd.amount);
        const obj = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        return (0, config_1.responSess)(obj);
    }
    gameEndround(data) {
        magic_1.logger.info("game/endround传入参数::", data);
        const ged = data.body;
        try {
            gameBet_dto_1.GameEndroundDto.prototype.verify(ged);
        }
        catch (err) {
            magic_1.logger.error('game/endround参数错误', err);
            return (0, config_1.responFail)(badParas.msg, badParas.code);
        }
        if (ged.account !== config_1.uInfo.account) {
            return (0, config_1.responFail)(badAccount.msg, badAccount.code);
        }
        try {
            const ary = JSON.parse(ged.data);
            let total = 0;
            for (const item of ary) {
                let amount = item.amount;
                if (!(0, globalAction_1.isNumber)(amount)) {
                    throw new Error("amount需要为数值");
                }
                amount = Number(amount);
                if (amount < 0) {
                    throw new Error("amount不能为负数");
                }
                total = (0, globalAction_1.numPlus)(total, amount);
            }
            ;
            config_1.uInfo.balance = (0, globalAction_1.numPlus)(config_1.uInfo.balance, total);
        }
        catch (err) {
            magic_1.logger.error('求total,err', err);
            return (0, config_1.responFail)(badParas.msg, badParas.code);
        }
        const obj = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        return (0, config_1.responSess)(obj);
    }
    gameRollout(data) {
        magic_1.logger.info("game/rollout传入参数::", data);
        const grod = data.body;
        try {
            gameBet_dto_1.GameRolloutDto.prototype.verify(grod);
        }
        catch (err) {
            magic_1.logger.error('game/rollout参数错误', err);
            return (0, config_1.responFail)(badParas.msg, badParas.code);
        }
        if (grod.account !== config_1.uInfo.account) {
            return (0, config_1.responFail)(badAccount.msg, badAccount.code);
        }
        if (config_1.uInfo.balance < grod.amount) {
            return (0, config_1.responFail)(balanceLess.msg, balanceLess.code);
        }
        config_1.uInfo.balance = (0, globalAction_1.numMinus)(config_1.uInfo.balance, grod.amount);
        const obj = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        return (0, config_1.responSess)(obj);
    }
    gameTakeall(data) {
        magic_1.logger.info("game/takeall传入参数::", data);
        const gtd = data.body;
        try {
            gameBet_dto_1.GameTakeallDto.prototype.verify(gtd);
        }
        catch (err) {
            magic_1.logger.error('game/takeall参数错误', err);
            return (0, config_1.responFail)(badParas.msg, badParas.code);
        }
        if (gtd.account !== config_1.uInfo.account) {
            return (0, config_1.responFail)(badAccount.msg, badAccount.code);
        }
        if (!config_1.uInfo.balance) {
            return (0, config_1.responFail)(balanceLess.msg, balanceLess.code);
        }
        const obj = {
            amount: config_1.uInfo.balance,
            balance: 0,
            currency: config_1.uInfo.currency
        };
        config_1.uInfo.balance = 0;
        return (0, config_1.responSess)(obj);
    }
    gameRollin(data) {
        magic_1.logger.info("game/rollin传入参数::", data);
        const grid = data.body;
        try {
            gameBet_dto_1.GameRollinDto.prototype.verify(grid);
        }
        catch (err) {
            magic_1.logger.error('game/rollin参数错误', err);
            return (0, config_1.responFail)(badParas.msg, badParas.code);
        }
        if (grid.account !== config_1.uInfo.account) {
            return (0, config_1.responFail)(badAccount.msg, badAccount.code);
        }
        config_1.uInfo.balance = (0, globalAction_1.numPlus)(config_1.uInfo.balance, grid.amount);
        const obj = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        return (0, config_1.responSess)(obj);
    }
    gameDebit(data) {
        magic_1.logger.info("game/debit传入参数::", data);
        const gdbd = data.body;
        try {
            gameBet_dto_1.GameDebitDto.prototype.verify(gdbd);
        }
        catch (err) {
            magic_1.logger.error('game/debit参数错误', err);
            return (0, config_1.responFail)(badParas.msg, badParas.code);
        }
        if (gdbd.account !== config_1.uInfo.account) {
            return (0, config_1.responFail)(badAccount.msg, badAccount.code);
        }
        if (config_1.uInfo.balance < gdbd.amount) {
            return (0, config_1.responFail)(balanceLess.msg, balanceLess.code);
        }
        config_1.uInfo.balance = (0, globalAction_1.numMinus)(config_1.uInfo.balance, gdbd.amount);
        const obj = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        return (0, config_1.responSess)(obj);
    }
    gameCredit(data) {
        magic_1.logger.info("game/credit传入参数::", data);
        const gcdd = data.body;
        try {
            gameBet_dto_1.GameCreditDto.prototype.verify(gcdd);
        }
        catch (err) {
            magic_1.logger.error('game/credit参数错误', err);
            return (0, config_1.responFail)(badParas.msg, badParas.code);
        }
        if (gcdd.account !== config_1.uInfo.account) {
            return (0, config_1.responFail)(badAccount.msg, badAccount.code);
        }
        config_1.uInfo.balance = (0, globalAction_1.numPlus)(config_1.uInfo.balance, gcdd.amount);
        const obj = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        return (0, config_1.responSess)(obj);
    }
    userPayoff(data) {
        magic_1.logger.info("user/payoff传入参数::", data);
        const upfd = data.body;
        try {
            gameBet_dto_1.UserPayoffDto.prototype.verify(upfd);
        }
        catch (err) {
            magic_1.logger.error('user/payoff参数错误', err);
            return (0, config_1.responFail)(badParas.msg, badParas.code);
        }
        if (upfd.account !== config_1.uInfo.account) {
            return (0, config_1.responFail)(badAccount.msg, badAccount.code);
        }
        config_1.uInfo.balance = (0, globalAction_1.numPlus)(config_1.uInfo.balance, upfd.amount);
        const obj = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        return (0, config_1.responSess)(obj);
    }
    gameRefund(mtcode) {
        magic_1.logger.info("game/refund传入参数::", mtcode);
        const res = config_1.betRecord.find(t => t.mtcode === mtcode);
        if (!res) {
            return (0, config_1.responFail)('Data not found.', '8');
        }
        config_1.uInfo.balance = (0, globalAction_1.numPlus)(config_1.uInfo.balance, res.amount);
        const obj = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        return (0, config_1.responSess)(obj);
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
    __param(0, (0, magic_1.CtxParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransController.prototype, "gameBet", null);
__decorate([
    (0, magic_1.Post)('game/endround'),
    (0, magic_1.BareOut)(),
    __param(0, (0, magic_1.CtxParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransController.prototype, "gameEndround", null);
__decorate([
    (0, magic_1.Post)('game/rollout'),
    (0, magic_1.BareOut)(),
    __param(0, (0, magic_1.CtxParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransController.prototype, "gameRollout", null);
__decorate([
    (0, magic_1.Post)('game/takeall'),
    (0, magic_1.BareOut)(),
    __param(0, (0, magic_1.CtxParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransController.prototype, "gameTakeall", null);
__decorate([
    (0, magic_1.Post)('game/rollin'),
    (0, magic_1.BareOut)(),
    __param(0, (0, magic_1.CtxParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransController.prototype, "gameRollin", null);
__decorate([
    (0, magic_1.Post)('game/debit'),
    (0, magic_1.BareOut)(),
    __param(0, (0, magic_1.CtxParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransController.prototype, "gameDebit", null);
__decorate([
    (0, magic_1.Post)('game/credit'),
    (0, magic_1.BareOut)(),
    __param(0, (0, magic_1.CtxParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransController.prototype, "gameCredit", null);
__decorate([
    (0, magic_1.Post)('user/payoff'),
    (0, magic_1.BareOut)(),
    __param(0, (0, magic_1.CtxParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
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
    (0, magic_1.Controller)('transaction'),
    (0, magic_1.Auth)()
], TransController);
exports.default = TransController;
