import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";


//****************** app config ******************//
const app = express();
const port = process.env.PORT || 4000;

//****************** middleware ******************//
app.use(express.json());
// app.use() is a method to mount middleware in an Express application. //
// app.use(express.json()) is a middleware function in an Express.js application. It is used to parse incoming JSON payloads in requests.//

app.use(cors()); //using this we access the backend from any frontend//

//****************** dbConnection ******************//
connectDb();

//****************** api endpoint ******************//
app.use("/api/food", foodRouter);
app.use("/images",express.static("uploads"));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.get("/", async (req, resp) => {
  resp.send("API Working.");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
