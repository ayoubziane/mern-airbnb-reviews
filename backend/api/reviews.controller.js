import reviewsDAO from "../dao/reviewsDAO.js";

export const apiPostReview = async (req, res) => {
  try {
    const airbnbId = req.body.airbnb_id;
    const review = req.body.text;
    const userName = req.body.name;
    const date = new Date();

    await reviewsDAO.addReview(airbnbId, userName, review, date);
    res.json({ status: "success" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const apiUpdateReview = async (req, res) => {
  try {
    const reviewId = req.body.id;
    const text = req.body.text;
    const date = new Date();

    const reviewResponse = await reviewsDAO.updateReview(reviewId, text, date);

    var { error } = reviewResponse;
    if (error) {
      res.status(400).json({ error });
    }

    if (reviewResponse.modifiedCount === 0) {
      throw new Error(
        "unable to update review - user may not be original poster"
      );
    }

    res.json({ status: "success" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const apiDeleteReview = async (req, res) => {
  try {
    const reviewId = req.query.id;
    await reviewsDAO.deleteReview(reviewId);
    res.json({ status: "success" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
