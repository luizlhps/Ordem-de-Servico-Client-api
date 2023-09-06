import { Response } from "express";
import { firebaseStorageProvider } from "./Storage/FirebaseStorage";
import { localhostStorageProvider } from "./Storage/LocalStoarage";
import { IUser } from "../models/User.model";
import { IStoreSchema } from "../models/store.model";

class StorageProvider {
  async save(file: string, folder: string, user: IUser | IStoreSchema) {
    switch (process.env.DISK) {
      case "firebase":
        await firebaseStorageProvider.save(file, folder, user);
        break;
      case "local":
        await localhostStorageProvider.save(file, folder, user);
        break;
    }
  }

  async delete(file: string, folder: string) {
    switch (process.env.DISK) {
      case "firebase":
        await firebaseStorageProvider.delete(file, folder);
        break;
      case "local":
        await localhostStorageProvider.delete(file, folder);
        break;
    }
  }

  async cleanTmp(file: string) {
    switch (process.env.DISK) {
      case "firebase":
        await firebaseStorageProvider.cleanTmp(file);
        break;
      case "local":
        await localhostStorageProvider.cleanTmp(file);
        break;
    }
  }
}

export const storageProvider = new StorageProvider();
