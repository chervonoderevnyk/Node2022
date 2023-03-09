import { NextFunction, Request, Response } from "express";

import { AppiError } from "../errors/appi.error";
import { User } from "../models/User.model";

class UserMiddleware {
  public async getByIdAndThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);

      if (!user) {
        throw new AppiError("User not found", 404);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
