"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./route/adminRouter"), exports);
__exportStar(require("./route/userRouter"), exports);
__exportStar(require("./route/financeRouter"), exports);
__exportStar(require("./route/statusRouter"), exports);
__exportStar(require("./route/customersRouter"), exports);
__exportStar(require("./route/serviceRouter"), exports);
__exportStar(require("./route/orderRouter"), exports);
__exportStar(require("./route/passwordRecoveryRouter"), exports);
__exportStar(require("./route/dashBoardRouter"), exports);
__exportStar(require("./route/authGroupRouter"), exports);
__exportStar(require("./route/refreshTokenRouter"), exports);
__exportStar(require("./route/photoRouter"), exports);
__exportStar(require("./route/configApplicationRouter"), exports);
