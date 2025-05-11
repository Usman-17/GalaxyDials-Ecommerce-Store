import Product from "../models/product.model.js";
import User from "../models/user.model.js";

import { v2 as cloudinary } from "cloudinary";
import slugify from "slugify";

// PATH     : /api/product/create
// METHOD   : POST
// ACCESS   : Private Admin
// DESC     : Create Product
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, brand, colors, tags } =
      req.body;

    const { productImages } = req.files;

    // Check for required fields
    if (!title || !description || !price || !category || !brand || !tags) {
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
      category,
      brand,
      colors,
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
      salePrice,
      category,
      brand,
      colors,
      tags,
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
    if (salePrice !== undefined)
      product.salePrice = salePrice === "" ? null : salePrice;
    if (category) product.category = category;
    if (brand) product.brand = brand;
    if (colors) product.colors = colors;
    if (tags) product.tags = tags;

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

// PATH     : /api/product/all
// METHOD   : GET
// ACCESS   : PUBLIC
// DESC     : Get all product
export const getAllproducts = async (req, res) => {
  try {
    const product = await Product.find().sort({ createdAt: -1 });

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
    const product = await Product.findById(id);
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

// PATH     : /api/product/wishlist/:id"
// METHOD   : POST
// ACCESS   : Public
// DESC     : Add product to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    // Find the product to ensure it exists
    const product = await Product.findById(productId);
    const user = await User.findById(userId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the product is already in the wishlist
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    // Add product to wishlist and save
    user.wishlist.push(productId);
    await user.save();

    return res
      .status(200)
      .json({ message: "Product added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error("Error in addToWishlist controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/product/wishlist/:id"
// METHOD   : Delete
// ACCESS   : Public
// DESC     : Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the product is in the user's wishlist
    if (!user.wishlist.includes(productId)) {
      return res
        .status(400)
        .json({ message: "Product is not in your wishlist" });
    }

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();

    res
      .status(200)
      .json({ message: "Product removed from wishlist successfully" });
  } catch (error) {
    console.error("Error in removeFromWishlist controller:", error.message);
    res.status(500).json({ error: error.message });
  }
};
