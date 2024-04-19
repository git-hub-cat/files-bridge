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
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const magic_1 = require("../magic");
let EmpEntity = class EmpEntity extends sequelize_1.Model {
};
__decorate([
    (0, magic_1.Column)({
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        unique: true
    }),
    __metadata("design:type", Number)
], EmpEntity.prototype, "empno", void 0);
__decorate([
    (0, magic_1.Column)({ type: sequelize_1.DataTypes.STRING, defaultValue: '' }),
    __metadata("design:type", String)
], EmpEntity.prototype, "ename", void 0);
__decorate([
    (0, magic_1.Column)({ type: sequelize_1.DataTypes.STRING }),
    __metadata("design:type", String)
], EmpEntity.prototype, "job", void 0);
__decorate([
    (0, magic_1.Column)({ type: sequelize_1.DataTypes.DOUBLE }),
    __metadata("design:type", Number)
], EmpEntity.prototype, "mgr", void 0);
__decorate([
    (0, magic_1.Column)({
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    }),
    __metadata("design:type", Date)
], EmpEntity.prototype, "hiredate", void 0);
__decorate([
    (0, magic_1.Column)({ type: sequelize_1.DataTypes.DOUBLE }),
    __metadata("design:type", Number)
], EmpEntity.prototype, "sal", void 0);
__decorate([
    (0, magic_1.Column)({ type: sequelize_1.DataTypes.DOUBLE }),
    __metadata("design:type", Number)
], EmpEntity.prototype, "comm", void 0);
__decorate([
    (0, magic_1.Column)({ type: sequelize_1.DataTypes.INTEGER }),
    __metadata("design:type", Number)
], EmpEntity.prototype, "deptno", void 0);
EmpEntity = __decorate([
    (0, magic_1.Entity)("emp", db_1.default)
], EmpEntity);
exports.default = EmpEntity;
