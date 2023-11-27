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
exports.configApplication = void 0;
var validate_1 = require("./validate");
var store_model_1 = require("../models/store.model");
var User_model_1 = require("../models/User.model");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var AuthGroup_model_1 = require("../models/AuthGroup.model");
var Status_model_1 = require("../models/Status.model");
var autoIncrementId_1 = require("../utils/autoIncrementId");
var ConfigApplication = /** @class */ (function () {
    function ConfigApplication() {
    }
    ConfigApplication.prototype.store = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_1, address, phone, cnpj, telephone, error, already, alreadyExistStatusClose, incrementNextIDStatus, _b, _c, alreadyExistStatusOpen, incrementNextIDStatus, _d, _e, store, error_1;
            var _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _h.trys.push([0, 15, , 16]);
                        _a = req.body, name_1 = _a.name, address = _a.address, phone = _a.phone, cnpj = _a.cnpj, telephone = _a.telephone;
                        error = (0, validate_1.storageCreateValidate)(req.body).error;
                        if (error) {
                            return [2 /*return*/, res
                                    .status(400)
                                    .send({ message: "Erros na valida\u00E7\u00E3o: ".concat(error.details.map(function (detail) { return detail.message; }).join(", ")) })];
                        }
                        return [4 /*yield*/, store_model_1.StoreModel.findOne()];
                    case 1:
                        already = _h.sent();
                        if ((already === null || already === void 0 ? void 0 : already.aplicationConfigurate) === true) {
                            return [2 /*return*/, res
                                    .status(401)
                                    .send({ error: true, code: "system.AlreadyConfig.Store", message: "O store ja esta configurado." })];
                        }
                        return [4 /*yield*/, Status_model_1.StatusModel.findOne({ name: "Fechado" })];
                    case 2:
                        alreadyExistStatusClose = _h.sent();
                        if (!!alreadyExistStatusClose) return [3 /*break*/, 6];
                        return [4 /*yield*/, (0, autoIncrementId_1.counterId)(Status_model_1.statusCounter)];
                    case 3:
                        incrementNextIDStatus = (_h.sent()).getNextId();
                        _c = (_b = Status_model_1.StatusModel).create;
                        _f = {};
                        return [4 /*yield*/, incrementNextIDStatus];
                    case 4: return [4 /*yield*/, _c.apply(_b, [(_f.id = _h.sent(), _f.name = "Fechado", _f)])];
                    case 5:
                        _h.sent();
                        _h.label = 6;
                    case 6: return [4 /*yield*/, Status_model_1.StatusModel.findOne({ name: "Aberto" })];
                    case 7:
                        alreadyExistStatusOpen = _h.sent();
                        if (!!alreadyExistStatusOpen) return [3 /*break*/, 11];
                        return [4 /*yield*/, (0, autoIncrementId_1.counterId)(Status_model_1.statusCounter)];
                    case 8:
                        incrementNextIDStatus = (_h.sent()).getNextId();
                        _e = (_d = Status_model_1.StatusModel).create;
                        _g = {};
                        return [4 /*yield*/, incrementNextIDStatus];
                    case 9: return [4 /*yield*/, _e.apply(_d, [(_g.id = _h.sent(), _g.name = "Aberto", _g)])];
                    case 10:
                        _h.sent();
                        _h.label = 11;
                    case 11:
                        if (!!already) return [3 /*break*/, 13];
                        return [4 /*yield*/, store_model_1.StoreModel.create({
                                name: name_1,
                                address: address,
                                phone: phone,
                                cnpj: cnpj,
                                telephone: telephone,
                                aplicationConfigurate: true,
                            })];
                    case 12:
                        store = _h.sent();
                        return [2 /*return*/, res.status(201).send({ store: store })];
                    case 13: return [2 /*return*/, res.status(400).send({ error: true, code: "system.Error", message: "Houve um erro ao criar o store" })];
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        error_1 = _h.sent();
                        console.log(error_1);
                        res.status(400).send({ error: true, code: "system.Error", message: "Houve um erro ao criar o store" });
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    ConfigApplication.prototype.userAdmin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_2, phone, email, password, error, already, authGroupId, incrementIDUser, userAdmin, _b, _c, error_2;
            var _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 6, , 7]);
                        _a = req.body, name_2 = _a.name, phone = _a.phone, email = _a.email, password = _a.password;
                        error = (0, validate_1.registerAdminValidate)(req.body).error;
                        if (error) {
                            return [2 /*return*/, res.status(400).send({ message: error })];
                        }
                        return [4 /*yield*/, store_model_1.StoreModel.findOne()];
                    case 1:
                        already = _e.sent();
                        if ((already === null || already === void 0 ? void 0 : already.alreadyExistAdmin) === true) {
                            return [2 /*return*/, res.status(401).send({
                                    error: true,
                                    code: "system.AlreadyConfig.Admin",
                                    message: "O sistema ja esta configurado e com admin master configurado",
                                })];
                        }
                        if (!already) {
                            return [2 /*return*/, res.status(400).send({ error: true, code: "system.Error", message: "Algum erro ocorreu." })];
                        }
                        authGroupId = function () { return __awaiter(_this, void 0, void 0, function () {
                            var authGroupAlreadyExist, incrementNextIDAuthGroup, authGroup, _a, _b;
                            var _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0: return [4 /*yield*/, AuthGroup_model_1.AuthGroupModel.findOne({ name: "adminMaster" })];
                                    case 1:
                                        authGroupAlreadyExist = _d.sent();
                                        if (!!authGroupAlreadyExist) return [3 /*break*/, 5];
                                        return [4 /*yield*/, (0, autoIncrementId_1.counterId)(AuthGroup_model_1.authGroupCounter)];
                                    case 2:
                                        incrementNextIDAuthGroup = (_d.sent()).getNextId();
                                        _b = (_a = AuthGroup_model_1.AuthGroupModel).create;
                                        _c = {};
                                        return [4 /*yield*/, incrementNextIDAuthGroup];
                                    case 3: return [4 /*yield*/, _b.apply(_a, [(_c.id = _d.sent(),
                                                _c.name = "adminMaster",
                                                _c.permissions = {
                                                    create: ["adminMaster"],
                                                    deleted: ["adminMaster"],
                                                    update: ["adminMaster"],
                                                    view: ["adminMaster"],
                                                },
                                                _c)])];
                                    case 4:
                                        authGroup = _d.sent();
                                        return [2 /*return*/, authGroup._id];
                                    case 5: return [2 /*return*/, authGroupAlreadyExist._id];
                                }
                            });
                        }); };
                        return [4 /*yield*/, (0, autoIncrementId_1.counterId)(User_model_1.UserCounter)];
                    case 2:
                        incrementIDUser = (_e.sent()).getNextId();
                        _c = (_b = User_model_1.User).create;
                        _d = {};
                        return [4 /*yield*/, incrementIDUser];
                    case 3:
                        _d.id = _e.sent(),
                            _d.name = name_2,
                            _d.phone = phone,
                            _d.email = email,
                            _d.password = bcryptjs_1.default.hashSync(password);
                        return [4 /*yield*/, authGroupId()];
                    case 4: return [4 /*yield*/, _c.apply(_b, [(_d.group = _e.sent(),
                                _d)])];
                    case 5:
                        userAdmin = _e.sent();
                        (already.alreadyExistAdmin = true), already.save();
                        return [2 /*return*/, res.status(201).send(userAdmin._id)];
                    case 6:
                        error_2 = _e.sent();
                        console.log(error_2);
                        res.status(401).send({ error: true, code: "system.Error", message: "Houve um erro ao criar o admin master" });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ConfigApplication.prototype.updateStore = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_3, address, phone, cnpj, telephone, alreadyExistStore, store, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, name_3 = _a.name, address = _a.address, phone = _a.phone, cnpj = _a.cnpj, telephone = _a.telephone;
                        return [4 /*yield*/, store_model_1.StoreModel.findOne()];
                    case 1:
                        alreadyExistStore = _b.sent();
                        if ((alreadyExistStore === null || alreadyExistStore === void 0 ? void 0 : alreadyExistStore.alreadyExistAdmin) === false) {
                            return [2 /*return*/, res
                                    .status(401)
                                    .send({ error: true, code: "system.notConfig.store", message: "Configure o sistema antes de prosseguir" })];
                        }
                        if (!alreadyExistStore) {
                            return [2 /*return*/, res.status(400).send({ error: true, code: "system.Error", message: "Algum erro ocorreu." })];
                        }
                        return [4 /*yield*/, store_model_1.StoreModel.findByIdAndUpdate(alreadyExistStore._id, {
                                $set: {
                                    name: name_3,
                                    address: address,
                                    phone: phone,
                                    cnpj: cnpj,
                                    telephone: telephone,
                                    aplicationConfigurate: true,
                                },
                            }, { new: true })];
                    case 2:
                        store = _b.sent();
                        return [2 /*return*/, res.status(201).send({ store: store })];
                    case 3:
                        error_3 = _b.sent();
                        console.log(error_3);
                        res.status(400).send({ error: true, code: "system.Error", message: "Houve um erro ao criar o store" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ConfigApplication.prototype.getInfoStore = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var alreadyExistStore, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, store_model_1.StoreModel.findOne()];
                    case 1:
                        alreadyExistStore = _a.sent();
                        if ((alreadyExistStore === null || alreadyExistStore === void 0 ? void 0 : alreadyExistStore.alreadyExistAdmin) === false) {
                            return [2 /*return*/, res
                                    .status(401)
                                    .send({ error: true, code: "system.notConfig.store", message: "Configure o sistema antes de prosseguir" })];
                        }
                        if (!alreadyExistStore) {
                            return [2 /*return*/, res.status(400).send({ error: true, code: "system.Error", message: "Algum erro ocorreu." })];
                        }
                        return [2 /*return*/, res.status(201).send(alreadyExistStore)];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        res.status(400).send({ error: true, code: "system.Error", message: "Houve um erro ao criar o store" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ConfigApplication;
}());
exports.configApplication = new ConfigApplication();
