import { Request, Response } from "express";
import { User } from "../models/User.model";
import { deleteFile } from "../utils/file";
import { storageProvider } from "../providers/StorageProvider";

class PhotoProfileController {
  async UploudImage(req: Request, res: Response) {
    try {
      //file
      const { file } = req;
      if (!file) return res.status(400).send("É necessário um arquivo");
      const avatar_file = file.filename;

      //user
      const user = await User.findById(req.userObj?._id);
      if (!user) return res.status(404).send("Usuário não encontrado");

      //remove case already exist the old in user avatar
      if (user.avatar) {
        await storageProvider.delete(user.avatar, "avatar");
      }
      //create file in store
      await storageProvider.save(avatar_file, "avatar", user);

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send("Houve um erro no servidor");
    }
  }
}

export const photoProfileController = new PhotoProfileController();
