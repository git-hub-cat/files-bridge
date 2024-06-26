"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const magic_1 = require("./magic");
const modules_1 = require("./modules");
const globalAction_1 = require("./utils/globalAction");
const jwtAuth_1 = require("./middlewares/jwtAuth");
const staticAssets_1 = require("./middlewares/staticAssets");
const resetRouErr_1 = require("./middlewares/resetRouErr");
const magic = new magic_1.MagicFactory({
    controllers: modules_1.default,
    middleAuth: jwtAuth_1.default,
    resetRouErr: resetRouErr_1.default,
    middleware: [...staticAssets_1.default],
});
!async function () {
    try {
        const port = globalAction_1.isDev ? 1130 : 80;
        await magic.listen(port);
        magic_1.logger.info("服务已启动...端口：" + port);
    }
    catch (err) {
        magic_1.logger.error("启动失败::", err);
    }
}();
