import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import AddReview from "./components/addReview";
import AirbnbDetails from "./components/airbnbDetails";
import AirbnbsList from "./components/airbnbsList";
import styles from "./styles";

function App() {
  return (
    <div>
      <nav style={styles.navbar}>
        <Link to={"/"} style={styles.link}>
          Airbnbs
        </Link>
      </nav>

      <div>
        <Routes>
          <Route exact path="/" element={<AirbnbsList />} />
          <Route path="/airbnbs/:id/review" element={<AddReview />} />
          <Route path="/airbnbs/id/:id" element={<AirbnbDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
