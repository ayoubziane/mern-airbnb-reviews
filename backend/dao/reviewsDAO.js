import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

export default {
  reviews: null,
  async injectDB(conn) {
    if (this.reviews) {
      return;
    }
    try {
      this.reviews = await conn
        .db(process.env.AIRBNBREVIEWS_NS)
        .collection("reviews");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  },
  async addReview(airbnbId, userName, review, date) {
    try {
      const reviewDoc = {
        name: userName,
        date: date,
        text: review,
        airbnb_id: airbnbId,
      };

      return await this.reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  },
  async updateReview(reviewId, text, date) {
    try {
      const updateResponse = await this.reviews.updateOne(
        { _id: ObjectId(reviewId) },
        { $set: { text: text, date: date } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  },
  async deleteReview(reviewId) {
    try {
      const deleteResponse = await this.reviews.deleteOne({
        _id: ObjectId(reviewId),
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  },
};
