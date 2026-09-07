import { Router } from "express";
import {router as v1Router} from "./v1/index.js"; // หรือ import { router as v1Router } ขึ้นอยู่กับการ export ใน v1/index.js

export const router = Router();

router.use("/v1", v1Router);