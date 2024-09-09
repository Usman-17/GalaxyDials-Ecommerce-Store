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
      salePrice,
      category,
      brand,
      color,
      tags,
      countInStock,
    } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
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
    if (description) product.description = description;
    if (price) product.price = price;
    if (salePrice) product.salePrice = salePrice;
    if (category) product.category = category;
    if (brand) product.brand = brand;
    if (color) product.color = color;
    if (tags) product.tags = tags;
    if (countInStock) product.countInStock = countInStock;

    
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
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error in updateProduct", error.message);
    res.status(500).json({ error: error.message });
  }
};
