"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGroupModel = exports.authGroupCounter = void 0;
var mongoose_1 = require("mongoose");
exports.authGroupCounter = (0, mongoose_1.model)("authGroupCounter", new mongoose_1.Schema({
    _id: { type: String, required: true },
    seq_value: { type: Number, default: 0 },
}));
var authGroupModel = new mongoose_1.Schema({
    id: Number,
    name: { type: String, required: true },
    deleted: { type: Boolean, default: false },
    permissions: {
        create: {
            type: [String],
            enum: [
                "dashboard",
                "customer",
                "finance",
                "order",
                "status",
                "services",
                "user",
                "admin",
                "permissionsGroup",
                "adminMaster",
            ],
            required: false,
        },
        update: {
            type: [String],
            enum: [
                "dashboard",
                "customer",
                "finance",
                "order",
                "status",
                "services",
                "user",
                "admin",
                "permissionsGroup",
                "adminMaster",
            ],
            required: false,
        },
        deleted: {
            type: [String],
            enum: [
                "dashboard",
                "customer",
                "finance",
                "order",
                "status",
                "services",
                "user",
                "admin",
                "permissionsGroup",
                "adminMaster",
            ],
            required: false,
        },
        view: {
            type: [String],
            enum: [
                "dashboard",
                "customer",
                "finance",
                "order",
                "status",
                "services",
                "user",
                "admin",
                "permissionsGroup",
                "adminMaster",
                "visitor",
            ],
            required: false,
        },
    },
}, { timestamps: true, versionKey: false });
exports.AuthGroupModel = (0, mongoose_1.model)("AuthGroup", authGroupModel);
