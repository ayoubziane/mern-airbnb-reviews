import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import airbnbsDAO from "./dao/airbnbsDAO.js";
import reviewsDAO from "./dao/reviewsDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.AIRBNBREVIEWS_DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
})
  .catch((error) => {
    console.error(error.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await airbnbsDAO.injectDB(client);
    await reviewsDAO.injectDB(client);
    //after a successful connection to the database, connect to the server
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
