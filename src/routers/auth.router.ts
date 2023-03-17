import { Router } from "express";

import { authController } from "../controllers";
import { authMiddleware, userMiddleware } from "../middlewares";

const router = Router();

router.post(
  "/register",
  userMiddleware.isValidCreate,
  userMiddleware.getDynamicallyAndThrow("email"),
  authController.register
);

router.post(
  "/login",
  userMiddleware.isValidLogin,
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.login
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);
router.post("/login");

export const authRouter = router;
