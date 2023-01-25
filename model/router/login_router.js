import { Router } from "express";
import { get_login_user } from "../controllers_router/login_controllers.js";
const router = Router();
router.get('/',get_login_user);
export default router;