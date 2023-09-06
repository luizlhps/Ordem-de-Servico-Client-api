import { NextFunction, Request, Response } from "express";
import { StoreModel } from "../models/store.model";

class StoreValidation {
  systemAlreadyConfig: boolean | null = null;

  private async checkSystemConfig(res: Response) {
    if (this.systemAlreadyConfig === null) {
      const storage = await StoreModel.findOne();
      if (!storage) {
        return res
          .status(401)
          .json({ error: true, code: "system.notConfig.store", message: "Configure o sistema antes de prosseguir" });
      }

      if (storage.aplicationConfigurate === false) {
        return res
          .status(401)
          .json({ error: true, code: "system.notConfig.store", message: "Configure o sistema antes de prosseguir" });
      }

      if (storage.alreadyExistAdmin === false) {
        return res
          .status(401)
          .json({ error: true, code: "system.notConfig.userAdmin", message: "O admin master não existe" });
      }
      this.systemAlreadyConfig = storage?.aplicationConfigurate === true ? true : false;
    }
  }

  async exec(req: Request, res: Response, next: NextFunction) {
    try {
      await this.checkSystemConfig(res);

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
