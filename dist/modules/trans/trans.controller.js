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
const gameBet_dto_1 = require("./gameBet.dto");
let TransController = class TransController {
    isMtcodeExist(arr, mtcode) {
        const res = arr.find(t => t.mtcode === mtcode);
        return res ? res : null;
    }
    balance(account) {
        magic_1.logger.info("balance/传入参数::", account);
        if (account !== config_1.uInfo.account) {
            return (0, config_1.responFail)('1006');
        }
        const data = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        return (0, config_1.responSess)(data);
    }
    gameBet(data) {
        const gbd = data.body;
        magic_1.logger.info("game/bet传入参数::", gbd);
        try {
            gameBet_dto_1.GameBetDto.prototype.verify(gbd);
        }
        catch (err) {
            magic_1.logger.error('game/bet参数错误', err);
            if (err.msg == gameBet_dto_1.eventTimeErr)
                return (0, config_1.responFail)('1004');
            return (0, config_1.responFail)('1003');
        }
        if (gbd.account !== config_1.uInfo.account) {
            return (0, config_1.responFail)('1006');
        }
        if (config_1.uInfo.balance < gbd.amount) {
            return (0, config_1.responFail)('1005');
        }
        magic_1.logger.info('game/bet-balance-前==', config_1.uInfo.balance);
        let obj = {};
        const exist = this.isMtcodeExist(config_1.bRecord.gameBets, gbd.mtcode);
        if (!exist) {
            config_1.uInfo.balance = (0, globalAction_1.numMinus)(config_1.uInfo.balance, gbd.amount);
            config_1.bRecord.gameBets.push(Object.assign(Object.assign({}, gbd), { outAmount: config_1.uInfo.balance }));
            obj = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        }
        else {
            obj = { balance: exist.outAmount, currency: config_1.uInfo.currency };
        }
        magic_1.logger.info('game/bet-balance-后==', config_1.uInfo.balance);
        return (0, config_1.responSess)(obj);
    }
    gameEndround(data) {
        const ged = data.body;
        magic_1.logger.info("game/endround传入参数::", ged);
        try {
            gameBet_dto_1.GameEndroundDto.prototype.verify(ged);
        }
        catch (err) {
            magic_1.logger.error('game/endround参数错误', err);
            if (err.msg == gameBet_dto_1.createTimeErr)
                return (0, config_1.responFail)('1004');
            return (0, config_1.responFail)('1003');
        }
        try {
            const ary = JSON.parse(ged.data);
            for (const item of ary) {
                gameBet_dto_1.EndroundData.prototype.verify(item);
            }
        }
        catch (err) {
            magic_1.logger.error('game/endround-data参数错误==', err);
            if (err.msg == gameBet_dto_1.eventTimeErr)
                return (0, config_1.responFail)('1004');
            return (0, config_1.responFail)('1003');
        }
        if (ged.account !== config_1.uInfo.account) {
            return (0, config_1.responFail)('1006');
        }
        magic_1.logger.info('game/endround-balance-前==', config_1.uInfo.balance);
        const ary = JSON.parse(ged.data);
        const temps = [];
        let obj = {};
        const exist = this.isMtcodeExist(config_1.bRecord.gameEndrounds, ary[0].mtcode);
        if (!exist) {
            let total = 0;
            for (const item of ary) {
                total = (0, globalAction_1.numPlus)(total, item.amount);
                temps.push(Object.assign(Object.assign({}, ged), item));
            }
            if (total > 0) {
                config_1.uInfo.balance = (0, globalAction_1.numPlus)(config_1.uInfo.balance, total);
            }
            temps.forEach(t => t.balance = config_1.uInfo.balance);
            config_1.bRecord.gameEndrounds.push(...temps);
            obj = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        }
        else {
            obj = { balance: exist.balance, currency: config_1.uInfo.currency };
        }
        magic_1.logger.info('game/endround-balance-后==', config_1.uInfo.balance);
        return (0, config_1.responSess)(obj);
    }
    gameRollout(data) {
        const grod = data.body;
        magic_1.logger.info("game/rollout传入参数::", grod);
        try {
            gameBet_dto_1.GameRolloutDto.prototype.verify(grod);
        }
        catch (err) {
            magic_1.logger.error('game/rollout参数错误', err);
            if (err.msg == gameBet_dto_1.eventTimeErr)
                return (0, config_1.responFail)('1004');
            return (0, config_1.responFail)('1003');
        }
        if (grod.account !== config_1.uInfo.account) {
            return (0, config_1.responFail)('1006');
        }
        if (config_1.uInfo.balance < grod.amount) {
            return (0, config_1.responFail)('1005');
        }
        magic_1.logger.info('game/rollout-balance-前==', config_1.uInfo.balance);
        let obj = {};
        const exist = this.isMtcodeExist(config_1.bRecord.gameRollouts, grod.mtcode);
        if (!exist) {
            config_1.uInfo.balance = (0, globalAction_1.numMinus)(config_1.uInfo.balance, grod.amount);
            config_1.bRecord.gameRollouts.push(Object.assign(Object.assign({}, grod), { outAmount: config_1.uInfo.balance }));
            obj = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        }
        else {
            obj = { balance: exist.outAmount, currency: config_1.uInfo.currency };
        }
        magic_1.logger.info('game/rollout-balance-后==', config_1.uInfo.balance);
        return (0, config_1.responSess)(obj);
    }
    gameTakeall(data) {
        const gtd = data.body;
        magic_1.logger.info("game/takeall传入参数::", gtd);
        try {
            gameBet_dto_1.GameTakeallDto.prototype.verify(gtd);
        }
        catch (err) {
            magic_1.logger.error('game/takeall参数错误', err);
            if (err.msg == gameBet_dto_1.eventTimeErr)
                return (0, config_1.responFail)('1004');
            return (0, config_1.responFail)('1003');
        }
        if (gtd.account !== config_1.uInfo.account) {
            return (0, config_1.responFail)('1006');
        }
        config_1.bRecord.gameTakealls.push(Object.assign(Object.assign({}, gtd), { amount: config_1.uInfo.balance }));
        magic_1.logger.info('game/takeall-balance-前==', config_1.uInfo.balance);
        const obj = {
            amount: config_1.uInfo.balance,
            balance: 0,
            currency: config_1.uInfo.currency
        };
        config_1.uInfo.balance = 0;
        magic_1.logger.info('game/takeall-balance-后==', config_1.uInfo.balance);
        return (0, config_1.responSess)(obj);
    }
    gameRollin(data) {
        const grid = data.body;
        magic_1.logger.info("game/rollin传入参数::", grid);
        try {
            gameBet_dto_1.GameRollinDto.prototype.verify(grid);
        }
        catch (err) {
            magic_1.logger.error('game/rollin参数错误', err);
            if (err.msg == gameBet_dto_1.eventTimeErr || err.msg == gameBet_dto_1.createTimeErr)
                return (0, config_1.responFail)('1004');
            return (0, config_1.responFail)('1003');
        }
        if (grid.account !== config_1.uInfo.account) {
            return (0, config_1.responFail)('1006');
        }
        magic_1.logger.info('game/rollin-balance-前==', config_1.uInfo.balance);
        let obj = {};
        const exist = this.isMtcodeExist(config_1.bRecord.gameRollins, grid.mtcode);
        if (!exist) {
            config_1.uInfo.balance = (0, globalAction_1.numPlus)(config_1.uInfo.balance, grid.amount);
            config_1.bRecord.gameRollins.push(Object.assign(Object.assign({}, grid), { outAmount: config_1.uInfo.balance }));
            obj = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        }
        else {
            obj = { balance: exist.outAmount, currency: config_1.uInfo.currency };
        }
        magic_1.logger.info('game/rollin-balance-后==', config_1.uInfo.balance);
        return (0, config_1.responSess)(obj);
    }
    gameDebit(data) {
        const gdbd = data.body;
        magic_1.logger.info("game/debit传入参数::", gdbd);
        try {
            gameBet_dto_1.GameDebitDto.prototype.verify(gdbd);
        }
        catch (err) {
            magic_1.logger.error('game/debit参数错误', err);
            if (err.msg == gameBet_dto_1.eventTimeErr)
                return (0, config_1.responFail)('1004');
            return (0, config_1.responFail)('1003');
        }
        if (gdbd.account !== config_1.uInfo.account) {
            return (0, config_1.responFail)('1006');
        }
        if (config_1.uInfo.balance < gdbd.amount) {
            return (0, config_1.responFail)('1005');
        }
        magic_1.logger.info('game/debit-balance-前==', config_1.uInfo.balance);
        let obj = {};
        const exist = this.isMtcodeExist(config_1.bRecord.gameDebits, gdbd.mtcode);
        if (!exist) {
            config_1.uInfo.balance = (0, globalAction_1.numMinus)(config_1.uInfo.balance, gdbd.amount);
            config_1.bRecord.gameDebits.push(Object.assign(Object.assign({}, gdbd), { outAmount: config_1.uInfo.balance }));
            obj = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        }
        else {
            obj = { balance: exist.outAmount, currency: config_1.uInfo.currency };
        }
        magic_1.logger.info('game/debit-balance-后==', config_1.uInfo.balance);
        return (0, config_1.responSess)(obj);
    }
    gameCredit(data) {
        const gcdd = data.body;
        magic_1.logger.info("game/credit传入参数::", gcdd);
        try {
            gameBet_dto_1.GameCreditDto.prototype.verify(gcdd);
        }
        catch (err) {
            magic_1.logger.error('game/credit参数错误', err);
            if (err.msg == gameBet_dto_1.eventTimeErr)
                return (0, config_1.responFail)('1004');
            return (0, config_1.responFail)('1003');
        }
        if (gcdd.account !== config_1.uInfo.account) {
            return (0, config_1.responFail)('1006');
        }
        magic_1.logger.info('game/credit-balance-前==', config_1.uInfo.balance);
        let obj = {};
        const exist = this.isMtcodeExist(config_1.bRecord.gameCredits, gcdd.mtcode);
        if (!exist) {
            config_1.uInfo.balance = (0, globalAction_1.numPlus)(config_1.uInfo.balance, gcdd.amount);
            config_1.bRecord.gameCredits.push(Object.assign(Object.assign({}, gcdd), { outAmount: config_1.uInfo.balance }));
            obj = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        }
        else {
            obj = { balance: exist.outAmount, currency: config_1.uInfo.currency };
        }
        magic_1.logger.info('game/credit-balance-后==', config_1.uInfo.balance);
        return (0, config_1.responSess)(obj);
    }
    userPayoff(data) {
        const upfd = data.body;
        magic_1.logger.info("user/payoff传入参数::", upfd);
        try {
            gameBet_dto_1.UserPayoffDto.prototype.verify(upfd);
        }
        catch (err) {
            magic_1.logger.error('user/payoff参数错误', err);
            if (err.msg == gameBet_dto_1.eventTimeErr)
                return (0, config_1.responFail)('1004');
            return (0, config_1.responFail)('1003');
        }
        if (upfd.account !== config_1.uInfo.account) {
            return (0, config_1.responFail)('1006');
        }
        magic_1.logger.info('user/payoff-balance-前==', config_1.uInfo.balance);
        let obj = {};
        const exist = this.isMtcodeExist(config_1.bRecord.userPayoffs, upfd.mtcode);
        if (!exist) {
            config_1.uInfo.balance = (0, globalAction_1.numPlus)(config_1.uInfo.balance, upfd.amount);
            config_1.bRecord.userPayoffs.push(Object.assign(Object.assign({}, upfd), { outAmount: config_1.uInfo.balance }));
            obj = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
        }
        else {
            obj = { balance: exist.outAmount, currency: config_1.uInfo.currency };
        }
        magic_1.logger.info('user/payoff-balance-后==', config_1.uInfo.balance);
        return (0, config_1.responSess)(obj);
    }
    gameRefund(data) {
        magic_1.logger.info("game/refund传入参数::", data.body);
        const { mtcode } = data.body;
        if (!mtcode) {
            return (0, config_1.responFail)('1003');
        }
        magic_1.logger.info("bRecord.gameBets==", config_1.bRecord.gameBets);
        const list = [...config_1.bRecord.gameBets, ...config_1.bRecord.gameRollouts, ...config_1.bRecord.gameTakealls];
        const res = this.isMtcodeExist(list, mtcode);
        if (!res) {
            return (0, config_1.responFail)('1014');
        }
        magic_1.logger.info('game/refund-balance-前==', config_1.uInfo.balance);
        let obj = {};
        const exist = this.isMtcodeExist(config_1.bRecord.gameRefunds, mtcode);
        if (!exist) {
            config_1.uInfo.balance = (0, globalAction_1.numPlus)(config_1.uInfo.balance, res.amount);
            obj = { balance: config_1.uInfo.balance, currency: config_1.uInfo.currency };
            config_1.bRecord.gameRefunds.push({ mtcode, balance: config_1.uInfo.balance });
        }
        else {
            obj = { balance: exist.balance, currency: config_1.uInfo.currency };
        }
        magic_1.logger.info('game/refund-balance-后==', config_1.uInfo.balance);
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
    __param(0, (0, magic_1.CtxParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransController.prototype, "gameRefund", null);
TransController = __decorate([
    (0, magic_1.Controller)('transaction'),
    (0, magic_1.Auth)()
], TransController);
exports.default = TransController;
