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
const { VerifyTool, IsNotEmpty, IsNumber, MunSize, MultipleType, IsString } = magic_1.validator;
let EmpDto = class EmpDto {
};
__decorate([
    IsNotEmpty('name不能为空'),
    IsString('name需要为字符串'),
    __metadata("design:type", String)
], EmpDto.prototype, "name", void 0);
__decorate([
    MunSize(1, 100),
    IsNotEmpty('age不能为空'),
    IsNumber('age需要为数值'),
    __metadata("design:type", Number)
], EmpDto.prototype, "age", void 0);
EmpDto = __decorate([
    VerifyTool()
], EmpDto);
exports.default = EmpDto;
