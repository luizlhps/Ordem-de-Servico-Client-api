import { NextFunction, Response, Request } from "express";
import { IRequest, IUser } from "../types/requestType";
import { User } from "../models/User.model";

interface IParameter {
  parameter:
    | "dashboard"
    | "customer"
    | "finance"
    | "order"
    | "status"
    | "services"
    | "user"
    | "admin"
    | "visitor"
    | "permissionsGroup";
}

class AuthPermissionVerify {
  create({ parameter }: IParameter) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const user = await User.findOne({ _id: req.userObj?._id }).populate("group");
        const userGroup = user?.group as any;

        if (!userGroup.permissions) return res.status(403).send("Acesso não autorizado!");

        const { permissions } = userGroup;
        if (!permissions?.create?.includes(parameter)) {
          if (permissions?.create?.includes("adminMaster")) return next();
          return res.status(403).send("Acesso não autorizado!");
        }
        next();
      } catch (error) {
        console.log(error);
        return res.status(403).send("Acesso não autorizado!");
      }
    };
  }

  update({ parameter }: IParameter) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const user = await User.findOne({ _id: req.userObj?._id }).populate("group");
        const userGroup = user?.group as any;

        if (!userGroup.permissions) return res.status(403).send("Acesso não autorizado!");

        const { permissions } = userGroup;
        if (!permissions?.update?.includes(parameter)) {
          if (permissions?.view?.includes("adminMaster")) {
            return next();
          }
          return res.status(403).send("Acesso não autorizado!");
        }
        next();
      } catch (error) {
        console.log(error);
        return res.status(403).send("Acesso não autorizado!");
      }
    };
  }
  view({ parameter }: IParameter) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const user = await User.findOne({ _id: req.userObj?._id }).populate("group");
        const userGroup = user?.group as any;

        if (!userGroup.permissions) return res.status(403).send("Acesso não autorizado!");

        const { permissions } = userGroup;

        console.log(permissions);
        if (!permissions?.view?.includes(parameter)) {
          if (permissions?.view?.includes("adminMaster")) {
            return next();
          }
          console.log("res");
          return res.status(403).send("Acesso não autorizado!");
        }
        next();
      } catch (error) {
        console.log(error);
        return res.status(403).send("Acesso não autorizado!");
      }
    };
  }

  delete({ parameter }: IParameter) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const user = await User.findOne({ _id: req.userObj?._id }).populate("group");
        const userGroup = user?.group as any;

        if (!userGroup.permissions) return res.status(403).send("Acesso não autorizado!");

        const { permissions } = userGroup;
        if (!permissions?.deleted?.includes(parameter)) {
          if (permissions?.deleted?.includes("adminMaster")) return next();
          return res.status(403).send("Acesso não autorizado!");
        }
        next();
      } catch (error) {
        console.log(error);
        return res.status(403).send("Acesso não autorizado!");
      }
    };
  }
}

export const authPermissionVerify = new AuthPermissionVerify();
