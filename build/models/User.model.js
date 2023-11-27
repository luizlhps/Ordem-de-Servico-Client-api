"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = exports.UserCounter = exports.userCounterSchema = void 0;
var mongoose_1 = require("mongoose");
exports.userCounterSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    seq_value: { type: Number, default: 0 },
});
exports.UserCounter = (0, mongoose_1.model)("UserCounter", exports.userCounterSchema);
exports.userSchema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    deleted: { type: Boolean, default: false },
    group: { type: mongoose_1.Schema.Types.ObjectId, ref: "AuthGroup", required: true },
    avatar: { type: String, default: null },
    phone: { type: String, required: true },
    passwordRecovery: String,
    passwordExpire: Date,
}, { versionKey: false, timestamps: true });
exports.User = (0, mongoose_1.model)("User", exports.userSchema);
