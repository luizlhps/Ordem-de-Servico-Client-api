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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = void 0;
var Finance_model_1 = require("../models/Finance.model");
var amountTotal_1 = require("./dasboardController/amountTotal");
var Ordermodel_1 = require("../models/Ordermodel");
var Status_model_1 = require("../models/Status.model");
var DasboardController = /** @class */ (function () {
    function DasboardController() {
    }
    DasboardController.prototype.filterTransaction = function (endPreviusMonth, endMonth, startPreviusMonth) {
        return __awaiter(this, void 0, void 0, function () {
            var currentMonthTransactions, transactionsPreviusMonth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Finance_model_1.Transaction.find({
                            $and: [
                                {
                                    entryDate: {
                                        $gte: new Date(endPreviusMonth),
                                        $lte: new Date(endMonth),
                                    },
                                },
                                { deleted: false },
                            ],
                        })];
                    case 1:
                        currentMonthTransactions = _a.sent();
                        return [4 /*yield*/, Finance_model_1.Transaction.find({
                                $and: [
                                    {
                                        entryDate: {
                                            $gte: new Date(startPreviusMonth),
                                            $lte: new Date(endPreviusMonth),
                                        },
                                    },
                                    { deleted: false },
                                ],
                            })];
                    case 2:
                        transactionsPreviusMonth = _a.sent();
                        return [2 /*return*/, { currentMonthTransactions: currentMonthTransactions, transactionsPreviusMonth: transactionsPreviusMonth }];
                }
            });
        });
    };
    DasboardController.prototype.GetAllInfo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var currentDate, endMonth, endPreviusMonth, startPreviusMonth, _a, currentMonthTransactions, transactionsPreviusMonth, allTransactionsDebits_1, allTransactionsCredits_1, Alltransactions, valueTotalDebits_1, valueTotalCredits_1, balance, creditPercetege, debitPercetege, creditPercetegePending, debitPercetegePending, totalCountTransactionsPedding, balancePercetege, totalCount, totalCountPrevMonth, totalCountPercentege, statusPending, ordersCountPendingPrevMonth, ordersCountPending, ordersTotalCount, orderPercentege, dashboard, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 10, , 11]);
                        currentDate = new Date();
                        endMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                        endPreviusMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
                        startPreviusMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
                        return [4 /*yield*/, this.filterTransaction(endPreviusMonth, endMonth, startPreviusMonth)];
                    case 1:
                        _a = _b.sent(), currentMonthTransactions = _a.currentMonthTransactions, transactionsPreviusMonth = _a.transactionsPreviusMonth;
                        allTransactionsDebits_1 = [];
                        allTransactionsCredits_1 = [];
                        return [4 /*yield*/, Finance_model_1.Transaction.find({ deleted: false })];
                    case 2:
                        Alltransactions = _b.sent();
                        Alltransactions.forEach(function (transaction) {
                            if (transaction.status === "finished" && transaction.type === "credit") {
                                allTransactionsCredits_1.push(transaction);
                            }
                            if (transaction.status === "finished" && transaction.type === "debit") {
                                allTransactionsDebits_1.push(transaction);
                            }
                        });
                        valueTotalDebits_1 = 0;
                        allTransactionsDebits_1.forEach(function (transation) {
                            valueTotalDebits_1 += transation.amount;
                        });
                        valueTotalCredits_1 = 0;
                        allTransactionsCredits_1.forEach(function (transation) {
                            valueTotalCredits_1 += transation.amount;
                        });
                        balance = valueTotalCredits_1 - valueTotalDebits_1;
                        creditPercetege = amountTotal_1.amountTotal.calculateCreditPercetegeMonth({
                            transactionsPreviusMonth: transactionsPreviusMonth,
                            currentMonthTransactions: currentMonthTransactions,
                            status: "finished",
                        });
                        debitPercetege = amountTotal_1.amountTotal.calculateDebitPercetegeMonth({
                            transactionsPreviusMonth: transactionsPreviusMonth,
                            currentMonthTransactions: currentMonthTransactions,
                            status: "finished",
                        });
                        creditPercetegePending = amountTotal_1.amountTotal.calculateCreditPercetegeMonth({
                            transactionsPreviusMonth: transactionsPreviusMonth,
                            currentMonthTransactions: currentMonthTransactions,
                            status: "open",
                        });
                        debitPercetegePending = amountTotal_1.amountTotal.calculateDebitPercetegeMonth({
                            transactionsPreviusMonth: transactionsPreviusMonth,
                            currentMonthTransactions: currentMonthTransactions,
                            status: "open",
                        });
                        return [4 /*yield*/, Finance_model_1.Transaction.countDocuments({ status: "open" })];
                    case 3:
                        totalCountTransactionsPedding = _b.sent();
                        balancePercetege = amountTotal_1.amountTotal.calculateBalanceMonth(currentMonthTransactions);
                        totalCount = creditPercetege.counter.MonthCredit + debitPercetege.counter.MonthDebit;
                        totalCountPrevMonth = creditPercetege.counter.prevMonthCredit + debitPercetege.counter.prevMonthDebit;
                        totalCountPercentege = amountTotal_1.amountTotal.calculatePercetege(totalCount, totalCountPrevMonth);
                        return [4 /*yield*/, Status_model_1.StatusModel.findOne({ name: "Aberto" })];
                    case 4:
                        statusPending = _b.sent();
                        if (!!statusPending) return [3 /*break*/, 6];
                        return [4 /*yield*/, Status_model_1.StatusModel.create({ name: "Aberto" })];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [4 /*yield*/, Ordermodel_1.orderModel.countDocuments({
                            $and: [
                                {
                                    dateEntry: {
                                        $gte: new Date(startPreviusMonth),
                                        $lte: new Date(endPreviusMonth),
                                    },
                                },
                                { status: statusPending === null || statusPending === void 0 ? void 0 : statusPending._id },
                                { deleted: false },
                            ],
                        })];
                    case 7:
                        ordersCountPendingPrevMonth = _b.sent();
                        return [4 /*yield*/, Ordermodel_1.orderModel.countDocuments({
                                $and: [
                                    { status: statusPending === null || statusPending === void 0 ? void 0 : statusPending._id },
                                    { deleted: false },
                                    {
                                        dateEntry: {
                                            $gte: new Date(endPreviusMonth),
                                            $lte: new Date(endMonth),
                                        },
                                    },
                                ],
                            })];
                    case 8:
                        ordersCountPending = _b.sent();
                        return [4 /*yield*/, Ordermodel_1.orderModel.countDocuments({
                                $and: [{ status: statusPending === null || statusPending === void 0 ? void 0 : statusPending._id }, { deleted: false }],
                            })];
                    case 9:
                        ordersTotalCount = _b.sent();
                        orderPercentege = amountTotal_1.amountTotal.calculatePercetege(ordersCountPending, ordersCountPendingPrevMonth);
                        dashboard = {
                            totalCount: totalCount,
                            totalCountPrevMonth: totalCountPrevMonth,
                            percetege: totalCountPercentege,
                            balance: __assign(__assign({}, balancePercetege), { totalAmount: balance }),
                            pending: {
                                transaction: { totalCount: totalCountTransactionsPedding },
                                credit: creditPercetegePending,
                                debit: debitPercetegePending,
                                orders: { totalCount: ordersTotalCount, percetege: orderPercentege },
                            },
                            finished: {
                                credit: creditPercetege,
                                debit: debitPercetege,
                            },
                        };
                        res.status(200).send(__assign(__assign({}, dashboard), { transactions: currentMonthTransactions, transactionsPreviusMonth: transactionsPreviusMonth }));
                        return [3 /*break*/, 11];
                    case 10:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    DasboardController.prototype.GetAllInfoYear = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var currentDate, currentYear, endYear, transactions, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        currentDate = new Date();
                        currentYear = new Date(currentDate.getFullYear(), 0, 1);
                        endYear = new Date(currentDate.getFullYear(), 11, 31);
                        return [4 /*yield*/, Finance_model_1.Transaction.find({
                                $and: [
                                    {
                                        entryDate: {
                                            $gte: new Date(currentYear),
                                            $lte: new Date(endYear),
                                        },
                                    },
                                    { deleted: false },
                                ],
                            })];
                    case 1:
                        transactions = _a.sent();
                        if (!transactions)
                            throw res.status(400).send("Houve um erro ao buscar as transações");
                        res.status(200).send(transactions);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return DasboardController;
}());
exports.dashboardController = new DasboardController();
