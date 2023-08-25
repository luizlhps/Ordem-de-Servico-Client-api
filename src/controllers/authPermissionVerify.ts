import { NextFunction, Response, Request } from "express";
import { IRequest, IUser } from "../types/requestType";
import { User } from "../models/User.model";

interface IParameter {
  parameter: "dashboard" | "customer" | "finance" | "order" | "status" | "services" | "user" | "admin" | "visitor";
}

class AuthPermissionVerify {
  create({ parameter }: IParameter) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      console.log();
      const user = await User.findOne({ _id: req.userObj?._id }).populate("group");
      const { permissions } = user?.group as any;

      if (!permissions?.create?.includes(parameter)) {
        if (permissions?.create?.includes("adminMaster")) return next();
        return res.status(403).send("Acesso não autorizado!");
      }
      next();
    };
  }

  update({ parameter }: IParameter) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      const user = await User.findOne({ _id: req.userObj?._id }).populate("group");
      const { permissions } = user?.group as any;

      if (!permissions?.update?.includes(parameter)) {
        if (!permissions?.update?.includes("adminMaster")) return next();
        return res.status(403).send("Acesso não autorizado!");
      }
      next();
    };
  }

  view({ parameter }: IParameter) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      const user = await User.findOne({ _id: req.userObj?._id }).populate("group");
      const { permissions } = user?.group as any;

      if (!permissions?.view?.includes(parameter)) {
        if (permissions?.view?.includes("adminMaster")) return next();
        return res.status(403).send("Acesso não autorizadso!");
      }
      next();
    };
  }

  delete({ parameter }: IParameter) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      const user = await User.findOne({ _id: req.userObj?._id }).populate("group");
      const { permissions } = user?.group as any;

      if (!permissions?.deleted?.includes(parameter)) {
        if (permissions?.deleted?.includes("adminMaster")) return next();
        return res.status(403).send("Acesso não autorizado!");
      }
      next();
    };
  }
}

export const authPermissionVerify = new AuthPermissionVerify();
