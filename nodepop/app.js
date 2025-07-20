import cookieParser from "cookie-parser";
import express from "express";
import createError from "http-errors";
import logger from "morgan";
import path, { dirname } from "path";
import { loginController } from "./controllers/index.js";
import usersRouter from "./routes/users.js";
//import productsRouter from './routes/products.js';
import { fileURLToPath } from "url";
import * as apiLoginController from "./controllers/api/apiLogingController.js";
import * as apiProductsController from "./controllers/api/apiProductsController.js";
import * as homeControler from "./controllers/homeController.js";
import { changeLanguage } from "./controllers/i18nController.js";
import * as productsController from "./controllers/productsController.js";
import * as jwtAuth from "./lib/apiMidelwereJWT.js";
import connectMongoose from "./lib/connectMongoose.js";
import i18n from "./lib/i18nConfigure.js";
import * as sessionManager from "./lib/sessionManager.js";
import upload from "./lib/uploadConfigure.js";
import * as productsRouter from "./routes/products.js";

await connectMongoose();
console.log("Connected to MongoDB.");

const app = express();

app.locals.siteTitle = "NodePop";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(sessionManager.middleware, sessionManager.useSessionInViews);
app.use(i18n.init);

app.post("/api/login", apiLoginController.loginJWT);
app.get(
  "/api/products/:productId",
  jwtAuth.guard,
  apiProductsController.getOne
);
app.get("/api/products", jwtAuth.guard, apiProductsController.list);
app.post(
  "/api/products",
  jwtAuth.guard,
  upload.single("image"),
  apiProductsController.newProduct
);
app.put(
  "/api/products/:productId",
  jwtAuth.guard,
  upload.single("image"),
  apiProductsController.updateProduct
);
app.delete(
  "/api/products/:productId",
  jwtAuth.guard,
  apiProductsController.deleteProduct
);

app.get("/change-locale/:locale", changeLanguage);

app.get("/", homeControler.index);
app.use("/users", usersRouter);
app.get("/products", productsRouter.index);
app.get("/login", loginController.indexLogin);
app.post("/login", loginController.postLogin);
app.get("/logout", loginController.logout);

app.get("/products/new", productsController.indexNew);
app.post("/products/new", upload.single("image"), productsController.postNew);
app.post("/delete/:productId", productsController.deleteOne);

app.get("/products/:productId", productsController.getOne);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  debugger
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

export default app;
