"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.orderController = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Ordermodel_1 = require("../models/Ordermodel");
var Status_model_1 = require("../models/Status.model");
var bson_1 = require("bson");
var autoIncrementId_1 = require("../utils/autoIncrementId");
var Customer_model_1 = require("../models/Customer.model");
var orderAmount_1 = require("./orderController/orderAmount");
var OrderController = /** @class */ (function () {
    function OrderController() {
        this.deletedFilter = function (deleted) {
            if (deleted === "true")
                return true;
            if (deleted === "false")
                return false;
            return null;
        };
    }
    OrderController.prototype.createOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, equipment, brand, model, defect, services, status, customer, observation, dateEntry, customerId, statusId, incrementId, order, _b, _c, customerIdObject, orderIdObject, customerUpdate, error_1;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = req.body, equipment = _a.equipment, brand = _a.brand, model = _a.model, defect = _a.defect, services = _a.services, status = _a.status, customer = _a.customer, observation = _a.observation, dateEntry = _a.dateEntry;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, Customer_model_1.customerModel.findById(customer)];
                    case 2:
                        customerId = _e.sent();
                        return [4 /*yield*/, Status_model_1.StatusModel.findById(status)];
                    case 3:
                        statusId = _e.sent();
                        return [4 /*yield*/, (0, autoIncrementId_1.counterId)(Ordermodel_1.ordersCounter)];
                    case 4:
                        incrementId = (_e.sent()).getNextId;
                        if (!customerId) {
                            res.status(400).json({ message: "Cliente não encontrado" });
                            return [2 /*return*/];
                        }
                        if (!statusId) {
                            res.status(400).json({ message: "Status não encontrado" });
                            return [2 /*return*/];
                        }
                        _c = (_b = Ordermodel_1.orderModel).create;
                        _d = {};
                        return [4 /*yield*/, incrementId()];
                    case 5: return [4 /*yield*/, _c.apply(_b, [(_d.id = _e.sent(),
                                _d.equipment = equipment,
                                _d.brand = brand,
                                _d.model = model,
                                _d.observation = observation,
                                _d.defect = defect,
                                _d.dateEntry = dateEntry,
                                _d.services = [],
                                _d.status = statusId === null || statusId === void 0 ? void 0 : statusId._id,
                                _d.customer = customerId === null || customerId === void 0 ? void 0 : customerId._id,
                                _d)])];
                    case 6:
                        order = _e.sent();
                        customerIdObject = new mongoose_1.default.Types.ObjectId(customerId === null || customerId === void 0 ? void 0 : customerId._id);
                        orderIdObject = new mongoose_1.default.Types.ObjectId(order._id);
                        return [4 /*yield*/, (Customer_model_1.customerModel === null || Customer_model_1.customerModel === void 0 ? void 0 : Customer_model_1.customerModel.updateOne({ _id: customerIdObject }, { $push: { orders: orderIdObject } }))];
                    case 7:
                        customerUpdate = _e.sent();
                        res.status(200).json({ order: order });
                        return [3 /*break*/, 9];
                    case 8:
                        error_1 = _e.sent();
                        console.warn(error_1);
                        res.status(400).send({ message: error_1 });
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.getAllOrders = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, filter, _b, page, _c, limit, deleted, transformFilterInObject, searchFilter, numberId, deletedIsString, paramsOfFilter, totalOrdersInFetch, orders, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        _a = req.query, filter = _a.filter, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c, deleted = _a.deleted;
                        transformFilterInObject = filter && typeof filter === "string" ? JSON.parse(filter) : undefined;
                        searchFilter = (transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.search) ? transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.search : "";
                        numberId = Number(transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.search);
                        deletedIsString = typeof deleted === "string" ? deleted : "";
                        paramsOfFilter = {
                            $and: [
                                {
                                    $or: [
                                        {
                                            equipment: {
                                                $regex: searchFilter,
                                                $options: "i",
                                            },
                                        },
                                        {
                                            brand: {
                                                $regex: searchFilter,
                                                $options: "i",
                                            },
                                        },
                                        {
                                            model: {
                                                $regex: searchFilter,
                                                $options: "i",
                                            },
                                        },
                                        {
                                            defect: {
                                                $regex: searchFilter,
                                                $options: "i",
                                            },
                                        },
                                        {
                                            observation: {
                                                $regex: searchFilter,
                                                $options: "i",
                                            },
                                        },
                                        { id: numberId ? numberId : null },
                                    ],
                                },
                                //filter search
                                (transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.status) ? { status: new bson_1.ObjectId(transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.status) } : {},
                                (transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.customer) ? { customer: new bson_1.ObjectId(transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.customer) } : {},
                                (transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.dateFrom) && (transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.dateTo)
                                    ? {
                                        dateEntry: {
                                            $gte: new Date(transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.dateFrom),
                                            $lte: new Date(transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.dateTo),
                                        },
                                    }
                                    : {},
                                deleted ? { deleted: this.deletedFilter(deletedIsString) } : {},
                            ],
                        };
                        return [4 /*yield*/, Ordermodel_1.orderModel.countDocuments(__assign({}, paramsOfFilter))];
                    case 1:
                        totalOrdersInFetch = _d.sent();
                        return [4 /*yield*/, Ordermodel_1.orderModel
                                .aggregate([
                                {
                                    $match: __assign({}, paramsOfFilter),
                                },
                                /*from: <nome da Coleção onde vamos buscar os dados>,
                                    localField: <nome do atributo usado na condição de igualdade, na coleção origem, aqui chamada de Coleção>,
                                    foreignField: <nome do atributo usado na condição de igualdade na tabela destino, onde buscaremos os dados>,
                                    as: <atributo que receberá os novos dados > */
                                {
                                    $lookup: {
                                        from: "serviceprices",
                                        localField: "_id",
                                        foreignField: "order",
                                        as: "servicesPrices", // nome
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "status",
                                        localField: "status",
                                        foreignField: "_id",
                                        as: "status",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "services",
                                        localField: "services",
                                        foreignField: "_id",
                                        as: "services",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "customers",
                                        localField: "customer",
                                        foreignField: "_id",
                                        as: "customer",
                                    },
                                },
                                { $unwind: "$customer" },
                                { $unwind: "$status" },
                            ])
                                .sort({ id: -1 })
                                .skip(Number(page) === 0 ? 0 : (Number(page) - 1) * Number(limit))
                                .limit(Number(limit) === 0 ? totalOrdersInFetch : Number(limit))];
                    case 2:
                        orders = _d.sent();
                        res.status(200).json({
                            total: totalOrdersInFetch,
                            page: Number(page),
                            limit: Number(limit),
                            orders: orders,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _d.sent();
                        console.warn(error_2);
                        res.status(400).send({ message: error_2.message });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.getcustomerOrders = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, customerId, filter, _b, page, _c, limit, deleted, transformFilterInObject, searchFilter, numberId, customer, deletedIsString, paramsOfFilter, totalCount, orders, error_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        _a = req.query, customerId = _a.customerId, filter = _a.filter, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c, deleted = _a.deleted;
                        transformFilterInObject = filter && typeof filter === "string" ? JSON.parse(filter) : undefined;
                        searchFilter = (transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.search) ? transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.search : "";
                        numberId = Number(transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.search);
                        if (!customerId)
                            return [2 /*return*/, res.status(404).json({ message: "Id do cliente é obrigatório" })];
                        return [4 /*yield*/, Customer_model_1.customerModel.findById(customerId)];
                    case 1:
                        customer = _d.sent();
                        deletedIsString = typeof deleted === "string" ? deleted : "";
                        if (!customer)
                            return [2 /*return*/, res.status(404).json({ message: "Cliente não encontrado" })];
                        paramsOfFilter = {
                            $and: [
                                {
                                    $or: [
                                        {
                                            equipment: {
                                                $regex: searchFilter,
                                                $options: "i",
                                            },
                                        },
                                        {
                                            brand: {
                                                $regex: searchFilter,
                                                $options: "i",
                                            },
                                        },
                                        {
                                            model: {
                                                $regex: searchFilter,
                                                $options: "i",
                                            },
                                        },
                                        {
                                            defect: {
                                                $regex: searchFilter,
                                                $options: "i",
                                            },
                                        },
                                        {
                                            observation: {
                                                $regex: searchFilter,
                                                $options: "i",
                                            },
                                        },
                                        { id: numberId ? numberId : null },
                                    ],
                                },
                                //filter search
                                (transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.status) ? { status: new bson_1.ObjectId(transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.status) } : {},
                                (transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.customer) ? { customer: new bson_1.ObjectId(transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.customer) } : {},
                                (transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.dateFrom) && (transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.dateTo)
                                    ? {
                                        dateEntry: {
                                            $gte: new Date(transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.dateFrom),
                                            $lte: new Date(transformFilterInObject === null || transformFilterInObject === void 0 ? void 0 : transformFilterInObject.dateTo),
                                        },
                                    }
                                    : {},
                                deleted ? { deleted: this.deletedFilter(deletedIsString) } : {},
                            ],
                        };
                        return [4 /*yield*/, Ordermodel_1.orderModel.countDocuments(__assign({ customer: customer._id }, paramsOfFilter))];
                    case 2:
                        totalCount = _d.sent();
                        return [4 /*yield*/, Ordermodel_1.orderModel
                                .aggregate([
                                {
                                    $match: __assign({ customer: customer._id }, paramsOfFilter),
                                },
                                /*from: <nome da Coleção onde vamos buscar os dados>,
                                  localField: <nome do atributo usado na condição de igualdade, na coleção origem, aqui chamada de Coleção>,
                                  foreignField: <nome do atributo usado na condição de igualdade na tabela destino, onde buscaremos os dados>,
                                  as: <atributo que receberá os novos dados > */
                                {
                                    $lookup: {
                                        from: "serviceprices",
                                        localField: "_id",
                                        foreignField: "order",
                                        as: "servicesPrices", // nome
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "status",
                                        localField: "status",
                                        foreignField: "_id",
                                        as: "status",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "services",
                                        localField: "services",
                                        foreignField: "_id",
                                        as: "services",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "customers",
                                        localField: "customer",
                                        foreignField: "_id",
                                        as: "customer",
                                    },
                                },
                                { $unwind: "$customer" },
                                { $unwind: "$status" },
                            ])
                                .sort({ id: -1 })
                                .skip(Number(page) === 0 ? 0 : (Number(page) - 1) * Number(limit))
                                .limit(Number(limit) === 0 ? totalCount : Number(limit))];
                    case 3:
                        orders = _d.sent();
                        res.status(200).json({ total: totalCount, page: Number(page), limit: Number(limit), orders: orders });
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _d.sent();
                        console.error(error_3);
                        return [2 /*return*/, res.status(500).json({ message: "Erro ao obter os pedidos do cliente" })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.getOrderPending = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, filter, _b, page, _c, limit, deleted, deletedIsString, numberId, statusPending, count, orders, error_4;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        _a = req.query, filter = _a.filter, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c, deleted = _a.deleted;
                        deletedIsString = typeof deleted === "string" ? deleted : "";
                        numberId = Number(filter);
                        return [4 /*yield*/, Status_model_1.StatusModel.findOne({ name: "Aberto" })];
                    case 1:
                        statusPending = _d.sent();
                        if (!statusPending)
                            return [2 /*return*/, res.status(500).send({
                                    error: true,
                                    code: "orderView.statusNotExist",
                                    message: "Não existe o status Aberto no banco de dados",
                                })];
                        return [4 /*yield*/, Ordermodel_1.orderModel.countDocuments({
                                $and: [
                                    {
                                        $and: [{ status: statusPending === null || statusPending === void 0 ? void 0 : statusPending._id }, deleted ? { deleted: this.deletedFilter(deletedIsString) } : {}],
                                    },
                                    deleted ? { deleted: this.deletedFilter(deletedIsString) } : {},
                                ],
                            })];
                    case 2:
                        count = _d.sent();
                        return [4 /*yield*/, Ordermodel_1.orderModel
                                .aggregate([
                                { $match: { $and: [{ status: statusPending === null || statusPending === void 0 ? void 0 : statusPending._id }, { deleted: false }] } },
                                { $sort: { total: -1 } },
                                {
                                    $lookup: {
                                        from: "serviceprices",
                                        localField: "_id",
                                        foreignField: "order",
                                        as: "servicesPrices", // nome
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "status",
                                        localField: "status",
                                        foreignField: "_id",
                                        as: "status",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "services",
                                        localField: "services",
                                        foreignField: "_id",
                                        as: "services",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "customers",
                                        localField: "customer",
                                        foreignField: "_id",
                                        as: "customer",
                                    },
                                },
                                { $unwind: "$customer" },
                                { $unwind: "$status" },
                            ])
                                .skip(Number(page) === 0 ? 0 : (Number(page) - 1) * Number(limit))
                                .limit(Number(limit) === 0 ? count : Number(limit))
                                .sort({ id: -1 })];
                    case 3:
                        orders = _d.sent();
                        if (!orders) {
                            throw res.status(404).send("Houve um erro ao buscar as O.S fechadas");
                        }
                        res.status(200).json({
                            total: count,
                            page: Number(page),
                            limit: Number(limit),
                            orders: orders,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _d.sent();
                        console.log(error_4);
                        res.status(400).json({ message: "Ocorreu um erro ao procurar a O.S" });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.updateOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, equipment, brand, model, defect, exitDate, observation, dateEntry, services, status_1, customer, discount_1, technicalOpinion, treatedServices, amount, orderAlreadyExists, newcustomer, totalAmount, orderObjectId, customerOldObject, customerOldUpdate, customerIdObject, customerUpdate, order, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        _a = req.body, equipment = _a.equipment, brand = _a.brand, model = _a.model, defect = _a.defect, exitDate = _a.exitDate, observation = _a.observation, dateEntry = _a.dateEntry, services = _a.services, status_1 = _a.status, customer = _a.customer, discount_1 = _a.discount, technicalOpinion = _a.technicalOpinion;
                        treatedServices = services.filter(function (falseValues) {
                            return falseValues;
                        });
                        return [4 /*yield*/, orderAmount_1.orderServicePrice.calculate(req.params.id, treatedServices)];
                    case 1:
                        amount = _b.sent();
                        return [4 /*yield*/, Ordermodel_1.orderModel.findById(req.params.id)];
                    case 2:
                        orderAlreadyExists = _b.sent();
                        if (!orderAlreadyExists)
                            return [2 /*return*/, res.status(404).json({ message: "não foi possivel encontrar a O.S" })];
                        return [4 /*yield*/, Customer_model_1.customerModel.findById(customer)];
                    case 3:
                        newcustomer = _b.sent();
                        if (!newcustomer)
                            return [2 /*return*/, res.status(404).json({ message: "não foi possivel encontrar o cliente" })];
                        totalAmount = function () {
                            if (discount_1) {
                                return Number(discount_1);
                            }
                            return 0;
                        };
                        orderObjectId = new mongoose_1.default.Types.ObjectId(orderAlreadyExists === null || orderAlreadyExists === void 0 ? void 0 : orderAlreadyExists._id);
                        customerOldObject = orderAlreadyExists.customer;
                        if (!(customer !== orderAlreadyExists.customer.toString())) return [3 /*break*/, 6];
                        return [4 /*yield*/, (Customer_model_1.customerModel === null || Customer_model_1.customerModel === void 0 ? void 0 : Customer_model_1.customerModel.updateOne({ _id: customerOldObject }, { $pull: { orders: orderObjectId } }))];
                    case 4:
                        customerOldUpdate = _b.sent();
                        customerIdObject = new mongoose_1.default.Types.ObjectId(newcustomer === null || newcustomer === void 0 ? void 0 : newcustomer._id);
                        return [4 /*yield*/, (Customer_model_1.customerModel === null || Customer_model_1.customerModel === void 0 ? void 0 : Customer_model_1.customerModel.updateOne({ _id: customerIdObject }, { $push: { orders: orderObjectId } }))];
                    case 5:
                        customerUpdate = _b.sent();
                        _b.label = 6;
                    case 6: return [4 /*yield*/, Ordermodel_1.orderModel.findByIdAndUpdate(req.params.id, {
                            $set: {
                                equipment: equipment,
                                brand: brand,
                                model: model,
                                defect: defect,
                                discount: discount_1,
                                technicalOpinion: technicalOpinion,
                                observation: observation,
                                dateEntry: dateEntry,
                                services: treatedServices,
                                status: status_1,
                                exitDate: exitDate,
                                customer: customer,
                                totalAmount: services ? amount - totalAmount() : 0,
                                amount: services ? amount : 0,
                            },
                        }, { new: true })];
                    case 7:
                        order = _b.sent();
                        res.status(200).json(order);
                        return [3 /*break*/, 9];
                    case 8:
                        error_5 = _b.sent();
                        console.log(error_5);
                        res.status(400).json({ message: "Ocorreu um Erro ao Atualizar o Registro" });
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.deleteOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, orderAlreadyExists, order, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = req.params.id;
                        if (!id)
                            return [2 /*return*/, res.status(404).json({ message: "Id para a exclusão é obrigátorio" })];
                        return [4 /*yield*/, Ordermodel_1.orderModel.findById(req.params.id)];
                    case 1:
                        orderAlreadyExists = _a.sent();
                        if (!orderAlreadyExists)
                            return [2 /*return*/, res.status(404).json({ message: "não foi possivel encontrar a O.S" })];
                        return [4 /*yield*/, Ordermodel_1.orderModel.findByIdAndUpdate(id, { deleted: true }, { new: true })];
                    case 2:
                        order = _a.sent();
                        if (!order)
                            return [2 /*return*/, res.status(404).json({ message: "ordem de serviço não encontrada" })];
                        res.status(200).send({ message: "Ordem de serviço apagado com sucesso" });
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        console.log(error_6);
                        res.status(400).send({ message: "Houve um erro ao apagar a ordem de serviço!" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderController;
}());
exports.orderController = new OrderController();
