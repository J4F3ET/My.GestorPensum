import express, { static, json, urlencoded } from "express";
import morgan from "morgan";
import login from "./router/login_router.js";
import index from "./router/index_router.js";
import logout from "./router/logout_router.js";
import signup from "./router/signup_router.js";
import add_course from "../add_course_router.js";
import cookieParser from "cookie-parser";
import { join, resolve } from "path";
const app = express();
const port = process.env.PORT || 5500;
// MIDDLEWARES
app.use(morgan());
// app.set("view engine", "ejs");
app.set("views", join(resolve(__dirname, "..", "views"), "public"));
app.use(static("views"));
app.use(json());
app.use(cookieParser());
app.use(urlencoded({extended: true}));
// ENROUTERS
app.use(login);
app.use(signup);
app.use(index);
app.use(add_course);
app.use(logout);

app.listen(port, () => console.log("Server listening on port " + port));
