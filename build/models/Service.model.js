"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceModel = exports.servicePrice = exports.serviceCounter = void 0;
var mongoose_1 = require("mongoose");
exports.serviceCounter = (0, mongoose_1.model)("serviceStatus", new mongoose_1.Schema({
    _id: { type: String, required: true },
    seq_value: { type: Number, default: 0 },
}));
exports.servicePrice = (0, mongoose_1.model)("servicePrice", new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    service: { type: mongoose_1.Schema.Types.ObjectId, ref: "Service", required: true },
    price: { type: Number, required: true },
    order: { type: mongoose_1.Schema.Types.ObjectId, ref: "Order", required: true },
}));
exports.serviceModel = (0, mongoose_1.model)("Service", new mongoose_1.Schema({
    id: { type: Number, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    deleted: { type: Boolean, default: false, required: true },
}, {
    timestamps: true,
    versionKey: false,
}).index({ description: 1, title: 1 }));
