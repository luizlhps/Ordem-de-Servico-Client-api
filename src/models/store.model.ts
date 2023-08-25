import { Schema, model, Document } from "mongoose";

export interface IStorageAddress {
  cep: string;
  state: string;
  neighborhood: string;
  complement?: string;
  street: string;
  city: string;
  number: string;
}

export interface IStoreSchema extends Document {
  name: string;
  cnpj: string;
  phone: string;
  telephone: string;
  address: IStorageAddress;
  aplicationConfigurate: boolean;
  alreadyExistAdmin: boolean;
  avatar: string;
}

const storeSchema = new Schema<IStoreSchema>({
  name: { type: String, require: true },
  cnpj: { type: String, require: true },
  phone: { type: String, require: true },
  telephone: { type: String, require: false },
  address: {
    cep: { type: String, required: true },
    state: { type: String, required: true },
    neighborhood: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    number: { type: String, required: true },
    complement: String,
  },
  avatar: { type: String, default: null },
  aplicationConfigurate: { type: Boolean, default: false },
  alreadyExistAdmin: { type: Boolean, default: false },
});

export const StoreModel = model("StoreModel", storeSchema);
