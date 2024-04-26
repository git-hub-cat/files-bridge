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
exports.UserPayoffDto = exports.GameCreditDto = exports.GameDebitDto = exports.GameRollinDto = exports.GameTakeallDto = exports.GameRolloutDto = exports.GameEndroundDto = exports.GameBetDto = void 0;
const magic_1 = require("../../magic");
const { VerifyTool, IsString, IsNumber, IsNotEmpty, MunSize, Limit, MultipleType } = magic_1.validator;
const accountStr = 'account需要为字符串', eventTimeStr = 'eventTime需要为字符串';
const gamehallStr = 'gamehall需要为字符串', gamecodeStr = 'gamecode需要为字符串';
const roundidStr = 'roundid需要为字符串', amountStr = 'amount需要为字符串';
const mtcodeStr = 'mtcode需要为字符串', createTimeStr = 'createTime需要为字符串';
let GameBetDto = class GameBetDto {
};
__decorate([
    IsString(accountStr),
    __metadata("design:type", String)
], GameBetDto.prototype, "account", void 0);
__decorate([
    IsString(gamehallStr),
    __metadata("design:type", String)
], GameBetDto.prototype, "gamehall", void 0);
__decorate([
    IsString(gamecodeStr),
    __metadata("design:type", String)
], GameBetDto.prototype, "gamecode", void 0);
__decorate([
    IsString(roundidStr),
    __metadata("design:type", String)
], GameBetDto.prototype, "roundid", void 0);
__decorate([
    IsString(mtcodeStr),
    __metadata("design:type", String)
], GameBetDto.prototype, "mtcode", void 0);
__decorate([
    IsString(eventTimeStr),
    __metadata("design:type", String)
], GameBetDto.prototype, "eventTime", void 0);
__decorate([
    IsString(amountStr),
    __metadata("design:type", String)
], GameBetDto.prototype, "amount", void 0);
GameBetDto = __decorate([
    VerifyTool()
], GameBetDto);
exports.GameBetDto = GameBetDto;
let GameEndroundDto = class GameEndroundDto {
};
__decorate([
    IsString(accountStr),
    __metadata("design:type", String)
], GameEndroundDto.prototype, "account", void 0);
__decorate([
    IsString(gamehallStr),
    __metadata("design:type", String)
], GameEndroundDto.prototype, "gamehall", void 0);
__decorate([
    IsString(gamecodeStr),
    __metadata("design:type", String)
], GameEndroundDto.prototype, "gamecode", void 0);
__decorate([
    IsString('data需要为字符串'),
    __metadata("design:type", String)
], GameEndroundDto.prototype, "data", void 0);
__decorate([
    IsString(createTimeStr),
    __metadata("design:type", String)
], GameEndroundDto.prototype, "createTime", void 0);
GameEndroundDto = __decorate([
    VerifyTool()
], GameEndroundDto);
exports.GameEndroundDto = GameEndroundDto;
let GameRolloutDto = class GameRolloutDto {
};
__decorate([
    IsString(accountStr),
    __metadata("design:type", String)
], GameRolloutDto.prototype, "account", void 0);
__decorate([
    IsString(gamehallStr),
    __metadata("design:type", String)
], GameRolloutDto.prototype, "gamehall", void 0);
__decorate([
    IsString(gamecodeStr),
    __metadata("design:type", String)
], GameRolloutDto.prototype, "gamecode", void 0);
__decorate([
    IsString(roundidStr),
    __metadata("design:type", String)
], GameRolloutDto.prototype, "roundid", void 0);
__decorate([
    IsString(mtcodeStr),
    __metadata("design:type", String)
], GameRolloutDto.prototype, "mtcode", void 0);
__decorate([
    IsString(eventTimeStr),
    __metadata("design:type", String)
], GameRolloutDto.prototype, "eventTime", void 0);
__decorate([
    IsString(amountStr),
    __metadata("design:type", String)
], GameRolloutDto.prototype, "amount", void 0);
GameRolloutDto = __decorate([
    VerifyTool()
], GameRolloutDto);
exports.GameRolloutDto = GameRolloutDto;
let GameTakeallDto = class GameTakeallDto {
};
__decorate([
    IsString(accountStr),
    __metadata("design:type", String)
], GameTakeallDto.prototype, "account", void 0);
__decorate([
    IsString(gamehallStr),
    __metadata("design:type", String)
], GameTakeallDto.prototype, "gamehall", void 0);
__decorate([
    IsString(gamecodeStr),
    __metadata("design:type", String)
], GameTakeallDto.prototype, "gamecode", void 0);
__decorate([
    IsString(roundidStr),
    __metadata("design:type", String)
], GameTakeallDto.prototype, "roundid", void 0);
__decorate([
    IsString(mtcodeStr),
    __metadata("design:type", String)
], GameTakeallDto.prototype, "mtcode", void 0);
__decorate([
    IsString(eventTimeStr),
    __metadata("design:type", String)
], GameTakeallDto.prototype, "eventTime", void 0);
GameTakeallDto = __decorate([
    VerifyTool()
], GameTakeallDto);
exports.GameTakeallDto = GameTakeallDto;
let GameRollinDto = class GameRollinDto {
};
__decorate([
    IsString(accountStr),
    __metadata("design:type", String)
], GameRollinDto.prototype, "account", void 0);
__decorate([
    IsString(eventTimeStr),
    __metadata("design:type", String)
], GameRollinDto.prototype, "eventTime", void 0);
__decorate([
    IsString(gamehallStr),
    __metadata("design:type", String)
], GameRollinDto.prototype, "gamehall", void 0);
__decorate([
    IsString(gamecodeStr),
    __metadata("design:type", String)
], GameRollinDto.prototype, "gamecode", void 0);
__decorate([
    IsString(roundidStr),
    __metadata("design:type", String)
], GameRollinDto.prototype, "roundid", void 0);
__decorate([
    IsNumber('validbet需要为数值'),
    __metadata("design:type", Number)
], GameRollinDto.prototype, "validbet", void 0);
__decorate([
    IsNumber('bet需要为数值'),
    __metadata("design:type", Number)
], GameRollinDto.prototype, "bet", void 0);
__decorate([
    IsNumber('win需要为数值'),
    __metadata("design:type", Number)
], GameRollinDto.prototype, "win", void 0);
__decorate([
    IsString("amount需要为字符串"),
    __metadata("design:type", String)
], GameRollinDto.prototype, "amount", void 0);
__decorate([
    IsString(mtcodeStr),
    __metadata("design:type", String)
], GameRollinDto.prototype, "mtcode", void 0);
__decorate([
    IsString(createTimeStr),
    __metadata("design:type", String)
], GameRollinDto.prototype, "createTime", void 0);
__decorate([
    IsNumber('rake需要为数值'),
    __metadata("design:type", Number)
], GameRollinDto.prototype, "rake", void 0);
__decorate([
    IsString('gametype需要为数值'),
    __metadata("design:type", String)
], GameRollinDto.prototype, "gametype", void 0);
GameRollinDto = __decorate([
    VerifyTool()
], GameRollinDto);
exports.GameRollinDto = GameRollinDto;
let GameDebitDto = class GameDebitDto {
};
__decorate([
    IsString(accountStr),
    __metadata("design:type", String)
], GameDebitDto.prototype, "account", void 0);
__decorate([
    IsString(eventTimeStr),
    __metadata("design:type", String)
], GameDebitDto.prototype, "eventTime", void 0);
__decorate([
    IsString(gamehallStr),
    __metadata("design:type", String)
], GameDebitDto.prototype, "gamehall", void 0);
__decorate([
    IsString(gamecodeStr),
    __metadata("design:type", String)
], GameDebitDto.prototype, "gamecode", void 0);
__decorate([
    IsString(roundidStr),
    __metadata("design:type", String)
], GameDebitDto.prototype, "roundid", void 0);
__decorate([
    IsString(amountStr),
    __metadata("design:type", String)
], GameDebitDto.prototype, "amount", void 0);
__decorate([
    IsString(mtcodeStr),
    __metadata("design:type", String)
], GameDebitDto.prototype, "mtcode", void 0);
GameDebitDto = __decorate([
    VerifyTool()
], GameDebitDto);
exports.GameDebitDto = GameDebitDto;
let GameCreditDto = class GameCreditDto {
};
__decorate([
    IsString(accountStr),
    __metadata("design:type", String)
], GameCreditDto.prototype, "account", void 0);
__decorate([
    IsString(eventTimeStr),
    __metadata("design:type", String)
], GameCreditDto.prototype, "eventTime", void 0);
__decorate([
    IsString(gamehallStr),
    __metadata("design:type", String)
], GameCreditDto.prototype, "gamehall", void 0);
__decorate([
    IsString(gamecodeStr),
    __metadata("design:type", String)
], GameCreditDto.prototype, "gamecode", void 0);
__decorate([
    IsString(roundidStr),
    __metadata("design:type", String)
], GameCreditDto.prototype, "roundid", void 0);
__decorate([
    IsString(amountStr),
    __metadata("design:type", String)
], GameCreditDto.prototype, "amount", void 0);
__decorate([
    IsString(mtcodeStr),
    __metadata("design:type", String)
], GameCreditDto.prototype, "mtcode", void 0);
GameCreditDto = __decorate([
    VerifyTool()
], GameCreditDto);
exports.GameCreditDto = GameCreditDto;
let UserPayoffDto = class UserPayoffDto {
};
__decorate([
    IsString(accountStr),
    __metadata("design:type", String)
], UserPayoffDto.prototype, "account", void 0);
__decorate([
    IsString(eventTimeStr),
    __metadata("design:type", String)
], UserPayoffDto.prototype, "eventTime", void 0);
__decorate([
    IsString(amountStr),
    __metadata("design:type", String)
], UserPayoffDto.prototype, "amount", void 0);
__decorate([
    IsString(mtcodeStr),
    __metadata("design:type", String)
], UserPayoffDto.prototype, "mtcode", void 0);
UserPayoffDto = __decorate([
    VerifyTool()
], UserPayoffDto);
exports.UserPayoffDto = UserPayoffDto;
