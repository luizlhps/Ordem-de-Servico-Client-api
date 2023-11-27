"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.counterFinanceModel = void 0;
var mongoose_1 = require("mongoose");
exports.counterFinanceModel = (0, mongoose_1.model)("CounterFinance", new mongoose_1.Schema({
    _id: { type: String, required: true },
    seq_value: { type: Number, default: 0 },
}));
exports.Transaction = (0, mongoose_1.model)("Transaction", new mongoose_1.Schema({
    id: { type: Number, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["credit", "debit"], required: true },
    status: { type: String, required: true },
    order: { type: mongoose_1.Schema.Types.ObjectId, ref: "Order" },
    entryDate: { type: Date, required: true },
    payDay: { type: Date, required: false },
    dueDate: { type: Date, required: false },
    deleted: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false }));
