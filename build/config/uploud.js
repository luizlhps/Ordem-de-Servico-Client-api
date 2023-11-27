"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tmpFolder = void 0;
var crypto_1 = __importDefault(require("crypto"));
var multer_1 = __importDefault(require("multer"));
var path_1 = require("path");
exports.tmpFolder = (0, path_1.resolve)(__dirname, "..", "..", "tmp");
exports.default = {
    tmpFolder: exports.tmpFolder,
    storage: multer_1.default.diskStorage({
        destination: exports.tmpFolder,
        filename: function (request, file, callback) {
            var fileHash = crypto_1.default.randomBytes(16).toString("hex");
            var fileName = "".concat(fileHash, "-").concat(file.originalname);
            return callback(null, fileName);
        },
    }),
};
