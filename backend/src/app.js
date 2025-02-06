import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

// Allow all origins for testing purposes
app.use(
  cors({
    origin: "*",
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
import orderRouter from "./routes/orders.routes.js";
import carouselRouter from "./routes/carousel.routes.js";
import contactMessageRouter from "./routes/contactMessage.routes.js";

//router declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/carousel", carouselRouter);
app.use("/api/v1/contact", contactMessageRouter);

export { app };
