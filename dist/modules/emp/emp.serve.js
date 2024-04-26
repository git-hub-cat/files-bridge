"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../../db");
const EmpEntity_1 = require("../../entitys/EmpEntity");
const DeptEntity_1 = require("../../entitys/DeptEntity");
class EmpServe {
    async finds() {
        const emps = await EmpEntity_1.default.findAll();
        return emps;
    }
    async findsDept() {
        const depts = await DeptEntity_1.default.findAll();
        return depts;
    }
    async findByPk() {
        const result = await EmpEntity_1.default.findByPk("7369");
        return result;
    }
    async findOne() {
        const result = await EmpEntity_1.default.findOne({ where: { ename: 'ADAMS' } });
        return result;
    }
    async primeval() {
        const emps = await db_1.default.query("SELECT * FROM `emp`", { type: sequelize_1.QueryTypes.SELECT });
        return emps;
    }
    async bindParams() {
        const sql = "SELECT * FROM `empaa` WHERE ename = $ename";
        const emp = await db_1.default.query(sql, {
            type: sequelize_1.QueryTypes.SELECT,
            bind: {
                ename: "FORD"
            },
        });
        return emp;
    }
}
exports.default = new EmpServe();
