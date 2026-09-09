import { Router } from "express";
import { router as usersRoutes } from "./user.routes.js";
import { router as usersSupabaseRoutes } from "./user.supabase.routes.js";

export const router = Router();

router.use("/users", usersRoutes);
router.use("/users", usersSupabaseRoutes);