import { Router } from "express";
import { AuthModule } from "../modules/index.js";
import Interceptors from "../interceptors/index.js";

const router = Router();

router.post("/login", AuthModule.login);
router.post("/register", AuthModule.register);
router.patch("/verifyEmail", AuthModule.verifyEmail);
router.post("/forgotPassword", AuthModule.forgotPassword);
router.patch("/resetPassword", AuthModule.resetPassword);
router.post("/logout", Interceptors.verifyAccess, AuthModule.logout);

export default router;
