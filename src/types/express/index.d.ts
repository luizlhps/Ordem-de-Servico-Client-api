export {};

declare global {
  namespace Express {
    export interface Request {
      userObj?: UserToken;
    }
  }
}

interface UserToken {
  _id: string;
  group: {
    permissions: {
      create: string[];
      deleted: string[];
      update: string[];
      view: string[];
    };
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  iat: number;
  exp: number;
}
