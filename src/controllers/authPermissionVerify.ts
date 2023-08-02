import { NextFunction, Response, Request } from "express";
import { IRequest, IUser } from "../types/requestType";

interface IParameter {
  parameter: "dashboard" | "customer" | "finance" | "order" | "status" | "services" | "user" | "admin" | "visitor";
}

class AuthPermissionVerify {
  create({ parameter }: IParameter) {
    return (req: IRequest, res: Response, next: NextFunction) => {
      if (!req?.user?.group?.create?.includes(parameter)) {
        return res.status(403).send("Acesso não autorizado!");
      }
      next();
    };
  }

  update({ parameter }: IParameter) {
    return (req: IRequest, res: Response, next: NextFunction) => {
      if (!req?.user?.group?.update?.includes(parameter)) {
        return res.status(403).send("Acesso não autorizado!");
      }
      next();
    };
  }

  view({ parameter }: IParameter) {
    return (req: IRequest, res: Response, next: NextFunction) => {
      if (!req?.user?.group?.view?.includes(parameter)) {
        return res.status(403).send("Acesso não autorizado!");
      }
      next();
    };
  }

  delete({ parameter }: IParameter) {
    return (req: IRequest, res: Response, next: NextFunction) => {
      if (!req?.user?.group?.deleted?.includes(parameter)) {
        return res.status(403).send("Acesso não autorizado!");
      }
      next();
    };
  }
}

export const authPermissionVerify = new AuthPermissionVerify();
