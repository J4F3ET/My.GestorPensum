import {verify} from "jsonwebtoken";
const secret = "s23d23fg34k2jb34"; //Un aes
function step_back(req, res, next) {
	!req.cookies.DataLogin ? next() : res.render("/index");
}
function auntenticando(req, res, next) {
	verify(req.cookies.DataLogin, secret, (err) => {
		!err ? next() : res.render("/login");
	});
}
export{auntenticando,secret,step_back,};
