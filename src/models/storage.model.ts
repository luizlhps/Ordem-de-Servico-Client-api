import { Schema, model } from "mongoose";

export interface IStorageAddress {
  cep: string;
  state: string;
  neighborhood: string;
  complement?: string;
  street: string;
  city: string;
  number: string;
}

export interface IStorageSchema {
  name: string;
  cnpj: string;
  phone: string;
  telephone: string;
  address: IStorageAddress;
  aplicationConfigurate: boolean;
}

const storageSchema = new Schema<IStorageSchema>({
  name: { type: String, require: true },
  cnpj: { type: String, require: true },
  phone: { type: String, require: true },
  telephone: { type: String, require: true },
  address: {
    cep: { type: String, required: true },
    state: { type: String, required: true },
    neighborhood: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    number: { type: String, required: true },
    complement: String,
  },

  aplicationConfigurate: { type: Boolean, default: false },
});

export const StorageModel = model("StorageModel", storageSchema);
