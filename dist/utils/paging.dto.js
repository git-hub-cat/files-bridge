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
const magic_1 = require("../magic");
const { VerifyTool, IsNotEmpty, IsNumber, IsInt, Max, Min } = magic_1.validator;
let PagingDto = class PagingDto {
};
__decorate([
    IsNotEmpty(),
    Max(1000),
    Min(1),
    IsInt(),
    IsNumber("pageNum需要为数值"),
    __metadata("design:type", Number)
], PagingDto.prototype, "pageNum", void 0);
__decorate([
    IsNotEmpty(),
    Max(20),
    Min(1),
    IsInt(),
    IsNumber("pageSize需要为数值"),
    __metadata("design:type", Number)
], PagingDto.prototype, "pageSize", void 0);
PagingDto = __decorate([
    VerifyTool()
], PagingDto);
exports.default = PagingDto;
