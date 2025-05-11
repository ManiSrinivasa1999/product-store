import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (_req, res) => {
  const products = await Product.find({});
  try {
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(`Error getting all products: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields",
    });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error(`Error creating a new product: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error(`Error creating a new product: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product id" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(`Faile to delete the product: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};
