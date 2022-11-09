export default {
  globalContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    margin: 20,
  },
  link: {
    backgroundColor: "#0D6DFD",
    color: "white",
    padding: 10,
    marginRight: 20,
    borderRadius: 8,
    marginBottom: 20,
    textDecoration: "none",
  },
  reviewsTitle: {
    marginTop: 20,
  },
  reviewsListContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 16,
    paddingHorizontal: 12,
  },
  reviewsItemWrapper: {
    width: `${100 / 3}%`,
    flexDirection: "row",
  },
  reviewsItemContainer: {
    flex: 1,
    alignSelf: "flex-start",
    alignItems: "center",
    padding: 15,
    margin: 10,
    border: "1px solid rgba(0, 0, 0, 1)",
    borderRadius: 8,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#0D6DFD",
    color: "white",
    padding: 10,
    borderRadius: 8,
    textAlign: "center",
    marginRight: 20,
    textDecoration: "none",
  },
  editButton: {
    flex: 1,
    backgroundColor: "#0D6DFD",
    color: "white",
    padding: 10,
    borderRadius: 8,
    textAlign: "center",
  },
};
