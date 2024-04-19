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
const dept_dto_1 = require("./dept.dto");
const dept_serve_1 = require("./dept.serve");
const { ParamException } = magic_1.exception;
let DeptController = class DeptController {
    async deptList(name, age, efg) {
        magic_1.logger.info(name, age, efg);
        return await this.deptServe.findsDept();
    }
    async findOne(name) {
        const list = await this.deptServe.findsDept();
        console.log("name==", name);
        return list[0];
    }
    async deptFind(name, efg, sex, id) {
        console.log(sex, id, name);
        console.log(efg);
    }
    async fileUpload(files) {
        const urls = (0, globalAction_1.dealFile)(files);
        if (!urls)
            throw new ParamException("文件上传失败");
        return urls;
    }
};
__decorate([
    (0, magic_1.Inject)(),
    __metadata("design:type", dept_serve_1.default)
], DeptController.prototype, "deptServe", void 0);
__decorate([
    (0, magic_1.Get)('deptList'),
    (0, magic_1.NoAuth)(),
    __param(0, (0, magic_1.Query)("name")),
    __param(1, (0, magic_1.Query)("age")),
    __param(2, (0, magic_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, dept_dto_1.default]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "deptList", null);
__decorate([
    (0, magic_1.Post)('findOne'),
    (0, magic_1.NoAuth)(),
    __param(0, (0, magic_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "findOne", null);
__decorate([
    (0, magic_1.NoAuth)(),
    (0, magic_1.Post)('deptFind'),
    __param(0, (0, magic_1.Body)('name')),
    __param(1, (0, magic_1.Query)()),
    __param(2, (0, magic_1.Query)('sex')),
    __param(3, (0, magic_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dept_dto_1.default, Number, String]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "deptFind", null);
__decorate([
    (0, magic_1.NoAuth)(),
    (0, magic_1.Post)('fileUpload'),
    __param(0, (0, magic_1.Files)("file")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "fileUpload", null);
DeptController = __decorate([
    (0, magic_1.Controller)('dept'),
    (0, magic_1.Auth)()
], DeptController);
exports.default = DeptController;
