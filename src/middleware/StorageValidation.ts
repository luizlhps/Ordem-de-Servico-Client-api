import { NextFunction, Request, Response } from "express";
import { StorageModel } from "../models/storage.model";

class StorageValidation {
  async exec(req: Request, res: Response, next: NextFunction) {
    try {
      let systemAlreadyConfig = false;

      if (!systemAlreadyConfig) {
        const storage = await StorageModel.findOne();
        if (!storage) {
          return res
            .status(401)
            .json({ error: true, code: "system.notConfig", message: "Configure o sistema antes de processeguir" });
        }
        systemAlreadyConfig = storage?.aplicationConfigurate === true ? true : false;
      }

      next();
    } catch (error) {
      console.log(error);
    }
  }
}

export const storageValidation = new StorageValidation();

//ele deve chegar se o sistema ja esta configurado ou não
//caso ele esteja configurado não rpecisa procurar novamente no banco de dados
//ele deve retornar um erro chamado code.aplicatio.noConfig
