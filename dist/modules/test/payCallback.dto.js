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
const { VerifyTool, IsString, IsNumber, IsNotEmpty, MunSize, Limit, MultipleType } = magic_1.validator;
let PayCallbackDto = class PayCallbackDto {
};
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], PayCallbackDto.prototype, "code", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], PayCallbackDto.prototype, "amount", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], PayCallbackDto.prototype, "fee", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], PayCallbackDto.prototype, "merchantOrderId", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], PayCallbackDto.prototype, "msg", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], PayCallbackDto.prototype, "orderId", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], PayCallbackDto.prototype, "payType", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], PayCallbackDto.prototype, "payUrl", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], PayCallbackDto.prototype, "realPayAmount", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], PayCallbackDto.prototype, "sign", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], PayCallbackDto.prototype, "status", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], PayCallbackDto.prototype, "traceId", void 0);
PayCallbackDto = __decorate([
    VerifyTool()
], PayCallbackDto);
exports.default = PayCallbackDto;
