"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_controller_1 = require("./test/test.controller");
const trans_controller_1 = require("./trans/trans.controller");
const player_controller_1 = require("./trans/player.controller");
const game_controller_1 = require("./trans/game.controller");
exports.default = [
    test_controller_1.default,
    trans_controller_1.default,
    player_controller_1.default,
    game_controller_1.default
];
