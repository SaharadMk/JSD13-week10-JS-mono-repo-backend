import { Router } from "express";
import { router as usersRoutes } from "./user.routes.js";

export const router = Router();

router.use("/", usersRoutes);