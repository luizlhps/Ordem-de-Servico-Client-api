import { NextFunction, Request, Response } from "express";
import mongoose, { Error } from "mongoose";

class ErrorValidation {
  intanceError(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof mongoose.Error.ValidationError) {
      // Transforma o erro em um objeto que pode ser enviado para o frontend
      const errors = Object.keys(err.errors).reduce((acc: any, key) => {
        acc[key] = err.errors[key].message;
        return acc;
      }, {});
      return res.status(400).json({ message: "Validation error", errors });
    }
    // Verifica se o erro é uma instância de SyntaxError
    if (err instanceof SyntaxError) {
      return res.status(400).json({ message: "Invalid JSON" });
    }

    // Outros tipos de erro
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const errorValidation = new ErrorValidation();
