import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8257E5",
    justifyContent: "center",
    padding: 40,
  },
  banner: {
    width: "100%",
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Archivo_400Regular",
    color: "#FFF",
    fontSize: 20,
    lineHeight: 30,
    marginTop: 80,
  },
  bold: {
    fontFamily: "Poppins_600SemiBold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "space-between",
  },
  button: {
    height: 150,
    width: "48%",
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 24,
    justifyContent: "space-between",
  },
  buttonPrimary: {
    backgroundColor: "#9871f5",
  },
  buttonSecondary: {
    backgroundColor: "#04d361",
  },
  buttonText: {
    fontFamily: "Archivo_700Bold",
    color: "#fff",
    fontSize: 20,
  },

  totalConnections: {
    fontFamily: "Poppins_400Regular",
    maxWidth: 340,
    fontSize: 12,
    lineHeight: 20,
    marginTop: 30,
    color: "#d4c2ff",
  },
  topHeader: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    color: "#e0dde5",
  },
  logout: {
    color: "#8257E5",
  },
  imageContainer: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
  leftHeader: {
    maxWidth: 130,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default styles;
