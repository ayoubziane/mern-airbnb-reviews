import React, { useState, useEffect } from "react";
import { getReviewByIdApi, deleteReviewApi } from "../../api/airbnbApi";
import { Link, useParams } from "react-router-dom";
import styles from "./styles";

const Airbnb = () => {
  const initialAirbnbState = {
    id: null,
    name: "",
    address: {},
    propertyType: "",
    reviews: [],
  };
  const [airbnb, setAirbnb] = useState(initialAirbnbState);
  const { id } = useParams();
  const getAirbnb = (id) => {
    getReviewByIdApi(id)
      .then((response) => {
        setAirbnb(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAirbnb(id);
  }, [id]);

  const removeReview = (reviewId, index) => {
    deleteReviewApi(reviewId)
      .then(() => {
        setAirbnb((prevState) => {
          prevState.reviews.splice(index, 1);
          return {
            ...prevState,
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={styles.globalContainer}>
      {airbnb ? (
        <div>
          <h3>{airbnb.name}</h3>
          <p>
            <strong>Property type: </strong>
            {airbnb.property_type}
            <br />
            <strong>City: </strong>
            {airbnb.address.street}
          </p>
          <Link to={"/airbnbs/" + id + "/review"} style={styles.link}>
            Add Review
          </Link>
          <h2 style={styles.reviewsTitle}>Reviews</h2>
          <div style={styles.reviewsListContainer}>
            {airbnb.reviews.length > 0 ? (
              airbnb.reviews.map((review, index) => {
                return (
                  <div style={styles.reviewsItemWrapper} key={index}>
                    <div style={styles.reviewsItemContainer}>
                      <div>
                        <p>
                          {review.text}
                          <br />
                          <strong>User: </strong>
                          {review.name}
                          <br />
                          <strong>Date: </strong>
                          {review.date}
                        </p>
                        {
                          <div style={styles.buttonContainer}>
                            <a
                              onClick={() => removeReview(review._id, index)}
                              style={styles.deleteButton}
                            >
                              Delete
                            </a>
                            <Link
                              to={{
                                pathname: "/airbnbs/" + id + "/review",
                              }}
                              state={{ currentReview: review }}
                              style={styles.editButton}
                            >
                              Edit
                            </Link>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <p>No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>No airbnb selected.</p>
        </div>
      )}
    </div>
  );
};

export default Airbnb;
