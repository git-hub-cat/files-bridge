"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class T {
    constructor() {
        this.msg = "";
        this.code = 0;
        this.describe = "";
        this.data = null;
    }
}
class Struct extends T {
    constructor(d) {
        super();
        if (d.describe === undefined)
            d.describe = "";
        if (d.data === undefined)
            d.data = null;
        this.msg = d.msg;
        this.code = d.code;
        this.describe = d.describe;
        this.data = d.data;
    }
}
exports.default = Struct;
