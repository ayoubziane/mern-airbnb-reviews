export default {
  globalContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    margin: 20,
  },
  topContainer:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  horizontalContainer: {
    display: "flex",
    flexDirection: "row",
  },
  airbnbsListContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 16,
    paddingHorizontal: 12,
  },
  airbnbsItemWrapper: {
    width: `${100 / 3}%`,
    flexDirection: "row",
  },
  airbnbsItemContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 16,
    paddingHorizontal: 12,
  },
  link: {
    backgroundColor: "#0D6DFD",
    color: "white",
    padding: 10,
    marginRight: 20,
    borderRadius: 8,
    textDecoration: "none",
  },
  button: {
    backgroundColor: "#0D6DFD",
    color: "white",
    padding: 10,
    borderRadius: 8,
    textDecoration: "none",
  },
};
