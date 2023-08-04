import router from "express";
import { handleRefreshToken } from "../../controllers/handleRefreshToken";

export const refreshTokenRouter = router();

refreshTokenRouter.post("/", handleRefreshToken.execute);
