"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
var express_1 = __importDefault(require("express"));
var routes_1 = require("./routes/");
var connect_1 = __importDefault(require("./database/connect"));
var ErrosValidation_1 = require("./middleware/ErrosValidation");
var StoreValidation_1 = require("./middleware/StoreValidation");
(0, connect_1.default)();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
var port = process.env.PORT || 7000;
app.use(express_1.default.json());
app.use(ErrosValidation_1.errorValidation.intanceError);
app.use(function (req, res, next) {
    if (req.path === "/install/store" || req.path === "/install/userAdmin") {
        return next();
    }
    StoreValidation_1.storeValidation.exec(req, res, next);
});
app.use("/", routes_1.photoRouter);
app.use("/", routes_1.userRouter);
app.use("/", routes_1.passowordRecoveryRouter);
app.use("/order", routes_1.orderRouter);
app.use("/admin", routes_1.adminRouter);
app.use("/finance", routes_1.financeRouter);
app.use("/status", routes_1.statusRouter);
app.use("/customers", routes_1.customerRouter);
app.use("/services", routes_1.serviceRouter);
app.use("/dashboard", routes_1.dashBoardRouter);
app.use("/authGroup", routes_1.authGroupRouter);
app.use("/refreshToken", routes_1.refreshTokenRouter);
app.use("/", routes_1.configApplicationRouter);
app.listen(port, function () { return console.log("Porta usada:", port); });
