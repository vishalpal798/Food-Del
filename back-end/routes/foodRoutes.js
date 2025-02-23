import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
const foodRouter = express.Router();
// express.Router(): Creates an instance of an Express Router, which will handle food-related routes separately. //

// Image Storage Engine // 
const storage = multer.diskStorage({
  destination: "uploads", 
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
// This upload instance will be used as middleware in routes that require file uploads. //

foodRouter.post("/add", upload.single("image"), addFood);
// * foodRouter.post("/add", ...) : Defines a POST route at /add for adding food items.
// * upload.single("image"):
//   1). Middleware that handles the file upload before passing control to addFood.
//   2). Accepts a single file from the request with the field name "image".
// * addFood: The controller function that processes the request and stores food details in the database.

foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood)
export default foodRouter; 
