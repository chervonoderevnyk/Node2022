import { Router } from "express";

import { userController } from "../controlers/user.controler";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.get("/", userController.getAll);

router.get("/:userId", userMiddleware.getByIdAndThrow, userController.getById);

router.post("/", userController.create);

router.put("/:userId", userController.update);

router.delete("/:userId", userController.delete);

export const userRouter = router;
