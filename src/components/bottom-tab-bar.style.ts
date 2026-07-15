import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderTopWidth: 0.5,
    borderTopColor: "#E0E1E6",
    paddingTop: 6,
    paddingBottom: 0,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  indicator: {
    width: 20,
    height: 3,
    borderRadius: 2,
    marginTop: 4,
  },
});
