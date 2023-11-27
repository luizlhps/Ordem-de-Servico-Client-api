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
exports.userControler = void 0;
var User_model_1 = require("../models/User.model");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var validate_1 = require("./validate");
var GenerateTokenProvider_1 = require("../providers/GenerateTokenProvider");
var GenerateRefreshTokenProvider_1 = require("../providers/GenerateRefreshTokenProvider");
var autoIncrementId_1 = require("../utils/autoIncrementId");
var AuthGroup_model_1 = require("../models/AuthGroup.model");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error, incrementId, user, _a, savedUser, error_1;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        error = (0, validate_1.registerValidate)(req.body).error;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 6]);
                        if (error)
                            return [2 /*return*/, res.status(400).send(error.message)];
                        return [4 /*yield*/, (0, autoIncrementId_1.counterId)(User_model_1.UserCounter)];
                    case 2:
                        incrementId = (_c.sent()).getNextId();
                        _a = User_model_1.User.bind;
                        _b = {};
                        return [4 /*yield*/, incrementId];
                    case 3:
                        user = new (_a.apply(User_model_1.User, [void 0, (_b.id = _c.sent(),
                                _b.name = req.body.name,
                                _b.email = req.body.email,
                                _b.phone = req.body.phone,
                                _b.group = req.body.group,
                                _b.password = bcryptjs_1.default.hashSync(req.body.password),
                                _b)]))();
                        return [4 /*yield*/, user.save()];
                    case 4:
                        savedUser = _c.sent();
                        res.status(200).json(savedUser);
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _c.sent();
                        if (error_1.code === 11000) {
                            res.status(400).send("Este e-mail já está sendo usado.");
                        }
                        else {
                            res.status(400).send(error_1);
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateProfileUser = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userID, updateFields, user, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userID = (_a = req.userObj) === null || _a === void 0 ? void 0 : _a._id;
                        updateFields = {
                            name: req.body.name,
                            phone: req.body.phone,
                            email: req.body.email,
                        };
                        if (req.body.password) {
                            updateFields.password = bcryptjs_1.default.hashSync(req.body.password);
                        }
                        return [4 /*yield*/, User_model_1.User.findByIdAndUpdate(userID, {
                                $set: updateFields,
                            }, {
                                new: true,
                                runValidators: true,
                            })];
                    case 1:
                        user = _b.sent();
                        if (!user)
                            res.status(404).json({ error: true, code: "user.notFound", message: "Usuário não encontrado" });
                        res.status(201).send(user);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        console.log(error_2);
                        res.status(500).json({ error: true, code: "user.error", message: "Erro ao atualizar" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateOfficials = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userID, userAlreadyExist, userGroup, updateFields, user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        userID = req.params.id;
                        return [4 /*yield*/, User_model_1.User.findById({ _id: userID })];
                    case 1:
                        userAlreadyExist = _a.sent();
                        return [4 /*yield*/, AuthGroup_model_1.AuthGroupModel.findOne({ name: "adminMaster" })];
                    case 2:
                        userGroup = _a.sent();
                        if (!userAlreadyExist)
                            return [2 /*return*/, res.status(404).json({ error: true, code: "user.notFound", message: "Usuário não encontrado" })];
                        if (!userGroup)
                            return [2 /*return*/, res.status(404).json({ error: true, code: "group.notFound", message: "Cargo não encontrado" })];
                        if (userAlreadyExist.group.toString() === userGroup._id.toString())
                            return [2 /*return*/, res
                                    .status(404)
                                    .json({ error: true, code: "user.unauthorized", message: "Não é permitido editar o adminMaster" })];
                        updateFields = {
                            name: req.body.name,
                            phone: req.body.phone,
                            email: req.body.email,
                            group: req.body.group,
                        };
                        if (req.body.password) {
                            updateFields.password = bcryptjs_1.default.hashSync(req.body.password);
                        }
                        return [4 /*yield*/, User_model_1.User.findByIdAndUpdate(userID, {
                                $set: updateFields,
                            }, {
                                new: true,
                                runValidators: true,
                            })];
                    case 3:
                        user = _a.sent();
                        res.status(201).send("user");
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        console.log(error_3);
                        res.status(500).json({ error: true, code: "user.error", message: "Erro ao atualizar" });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error, user, passwordMatch, access_token, refresh_token, permissions, roles, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        error = (0, validate_1.loginValidate)(req.body).error;
                        if (error)
                            return [2 /*return*/, res.status(400).send({ message: error.message })];
                        return [4 /*yield*/, User_model_1.User.findOne({ email: req.body.email }).populate("group")];
                    case 1:
                        user = (_a.sent());
                        if (!user) {
                            return [2 /*return*/, res.status(400).send("email ou senha incorretos")];
                        }
                        passwordMatch = bcryptjs_1.default.compareSync(req.body.password, user.password);
                        if (!passwordMatch) {
                            return [2 /*return*/, res.status(400).send("email ou senha incorretos")];
                        }
                        return [4 /*yield*/, GenerateTokenProvider_1.generateTokenProvider.exec(user._id)];
                    case 2:
                        access_token = _a.sent();
                        return [4 /*yield*/, GenerateRefreshTokenProvider_1.generateRefreshTokenProvider.exec(user._id)];
                    case 3:
                        refresh_token = _a.sent();
                        permissions = user.group.permissions;
                        roles = {
                            _id: user.group._id,
                            name: user.group.name,
                        };
                        res.header("Authorization", access_token);
                        res.status(200).json({ accessToken: access_token, refreshToken: refresh_token, roles: roles, permissions: permissions });
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userAlredyExist, isAdmin, user, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        id = req.params.id;
                        return [4 /*yield*/, User_model_1.User.findById(id)];
                    case 1:
                        userAlredyExist = _a.sent();
                        if (!userAlredyExist)
                            return [2 /*return*/, res.status(404).json({ error: true, code: "user.error", message: "Usuário não existe" })];
                        if (userAlredyExist.deleted === true)
                            return [2 /*return*/, res.status(404).json({ error: true, code: "user.error", message: "O Usuário já esta deletado" })];
                        return [4 /*yield*/, AuthGroup_model_1.AuthGroupModel.findById(userAlredyExist === null || userAlredyExist === void 0 ? void 0 : userAlredyExist.group)];
                    case 2:
                        isAdmin = _a.sent();
                        if (!isAdmin)
                            return [2 /*return*/, res.status(404).send({ error: true, code: "user.error", message: "houve um erro ao encontrar o cargo" })];
                        if (isAdmin.name === "adminMaster")
                            return [2 /*return*/, res
                                    .status(403)
                                    .send({ error: true, code: "user.error", message: "Não é possivel apagar o adminMaster" })];
                        return [4 /*yield*/, User_model_1.User.findByIdAndUpdate(id, {
                                $set: {
                                    deleted: true,
                                },
                            }, { new: true })];
                    case 3:
                        user = _a.sent();
                        res.status(200).json({ message: "Usuário deletado com sucesso!!" });
                        return [3 /*break*/, 5];
                    case 4:
                        error_5 = _a.sent();
                        console.log(error_5);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, filter, _b, page, _c, limit, deleted, transformFilterInObject, searchFilter, numberId, deletedFilter, totalCount, totalCountWithoutAdminMaster, user, filteredUsers, error_6;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = req.query, filter = _a.filter, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c, deleted = _a.deleted;
                        transformFilterInObject = filter && typeof filter === "string" ? JSON.parse(filter) : undefined;
                        searchFilter = (transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.search) ? transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.search : "";
                        numberId = Number(transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.search);
                        deletedFilter = function () {
                            if (deleted === "true")
                                return true;
                            if (deleted === "false")
                                return false;
                            return null;
                        };
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, User_model_1.User.countDocuments({
                                $and: [
                                    {
                                        $or: [{ name: { $regex: searchFilter, $options: "i" } }, { id: numberId ? numberId : null }],
                                    },
                                    deleted ? { deleted: deletedFilter() } : {},
                                    //Filter of date
                                    (transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.dateFrom) && (transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.dateTo)
                                        ? {
                                            createdAt: {
                                                $gte: new Date(transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.dateFrom),
                                                $lte: new Date(transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.dateTo),
                                            },
                                        }
                                        : {},
                                ],
                            })];
                    case 2:
                        totalCount = _d.sent();
                        totalCountWithoutAdminMaster = totalCount - 1;
                        return [4 /*yield*/, User_model_1.User.aggregate([
                                {
                                    $match: {
                                        $and: [
                                            {
                                                $or: [{ name: { $regex: searchFilter, $options: "i" } }, { id: numberId ? numberId : null }],
                                            },
                                            deleted ? { deleted: deletedFilter() } : {},
                                            //Filter of date
                                            (transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.dateFrom) && (transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.dateTo)
                                                ? {
                                                    createdAt: {
                                                        $gte: new Date(transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.dateFrom),
                                                        $lte: new Date(transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.dateTo),
                                                    },
                                                }
                                                : {},
                                        ],
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "authgroups",
                                        localField: "group",
                                        foreignField: "_id",
                                        as: "group",
                                    },
                                },
                                { $unwind: "$group" },
                                { $unset: "password" },
                            ])
                                .skip(Number(page) === 0 ? 0 : (Number(page) - 1) * Number(limit))
                                .limit(Number(limit) === 0 ? totalCountWithoutAdminMaster : Number(limit))];
                    case 3:
                        user = _d.sent();
                        filteredUsers = user.filter(function (user) {
                            return user.group.name !== "adminMaster";
                        });
                        res
                            .status(200)
                            .json({ total: totalCountWithoutAdminMaster, page: Number(page), limit: Number(limit), user: filteredUsers });
                        return [3 /*break*/, 5];
                    case 4:
                        error_6 = _d.sent();
                        console.warn(error_6);
                        res.status(500).json({ message: "Erro ao achar a nota" });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getMyInfo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, userTokenDecode, user, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = req.headers["authorization"];
                        if (!data)
                            return [2 /*return*/, res.status(404).send({ message: "Usuário não encontrado" })];
                        userTokenDecode = jsonwebtoken_1.default.decode(data);
                        if (!userTokenDecode)
                            return [2 /*return*/, res.status(404).send({ message: "Usuário não encontrado" })];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, User_model_1.User.findById({ _id: userTokenDecode._id })
                                .populate("group")
                                .select("-password")
                                .select("-deleted")];
                    case 2:
                        user = _a.sent();
                        res.status(200).json(user);
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        console.log(error_7);
                        res.status(500).json({ message: "Erro ao achar o usuário" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.userControler = new UserController();
