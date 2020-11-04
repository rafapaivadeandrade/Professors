import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "#f0f0f7",
  },
  teacherList: {
    marginTop: -40,
    padding: 16,
  },
  searchForm: {
    marginBottom: 24,
    // marginTop: 10,
  },
  label: {
    color: "#d4c2ff",
    fontFamily: "Poppins_400Regular",
  },
  input: {
    height: 54,
    backgroundColor: "#FFF",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputBlock: {
    width: "48%",
  },
  submitButton: {
    backgroundColor: "#04d361",
    height: 56,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFF",
    fontFamily: "Archivo_700Bold",
    fontSize: 16,
  },
  headerDown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0dde5",
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerRightView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
