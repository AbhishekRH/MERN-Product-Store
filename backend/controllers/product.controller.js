import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  const product = req.body; // user will send this data to server

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("Error in Create Product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error fetching all products!", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id; // id of the product whose details needs to be updated; Fetched from URL endpoint
  const product = req.body; // updated product details

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error in Update Product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }

  try {
    await Product.findByIdAndDelete(productId);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in Delete Product: ", error.message);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};

// delete all products
export const deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany();
    res.status(200).json({ success: true, message: "All products deleted" });
  } catch (error) {
    console.error("Error in Delete All Products: ", error.message);
    res.status(500).json({ success: false, message: "Server error!" });
  }
};
