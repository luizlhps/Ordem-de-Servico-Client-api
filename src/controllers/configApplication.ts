import { NextFunction, Response, Request } from "express";
import { registerAdminValidate, storageCreateValidate } from "./validate";
import { StoreModel } from "../models/store.model";
import { User, UserCounter } from "../models/User.model";
import bcript from "bcryptjs";
import { AuthGroupModel } from "../models/AuthGroup.model";
import { StatusModel } from "../models/Status.model";
import { counterId } from "../utils/autoIncrementId";
import { Balance, counterFinanceModel } from "../models/Finance.model";

class ConfigApplication {
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, address, phone, cnpj, telephone } = req.body;

      const { error } = storageCreateValidate(req.body);

      if (error) {
        return res.status(220).send(`Erros na validação: ${error.details.map((detail) => detail.message).join(", ")}`);
      }

      const already = await StoreModel.findOne();

      if (already?.aplicationConfigurate === true) {
        return res
          .status(401)
          .send({ error: true, code: "system.AlreadyConfig.Store", message: "O store ja esta configurado." });
      }

      //Create status
      const incrementIDStatus = (await counterId(counterFinanceModel)).getNextId();
      console.log(await incrementIDStatus);

      const alreadyExistStatusClose = StatusModel.findOne({ name: "Fechado" });
      if (!alreadyExistStatusClose) {
        await StatusModel.create({ id: await incrementIDStatus, name: "Fechado" });
      }

      const alreadyExistStatusOpen = StatusModel.findOne({ name: "Fechado" });
      if (!alreadyExistStatusOpen) {
        const incrementNextIDStatus = (await counterId(counterFinanceModel)).getNextId();
        await StatusModel.create({ id: await incrementNextIDStatus, name: "Aberto" });
      }

      //Create balance
      await Balance.create({ value: 0 });

      //Create Storage info
      if (!already) {
        const store = await StoreModel.create({
          name: name,
          address: address,
          phone: phone,
          cnpj: cnpj,
          telephone: telephone,
          aplicationConfigurate: true,
        });
        return res.status(201).send({ store });
      }
      const store = await StoreModel.findByIdAndUpdate(
        already._id,
        {
          $set: {
            name: name,
            address: address,
            phone: phone,
            cnpj: cnpj,
            telephone: telephone,
            aplicationConfigurate: true,
          },
        },
        { new: true }
      );

      return res.status(201).send({ store });
    } catch (error) {
      console.log(error);
      res.status(401).send({ error: true, code: "system.Error", message: "Houve um erro ao criar o store" });
    }
  }
  async userAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, phone, email, password } = req.body;

      const { error } = registerAdminValidate(req.body);

      if (error) {
        return res.status(400).send(error);
      }

      const already = await StoreModel.findOne();
      if (already?.alreadyExistAdmin === true) {
        return res.status(401).send({
          error: true,
          code: "system.AlreadyConfig.Admin",
          message: "O sistema ja esta configurado e com admin master configurado",
        });
      }
      if (!already) {
        return res.status(400).send({ error: true, code: "system.Error", message: "Algum erro ocorreu." });
      }

      //Create Group Permissions
      const authGroupId = async () => {
        const authGroupAlreadyExist = await AuthGroupModel.findOne();

        if (!authGroupAlreadyExist) {
          const authGroup = await AuthGroupModel.create({
            name: "admin",
            permissions: {
              create: ["adminMaster"],
              deleted: ["adminMaster"],
              update: ["adminMaster"],
              view: ["adminMaster"],
            },
          });
          return authGroup._id;
        }

        return authGroupAlreadyExist._id;
      };

      //Create User info

      const incrementIDUser = (await counterId(UserCounter)).getNextId();

      const userAdmin = await User.create({
        id: await incrementIDUser,
        name: name,
        phone: phone,
        email: email,
        password: bcript.hashSync(password),
        group: await authGroupId(),
      });

      (already.alreadyExistAdmin = true), already.save();

      return res.status(201).send(userAdmin);
    } catch (error) {
      console.log(error);
      res.status(401).send({ error: true, code: "system.Error", message: "Houve um erro ao criar o admin master" });
    }
  }
}

export const configApplication = new ConfigApplication();