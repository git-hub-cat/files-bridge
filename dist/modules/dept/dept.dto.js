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
const { VerifyTool, IsNotEmpty, IsNumber, MunSize, Limit, MultipleType } = magic_1.validator;
let DeptDto = class DeptDto {
};
__decorate([
    IsNotEmpty('name不能为空'),
    __metadata("design:type", String)
], DeptDto.prototype, "name", void 0);
__decorate([
    MunSize(1, 100),
    IsNotEmpty('age不能为空'),
    IsNumber('age需要为数值'),
    __metadata("design:type", Number)
], DeptDto.prototype, "age", void 0);
__decorate([
    IsNumber('sex需要为数值'),
    __metadata("design:type", Number)
], DeptDto.prototype, "sex", void 0);
DeptDto = __decorate([
    VerifyTool()
], DeptDto);
exports.default = DeptDto;
