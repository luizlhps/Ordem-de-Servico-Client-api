import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../models/User.model";
import { deleteFile } from "../utils/file";
import { storageProvider } from "../providers/StorageProvider";
import { AuthGroupModel } from "../models/AuthGroup.model";
import { StoreModel } from "../models/store.model";

class PhotoController {
  async UploudImage(req: Request, res: Response) {
    try {
      //file
      const { file } = req;
      if (!file) return res.status(400).send("É necessário um arquivo");
      const avatar_file = file.filename;

      console.log(req.userObj?._id);
      //user
      const user = await User.findById({ _id: req.userObj?._id });
      if (!user) return res.status(404).send("Usuário não encontrado");

      //remove case already exist the old in user avatar
      if (user.avatar) {
        await storageProvider.delete(user.avatar, "avatar");
      }

      //create file in store

      await storageProvider.save(avatar_file, "avatar", user);
      await user.save();
      res.status(200).json("atualizado com sucesso");
    } catch (error) {
      console.log(error);
      res.status(500).send("Houve um erro no servidor");
    }
  }

  async UploudImageAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      //file
      const { file } = req;
      if (!file) return next();
      const avatar_file = file.filename;

      //group
      const group = await AuthGroupModel.findOne({ name: "adminMaster" });
      if (!group) return res.status(404).send("As permissões do adminMaster não foi encontrado");

      //user
      const user = await User.findOne({ group: group._id });
      if (!user) return res.status(404).send("Usuário não encontrado");

      //remove case already exist the old in user avatar
      if (user.avatar) {
        await storageProvider.delete(user.avatar, "avatar");
      }

      //create file in store

      await storageProvider.save(avatar_file, "avatar", user);
      await user.save();

      res.status(200).json("atualizado com sucesso");
    } catch (error) {
      console.log(error);
      res.status(500).send("Houve um erro no servidor");
    }
  }

  async UploudImageStore(req: Request, res: Response, next: NextFunction) {
    try {
      //file
      const { file } = req;
      if (!file) return next();
      const avatar_file = file.filename;

      //user
      const store = await StoreModel.findOne();
      if (!store) return res.status(404).send("Loja não encontrado");

      //remove case already exist the old in user avatar
      if (store.avatar) {
        await storageProvider.delete(store.avatar, "storeAvatar");
      }

      //create file in store

      await storageProvider.save(avatar_file, "storeAvatar", store);
      await store.save();

      res.status(200).json("atualizado com sucesso");
    } catch (error) {
      console.log(error);
      res.status(500).send("Houve um erro no servidor");
    }
  }
}

export const photoController = new PhotoController();
