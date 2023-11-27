"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerModel = exports.customersCounter = void 0;
var mongoose_1 = __importStar(require("mongoose"));
exports.customersCounter = (0, mongoose_1.model)("customersCounter", new mongoose_1.Schema({
    _id: { type: String, required: true },
    seq_value: { type: Number, default: 0 },
}));
var customerSchema = new mongoose_1.default.Schema({
    id: Number,
    name: String,
    email: String,
    contact: String,
    phone: String,
    cpfOrCnpj: String,
    telephone: String,
    address: [
        {
            cep: { type: String, required: true },
            state: { type: String, required: true },
            neighborhood: { type: String, required: true },
            street: { type: String, required: true },
            city: { type: String, required: true },
            number: { type: String, required: true },
            complement: String,
        },
    ],
    orders: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Order", required: false }],
    deleted: { type: Boolean, default: false },
}, { versionKey: false, timestamps: true });
exports.customerModel = (0, mongoose_1.model)("Customer", customerSchema);
