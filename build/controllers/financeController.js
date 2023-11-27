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
exports.finance = void 0;
var Finance_model_1 = require("../models/Finance.model");
var autoIncrementId_1 = require("../utils/autoIncrementId");
var Finance = /** @class */ (function () {
    function Finance() {
    }
    Finance.prototype.createTransaction = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, description, amount, type, status_1, order, entryDate, dueDate, payDay, incrementId, transaction, _b, _c, err_1;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 4, , 5]);
                        _a = req.body, title = _a.title, description = _a.description, amount = _a.amount, type = _a.type, status_1 = _a.status, order = _a.order, entryDate = _a.entryDate, dueDate = _a.dueDate, payDay = _a.payDay;
                        //validation balance
                        if (type !== "debit" && type !== "credit") {
                            return [2 /*return*/, res.status(400).send("o tipo deve ser débito ou crédito")];
                        }
                        //validation status
                        if (status_1 !== "open" && status_1 !== "finished" && status_1 !== "delayed") {
                            return [2 /*return*/, res.status(400).send("o status deve ser aberto ou finalizado ou atrasado")];
                        }
                        if (status_1 === "finished" && !payDay) {
                            return [2 /*return*/, res.status(400).send("É obrigatório a data de pagamento ao finalizar a transação")];
                        }
                        return [4 /*yield*/, (0, autoIncrementId_1.counterId)(Finance_model_1.counterFinanceModel)];
                    case 1:
                        incrementId = (_e.sent()).getNextId;
                        _c = (_b = Finance_model_1.Transaction).create;
                        _d = {};
                        return [4 /*yield*/, incrementId()];
                    case 2: return [4 /*yield*/, _c.apply(_b, [(_d.id = _e.sent(),
                                _d.title = title,
                                _d.description = description,
                                _d.amount = amount,
                                _d.type = type,
                                _d.status = status_1,
                                _d.order = order,
                                _d.entryDate = entryDate,
                                _d.dueDate = dueDate,
                                _d.payDay = payDay,
                                _d)])];
                    case 3:
                        transaction = _e.sent();
                        res.status(201).send(transaction);
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _e.sent();
                        console.warn(err_1);
                        res.status(400).json({ message: err_1.message });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Finance.prototype.updateTransaction = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, description, amount, type, status, order, entryDate, dueDate, payDay, checktransactionExists, updataTransaction, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, title = _a.title, description = _a.description, amount = _a.amount, type = _a.type, status = _a.status, order = _a.order, entryDate = _a.entryDate, dueDate = _a.dueDate, payDay = _a.payDay;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Finance_model_1.Transaction.findById(req.params.id)];
                    case 2:
                        checktransactionExists = _b.sent();
                        if (!checktransactionExists) {
                            return [2 /*return*/, res.status(404).json({ message: "Transação não encontrada" })];
                        }
                        if (status === "finished" && !payDay) {
                            return [2 /*return*/, res.status(400).send("É obrigatório a data de pagamento ao finalizar a transação")];
                        }
                        return [4 /*yield*/, Finance_model_1.Transaction.findByIdAndUpdate(req.params.id, {
                                $set: {
                                    title: title,
                                    description: description,
                                    amount: amount,
                                    type: type,
                                    status: status,
                                    order: order,
                                    entryDate: entryDate,
                                    dueDate: dueDate,
                                    payDay: payDay,
                                },
                            }, { new: true })];
                    case 3:
                        updataTransaction = _b.sent();
                        res.status(202).json(updataTransaction);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        console.warn(error_1);
                        res.status(400).send({ message: error_1 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Finance.prototype.deleteTransaction = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, transaction, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, Finance_model_1.Transaction.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true })];
                    case 1:
                        transaction = _a.sent();
                        res.status(200).send("Transação Deletada");
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.warn(error_2);
                        res.send(400).send({ message: error_2 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Finance.prototype.searchTransaction = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, filter, _b, page, _c, limit, deleted, transformFilterInObject, searchFilter, numberId, deletedFilter, transaction, totalCount, error_3;
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
                        return [4 /*yield*/, Finance_model_1.Transaction.find({
                                $and: [
                                    {
                                        $or: [
                                            { title: { $regex: searchFilter, $options: "i" } },
                                            { description: { $regex: searchFilter, $options: "i" } },
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
                                    deleted ? { deleted: deletedFilter() } : {},
                                ],
                            })
                                .sort({ createdAt: -1 })
                                .skip((Number(page) - 1) * Number(limit))
                                .limit(Number(limit))];
                    case 2:
                        transaction = _d.sent();
                        return [4 /*yield*/, Finance_model_1.Transaction.countDocuments({
                                $and: [
                                    {
                                        $or: [
                                            { title: { $regex: searchFilter, $options: "i" } },
                                            { description: { $regex: searchFilter, $options: "i" } },
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
                                    deleted ? { deleted: deletedFilter() } : {},
                                ],
                            })];
                    case 3:
                        totalCount = _d.sent();
                        if (transaction.length < 1)
                            return [2 /*return*/, res.status(404).json("nada encontrado")];
                        res.status(200).json({ total: totalCount, page: Number(page), limit: Number(limit), transaction: transaction });
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _d.sent();
                        console.warn(error_3);
                        res.status(400).send({ message: error_3 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //[]editar futuramente
    Finance.prototype.balance = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var allDebits, allCredits, valueTotalDebits_1, valueTotalCredits_1, balance, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, Finance_model_1.Transaction.find({ $and: [{ status: "finished" }, { type: "debit" }] })];
                    case 1:
                        allDebits = _a.sent();
                        return [4 /*yield*/, Finance_model_1.Transaction.find({ $and: [{ status: "finished" }, { type: "credit" }] })];
                    case 2:
                        allCredits = _a.sent();
                        valueTotalDebits_1 = 0;
                        allDebits.forEach(function (transation) {
                            valueTotalDebits_1 += transation.amount;
                        });
                        valueTotalCredits_1 = 0;
                        allCredits.forEach(function (transation) {
                            valueTotalCredits_1 += transation.amount;
                        });
                        balance = valueTotalCredits_1 - valueTotalDebits_1;
                        res.status(200).send(balance);
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        res.status(400).send("Ocorreu um Erro Ao buscar o balanço do caixa");
                        console.log(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Finance.prototype.getByIdTransaction = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Finance_model_1.Transaction.findById(req.params.id)];
                    case 1:
                        transaction = _a.sent();
                        res.status(200).json(transaction);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.warn(error_5);
                        res.send(400).send({ message: error_5 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Finance;
}());
exports.finance = new Finance();
