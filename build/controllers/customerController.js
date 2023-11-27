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
exports.customerController = void 0;
var Customer_model_1 = require("../models/Customer.model");
var autoIncrementId_1 = require("../utils/autoIncrementId");
var CustomerController = /** @class */ (function () {
    function CustomerController() {
    }
    CustomerController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_1, email, contact, phone, cpfOrCnpj, telephone, address, requiredFields_1, incrementId, cliente, _b, _c, err_1;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 4, , 5]);
                        _a = req.body, name_1 = _a.name, email = _a.email, contact = _a.contact, phone = _a.phone, cpfOrCnpj = _a.cpfOrCnpj, telephone = _a.telephone, address = _a.address;
                        requiredFields_1 = ["cep", "state", "neighborhood", "street", "city", "number"];
                        if (!address) {
                            throw new Error("o endere\u00E7o \u00E9 requirido");
                        }
                        if (!name_1)
                            return [2 /*return*/, res.status(400).send({ message: "O campo nome é obrigatório" })];
                        if (!phone)
                            return [2 /*return*/, res.status(400).send({ message: "O campo celular é obrigatório" })];
                        if (!cpfOrCnpj)
                            return [2 /*return*/, res.status(400).send({ message: "O campo CPF ou CNPJ é obrigatório" })];
                        //Verifica cada requiredField
                        address.forEach(function (item) {
                            requiredFields_1.forEach(function (field) {
                                if (!item.hasOwnProperty(field)) {
                                    throw new Error("O campo de endere\u00E7o : '".concat(field, "' \u00E9 requirido"));
                                }
                            });
                        });
                        return [4 /*yield*/, (0, autoIncrementId_1.counterId)(Customer_model_1.customersCounter)];
                    case 1:
                        incrementId = (_e.sent()).getNextId();
                        _c = (_b = Customer_model_1.customerModel).create;
                        _d = {};
                        return [4 /*yield*/, incrementId];
                    case 2: return [4 /*yield*/, _c.apply(_b, [(_d.id = _e.sent(),
                                _d.name = name_1,
                                _d.email = email,
                                _d.contact = contact,
                                _d.phone = phone,
                                _d.cpfOrCnpj = cpfOrCnpj,
                                _d.telephone = telephone,
                                _d.address = address,
                                _d)])];
                    case 3:
                        cliente = _e.sent();
                        res.status(201).json(cliente);
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
    CustomerController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, filter, _b, page, _c, limit, deleted_1, transformFilterInObject, searchFilter, numberId, deletedFilter, customer, totalCount, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        _a = req.query, filter = _a.filter, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c, deleted_1 = _a.deleted;
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
                        return [4 /*yield*/, Customer_model_1.customerModel
                                .find({
                                $and: [
                                    {
                                        $or: [
                                            { name: { $regex: searchFilter, $options: "i" } },
                                            { phone: searchFilter },
                                            { cpfOrCnpj: searchFilter },
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
                                .sort({ createdAt: -1 })
                                .skip((Number(page) - 1) * Number(limit)) //skipa os itens por exemplo 2-1 * 10 = 10 skipa os 10 primeiros itens
                                .limit(Number(limit))
                                .populate("orders")
                                .exec()];
                    case 1:
                        customer = _d.sent();
                        return [4 /*yield*/, Customer_model_1.customerModel.countDocuments({
                                $and: [
                                    {
                                        $or: [
                                            { name: { $regex: searchFilter, $options: "i" } },
                                            { phone: searchFilter },
                                            { cpfOrCnpj: searchFilter },
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
                        res.status(200).json({ total: totalCount, page: Number(page), limit: Number(limit), customer: customer });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _d.sent();
                        console.warn(error_1);
                        res.status(500).json({ message: "Erro ao achar a nota" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CustomerController.prototype.getById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, customer, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        if (!id)
                            return [2 /*return*/, res.status(400).send({ message: "o id é necéssario" })];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Customer_model_1.customerModel.findById(id).populate("orders")];
                    case 2:
                        customer = _a.sent();
                        if (!customer)
                            return [2 /*return*/, res.status(404).send({ message: "Cliente não encontrado" })];
                        res.status(200).json(customer);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.warn(error_2);
                        res.status(400).json(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CustomerController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_2, email, contact, phone, cpfOrCnpj, telephone, address, requiredFields_2, client, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, name_2 = _a.name, email = _a.email, contact = _a.contact, phone = _a.phone, cpfOrCnpj = _a.cpfOrCnpj, telephone = _a.telephone, address = _a.address;
                        requiredFields_2 = ["cep", "state", "neighborhood", "street", "city", "number"];
                        address.forEach(function (item) {
                            requiredFields_2.forEach(function (field) {
                                if (!item.hasOwnProperty(field)) {
                                    throw new Error("O campo de endere\u00E7o : '".concat(field, "' \u00E9 requirido"));
                                }
                            });
                        });
                        return [4 /*yield*/, Customer_model_1.customerModel.findByIdAndUpdate(req.params.id, {
                                $set: {
                                    name: name_2,
                                    email: email,
                                    contact: contact,
                                    phone: phone,
                                    cpfOrCnpj: cpfOrCnpj,
                                    telephone: telephone,
                                    address: address,
                                },
                            }, { new: true })];
                    case 1:
                        client = _b.sent();
                        res.status(201).json(client);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        console.warn(error_3);
                        res.status(400).json(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CustomerController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, customer, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Customer_model_1.customerModel.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true })];
                    case 2:
                        customer = _a.sent();
                        res.status(200).json({ customer: customer });
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.warn(error_4);
                        res.status(400).json(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CustomerController;
}());
exports.customerController = new CustomerController();
