const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const app = express();
const routerPrivate = express.Router();
const routerPublic = express.Router();
const cors = require("cors");
require("dotenv").config();

const verifyToken = require("./auth/checkToken");
const authRouter = require("./routers/auth");
const categoryRouter = require("./routers/category");
const userRouter = require("./routers/user");
const blogRouter = require("./routers/blog");
const productRouter = require("./routers/product");
const publicRouter = require("./routers/public");

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY || "DOAN"],
    maxAge: 4 * 7 * 24 * 60 * 60 * 1000,
  })
);

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

routerPublic.use("/api/auth", authRouter);
routerPublic.use("/api/public", publicRouter);
app.use(routerPublic);

routerPrivate.use(verifyToken);
routerPrivate.use("/api/category", categoryRouter);
routerPrivate.use("/api/blog", blogRouter);
routerPrivate.use("/api/user", userRouter);
routerPrivate.use("/api/product", productRouter);
app.use(routerPrivate);

// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);
// app.use("/api/category", categoryRouter);
// app.use("/api/role", roleRouter);
// app.use("/api/post", postRouter);
// app.use("/api/product", productRouter);
// app.use("/api/helper", helperRouter);
// app.use("/api/cooking-recipe", cookingRecipeRouter);
// app.use("/api/contact", contactRouter);
// app.use("/api/chat", chatRouter);
// app.use("/api/electricity-water", electricityWaterRouter);
// app.use("/api/livestream", liveStreamRouter);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`App running on port: ${PORT}`));
