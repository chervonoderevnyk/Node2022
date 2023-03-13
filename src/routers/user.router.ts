import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.get("/", userController.getAll);
router.post("/", userMiddleware.isUserValidCreate, userController.create);

router.get(
  "/:userId",
  userMiddleware.isUserIdValid,
  userMiddleware.getByIdOrThrow,
  userController.getById
);
router.put(
  "/:userId",
  userMiddleware.isUserIdValid,
  userMiddleware.isUserValidUpdate,
  userMiddleware.getByIdOrThrow,
  userController.update
);
router.delete(
  "/:userId",
  userMiddleware.isUserIdValid,
  userMiddleware.getByIdOrThrow,
  userController.delete
);

export const userRouter = router;
