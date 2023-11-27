"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorValidation = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var ErrorValidation = /** @class */ (function () {
    function ErrorValidation() {
    }
    ErrorValidation.prototype.intanceError = function (err, req, res, next) {
        if (err instanceof mongoose_1.default.Error.ValidationError) {
            // Transforma o erro em um objeto que pode ser enviado para o frontend
            var errors = Object.keys(err.errors).reduce(function (acc, key) {
                acc[key] = err.errors[key].message;
                return acc;
            }, {});
            return res.status(400).json({ message: "Validation error", errors: errors });
        }
        // Verifica se o erro é uma instância de SyntaxError
        if (err instanceof SyntaxError) {
            return res.status(400).json({ message: "Invalid JSON" });
        }
        // Outros tipos de erro
        return res.status(500).json({ message: "Internal server error" });
    };
    return ErrorValidation;
}());
exports.errorValidation = new ErrorValidation();
