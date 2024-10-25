import { v2 as cloudinary } from "cloudinary";
import Banner from "../models/banner.model.js";

// PATH     : /api/banner/create
// METHOD   : POST
// ACCESS   : Private Admin
// DESC     : Create a banner (heroBanner, adBanner, collectionBanner)
export const createBanner = async (req, res) => {
  try {
    const { bannerImg } = req.files;
    const { type } = req.body;

    // Validate banner type
    if (!["heroBanner", "adBanner", "collectionBanner"].includes(type)) {
      return res.status(400).json({ error: "Invalid banner type." });
    }

    // Check if the image is provided
    if (!bannerImg) {
      return res.status(400).json({ error: "Banner image is required." });
    }

    // Upload banner image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      bannerImg.tempFilePath,
      { folder: "BANNERS" }
    );

    const newBanner = new Banner({
      type,
      bannerImg: {
        url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id,
      },
    });

    await newBanner.save();
    return res.status(201).json({
      message: `${type} created successfully`,
      banner: newBanner,
    });
  } catch (error) {
    console.error("Error in createBanner controller:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/banner/update/id
// METHOD   : PUT
// ACCESS   : Private Admin
// DESC     : Update a banner
export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;
    const { bannerImg } = req.files || {};

    if (
      type &&
      !["heroBanner", "adBanner", "collectionBanner"].includes(type)
    ) {
      return res.status(400).json({ error: "Invalid banner type." });
    }

    const existingBanner = await Banner.findById(id);
    if (!existingBanner) {
      return res.status(404).json({ error: "Banner not found." });
    }

    // If a new image is uploaded, replace the old image in Cloudinary
    let updatedBannerImg = existingBanner.bannerImg;
    if (bannerImg) {
      // Delete the old image from Cloudinary
      await cloudinary.uploader.destroy(existingBanner.bannerImg.public_id);

      // Upload the new image to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(
        bannerImg.tempFilePath,
        { folder: "BANNERS" }
      );

      // Update the banner image details
      updatedBannerImg = {
        url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id,
      };
    }

    // Update banner details
    existingBanner.type = type || existingBanner.type;
    existingBanner.bannerImg = updatedBannerImg;

    await existingBanner.save();
    return res.status(200).json({
      message: `${existingBanner.type} updated successfully`,
      banner: existingBanner,
    });
  } catch (error) {
    console.error("Error in updateBanner controller:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/banner/all
// METHOD   : GET
// ACCESS   : PUBLIC
// DESC     : Get All the Banners
export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find();

    if (!banners.length === 0) {
      return res.status(404).json({ error: "No banners found" });
    }

    res.status(200).json(banners);
  } catch (error) {
    console.error("Error in getAllBanners Controller:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// PATH     : /api/banner/id"
// METHOD   : POST
// ACCESS   : PRIVATE
// DESC     : Get a Banner
export const getBanner = async (req, res) => {
  const { id } = req.params;

  try {
    const banner = await Banner.findById(id);
    if (!banner) return res.status(404).json({ error: "Banner not found" });

    res.status(200).json(banner);
  } catch (error) {
    console.error("Error in getBanner:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
