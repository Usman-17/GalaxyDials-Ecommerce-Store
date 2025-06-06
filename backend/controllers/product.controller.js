import Product from "../models/product.model.js";
import { Brand } from "../models/brand.model.js";
import { Category } from "../models/category.model.js";

import slugify from "slugify";
import { v2 as cloudinary } from "cloudinary";

// PATH     : /api/product/create
// METHOD   : POST
// ACCESS   : Private Admin
// DESC     : Create Product
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, brand, colors, tags, sold } =
      req.body;

    const { productImages } = req.files;

    // Check for required fields
    if (!title || !description || !price || !category || !brand || !tags) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const brandExists = await Brand.findById(brand);
    if (!brandExists) {
      return res.status(400).json({ error: "Invalid brand ID" });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ error: "Invalid Categort ID" });
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
      category,
      brand,
      colors,
      sold,
      tags,
      productImages: uploadedImages,
    });

    await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error in createProduct controller:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/product/update/id
// METHOD   : POST
// ACCESS   : Private Admin
// DESC     : Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      category,
      brand,
      quantity,
      colors,
      tags,
      sold,
    } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // --- Validate Category (name or ID) ---
    let foundCategory = null;
    if (category) {
      foundCategory = await Category.findById(category).catch(() => null);
      if (!foundCategory) {
        foundCategory = await Category.findOne({ name: category.trim() });
      }
      if (!foundCategory) {
        return res.status(400).json({ error: "Invalid category" });
      }
    }

    // --- Validate Brand (name or ID) ---
    let foundBrand = null;
    if (brand) {
      foundBrand = await Brand.findById(brand).catch(() => null);
      if (!foundBrand) {
        foundBrand = await Brand.findOne({ name: brand.trim() });
      }
      if (!foundBrand) {
        return res.status(400).json({ error: "Invalid brand" });
      }
    }

    if (title) {
      const newSlug = slugify(title, { lower: true });
      const existingProduct = await Product.findOne({ slug: newSlug });
      if (existingProduct && existingProduct._id.toString() !== id) {
        return res
          .status(400)
          .json({ error: "Product with this title already exists" });
      }
      product.title = title;
      product.slug = newSlug;
    }

    // --- Update other fields only if provided ---
    if (description) product.description = description;
    if (tags) product.tags = tags;
    if (price) product.price = price;
    if (quantity) product.quantity = quantity;
    if (sold) product.sold = sold;
    if (colors) product.colors = colors;
    if (foundCategory) product.category = foundCategory._id;
    if (foundBrand) product.brand = foundBrand._id;

    // Handle product image upload
    if (req.files && req.files.productImages) {
      // Delete old images from Cloudinary
      if (product.productImages && product.productImages.length > 0) {
        for (const image of product.productImages) {
          await cloudinary.uploader.destroy(image.public_id);
        }
      }

      // Upload new images to Cloudinary
      const uploadedImages = [];
      const images = Array.isArray(req.files.productImages)
        ? req.files.productImages
        : [req.files.productImages];

      for (const image of images) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(
          image.tempFilePath,
          {
            folder: "PRODUCT_IMAGES",
          }
        );
        uploadedImages.push({ url: secure_url, public_id });
      }

      // Update product with new images
      product.productImages = uploadedImages;
    }

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.log("Update Product Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// PATH     : /api/product/all
// METHOD   : GET
// ACCESS   : PUBLIC
// DESC     : Get all product
export const getAllproducts = async (req, res) => {
  try {
    const product = await Product.find()
      .populate("brand")
      .populate("category")
      .sort({ createdAt: -1 });

    if (!product.length === 0) return res.status(200).json([]);

    return res.status(200).json(product);
  } catch (error) {
    console.log("Error in getAllProduct Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/product/id"
// METHOD   : GET
// ACCESS   : Public
// DESC     : Get Single Product
export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id)
      .populate("brand")
      .populate("category");
    res.status(200).json(product);
  } catch (error) {
    console.log("Error in getProduct Controller", error.message);
    res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/product/:id"
// METHOD   : DELETE
// ACCESS   : PRIVATE
// DESC     : Delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete all product images from Cloudinary if they exist
    if (product.productImages && product.productImages.length > 0) {
      for (const image of product.productImages) {
        if (image.public_id) {
          await cloudinary.uploader.destroy(image.public_id);
        }
      }
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct controller:", error.message);
    res.status(500).json({ error: error.message });
  }
};
