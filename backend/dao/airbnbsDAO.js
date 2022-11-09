export default {
  airbnbs: null,
  async injectDB(conn) {
    if (this.airbnbs) {
      return;
    }
    try {
      this.airbnbs = await conn
        .db(process.env.AIRBNBREVIEWS_NS)
        .collection("listingsAndReviews");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in airbnbsDAO: ${e}`
      );
    }
  },

  async getAirbnbs({ filters = null, page = 0, airbnbsPerPage = 20 } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("property_type" in filters) {
        query = { property_type: { $eq: filters["property_type"] } };
      }
    }
    let cursor;

    try {
      cursor = await this.airbnbs.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { airbnbsList: [], totalNumAirbnbs: 0 };
    }

    const displayCursor = cursor
      .limit(airbnbsPerPage)
      .skip(airbnbsPerPage * page);

    try {
      const airbnbsList = await displayCursor.toArray();
      const totalNumAirbnbs = await this.airbnbs.countDocuments(query);
      return { airbnbsList, totalNumAirbnbs };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { airbnbsList: [], totalNumAirbnbs: 0 };
    }
  },
  async getAirbnbByID(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: id,
          },
        },
        {
          $lookup: {
            from: "reviews",
            let: {
              id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$airbnb_id", "$$id"],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: "reviews",
          },
        },
        {
          $addFields: {
            reviews: "$reviews",
          },
        },
      ];
      return await this.airbnbs.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getAirbnbByID: ${e}`);
      throw e;
    }
  },

  async getPropertyTypes() {
    let propertyTypes = [];
    try {
      propertyTypes = await this.airbnbs.distinct("property_type");
      return propertyTypes;
    } catch (e) {
      console.error(`Unable to get property_types, ${e}`);
      return propertyTypes;
    }
  },
};
