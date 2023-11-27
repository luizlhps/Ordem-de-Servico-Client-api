"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localhostStorageProvider = void 0;
var fs_1 = __importDefault(require("fs"));
var uploud_1 = __importDefault(require("../../config/uploud"));
var path_1 = require("path");
var LocalhostStorageProvider = /** @class */ (function () {
    function LocalhostStorageProvider() {
        this.path = function (file, folder) {
            return (0, path_1.resolve)("".concat(uploud_1.default.tmpFolder, "/").concat(folder), file);
        };
    }
    LocalhostStorageProvider.prototype.save = function (file, folder, user) {
        return __awaiter(this, void 0, void 0, function () {
            var oldPath, newPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oldPath = (0, path_1.resolve)("".concat(uploud_1.default.tmpFolder, "/").concat(file));
                        newPath = (0, path_1.resolve)(this.path(file, folder));
                        return [4 /*yield*/, fs_1.default.promises.rename(oldPath, newPath)];
                    case 1:
                        _a.sent();
                        user.avatar = "http://localhost:".concat(process.env.PORT, "/").concat(folder, "/").concat(file);
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, file];
                }
            });
        });
    };
    LocalhostStorageProvider.prototype.delete = function (file, folder) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = file.replace("http://localhost:".concat(process.env.PORT, "/").concat(folder, "/"), "");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs_1.default.promises.stat(this.path(filePath, folder))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/];
                    case 4: return [4 /*yield*/, fs_1.default.promises.unlink(this.path(filePath, folder))];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalhostStorageProvider.prototype.cleanTmp = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var oldPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oldPath = (0, path_1.resolve)("".concat(uploud_1.default.tmpFolder, "/").concat(file));
                        return [4 /*yield*/, fs_1.default.promises.unlink(oldPath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return LocalhostStorageProvider;
}());
exports.localhostStorageProvider = new LocalhostStorageProvider();
