import {Router, json} from "express";
import {step_back, path_views, create_cookie, create_token} from "../util.js";
import register_user_services from "../../model/services/user_services.js";
const router = Router();
/**Metodo envia al usuario a registrarse */
router.get("/signup", step_back, (req, res) =>
	res.sendFile("signup.html", {root: path_views})
);
/**Metodo envia al usuario a iniciar sesion y registrarse*/
router.post("/register", async (req, res) => {
	try {
		let result = await register_user_services(req.body.user, req.body.password);
		if(result.message)return res.json(result);
		const token = create_token(result);
		const cookie = create_cookie(token);
		res.setHeader("Set-Cookie", cookie);
		res.json(result);
	} catch (err) {
		console.log(err);
	}
});
export default router;
