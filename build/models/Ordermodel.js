"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = exports.ordersCounter = void 0;
var mongoose_1 = require("mongoose");
exports.ordersCounter = (0, mongoose_1.model)("ordersStatus", new mongoose_1.Schema({
    _id: { type: String, required: true },
    seq_value: { type: Number, default: 0 },
}));
var orderSchema = new mongoose_1.Schema({
    id: { type: Number, unique: true },
    equipment: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    defect: { type: String, required: true },
    observation: { type: String, required: false },
    technicalOpinion: { type: String, required: false },
    dateEntry: { type: Date, required: true },
    exitDate: { type: Date, required: false },
    services: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Service", required: false }],
    status: { type: mongoose_1.Schema.Types.ObjectId, ref: "Status", required: false },
    customer: { type: mongoose_1.Schema.Types.ObjectId, ref: "Customer", required: true },
    amount: { type: Number, required: false, default: 0 },
    discount: { type: Number, required: false, default: 0 },
    totalAmount: { type: Number, required: false, default: 0 },
    deleted: { type: Boolean, default: false },
}, {
    versionKey: false,
    timestamps: true,
    strictPopulate: false,
});
exports.orderModel = (0, mongoose_1.model)("Order", orderSchema);
