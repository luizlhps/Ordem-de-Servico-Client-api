"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAdminValidate = exports.storageCreateValidate = exports.recoveryPasswordValidate = exports.loginValidate = exports.registerValidate = void 0;
var joi_1 = __importDefault(require("joi"));
var registerValidate = function (data) {
    var schema = joi_1.default.object({
        name: joi_1.default.string().required().min(3).max(50).messages({
            "string.base": "O campo nome deve ser uma string",
            "string.empty": "O campo nome não pode estar vazio",
            "any.required": "O campo nome é obrigatório",
            "string.min": "O campo nome deve ter no mínimo {#limit} caracteres",
            "string.max": "O campo nome deve ter no máximo {#limit} caracteres",
        }),
        email: joi_1.default.string().required().min(3).max(50).messages({
            "string.base": "O campo e-mail deve ser uma string",
            "string.empty": "O campo e-mail não pode estar vazio",
            "any.required": "O campo e-mail é obrigatório",
            "string.min": "O campo e-mail deve ter no mínimo {#limit} caracteres",
            "string.max": "O campo e-mail deve ter no máximo {#limit} caracteres",
        }),
        group: joi_1.default.string().required().messages({
            "any.base": "O campo grupo deve ser uma lista",
            "any.empty": "O campo grupo não pode estar vazio",
            "any.required": "O campo grupo é obrigatório",
        }),
        password: joi_1.default.string().required().min(6).max(250).messages({
            "string.base": "O campo senha deve ser uma string",
            "string.empty": "O campo senha não pode estar vazio",
            "any.required": "O campo senha é obrigatório",
            "string.min": "A senha deve ter no mínimo {#limit} caracteres",
            "string.max": "A senha deve ter no máximo {#limit} caracteres",
        }),
        phone: joi_1.default.string().required().min(6).max(250).messages({
            "string.base": "O campo phone deve ser uma string",
            "string.empty": "O campo phone não pode estar vazio",
            "any.required": "O campo phone é obrigatório",
            "string.min": "O phone deve ter no mínimo {#limit} caracteres",
            "string.max": "O phone deve ter no máximo {#limit} caracteres",
        }),
    });
    return schema.validate(data);
};
exports.registerValidate = registerValidate;
var loginValidate = function (data) {
    var schema = joi_1.default.object({
        email: joi_1.default.string().required().min(3).max(50).messages({
            "string.base": "O campo e-mail deve ser uma string",
            "string.empty": "O campo e-mail não pode estar vazio",
            "any.required": "O campo e-mail é obrigatório",
            "string.min": "O campo e-mail deve ter no mínimo {#limit} caracteres",
            "string.max": "O campo e-mail deve ter no máximo {#limit} caracteres",
        }),
        password: joi_1.default.string().required().min(6).max(250).messages({
            "string.base": "O campo senha deve ser uma string",
            "string.empty": "O campo senha não pode estar vazio",
            "any.required": "O campo senha é obrigatório",
            "string.min": "A senha deve ter no mínimo {#limit} caracteres",
            "string.max": "A senha deve ter no máximo {#limit} caracteres",
        }),
    });
    return schema.validate(data);
};
exports.loginValidate = loginValidate;
var recoveryPasswordValidate = function (data) {
    var schema = joi_1.default.object({
        token: joi_1.default.string().required().min(3).max(50).messages({
            "string.base": "O campo token deve ser uma string",
            "string.empty": "O campo token não pode estar vazio",
            "any.required": "O campo token é obrigatório",
            "string.min": "O token deve ter no mínimo {#limit} caracteres",
            "string.max": "O token deve ter no máximo {#limit} caracteres",
        }),
        password: joi_1.default.string().required().min(6).max(250).messages({
            "string.base": "O campo senha deve ser uma string",
            "string.empty": "O campo senha não pode estar vazio",
            "any.required": "O campo senha é obrigatório",
            "string.min": "A senha deve ter no mínimo {#limit} caracteres",
            "string.max": "A senha deve ter no máximo {#limit} caracteres",
        }),
    });
    return schema.validate(data);
};
exports.recoveryPasswordValidate = recoveryPasswordValidate;
var addressSchema = joi_1.default.object({
    cep: joi_1.default.string()
        .required()
        .pattern(/^\d{8,}$/)
        .message("O cep deve conter apenas dígitos e ter no mínimo 8 dígitos."),
    state: joi_1.default.string().required(),
    neighborhood: joi_1.default.string().required(),
    street: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    number: joi_1.default.string().required(),
    complement: joi_1.default.any(),
});
var storageCreateValidate = function (data) {
    var schema = joi_1.default.object().keys({
        address: addressSchema,
        name: joi_1.default.string().required(),
        phone: joi_1.default.string()
            .required()
            .pattern(/^\d{10,}$/)
            .message("O celular deve conter apenas dígitos e ter no mínimo 11 dígitos."),
        cnpj: joi_1.default.string()
            .required()
            .pattern(/^\d{10,}$/)
            .message("O cnpj deve conter apenas dígitos e ter no mínimo 14 dígitos."),
        telephone: joi_1.default.string()
            .required()
            .pattern(/^\d{10,}$/)
            .message("O telefone deve conter apenas dígitos e ter no mínimo 10 dígitos."),
    });
    return schema.validate(data);
};
exports.storageCreateValidate = storageCreateValidate;
var registerAdminValidate = function (data) {
    var schema = joi_1.default.object({
        name: joi_1.default.string().required().min(3).max(50).messages({
            "string.base": "O campo nome deve ser uma string",
            "string.empty": "O campo nome não pode estar vazio",
            "any.required": "O campo nome é obrigatório",
            "string.min": "O campo nome deve ter no mínimo {#limit} caracteres",
            "string.max": "O campo nome deve ter no máximo {#limit} caracteres",
        }),
        email: joi_1.default.string().required().min(3).max(50).messages({
            "string.base": "O campo e-mail deve ser uma string",
            "string.empty": "O campo e-mail não pode estar vazio",
            "any.required": "O campo e-mail é obrigatório",
            "string.min": "O campo e-mail deve ter no mínimo {#limit} caracteres",
            "string.max": "O campo e-mail deve ter no máximo {#limit} caracteres",
        }),
        phone: joi_1.default.string()
            .required()
            .pattern(/^\d{10,}$/)
            .min(11)
            .messages({
            "string.base": "O campo phone deve ser uma string",
            "string.empty": "O campo phone não pode estar vazio",
            "any.required": "O campo phone é obrigatório",
            "string.min": "O campo e-mail deve ter no mínimo {#limit} caracteres",
        }),
        password: joi_1.default.string().required().min(6).max(250).messages({
            "string.base": "O campo senha deve ser uma string",
            "string.empty": "O campo senha não pode estar vazio",
            "any.required": "O campo senha é obrigatório",
            "string.min": "A senha deve ter no mínimo {#limit} caracteres",
            "string.max": "A senha deve ter no máximo {#limit} caracteres",
        }),
    });
    return schema.validate(data);
};
exports.registerAdminValidate = registerAdminValidate;
