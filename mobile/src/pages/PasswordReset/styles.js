import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    marginTop: -210,
    backgroundColor: "#8257E5",
  },
  content: {
    paddingTop: 60,
    paddingRight: 100,
    paddingBottom: 150,
    paddingLeft: 100,
    transform: [{ rotate: "180deg" }],
  },
  study: {
    width: 120,
    height: 45,
    marginLeft: 60,
    transform: [{ rotate: "180deg" }],
    resizeMode: "contain",
  },
  platform: {
    color: "#D4C2FF",
    transform: [{ rotate: "180deg" }],
    marginRight: 30,
    marginBottom: 10,
  },
  title: {
    fontFamily: "Archivo_700Bold",
    color: "#32264D",
    fontSize: 25,
    width: 300,
    marginTop: -120,
    marginLeft: -40,
  },
  createText: {
    color: "#32264D",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    width: "100%",
    marginLeft: -40,
    marginTop: 20,
  },
  secondContainer: {
    justifyContent: "center",
    paddingHorizontal: 100,
  },
  createAccountContainer: {
    flexDirection: "column",
    paddingTop: 150,
  },
  input: {
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    height: 54,
    width: 300,
    justifyContent: "center",
    borderRadius: 8,
    alignItems: "center",
    marginLeft: -40,
  },
  arrow: {
    tintColor: "#c1bccc",
  },
  link: {
    top: -5,
    position: "absolute",
    right: 330,
  },
});

export default styles;
