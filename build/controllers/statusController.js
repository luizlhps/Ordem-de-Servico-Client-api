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
exports.statusController = void 0;
var Status_model_1 = require("../models/Status.model");
var autoIncrementId_1 = require("../utils/autoIncrementId");
var StatusControler = /** @class */ (function () {
    function StatusControler() {
    }
    StatusControler.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var name_1, incrementId, status_1, _a, _b, err_1;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        name_1 = req.body.name;
                        if (!name_1)
                            return [2 /*return*/, res.status(400).send({ message: "É necessário o nome do status" })];
                        return [4 /*yield*/, (0, autoIncrementId_1.counterId)(Status_model_1.statusCounter)];
                    case 1:
                        incrementId = (_d.sent()).getNextId();
                        _b = (_a = Status_model_1.StatusModel).create;
                        _c = {};
                        return [4 /*yield*/, incrementId];
                    case 2: return [4 /*yield*/, _b.apply(_a, [(_c.id = _d.sent(),
                                _c.name = name_1,
                                _c)])];
                    case 3:
                        status_1 = _d.sent();
                        res.send(status_1);
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _d.sent();
                        console.log(err_1);
                        res.status(500).send({ message: "Erro ao criar status." });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    StatusControler.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, filter, _b, page, _c, limit, deleted_1, transformFilterInObject, searchFilter, filterId, deletedFilter, status_2, totalCount, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        _a = req.query, filter = _a.filter, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 5 : _c, deleted_1 = _a.deleted;
                        transformFilterInObject = filter && typeof filter === "string" ? JSON.parse(filter) : undefined;
                        searchFilter = (transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.search) ? transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.search : "";
                        filterId = Number(transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.search);
                        deletedFilter = function () {
                            if (deleted_1 === "true")
                                return true;
                            if (deleted_1 === "false")
                                return false;
                            return null;
                        };
                        return [4 /*yield*/, Status_model_1.StatusModel.find({
                                $and: [
                                    {
                                        $or: [{ name: { $regex: searchFilter, $options: "i" } }, { id: filterId ? filterId : null }],
                                    },
                                    deleted_1 ? { deleted: deletedFilter() } : {},
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
                            })
                                .sort({ createdAt: -1 })
                                .skip((Number(page) - 1) * Number(limit))
                                .limit(Number(limit))];
                    case 1:
                        status_2 = _d.sent();
                        return [4 /*yield*/, Status_model_1.StatusModel.countDocuments({
                                $and: [
                                    {
                                        $or: [{ name: { $regex: searchFilter, $options: "i" } }, { id: filterId ? filterId : null }],
                                    },
                                    deleted_1 ? { deleted: deletedFilter() } : {},
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
                        res.status(200).json({ page: Number(page), limit: Number(limit), total: Number(totalCount), status: status_2 });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _d.sent();
                        console.error(error_1);
                        res.status(500).json({ message: "Erro ao achar a nota" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    StatusControler.prototype.getById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var status_3, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Status_model_1.StatusModel.findById(req.params.id)];
                    case 1:
                        status_3 = _a.sent();
                        res.status(200).json(status_3);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error(error_2);
                        res.status(500).json({ message: "Erro ao achar a nota" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StatusControler.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, closeNotPossiblyDelete, OpennotPossiblyDelete, status_4, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, Status_model_1.StatusModel.findOne({ name: "Fechado" })];
                    case 2:
                        closeNotPossiblyDelete = _a.sent();
                        return [4 /*yield*/, Status_model_1.StatusModel.findOne({ name: "Aberto" })];
                    case 3:
                        OpennotPossiblyDelete = _a.sent();
                        if (closeNotPossiblyDelete) {
                            if ((closeNotPossiblyDelete === null || closeNotPossiblyDelete === void 0 ? void 0 : closeNotPossiblyDelete._id.toString().toLowerCase()) === id.toLowerCase()) {
                                return [2 /*return*/, res.status(401).json({ message: "Não é possivel apagar o status Fechado" })];
                            }
                        }
                        if (OpennotPossiblyDelete) {
                            if ((OpennotPossiblyDelete === null || OpennotPossiblyDelete === void 0 ? void 0 : OpennotPossiblyDelete._id.toString().toLowerCase()) === id.toLowerCase()) {
                                return [2 /*return*/, res.status(401).json({ message: "Não é possivel apagar o status Aberto" })];
                            }
                        }
                        return [4 /*yield*/, Status_model_1.StatusModel.findByIdAndUpdate(req.params.id, { deleted: true })];
                    case 4:
                        status_4 = _a.sent();
                        if (!status_4)
                            return [2 /*return*/, res.status(404).send("Usuário não encontrado.")];
                        return [2 /*return*/, res.status(200).send("Usuário deletado com sucesso.")];
                    case 5:
                        error_3 = _a.sent();
                        console.error(error_3);
                        return [2 /*return*/, res.status(500).send(error_3)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    StatusControler.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var status_5, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Status_model_1.StatusModel.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name } }, { new: true })];
                    case 1:
                        status_5 = _a.sent();
                        if (!status_5)
                            return [2 /*return*/, res.status(404).send("Usuário não encontrado.")];
                        return [2 /*return*/, res.status(200).json(status_5)];
                    case 2:
                        error_4 = _a.sent();
                        console.error(error_4);
                        return [2 /*return*/, res.status(500).send(error_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return StatusControler;
}());
exports.statusController = new StatusControler();
