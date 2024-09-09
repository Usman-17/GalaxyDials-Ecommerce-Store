import Product from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";
import slugify from "slugify";

// PATH     : /api/product/create
// METHOD   : POST
// ACCESS   : Private Admin
// DESC     : Create Product
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      salePrice,
      category,
      brand,
      color,
      tags,
      countInStock,
    } = req.body;
    const { productImages } = req.files;

    // Check for required fields
    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !brand ||
      !tags ||
      !countInStock
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Generate a slug from the product title
    const slug = slugify(title, { lower: true });

    // Check if the slug already exists to ensure uniqueness
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return res
        .status(400)
        .json({ error: "Product with this title already exists" });
    }

    // Upload projectImg to Cloudinary
    if (!productImages || productImages.length === 0) {
      return res
        .status(400)
        .json({ error: "At least one product image is required" });
    }

    let uploadedImages = [];

    if (!Array.isArray(productImages)) {
      const singleUpload = await cloudinary.uploader.upload(
        productImages.tempFilePath,
        {
          folder: "PRODUCT_IMAGES",
        }
      );

      uploadedImages.push({
        url: singleUpload.secure_url,
        public_id: singleUpload.public_id,
      });
    } else {
      // Handle multiple file uploads
      for (let image of productImages) {
        const uploadResponse = await cloudinary.uploader.upload(
          image.tempFilePath,
          {
            folder: "PRODUCT_IMAGES",
          }
        );

        uploadedImages.push({
          url: uploadResponse.secure_url,
          public_id: uploadResponse.public_id,
        });
      }
    }
    const newProduct = new Product({
      title,
      slug,
      description,
      price,
      salePrice,
      category,
      brand,
      color,
      tags,
      countInStock,
      productImages: uploadedImages,
    });

    await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error in createProduct controller:", error.message);
    res.status(500).json({ error: error.message });
  }
};
