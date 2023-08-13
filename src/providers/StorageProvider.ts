import { Response } from "express";
import { firebaseStorageProvider } from "./Storage/FirebaseStorage";
import { localhostStorageProvider } from "./Storage/LocalStoarage";
import { IUser } from "../models/User.model";

class StorageProvider {
  async save(file: string, folder: string, user: IUser) {
    switch (process.env.DISK) {
      case "firebase":
        await firebaseStorageProvider.save(file, folder, user);
        break;
      case "local":
        await localhostStorageProvider.save(file, folder, user);
    }
  }

  async delete(file: string, folder: string) {
    switch (process.env.DISK) {
      case "firebase":
        await firebaseStorageProvider.delete(file, folder);
        break;
      case "local":
        await localhostStorageProvider.delete(file, folder);
    }
  }
}

export const storageProvider = new StorageProvider();
