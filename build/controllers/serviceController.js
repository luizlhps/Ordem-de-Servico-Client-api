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
exports.service = void 0;
var Service_model_1 = require("../models/Service.model");
var autoIncrementId_1 = require("../utils/autoIncrementId");
var Service = /** @class */ (function () {
    function Service() {
    }
    Service.prototype.createService = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, description, amount, isValid, incrementId, service_1, _b, _c, error_1;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 4, , 5]);
                        _a = req.body, title = _a.title, description = _a.description, amount = _a.amount;
                        isValid = /^\d+(\.\d{1,2})?$/.test(amount.toString());
                        if (!isValid)
                            return [2 /*return*/, res.status(400).json({ message: "O número após o ponto deve ter no máximo 2 dígitos.." })];
                        if (!title)
                            return [2 /*return*/, res.status(400).send({ message: "Título é necessario" })];
                        if (!description)
                            return [2 /*return*/, res.status(400).send({ message: "Descrição é necessaria" })];
                        if (!amount)
                            return [2 /*return*/, res.status(400).send({ message: "Valor é necessario" })];
                        return [4 /*yield*/, (0, autoIncrementId_1.counterId)(Service_model_1.serviceCounter)];
                    case 1:
                        incrementId = (_e.sent()).getNextId;
                        _c = (_b = Service_model_1.serviceModel).create;
                        _d = {};
                        return [4 /*yield*/, incrementId()];
                    case 2: return [4 /*yield*/, _c.apply(_b, [(_d.id = _e.sent(),
                                _d.title = title,
                                _d.description = description,
                                _d.amount = amount,
                                _d)])];
                    case 3:
                        service_1 = _e.sent();
                        res.status(201).json(service_1);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _e.sent();
                        console.warn(error_1);
                        res.status(400).send({ message: error_1 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Service.prototype.deleteService = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var service_2, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Service_model_1.serviceModel.findByIdAndUpdate(req.params.id, { deleted: true })];
                    case 1:
                        service_2 = _a.sent();
                        res.status(200).json({ message: "Serviço apagado com sucesso!!" });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.warn(error_2);
                        res.status(400).send({ message: error_2 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Service.prototype.updateService = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, description, amount, service_3, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, title = _a.title, description = _a.description, amount = _a.amount;
                        return [4 /*yield*/, Service_model_1.serviceModel.findByIdAndUpdate(req.params.id, {
                                $set: { title: title, description: description, amount: amount },
                            }, { new: true })];
                    case 1:
                        service_3 = _b.sent();
                        res.status(200).json(service_3);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        console.warn(error_3);
                        res.status(400).send({ message: error_3 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Service.prototype.getSearch = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, filter, _b, page, _c, limit, deleted_1, transformFilterInObject, searchFilter, numberId, deletedFilter, service_4, totalCount, error_4;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        _a = req.query, filter = _a.filter, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c, deleted_1 = _a.deleted;
                        if (typeof filter !== "string") {
                            return [2 /*return*/, res.status(400).json({ message: "O parâmetro 'filter' deve ser uma string" })];
                        }
                        transformFilterInObject = filter && typeof filter === "string" ? JSON.parse(filter) : undefined;
                        searchFilter = (transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.search) ? transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.search : "";
                        numberId = Number(transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.search);
                        deletedFilter = function () {
                            if (deleted_1 === "true")
                                return true;
                            if (deleted_1 === "false")
                                return false;
                            return null;
                        };
                        return [4 /*yield*/, Service_model_1.serviceModel
                                .find({
                                $and: [
                                    {
                                        $or: [
                                            { title: { $regex: searchFilter, $options: "i" } },
                                            { description: { $regex: searchFilter, $options: "i" } },
                                            { id: numberId ? numberId : null },
                                        ],
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
                                .sort({ updatedAt: -1 })
                                .skip((Number(page) - 1) * Number(limit))
                                .limit(Number(limit))];
                    case 1:
                        service_4 = _d.sent();
                        return [4 /*yield*/, Service_model_1.serviceModel.countDocuments({
                                $and: [
                                    {
                                        $or: [
                                            { title: { $regex: searchFilter, $options: "i" } },
                                            { description: { $regex: searchFilter, $options: "i" } },
                                            { id: numberId ? numberId : null },
                                        ],
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
                        res.status(200).json({ total: totalCount, page: Number(page), limit: Number(limit), service: service_4 });
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _d.sent();
                        console.warn(error_4);
                        res.status(400).send({ message: error_4 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Service;
}());
exports.service = new Service();
