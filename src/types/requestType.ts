import { Request } from "express";

export interface IUser {
  _id: string;
  group: Group;
  iat: number;
  exp: number;
}

export interface Group {
  create: string[];
  update: any[];
  deleted: any[];
  view: any[];
}

export interface IRequest extends Request {
  user?: IUser;
}
