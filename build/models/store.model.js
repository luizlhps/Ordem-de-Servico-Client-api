"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreModel = void 0;
var mongoose_1 = require("mongoose");
var storeSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    cnpj: { type: String, require: true },
    phone: { type: String, require: true },
    telephone: { type: String, require: false },
    address: {
        cep: { type: String, required: true },
        state: { type: String, required: true },
        neighborhood: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        number: { type: String, required: true },
        complement: String,
    },
    avatar: { type: String, default: null },
    aplicationConfigurate: { type: Boolean, default: false },
    alreadyExistAdmin: { type: Boolean, default: false },
});
exports.StoreModel = (0, mongoose_1.model)("StoreModel", storeSchema);
