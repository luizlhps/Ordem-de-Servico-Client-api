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
Object.defineProperty(exports, "__esModule", { value: true });
exports.photoController = void 0;
var User_model_1 = require("../models/User.model");
var StorageProvider_1 = require("../providers/StorageProvider");
var AuthGroup_model_1 = require("../models/AuthGroup.model");
var store_model_1 = require("../models/store.model");
var PhotoController = /** @class */ (function () {
    function PhotoController() {
    }
    PhotoController.prototype.UploudImage = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var file, avatar_file, user, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        file = req.file;
                        if (!file)
                            return [2 /*return*/, res.status(400).send("É necessário um arquivo")];
                        avatar_file = file.filename;
                        return [4 /*yield*/, User_model_1.User.findById({ _id: (_a = req.userObj) === null || _a === void 0 ? void 0 : _a._id })];
                    case 1:
                        user = _b.sent();
                        if (!user)
                            return [2 /*return*/, res.status(404).send("Usuário não encontrado")];
                        if (!user.avatar) return [3 /*break*/, 3];
                        return [4 /*yield*/, StorageProvider_1.storageProvider.delete(user.avatar, "avatar")];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: 
                    //create file in store
                    return [4 /*yield*/, StorageProvider_1.storageProvider.save(avatar_file, "avatar", user)];
                    case 4:
                        //create file in store
                        _b.sent();
                        return [4 /*yield*/, user.save()];
                    case 5:
                        _b.sent();
                        res.status(200).json("atualizado com sucesso");
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _b.sent();
                        console.log(error_1);
                        res.status(500).send("Houve um erro no servidor");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PhotoController.prototype.UploudImageAdmin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var group, user, file, avatar_file, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, AuthGroup_model_1.AuthGroupModel.findOne({ name: "adminMaster" })];
                    case 1:
                        group = _a.sent();
                        if (!group)
                            return [2 /*return*/, res.status(404).send("As permissões do adminMaster não foi encontrado")];
                        return [4 /*yield*/, User_model_1.User.findOne({ group: group._id })];
                    case 2:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, res.status(404).send("Usuário não encontrado")];
                        file = req.file;
                        if (!file)
                            return [2 /*return*/, next()];
                        avatar_file = file.filename;
                        if (!user.avatar) return [3 /*break*/, 4];
                        return [4 /*yield*/, StorageProvider_1.storageProvider.cleanTmp(avatar_file)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.status(401).send({
                                error: true,
                                code: "systemconfig.UserAdmin.AlreadyExist",
                                message: "Você não pode editar novamente a foto do admin nesta rota",
                            })];
                    case 4:
                        if (!user.avatar) return [3 /*break*/, 6];
                        return [4 /*yield*/, StorageProvider_1.storageProvider.delete(user.avatar, "avatar")];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: 
                    //create file in store
                    return [4 /*yield*/, StorageProvider_1.storageProvider.save(avatar_file, "avatar", user)];
                    case 7:
                        //create file in store
                        _a.sent();
                        return [4 /*yield*/, user.save()];
                    case 8:
                        _a.sent();
                        res.status(200).json("atualizado com sucesso");
                        return [3 /*break*/, 10];
                    case 9:
                        error_2 = _a.sent();
                        console.log(error_2);
                        res.status(500).send("Houve um erro no servidor");
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    PhotoController.prototype.UploudImageStore = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var file, avatar_file, store, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        file = req.file;
                        if (!file)
                            return [2 /*return*/, next()];
                        avatar_file = file.filename;
                        return [4 /*yield*/, store_model_1.StoreModel.findOne()];
                    case 1:
                        store = _a.sent();
                        if (!store)
                            return [2 /*return*/, res.status(404).send("Loja não encontrado")];
                        if (!store.avatar) return [3 /*break*/, 3];
                        return [4 /*yield*/, StorageProvider_1.storageProvider.delete(store.avatar, "storeAvatar")];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: 
                    //create file in store
                    return [4 /*yield*/, StorageProvider_1.storageProvider.save(avatar_file, "storeAvatar", store)];
                    case 4:
                        //create file in store
                        _a.sent();
                        return [4 /*yield*/, store.save()];
                    case 5:
                        _a.sent();
                        res.status(200).json("atualizado com sucesso");
                        return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        console.log(error_3);
                        res.status(500).send("Houve um erro no servidor");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PhotoController.prototype.UploudImageStoreConfig = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var file, avatar_file, store, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        file = req.file;
                        if (!file)
                            return [2 /*return*/, next()];
                        avatar_file = file.filename;
                        return [4 /*yield*/, store_model_1.StoreModel.findOne()];
                    case 1:
                        store = _a.sent();
                        if (!store)
                            return [2 /*return*/, res.status(404).send("Loja não encontrado")];
                        if (!store.avatar) return [3 /*break*/, 3];
                        return [4 /*yield*/, StorageProvider_1.storageProvider.cleanTmp(avatar_file)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(403).send("A loja ja esta com o avatar configurado!")];
                    case 3:
                        if (!store.avatar) return [3 /*break*/, 5];
                        return [4 /*yield*/, StorageProvider_1.storageProvider.delete(store.avatar, "storeAvatar")];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: 
                    //create file in store
                    return [4 /*yield*/, StorageProvider_1.storageProvider.save(avatar_file, "storeAvatar", store)];
                    case 6:
                        //create file in store
                        _a.sent();
                        return [4 /*yield*/, store.save()];
                    case 7:
                        _a.sent();
                        res.status(200).json("atualizado com sucesso");
                        return [3 /*break*/, 9];
                    case 8:
                        error_4 = _a.sent();
                        console.log(error_4);
                        res.status(500).send("Houve um erro no servidor");
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return PhotoController;
}());
exports.photoController = new PhotoController();
