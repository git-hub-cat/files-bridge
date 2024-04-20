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
const globalAction_1 = require("../../utils/globalAction");
const httpService_1 = require("../../utils/httpService");
const payCallback_dto_1 = require("./payCallback.dto");
const nanoid_1 = require("nanoid");
let TestController = class TestController {
    async createPayOrder() {
        const data = {
            amount: "10",
            merchantOrderId: (0, nanoid_1.nanoid)(),
            notifyUrl: 'http://206.119.117.177/test/payCallback',
            merchantUserId: (0, nanoid_1.nanoid)(),
        };
        magic_1.logger.info('支付参数==', data);
        const strBasic = (0, globalAction_1.strToBase64)('11095110845459:skpysepkrud8pc4zm7wc4algrt9z5h06bu');
        const opts = {
            url: 'https://pix.cashpag.com/open-api/pay/payment',
            method: 'post',
            headers: { Authorization: `Basic ${strBasic}` },
            data
        };
        magic_1.logger.info('调接口参数==', opts);
        const res = await (0, httpService_1.default)(opts);
        magic_1.logger.info("支付结果==", res);
    }
    async payCallback(pcd) {
        magic_1.logger.info("支付回调数据==", pcd);
    }
};
__decorate([
    (0, magic_1.Get)('createPayOrder'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestController.prototype, "createPayOrder", null);
__decorate([
    (0, magic_1.Post)('payCallback'),
    __param(0, (0, magic_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payCallback_dto_1.default]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "payCallback", null);
TestController = __decorate([
    (0, magic_1.Controller)('test')
], TestController);
exports.default = TestController;
