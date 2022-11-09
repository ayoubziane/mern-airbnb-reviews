import React, { useState, useEffect } from "react";
import {
  getAllApi,
  getPropertyTypesApi,
  filterAirbnbsApi,
} from "../../api/airbnbApi";
import { Link } from "react-router-dom";
import styles from "./styles";

const MAX_NAME_LENGTH = 40;
const AirbnbsList = () => {
  const [airbnbs, setAirbnbs] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchPropertyType, setSearchPropertyType] = useState("");
  const [propertyTypes, setPropertyTypes] = useState(["All property types"]);

  useEffect(() => {
    retrieveAirbnbs();
    retrievePropertyTypes();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchPropertyType = (e) => {
    const searchPropertyType = e.target.value;
    setSearchPropertyType(searchPropertyType);
  };

  const retrieveAirbnbs = () => {
    getAllApi()
      .then((response) => {
        console.log(response.data);
        setAirbnbs(response.data.airbnbs);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrievePropertyTypes = () => {
    getPropertyTypesApi()
      .then((response) => {
        console.log(response.data);
        setPropertyTypes(["All property types"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveAirbnbs();
  };

  const filterAirbnbs = (query, by) => {
    filterAirbnbsApi(query, by)
      .then((response) => {
        console.log(response.data);
        setAirbnbs(response.data.airbnbs);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    filterAirbnbs(searchName, "name");
  };

  const findByPropertyType = () => {
    if (searchPropertyType == "All property types") {
      refreshList();
    } else {
      filterAirbnbs(searchPropertyType, "property_type");
    }
  };

  return (
    <div style={styles.globalContainer}>
      <div style={styles.topContainer}>
        <div style={styles.horizontalContainer}>
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div>
            <button type="button" onClick={findByName}>
              Search
            </button>
          </div>
        </div>

        <div style={styles.horizontalContainer}>
          <select onChange={onChangeSearchPropertyType}>
            {propertyTypes.map((propertyType) => {
              return (
                <option value={propertyType} key={propertyType}>
                  {propertyType}
                </option>
              );
            })}
          </select>
          <div>
            <button type="button" onClick={findByPropertyType}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div style={styles.airbnbsListContainer}>
        {airbnbs.map((airbnb) => {
          const [lng, lat] = airbnb.address.location.coordinates;
          return (
            <div style={styles.airbnbsItemWrapper} key={airbnb._id}>
              <div style={styles.airbnbsItemContainer}>
                <div>
                  <h3>
                    {airbnb.name.length <= MAX_NAME_LENGTH
                      ? airbnb.name
                      : airbnb.name.substring(0, MAX_NAME_LENGTH) + "..."}
                  </h3>
                  <p>
                    <strong>Property type: </strong>
                    {airbnb.property_type}
                    <br />
                    <strong>City: </strong>
                    {airbnb.address.street}
                  </p>
                  <div>
                    <Link to={"/airbnbs/id/" + airbnb._id} style={styles.link}>
                      View Reviews
                    </Link>
                    <a
                      target="_blank"
                      href={
                        "https://www.google.com/maps/search/?api=1&query=" +
                        lat +
                        "," +
                        lng
                      }
                      style={styles.button}
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AirbnbsList;
