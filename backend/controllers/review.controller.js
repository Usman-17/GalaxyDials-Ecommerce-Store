import Review from "../models/review.model.js";

// PATH     : /api/review/:id"
// METHOD   : GET
// ACCESS   : Public
// DESC     : Get Product Reviews
export const getReviewsByProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const reviews = await Review.find({ product: id })
      .populate("user", "fullName profileImg")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("Error in getReviewsByProduct controller:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/review/add"
// METHOD   : POST
// ACCESS   : Public
// DESC     : Add Product Reviews
export const addProductReview = async (req, res) => {
  const { productId, rating, comment } = req.body;

  try {
    // check for duplicates
    const existing = await Review.findOne({
      product: productId,
      user: req.user._id,
    });

    if (existing)
      return res
        .status(400)
        .json({ message: "You already reviewed this product." });

    const review = new Review({
      product: productId,
      user: req.user._id,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error("Error in addProductReview controller:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/review/update"
// METHOD   : PUT
// ACCESS   : Public
// DESC     : Update Product Reviews
export const updateProductReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  try {
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found." });

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATH     : /api/review/:id"
// METHOD   : DELETE
// ACCESS   : Private
// DESC     : Delete Product Reviews
export const deleteProductReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "Review not found." });

    await review.deleteOne();
    res.json({ message: "Review deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
