import fs from "fs";
import { getType } from "mime";
import uploud, { tmpFolder } from "../../config/uploud";
import { resolve } from "path";
import { IUser } from "../../models/User.model";

class LocalhostStorageProvider {
  private path = (file: string, folder: string) => {
    return resolve(`${uploud.tmpFolder}/${folder}`, file);
  };

  async save(file: string, folder: string, user: IUser) {
    const oldPath = resolve(`${uploud.tmpFolder}/${file}`);
    const newPath = resolve(this.path(file, folder));

    await fs.promises.rename(oldPath, newPath);

    user.avatar = `http://localhost:${process.env.PORT}/${folder}/${file}`;
    await user.save();
    return file;
  }

  async delete(file: string, folder: string) {
    const filePath = file.replace(`http://localhost:${process.env.PORT}/${folder}/`, "");

    try {
      await fs.promises.stat(this.path(filePath, folder));
    } catch (error) {
      return;
    }

    await fs.promises.unlink(this.path(filePath, folder));
  }
}

export const localhostStorageProvider = new LocalhostStorageProvider();
