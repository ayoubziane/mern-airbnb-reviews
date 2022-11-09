import airbnbsDAO from "../dao/airbnbsDAO.js";

export const apiGetAirbnbs = async (req, res) => {
  const airbnbsPerPage = req.query.airbnbsPerPage
    ? parseInt(req.query.airbnbsPerPage, 10)
    : 20;
  const page = req.query.page ? parseInt(req.query.page, 10) : 0;

  const filters = {};
  if (req.query.property_type) {
    filters.property_type = req.query.property_type;
  } else if (req.query.name) {
    filters.name = req.query.name;
  }

  const { airbnbsList, totalNumAirbnbs } = await airbnbsDAO.getAirbnbs({
    filters,
    page,
    airbnbsPerPage,
  });

  const response = {
    airbnbs: airbnbsList,
    page: page,
    filters: filters,
    entries_per_page: airbnbsPerPage,
    total_results: totalNumAirbnbs,
  };
  res.json(response);
};
export const apiGetAirbnbById = async (req, res) => {
  try {
    const id = req.params.id || {};
    const airbnb = await airbnbsDAO.getAirbnbByID(id);
    if (!airbnb) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(airbnb);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const apiGetAirbnbsPropertyTypes = async (req, res) => {
  try {
    const propertyTypes = await airbnbsDAO.getPropertyTypes();
    res.json(propertyTypes);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
