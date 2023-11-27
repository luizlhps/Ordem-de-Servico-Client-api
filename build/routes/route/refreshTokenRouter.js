"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenRouter = void 0;
var express_1 = __importDefault(require("express"));
var handleRefreshToken_1 = require("../../controllers/handleRefreshToken");
exports.refreshTokenRouter = (0, express_1.default)();
exports.refreshTokenRouter.post("/", handleRefreshToken_1.handleRefreshToken.execute);
