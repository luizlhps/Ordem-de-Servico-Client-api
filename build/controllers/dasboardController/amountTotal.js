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
exports.amountTotal = void 0;
var Finance_model_1 = require("../../models/Finance.model");
var AmountTotal = /** @class */ (function () {
    function AmountTotal() {
    }
    AmountTotal.prototype.calculatePercetege = function (quantity, refBase) {
        if (refBase === 0) {
            return 0;
        }
        var value = ((quantity - refBase) / refBase) * 100;
        return Number(value.toFixed(2));
    };
    AmountTotal.prototype.calculateCreditPercetegeMonth = function (_a) {
        var transactionsPreviusMonth = _a.transactionsPreviusMonth, currentMonthTransactions = _a.currentMonthTransactions, status = _a.status;
        var countprevMonth = 0;
        var countMonth = 0;
        var prevMonth = transactionsPreviusMonth.reduce(function (acc, current) {
            if (current.type === "credit" && current.status === status) {
                countprevMonth++;
                acc += current.amount;
            }
            return acc;
        }, 0);
        var month = currentMonthTransactions.reduce(function (acc, current) {
            if (current.type === "credit" && current.status === status) {
                countMonth++;
                acc += current.amount;
            }
            return acc;
        }, 0);
        var calculateCredit = {
            percetege: this.calculatePercetege(month, prevMonth),
            amountMonth: month,
            amountPrevMonth: prevMonth,
            counter: {
                MonthCredit: countMonth,
                prevMonthCredit: countprevMonth,
                percentege: this.calculatePercetege(countMonth, countprevMonth),
            },
        };
        return calculateCredit;
    };
    AmountTotal.prototype.calculateDebitPercetegeMonth = function (_a) {
        var transactionsPreviusMonth = _a.transactionsPreviusMonth, currentMonthTransactions = _a.currentMonthTransactions, status = _a.status;
        var countprevMonth = 0;
        var countMonth = 0;
        var prevMonth = transactionsPreviusMonth.reduce(function (acc, current) {
            if (current.type === "debit" && current.status === status) {
                countprevMonth++;
                acc += current.amount;
            }
            return acc;
        }, 0);
        var month = currentMonthTransactions.reduce(function (acc, current) {
            if (current.type === "debit" && current.status === status) {
                countMonth++;
                acc += current.amount;
            }
            return acc;
        }, 0);
        var calculateCredit = {
            percetege: this.calculatePercetege(month, prevMonth),
            amountMonth: month,
            amountPrevMonth: prevMonth,
            counter: {
                MonthDebit: countMonth,
                prevMonthDebit: countprevMonth,
                percentege: this.calculatePercetege(countMonth, countprevMonth),
            },
        };
        return calculateCredit;
    };
    AmountTotal.prototype.calculateBalanceMonth = function (transactionsMonth) {
        var monthCredit = transactionsMonth.reduce(function (acc, current) {
            if (current.type === "credit" && current.status === "finished") {
                acc += current.amount;
            }
            return acc;
        }, 0);
        var monthDebit = transactionsMonth.reduce(function (acc, current) {
            if (current.type === "debit" && current.status === "finished") {
                acc += current.amount;
            }
            return acc;
        }, 0);
        var calculateCredit = {
            percetege: this.calculatePercetege(monthCredit, monthDebit),
            totalAmountCredit: monthCredit,
            totalAmountDebit: monthDebit,
            totalAmountMonth: monthCredit - monthDebit,
        };
        return calculateCredit;
    };
    AmountTotal.prototype.countTransactions = function (endPreviusMonth, endMonth, startPreviusMonth) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionsPendingCount, transactionsFinishedCount, transactionsCountFinishedPreviusMonth, transactionsCountPendingPreviusMonth, transactionsCountDebitPendingPreviusMonth, transactionsDebitPendingCount, transactionsCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Finance_model_1.Transaction.countDocuments({
                            $and: [
                                {
                                    entryDate: {
                                        $gte: new Date(endPreviusMonth),
                                        $lte: new Date(endMonth),
                                    },
                                },
                                { status: "open" },
                                { deleted: false },
                            ],
                        })];
                    case 1:
                        transactionsPendingCount = _a.sent();
                        return [4 /*yield*/, Finance_model_1.Transaction.countDocuments({
                                $and: [
                                    {
                                        entryDate: {
                                            $gte: new Date(endPreviusMonth),
                                            $lte: new Date(endMonth),
                                        },
                                    },
                                    { status: "finished" },
                                    { deleted: false },
                                ],
                            })];
                    case 2:
                        transactionsFinishedCount = _a.sent();
                        return [4 /*yield*/, Finance_model_1.Transaction.countDocuments({
                                $and: [
                                    {
                                        entryDate: {
                                            $gte: new Date(startPreviusMonth),
                                            $lte: new Date(endPreviusMonth),
                                        },
                                    },
                                    { status: "finished" },
                                    { deleted: false },
                                ],
                            })];
                    case 3:
                        transactionsCountFinishedPreviusMonth = _a.sent();
                        return [4 /*yield*/, Finance_model_1.Transaction.countDocuments({
                                $and: [
                                    {
                                        entryDate: {
                                            $gte: new Date(startPreviusMonth),
                                            $lte: new Date(endPreviusMonth),
                                        },
                                    },
                                    { status: "open" },
                                    { deleted: false },
                                ],
                            })];
                    case 4:
                        transactionsCountPendingPreviusMonth = _a.sent();
                        return [4 /*yield*/, Finance_model_1.Transaction.countDocuments({
                                $and: [
                                    {
                                        entryDate: {
                                            $gte: new Date(startPreviusMonth),
                                            $lte: new Date(endPreviusMonth),
                                        },
                                    },
                                    { type: "debit" },
                                    { status: "open" },
                                    { deleted: false },
                                ],
                            })];
                    case 5:
                        transactionsCountDebitPendingPreviusMonth = _a.sent();
                        return [4 /*yield*/, Finance_model_1.Transaction.countDocuments({
                                $and: [
                                    {
                                        entryDate: {
                                            $gte: new Date(endPreviusMonth),
                                            $lte: new Date(endMonth),
                                        },
                                    },
                                    { type: "debit" },
                                    { status: "open" },
                                    { deleted: false },
                                ],
                            })];
                    case 6:
                        transactionsDebitPendingCount = _a.sent();
                        transactionsCount = {
                            total: {
                                pending: transactionsPendingCount,
                                pendingPercetege: this.calculatePercetege(transactionsFinishedCount, transactionsCountFinishedPreviusMonth),
                                finished: transactionsCountFinishedPreviusMonth,
                                finishedPercetege: this.calculatePercetege(transactionsPendingCount, transactionsCountPendingPreviusMonth),
                            },
                            debit: {
                                pending: transactionsDebitPendingCount,
                                percetege: this.calculatePercetege(transactionsDebitPendingCount, transactionsCountDebitPendingPreviusMonth),
                            },
                        };
                        return [2 /*return*/, transactionsCount];
                }
            });
        });
    };
    AmountTotal.prototype.calculatePercetegeYear = function () { };
    return AmountTotal;
}());
exports.amountTotal = new AmountTotal();
