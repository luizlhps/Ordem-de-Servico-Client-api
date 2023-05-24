import { CostumersCounter, CustomerModal, IAddress } from "../models/Customer.model";
import mongoose, { Request, Response } from "express";
import { counterId } from "../utils/autoIncrementId";

//[] Validar "cep" "state", "neighborhood", "street", "city"
//[] Validar "name" "email", "contact", "strephoneet", "cpfOrCnpj","telephone"
class CustomerController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, contact, phone, cpfOrCnpj, telephone, address } = req.body;

      const requiredFields = ["cep", "state", "neighborhood", "street", "city", "number"];
      if (!address) {
        throw new Error(`Address is required`);
      }
      if (!name) return res.status(400).send({ message: "O campo nome é obrigatório" });
      if (!phone) return res.status(400).send({ message: "O campo celular é obrigatório" });
      if (!cpfOrCnpj) return res.status(400).send({ message: "O campo CPF ou CNPJ é obrigatório" });

      //Verifica cada requiredField
      address.forEach((item: IAddress) => {
        requiredFields.forEach((field) => {
          if (!item.hasOwnProperty(field)) {
            throw new Error(`Address field '${field}' is required`);
          }
        });
      });

      const incrementId = (await counterId(CostumersCounter)).getNextId();

      const cliente = await CustomerModal.create({
        id: await incrementId,
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
  async getAll(req: Request, res: Response) {
    const { filter, page = 1, limit = 10 } = req.query;

    const numberId = Number(filter);

    try {
      const customer = await CustomerModal.find({
        $or: [
          { name: { $regex: filter, $options: "i" } },
          { phone: filter },
          { cpfOrCnpj: filter },
          { id: numberId ? numberId : null },
        ],
      })
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit)) //skipa os itens por exemplo 2-1 * 10 = 10 skipa os 10 primeiros itens
        .limit(Number(limit));

      const totalCount = await CustomerModal.countDocuments();

      if (customer.length < 1) return res.status(404).json("nada encontrado");

      res.status(200).json({ Total: totalCount, Page: Number(page), limit: Number(limit), customer });
    } catch (error) {
      console.warn(error);
      res.status(400).json(error);
    }
  }
  async getById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const customer = await CustomerModal.findById(id);

      res.status(200).json({ customer });
    } catch (error) {
      console.warn(error);
      res.status(400).json(error);
    }
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const customer = await CustomerModal.findByIdAndDelete(id);

      res.status(200).json({ customer });
    } catch (error) {
      console.warn(error);
      res.status(400).json(error);
    }
  }
}
export const customerController = new CustomerController();
