import React, { useState } from "react";
import { createReviewApi, updateReviewApi } from "../../api/airbnbApi";
import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./styles";

const AddReview = () => {
  const { state } = useLocation();
  const { id } = useParams();

  let initialReviewState = "";
  let initialReviewerName = "";
  let editing = false;

  if (state?.currentReview) {
    editing = true;
    initialReviewState = state.currentReview.text;
    initialReviewerName = state.currentReview.name;
  }

  const [reviewText, setReviewText] = useState(initialReviewState);
  const [reviewerName, setReviewerName] = useState(initialReviewerName);
  const [submitted, setSubmitted] = useState(false);

  const handleReviewTextInputChange = (event) => {
    setReviewText(event.target.value);
  };
  const handleReviewerNameInputChange = (event) => {
    setReviewerName(event.target.value);
  };
  const submitReview = () => {
    const data = {
      text: reviewText,
      name: reviewerName,
      airbnb_id: id,
    };

    if (editing) {
      data.id = state.currentReview._id;
      updateReviewApi(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      data.airbnb_id = id;
      createReviewApi(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div style={styles.globalContainer}>
      {
        <div>
          {submitted ? (
            <div style={styles.successfullSubmissionContainer}>
              <h4>You submitted successfully!</h4>
              <Link to={"/airbnbs/id/" + id} style={styles.link}>
                Back to Airbnb
              </Link>
            </div>
          ) : (
            <div>
              <div style={styles.addingReviewContainer}>
                <label htmlFor="description">
                  {editing ? "Edit" : "Create"} Review
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  style={styles.input}
                  id="text"
                  required
                  value={reviewerName}
                  onChange={handleReviewerNameInputChange}
                  name="reviewerName"
                />
                <textarea
                  style={styles.textArea}
                  name="reviewText"
                  rows="3"
                  cols="30"
                  onChange={handleReviewTextInputChange}
                  value={reviewText}
                  placeholder="Thoughts about this airbnb?"
                ></textarea>
              </div>
              <button onClick={submitReview} style={styles.button}>
                Submit
              </button>
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default AddReview;
