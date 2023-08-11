import { Request, Response } from "express";
import { User } from "../models/User.model";

class PhotoProfileController {
  async UploudImage(req: Request, res: Response) {
    try {
      const { file } = req;
      if (!file) return res.status(400).send("É necessário um arquivo");

      const user = await User.findById(req.userObj?._id);
      if (!user) return res.status(404).send("Usuário não encontrado");
      console.log(user);
      const avatar_file = file.filename;

      user.avatar = avatar_file;
      user.save();
      res.status(200).json(user);
      console.log(avatar_file);
    } catch (error) {
      console.log(error);
      res.status(500).send("Houve um erro no servidor");
    }
  }
}

export const photoProfileController = new PhotoProfileController();
