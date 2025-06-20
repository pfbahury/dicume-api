import { Router } from "express";
import { googleAuth } from "../controllers/google_auth_controller";

const authRouter = Router();

authRouter.get('/google', googleAuth);

export default authRouter