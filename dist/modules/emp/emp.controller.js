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
const jwtAuth_1 = require("../../middlewares/jwtAuth");
const emp_serve_1 = require("./emp.serve");
const emp_dto_1 = require("./emp.dto");
const paging_dto_1 = require("../../utils/paging.dto");
let EmpController = class EmpController {
    async empList() {
        const res = await emp_serve_1.default.finds();
        return res[0];
    }
    async deptList(emp, pag) {
        console.log(emp, pag);
        const res = await emp_serve_1.default.findsDept();
        return res;
    }
    async findByPk(name, age) {
        magic_1.logger.info(name, age);
        const res = await emp_serve_1.default.findByPk();
        return res;
    }
    async findOneEmp(sex, cnt) {
        const res = await emp_serve_1.default.findOne();
        return res;
    }
    async primevalEmp() {
        const res = await emp_serve_1.default.primeval();
        return res;
    }
    async bindParam() {
        const res = await emp_serve_1.default.bindParams();
        return res;
    }
    async login() {
        return (0, jwtAuth_1.createToken)({ userId: '111111' });
    }
    paramsFunc(id) {
    }
    async testAuth(user) {
        return 'testAuth';
    }
};
__decorate([
    (0, magic_1.Get)('empList'),
    (0, magic_1.NoAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmpController.prototype, "empList", null);
__decorate([
    (0, magic_1.Get)("deptList"),
    (0, magic_1.NoAuth)(),
    __param(0, (0, magic_1.Query)()),
    __param(1, (0, magic_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [emp_dto_1.default, paging_dto_1.default]),
    __metadata("design:returntype", Promise)
], EmpController.prototype, "deptList", null);
__decorate([
    (0, magic_1.Get)("findByPkEmp"),
    (0, magic_1.NoAuth)(),
    __param(0, (0, magic_1.Query)('name')),
    __param(1, (0, magic_1.Query)('age')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], EmpController.prototype, "findByPk", null);
__decorate([
    (0, magic_1.NoAuth)(),
    (0, magic_1.Get)("findOneEmp"),
    __param(0, (0, magic_1.Query)('sex')),
    __param(1, (0, magic_1.Query)('cnt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], EmpController.prototype, "findOneEmp", null);
__decorate([
    (0, magic_1.Get)("primevalEmp"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmpController.prototype, "primevalEmp", null);
__decorate([
    (0, magic_1.Get)("bindParam"),
    (0, magic_1.NoAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmpController.prototype, "bindParam", null);
__decorate([
    (0, magic_1.NoAuth)(),
    (0, magic_1.Get)("login"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmpController.prototype, "login", null);
__decorate([
    (0, magic_1.Get)("/package/:id"),
    (0, magic_1.NoAuth)(),
    __param(0, (0, magic_1.Params)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EmpController.prototype, "paramsFunc", null);
__decorate([
    (0, magic_1.Get)("testAuth"),
    __param(0, (0, magic_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmpController.prototype, "testAuth", null);
EmpController = __decorate([
    (0, magic_1.Controller)('emp'),
    (0, magic_1.Auth)()
], EmpController);
exports.default = EmpController;
