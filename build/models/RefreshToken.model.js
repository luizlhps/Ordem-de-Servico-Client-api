"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenModel = void 0;
var mongoose_1 = require("mongoose");
var refreshTokenModel = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, require: true },
});
exports.RefreshTokenModel = (0, mongoose_1.model)("refreshToken", refreshTokenModel);
