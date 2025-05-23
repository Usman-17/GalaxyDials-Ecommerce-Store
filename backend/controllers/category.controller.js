import { Category } from "../models/category.model.js";

// PATH     : /api/category/create
// METHOD   : POST
// ACCESS   : Private Admin
// DESC     : Create Category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category Name are required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(400)
        .json({ error: "Category with this namne already exists" });
    }

    const category = await new Category({ name }).save();
    return res.status(201).json(category);
  } catch (error) {
    console.error("Error in createCategory controller:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/category/update/id
// METHOD   : POST
// ACCESS   : Private Admin
// DESC     : Update Category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    if (name) category.name = name;

    await category.save();
    res.status(200).json({ category });
  } catch (error) {
    console.error("Error in updateCategory", error.message);
    res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/category/all
// METHOD   : GET
// ACCESS   : PUBLIC
// DESC     : Get all category
export const getAllCategories = async (req, res) => {
  try {
    const category = await Category.find().sort({ createdAt: -1 });

    if (!category.length === 0) return res.status(200).json([]);
    return res.status(200).json(category);
  } catch (error) {
    console.log("Error in getAllCategories Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/category/id"
// METHOD   : GET
// ACCESS   : Public
// DESC     : Get Single Category
export const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (error) {
    console.log("Error in getCategory Controller", error.message);
    res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/category/:id"
// METHOD   : DELETE
// ACCESS   : PRIVATE
// DESC     : Delete Category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    await Category.findByIdAndDelete(id);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCategory controller:", error.message);
    res.status(500).json({ error: error.message });
  }
};
