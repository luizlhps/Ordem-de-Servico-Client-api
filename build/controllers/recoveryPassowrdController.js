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
exports.passowordRecoveryController = void 0;
var User_model_1 = require("../models/User.model");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var crypto_1 = __importDefault(require("crypto"));
var validate_1 = require("./validate");
var PasswordRecovery = /** @class */ (function () {
    function PasswordRecovery() {
    }
    PasswordRecovery.prototype.ForgetPassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, user, oneHour, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        email = req.body.email;
                        return [4 /*yield*/, User_model_1.User.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).json({ message: "Usuário não encontrado" })];
                        }
                        oneHour = 3600000;
                        user.passwordRecovery = crypto_1.default.randomBytes(20).toString("hex");
                        user.passwordExpire = new Date(Date.now() + oneHour);
                        user.save();
                        res.send(user);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.warn(error_1);
                        res.status(400).send({ message: error_1 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PasswordRecovery.prototype.resetPassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, password, token, error, user, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, password = _a.password, token = _a.token;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        error = (0, validate_1.recoveryPasswordValidate)(req.body).error;
                        if (error)
                            return [2 /*return*/, res.status(400).send({ message: "senha inválida" })];
                        return [4 /*yield*/, User_model_1.User.findOne({ passwordRecovery: token })];
                    case 2:
                        user = _b.sent();
                        if (!user)
                            return [2 /*return*/, res.status(400).send({ message: "Usuário não encontrado" })];
                        if (user.passwordExpire !== null) {
                            if (user.passwordExpire < new Date(Date.now()))
                                return [2 /*return*/, res.status(400).send({ message: "Tempo Expirado" })];
                        }
                        user.password = bcryptjs_1.default.hashSync(password);
                        user.passwordExpire = null;
                        user.passwordRecovery = null;
                        user.save();
                        res.send(user);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return PasswordRecovery;
}());
exports.passowordRecoveryController = new PasswordRecovery();
