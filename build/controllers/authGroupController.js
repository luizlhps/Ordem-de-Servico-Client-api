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
exports.authGroupController = void 0;
var AuthGroup_model_1 = require("../models/AuthGroup.model");
var autoIncrementId_1 = require("../utils/autoIncrementId");
var AuthGroupController = /** @class */ (function () {
    function AuthGroupController() {
    }
    AuthGroupController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_1, create, deleted, view, update, incrementId, authGroup, _b, _c, error_1;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 4, , 5]);
                        _a = req.body, name_1 = _a.name, create = _a.create, deleted = _a.deleted, view = _a.view, update = _a.update;
                        if (!name_1)
                            return [2 /*return*/, res.status(500).send("Nome é um campo necessário")];
                        return [4 /*yield*/, (0, autoIncrementId_1.counterId)(AuthGroup_model_1.authGroupCounter)];
                    case 1:
                        incrementId = (_e.sent()).getNextId;
                        _c = (_b = AuthGroup_model_1.AuthGroupModel).create;
                        _d = {};
                        return [4 /*yield*/, incrementId()];
                    case 2: return [4 /*yield*/, _c.apply(_b, [(_d.id = _e.sent(),
                                _d.name = name_1,
                                _d.permissions = {
                                    create: create,
                                    deleted: deleted,
                                    update: update,
                                    view: view,
                                },
                                _d)])];
                    case 3:
                        authGroup = _e.sent();
                        if (!authGroup)
                            return [2 /*return*/, res.status(500).send("Ocorreu um erro ao criar um cargo")];
                        res.status(200).send(authGroup);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _e.sent();
                        res.status(400).send("Ocorreu um Erro no authGroup");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthGroupController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, AuthGroup, group, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = req.params.id;
                        return [4 /*yield*/, AuthGroup_model_1.AuthGroupModel.findById(id)];
                    case 1:
                        AuthGroup = _a.sent();
                        if (!AuthGroup)
                            return [2 /*return*/, res.status(404).json({ error: true, code: "user.error", message: "Usuário não existe" })];
                        if (AuthGroup.deleted === true)
                            return [2 /*return*/, res.status(404).json({ error: true, code: "user.error", message: "O Usuário já esta deletado" })];
                        return [4 /*yield*/, AuthGroup_model_1.AuthGroupModel.findByIdAndUpdate(id, {
                                $set: {
                                    deleted: true,
                                },
                            }, { new: true })];
                    case 2:
                        group = _a.sent();
                        res.status(200).json({ message: "Usuário deletado com sucesso!!" });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthGroupController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, name_2, create, deleted, view, update, authGroup, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        _a = req.body, name_2 = _a.name, create = _a.create, deleted = _a.deleted, view = _a.view, update = _a.update;
                        if (!name_2)
                            return [2 /*return*/, res.status(500).send("Nome é um campo necessário")];
                        return [4 /*yield*/, AuthGroup_model_1.AuthGroupModel.findByIdAndUpdate(id, {
                                $set: {
                                    name: name_2,
                                    permissions: {
                                        create: create,
                                        deleted: deleted,
                                        update: update,
                                        view: view,
                                    },
                                },
                            }, { new: true })];
                    case 1:
                        authGroup = _b.sent();
                        if (!authGroup)
                            return [2 /*return*/, res.status(500).send("Ocorreu um erro ao criar um cargo")];
                        res.status(200).send(authGroup);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        console.log(error_3);
                        res.status(400).send("Ocorreu um Erro no authGroup");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthGroupController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, filter, _b, page, _c, limit, deleted, transformFilterInObject, searchFilter, numberId, deletedFilter, totalCount, authGroup, error_4;
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
                        console.log(searchFilter);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, AuthGroup_model_1.AuthGroupModel.countDocuments({
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
                        return [4 /*yield*/, AuthGroup_model_1.AuthGroupModel.aggregate([
                                {
                                    $match: {
                                        $and: [
                                            deleted ? { deleted: deletedFilter() } : {},
                                            {
                                                $or: [
                                                    { name: { $ne: "adminMaster", $regex: searchFilter, $options: "i" } },
                                                    { id: numberId ? numberId : null },
                                                ],
                                            },
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
                                    $group: {
                                        _id: "$_id",
                                        id: { $first: "$id" },
                                        name: { $first: "$name" },
                                        permissions: { $first: "$permissions" },
                                    },
                                },
                            ])
                                .skip(Number(page) === 0 ? 0 : (Number(page) - 1) * Number(limit))
                                .limit(Number(limit) === 0 ? totalCount : Number(limit))
                                .sort({ _id: -1 })];
                    case 3:
                        authGroup = _d.sent();
                        res.status(200).json({ total: totalCount, page: Number(page), limit: Number(limit), authGroup: authGroup });
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _d.sent();
                        console.warn(error_4);
                        res.status(500).json({ message: "Erro ao achar a nota" });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AuthGroupController;
}());
exports.authGroupController = new AuthGroupController();
