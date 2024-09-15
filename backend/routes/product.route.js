import express from "express";
import {
  createProduct,
  deleteAllProducts,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.delete("/deleteAll", deleteAllProducts);

export default router;
