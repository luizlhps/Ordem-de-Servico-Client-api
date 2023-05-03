import { CustomerSchema, IAddress } from "../models/Customer.model";
import mongoose, { Request, Response } from "express";

class CustomerController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, contact, phone, cpfOrCnpj, telephone, address } = req.body;
      const requiredFields = ["cep", "state", "neighborhood", "street", "city", "number"];
      if (!address) {
        throw new Error(`Address is required`);
      }

      address.forEach((item: IAddress) => {
        requiredFields.forEach((field) => {
          if (!item.hasOwnProperty(field)) {
            throw new Error(`Address field '${field}' is required`);
          }
        });
      });
      const cliente = await CustomerSchema.create({
        name,
        email,
        contact,
        phone,
        cpfOrCnpj,
        telephone,
        address,
      });

      res.status(201).json(cliente);
    } catch (err: any) {
      console.warn(err);
      res.status(400).json({ message: err.message });
    }
  }
}
export const customerController = new CustomerController();
