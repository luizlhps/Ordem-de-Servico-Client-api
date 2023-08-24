import { NextFunction, Request, Response } from "express";
import { StoreModel } from "../models/store.model";

class StoreValidation {
  async exec(req: Request, res: Response, next: NextFunction) {
    try {
      let systemAlreadyConfig = false;

      if (!systemAlreadyConfig) {
        const storage = await StoreModel.findOne();
        if (!storage) {
          return res
            .status(401)
            .json({ error: true, code: "system.notConfig", message: "Configure o sistema antes de prosseguir" });
        }
        systemAlreadyConfig = storage?.aplicationConfigurate === true ? true : false;

        if (storage.alreadyExistAdmin === false) {
          return res
            .status(401)
            .json({ error: true, code: "system.notExistAdmin", message: "O admin master não existe" });
        }
      }
      console.log("aaaa");
      next();
    } catch (error) {
      console.log(error);
    }
  }
}

export const storeValidation = new StoreValidation();

//ele deve chegar se o sistema ja esta configurado ou não
//caso ele esteja configurado não rpecisa procurar novamente no banco de dados
//ele deve retornar um erro chamado code.aplicatio.noConfig
