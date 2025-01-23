import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "100kb" }));

app.use(express.urlencoded({ extended: true, limit: "100kb" }));

app.use(express.static("public"));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//router import
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/products.routes.js";

//router declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1", productRouter);

export { app };
