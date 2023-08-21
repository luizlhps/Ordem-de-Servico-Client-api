import admin from "firebase-admin";
import fs from "fs";
import { getType } from "mime";
import uploud, { tmpFolder } from "../../config/uploud";
import { resolve } from "path";
import { Request } from "express";
import { IUser } from "../../models/User.model";

try {
  if (process.env.DISK === "firebase") {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        projectId: process.env.FIREBASE_PROJECT_ID,
      }),
      storageBucket: process.env.BUCKET,
    });
  }
} catch (error) {
  console.error("Erro ao inicializar o Firebase:", error);
}

class FirebaseStorageProvider {
  private path = (file: string, folder: string) => {
    return resolve(`${uploud.tmpFolder}/${folder}`, file);
  };

  async save(file: string, folder: string, user: IUser) {
    const oldPath = resolve(`${uploud.tmpFolder}/${file}`);

    return new Promise(async (resolve, reject) => {
      const bucket = admin.storage().bucket();

      const fileFirebase = bucket.file(`${folder}/${file}`);
      const fileBuffer = await fs.promises.readFile(oldPath);
      const contentType = getType(oldPath);

      const stream = fileFirebase.createWriteStream({
        metadata: {
          contentType: contentType,
        },
      });

      stream.on("error", (e) => {
        console.log(e);
        throw { error: true, code: "error.uploud", message: "Houve um erro ao enviar o arquivo." };
      });

      stream.on("finish", async () => {
        //torna o arquivo publico
        await bucket.makePublic();

        user.avatar = `https://storage.googleapis.com/${bucket.name}/${folder}/${file}`;
        await user.save();
        resolve(file);
      });

      stream.end(fileBuffer);
    });
  }

  async delete(file: string, folder: string) {
    const bucket = admin.storage().bucket();

    const urlPath = file.replace("https://storage.googleapis.com/loustech-site.appspot.com/", "");

    await bucket
      .file(urlPath)
      .delete()

      .catch((error) => {
        console.error("Erro ao excluir o arquivo:", error);
      });
  }
}

export const firebaseStorageProvider = new FirebaseStorageProvider();
