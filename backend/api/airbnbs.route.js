import express from "express";
import {
  apiGetAirbnbById,
  apiGetAirbnbs,
  apiGetAirbnbsPropertyTypes,
} from "./airbnbs.controller.js";
import {
  apiDeleteReview,
  apiPostReview,
  apiUpdateReview,
} from "./reviews.controller.js";

const router = express.Router();

router.route("/").get(apiGetAirbnbs);
router.route("/id/:id").get(apiGetAirbnbById);
router.route("/property_types").get(apiGetAirbnbsPropertyTypes);

router
  .route("/review")
  .post(apiPostReview)
  .put(apiUpdateReview)
  .delete(apiDeleteReview);
export default router;
