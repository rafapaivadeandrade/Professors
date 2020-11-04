import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "#8257e5",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Archivo_700Bold",
    color: "#FFF",
    fontSize: 24,
    lineHeight: 32,
    maxWidth: 240,
    marginVertical: 10,
  },
  profile: {
    fontSize: 30,
    marginRight: 90,
    fontFamily: "Poppins_400Regular",
    color: "#fff",
    textAlign: "center",
  },
  titleClasses: {
    fontFamily: "Archivo_700Bold",
    color: "#FFF",
    fontSize: 24,
    lineHeight: 32,
    maxWidth: 240,
    marginVertical: 10,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTop: {
    color: "#e0dde5",
  },
  teachClasses: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    color: "#e0dde5",
    paddingBottom: 20,
    width: 200,
  },
});
export default styles;
